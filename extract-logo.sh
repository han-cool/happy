#!/bin/bash

# Logo Extraction Script
# Automatically splits logo+text image into separate logo and logotype files

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

print_banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║        ✂️  LOGO EXTRACTION TOOL ✂️                   ║"
    echo "║           Split logo+text into separate files        ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_usage() {
    echo -e "${BOLD}Usage:${NC}"
    echo "  Interactive mode:"
    echo "    ./extract-logo.sh"
    echo ""
    echo "  Quick mode:"
    echo "    ./extract-logo.sh <input-image> [split-ratio]"
    echo ""
    echo -e "${BOLD}Parameters:${NC}"
    echo "  input-image    Your logo+text image file"
    echo "  split-ratio    Where to split (0.0-1.0, default: 0.65)"
    echo "                 0.5 = middle, 0.65 = logo takes top 65%"
    echo ""
    echo -e "${BOLD}Examples:${NC}"
    echo "  ./extract-logo.sh my-logo-with-text.png"
    echo "  ./extract-logo.sh logo.png 0.7  # Logo takes top 70%"
}

check_dependencies() {
    if ! command -v convert &> /dev/null; then
        echo -e "${YELLOW}⚠️  ImageMagick not found${NC}"
        echo ""
        read -p "Install ImageMagick now? (y/n): " install_deps
        
        if [[ $install_deps == "y" || $install_deps == "Y" ]]; then
            if [[ "$OSTYPE" == "darwin"* ]]; then
                echo "Installing with Homebrew..."
                brew install imagemagick
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                echo "Installing with apt..."
                sudo apt-get update && sudo apt-get install -y imagemagick
            else
                echo -e "${RED}Please install ImageMagick manually${NC}"
                exit 1
            fi
        else
            echo -e "${RED}Cannot proceed without ImageMagick${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✓ ImageMagick found${NC}"
    fi
}

validate_image() {
    local file=$1
    
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ File not found: $file${NC}"
        return 1
    fi
    
    # Get image dimensions
    local dimensions=$(identify -format "%wx%h" "$file" 2>/dev/null)
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Invalid image file: $file${NC}"
        return 1
    fi
    
    local width=$(echo $dimensions | cut -d'x' -f1)
    local height=$(echo $dimensions | cut -d'x' -f2)
    
    echo -e "${BLUE}📏 Image dimensions: ${width}x${height}${NC}"
    
    # Check if image is tall enough to contain logo+text
    if [ $height -lt 200 ]; then
        echo -e "${YELLOW}⚠️  Warning: Image seems too small (height: ${height}px)${NC}"
        echo -e "${YELLOW}   Recommended minimum height: 200px${NC}"
    fi
    
    echo -e "${GREEN}✓ Image validation passed${NC}"
    return 0
}

preview_split() {
    local input_file=$1
    local split_ratio=$2
    local width=$(identify -format "%w" "$input_file")
    local height=$(identify -format "%h" "$input_file")
    
    local logo_height=$(echo "scale=0; $height * $split_ratio / 1" | bc)
    local text_height=$(echo "scale=0; $height - $logo_height" | bc)
    
    echo ""
    echo -e "${BOLD}📋 Split Preview:${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "Original image:  ${width}x${height}"
    echo -e "Logo portion:    ${width}x${logo_height} (top ${split_ratio} of image)"
    echo -e "Text portion:    ${width}x${text_height} (bottom $(echo "scale=2; 1 - $split_ratio" | bc) of image)"
    echo ""
}

extract_logo() {
    local input_file=$1
    local split_ratio=${2:-0.65}
    local base_name=$(basename "$input_file" | sed 's/\.[^.]*$//')
    local dir_name=$(dirname "$input_file")
    
    # Output files
    local logo_file="$dir_name/${base_name}-logo-only.png"
    local logotype_file="$dir_name/${base_name}-logotype.png"
    
    # Get dimensions
    local width=$(identify -format "%w" "$input_file")
    local height=$(identify -format "%h" "$input_file")
    
    # Calculate split point
    local logo_height=$(echo "scale=0; $height * $split_ratio / 1" | bc)
    local text_start_y=$(echo "scale=0; $logo_height" | bc)
    local text_height=$(echo "scale=0; $height - $logo_height" | bc)
    
    echo ""
    echo -e "${BOLD}✂️  Extracting logo parts${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Extract logo part (top portion) with transparency
    echo -e "${BLUE}Creating logo-only version with transparent background...${NC}"
    convert "$input_file" -crop "${width}x${logo_height}+0+0" +repage -transparent white -fuzz 10% "$logo_file"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Logo extracted: $logo_file${NC}"
        
        # Make logo square by finding the largest square that fits
        local logo_size=$width
        if [ $logo_height -lt $width ]; then
            logo_size=$logo_height
        fi
        
        # Center crop to square with transparency preserved
        local square_logo_file="$dir_name/${base_name}-logo-square.png"
        convert "$logo_file" -gravity center -crop "${logo_size}x${logo_size}+0+0" +repage "$square_logo_file"
        echo -e "${GREEN}✓ Square logo created: $square_logo_file${NC}"
        
        # Create high-res version (1024x1024) with transparency
        local final_logo_file="$dir_name/${base_name}-logo-1024.png"
        convert "$square_logo_file" -resize "1024x1024!" "$final_logo_file"
        echo -e "${GREEN}✓ High-res logo (1024x1024): $final_logo_file${NC}"
        
    else
        echo -e "${RED}✗ Failed to extract logo${NC}"
        return 1
    fi
    
    # Extract text part (bottom portion) with transparency
    if [ $text_height -gt 50 ]; then
        echo -e "${BLUE}Creating logotype version with transparent background...${NC}"
        convert "$input_file" -crop "${width}x${text_height}+0+${text_start_y}" +repage -transparent white -fuzz 10% "$logotype_file"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Logotype extracted: $logotype_file${NC}"
            
            # Create standard logotype size (900x270 or maintain aspect ratio) with transparency
            local standard_logotype_file="$dir_name/${base_name}-logotype-standard.png"
            convert "$logotype_file" -resize "900x270>" -gravity center -background none -extent "900x270" "$standard_logotype_file"
            echo -e "${GREEN}✓ Standard logotype (900x270): $standard_logotype_file${NC}"
        else
            echo -e "${RED}✗ Failed to extract logotype${NC}"
        fi
    else
        echo -e "${YELLOW}ℹ️  Text portion too small, skipping logotype extraction${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Logo extraction complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    echo ""
    echo -e "${BOLD}📁 Output files:${NC}"
    echo "  🎯 Final logo (for app icons): ${final_logo_file}"
    if [ -f "$standard_logotype_file" ]; then
        echo "  📝 Final logotype (for headers): ${standard_logotype_file}"
        echo ""
        echo -e "${BOLD}🚀 Ready to use with logo replacement:${NC}"
        echo "  ./replace-logos-enhanced.sh \"${final_logo_file}\" \"${standard_logotype_file}\""
    else
        echo ""
        echo -e "${BOLD}🚀 Ready to use with logo replacement:${NC}"
        echo "  ./replace-logos-enhanced.sh \"${final_logo_file}\""
    fi
}

interactive_mode() {
    print_banner
    
    echo -e "${BOLD}Welcome to the Logo Extraction Tool!${NC}"
    echo ""
    echo "This tool splits your logo+text image into separate files:"
    echo "• Logo-only version (square, for app icons)"
    echo "• Logotype version (horizontal, for headers)"
    echo ""
    
    # Check dependencies
    echo -e "${BOLD}Checking dependencies${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    check_dependencies
    echo ""
    
    # Get input file
    echo -e "${BOLD}Select your logo+text image${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    while true; do
        read -p "Path to your logo+text image: " input_file
        input_file="${input_file/#\~/$HOME}"
        input_file=$(echo $input_file | tr -d '"' | tr -d "'")
        
        if validate_image "$input_file"; then
            break
        fi
        echo ""
        read -p "Try another file? (y/n): " try_again
        if [[ $try_again != "y" && $try_again != "Y" ]]; then
            exit 1
        fi
    done
    
    echo ""
    
    # Get split ratio
    echo -e "${BOLD}Configure the split${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Where should we split the image?"
    echo "• 0.5 = Split in the middle"
    echo "• 0.65 = Logo takes top 65% (recommended)"
    echo "• 0.7 = Logo takes top 70%"
    echo ""
    
    read -p "Split ratio [0.65]: " split_ratio
    split_ratio=${split_ratio:-0.65}
    
    # Validate split ratio
    if ! [[ "$split_ratio" =~ ^0\.[0-9]+$ ]] && ! [[ "$split_ratio" =~ ^1\.0*$ ]]; then
        echo -e "${YELLOW}⚠️  Invalid ratio, using default 0.65${NC}"
        split_ratio=0.65
    fi
    
    # Preview the split
    preview_split "$input_file" "$split_ratio"
    
    read -p "Proceed with extraction? [Y/n]: " proceed
    proceed=${proceed:-Y}
    
    if [[ $proceed == "y" || $proceed == "Y" ]]; then
        extract_logo "$input_file" "$split_ratio"
    else
        echo -e "${YELLOW}Extraction cancelled${NC}"
        exit 0
    fi
}

# Check for bc (basic calculator) dependency
if ! command -v bc &> /dev/null; then
    echo -e "${YELLOW}Installing bc (basic calculator)...${NC}"
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install -y bc
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # bc is usually pre-installed on macOS
        echo -e "${RED}bc not found. Please install it manually.${NC}"
        exit 1
    fi
fi

# Parse arguments
if [ $# -eq 0 ]; then
    interactive_mode
elif [ $# -eq 1 ] || [ $# -eq 2 ]; then
    print_banner
    
    input_file="$1"
    split_ratio=${2:-0.65}
    
    echo -e "${BOLD}Quick Mode${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    check_dependencies
    
    if validate_image "$input_file"; then
        preview_split "$input_file" "$split_ratio"
        extract_logo "$input_file" "$split_ratio"
    else
        exit 1
    fi
else
    echo -e "${RED}Error: Too many arguments${NC}"
    print_usage
    exit 1
fi