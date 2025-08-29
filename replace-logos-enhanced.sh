#!/bin/bash

# Enhanced Logo Replacement Script for Happy App
# Version 2.0 - With validation, preview, and advanced options

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
OUTPUT_DIR="sources/assets/images"
BACKUP_DIR=""
VERBOSE=false
DRY_RUN=false

# Print banner
print_banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║        🎨 HAPPY APP LOGO REPLACEMENT TOOL 🎨        ║"
    echo "║                    Version 2.0                       ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Print usage
print_usage() {
    echo -e "${BOLD}Usage:${NC}"
    echo "  Interactive mode:"
    echo "    ./replace-logos-enhanced.sh"
    echo ""
    echo "  Quick mode:"
    echo "    ./replace-logos-enhanced.sh <icon> [logotype]"
    echo ""
    echo "  Advanced options:"
    echo "    ./replace-logos-enhanced.sh [options] <icon> [logotype]"
    echo ""
    echo -e "${BOLD}Options:${NC}"
    echo "  -h, --help          Show this help message"
    echo "  -v, --verbose       Show detailed output"
    echo "  -d, --dry-run       Preview changes without applying them"
    echo "  -b, --backup        Backup existing logos before replacing"
    echo "  -c, --check         Validate input files only"
    echo "  -o, --output DIR    Custom output directory (default: $OUTPUT_DIR)"
    echo ""
    echo -e "${BOLD}Examples:${NC}"
    echo "  ./replace-logos-enhanced.sh --backup my-icon.png my-logotype.png"
    echo "  ./replace-logos-enhanced.sh --dry-run ~/Desktop/logo.png"
    echo "  ./replace-logos-enhanced.sh --check my-icon.png"
}

# Check dependencies
check_dependencies() {
    local missing_deps=()
    
    # Check for ImageMagick
    if ! command -v convert &> /dev/null; then
        missing_deps+=("imagemagick")
    fi
    
    # Check for identify (part of ImageMagick)
    if ! command -v identify &> /dev/null; then
        missing_deps+=("imagemagick")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Missing dependencies: ${missing_deps[*]}${NC}"
        echo ""
        read -p "Would you like to install them now? (y/n): " install_deps
        
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
        echo -e "${GREEN}✓ All dependencies installed${NC}"
    fi
}

# Validate image file
validate_image() {
    local file=$1
    local required_size=$2
    local file_type=$3
    
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
    
    # Check minimum size
    if [ ! -z "$required_size" ]; then
        local min_size=$(echo $required_size | cut -d'x' -f1)
        if [ $width -lt $min_size ] || [ $height -lt $min_size ]; then
            echo -e "${YELLOW}⚠️  Warning: Image smaller than recommended ${required_size}px${NC}"
            echo -e "${YELLOW}   Current: ${width}x${height}, Recommended: ${required_size}${NC}"
        fi
    fi
    
    # Check aspect ratio for icon (should be square)
    if [[ "$file_type" == "icon" ]] && [ $width -ne $height ]; then
        echo -e "${YELLOW}⚠️  Warning: Icon should be square (current: ${width}x${height})${NC}"
        read -p "Continue anyway? (y/n): " continue_anyway
        if [[ $continue_anyway != "y" && $continue_anyway != "Y" ]]; then
            return 1
        fi
    fi
    
    # Check format
    local format=$(identify -format "%m" "$file" 2>/dev/null)
    if [[ "$format" != "PNG" && "$format" != "JPEG" ]]; then
        echo -e "${YELLOW}⚠️  Warning: Image format is $format (PNG recommended)${NC}"
    fi
    
    echo -e "${GREEN}✓ Image validation passed${NC}"
    return 0
}

# Backup existing logos
backup_logos() {
    BACKUP_DIR="$OUTPUT_DIR/backup-$(date +%Y%m%d-%H%M%S)"
    echo -e "${BLUE}📦 Creating backup...${NC}"
    
    mkdir -p "$BACKUP_DIR"
    local file_count=$(ls -1 $OUTPUT_DIR/*.png 2>/dev/null | wc -l)
    
    if [ $file_count -gt 0 ]; then
        cp $OUTPUT_DIR/*.png "$BACKUP_DIR/" 2>/dev/null
        echo -e "${GREEN}✓ Backed up $file_count files to $BACKUP_DIR${NC}"
    else
        echo -e "${YELLOW}  No existing logos to backup${NC}"
    fi
}

# Generate a single logo variant
generate_logo_variant() {
    local source=$1
    local output=$2
    local size=$3
    local options=$4
    local description=$5
    
    if [ "$DRY_RUN" = true ]; then
        echo -e "  ${CYAN}[DRY RUN]${NC} Would create: $output ($size) - $description"
        return 0
    fi
    
    if [ "$VERBOSE" = true ]; then
        echo -e "  ${BLUE}Creating:${NC} $output"
        echo -e "    Size: $size"
        echo -e "    Options: $options"
    fi
    
    convert "$source" $options -resize "$size" "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} $description"
    else
        echo -e "  ${RED}✗${NC} Failed: $description"
        return 1
    fi
}

# Generate all logo variants
generate_all_logos() {
    local MASTER_ICON=$1
    local MASTER_LOGOTYPE=$2
    
    echo ""
    echo -e "${BOLD}📱 Generating App Icons${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Main app icon
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/icon.png" \
        "1024x1024!" "" \
        "Main app icon (1024x1024)"
    
    # Android adaptive icon (with safe zone padding)
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/icon-adaptive.png" \
        "880x880" "-gravity center -extent 1024x1024" \
        "Android adaptive icon with safe zone"
    
    # Monochrome version
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/icon-monochrome.png" \
        "1024x1024!" "-colorspace Gray" \
        "Monochrome icon for themed mode"
    
    # Notification icon
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/icon-notification.png" \
        "96x96!" "" \
        "Notification icon (96x96)"
    
    # Favicons
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/favicon.png" \
        "32x32!" "" \
        "Web favicon (32x32)"
    
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/favicon-active.png" \
        "32x32!" "" \
        "Web favicon active state"
    
    echo ""
    echo -e "${BOLD}🎨 Generating Logo Marks${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Square logos
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/logo-black.png" \
        "200x200!" "" \
        "Square logo - black version"
    
    generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/logo-white.png" \
        "200x200!" "-negate" \
        "Square logo - white version"
    
    # Generate logotypes if provided
    if [ -f "$MASTER_LOGOTYPE" ]; then
        echo ""
        echo -e "${BOLD}📝 Generating Logotypes${NC}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        
        # Light theme variants (dark text)
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-dark.png" \
            "300x90" "" \
            "Logotype @1x - light theme"
        
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-dark@2x.png" \
            "600x180" "" \
            "Logotype @2x - light theme"
        
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-dark@3x.png" \
            "900x270" "" \
            "Logotype @3x - light theme"
        
        # Dark theme variants (light text)
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-light.png" \
            "300x90" "-negate" \
            "Logotype @1x - dark theme"
        
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-light@2x.png" \
            "600x180" "-negate" \
            "Logotype @2x - dark theme"
        
        generate_logo_variant "$MASTER_LOGOTYPE" "$OUTPUT_DIR/logotype-light@3x.png" \
            "900x270" "-negate" \
            "Logotype @3x - dark theme"
        
        # Legacy files for compatibility
        if [ "$DRY_RUN" = false ]; then
            cp "$OUTPUT_DIR/logotype-dark.png" "$OUTPUT_DIR/logotype.png" 2>/dev/null
            cp "$OUTPUT_DIR/logotype-dark@2x.png" "$OUTPUT_DIR/logotype@2x.png" 2>/dev/null
            cp "$OUTPUT_DIR/logotype-dark@3x.png" "$OUTPUT_DIR/logotype@3x.png" 2>/dev/null
            echo -e "  ${GREEN}✓${NC} Legacy logotype files created"
        fi
    else
        echo ""
        echo -e "${YELLOW}ℹ️  No logotype provided - using icon for all logos${NC}"
        
        # Create simple logotypes from icon
        generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/logotype-dark.png" \
            "300x90" "-gravity center -extent 300x90" \
            "Fallback logotype @1x - light theme"
        
        generate_logo_variant "$MASTER_ICON" "$OUTPUT_DIR/logotype-light.png" \
            "300x90" "-negate -gravity center -extent 300x90" \
            "Fallback logotype @1x - dark theme"
    fi
}

# Interactive mode with enhanced UI
interactive_mode() {
    print_banner
    
    echo -e "${BOLD}Welcome to the Logo Replacement Tool!${NC}"
    echo ""
    echo "This wizard will help you replace all app logos with your custom branding."
    echo ""
    
    # Step 1: Check dependencies
    echo -e "${BOLD}Step 1: Checking dependencies${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    check_dependencies
    echo ""
    
    # Step 2: Get input files
    echo -e "${BOLD}Step 2: Select your logo files${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "You'll need:"
    echo "  1. A square logo/icon (minimum 1024x1024 PNG)"
    echo "  2. (Optional) A horizontal logotype (recommended 900x270 PNG)"
    echo ""
    
    # Get icon file
    while true; do
        read -p "Path to your icon file: " MASTER_ICON
        MASTER_ICON="${MASTER_ICON/#\~/$HOME}"
        MASTER_ICON=$(echo $MASTER_ICON | tr -d '"' | tr -d "'")
        
        if validate_image "$MASTER_ICON" "1024x1024" "icon"; then
            break
        fi
        echo ""
        read -p "Try another file? (y/n): " try_again
        if [[ $try_again != "y" && $try_again != "Y" ]]; then
            exit 1
        fi
    done
    
    echo ""
    
    # Get logotype file (optional)
    read -p "Path to your logotype file (press Enter to skip): " MASTER_LOGOTYPE
    if [ ! -z "$MASTER_LOGOTYPE" ]; then
        MASTER_LOGOTYPE="${MASTER_LOGOTYPE/#\~/$HOME}"
        MASTER_LOGOTYPE=$(echo $MASTER_LOGOTYPE | tr -d '"' | tr -d "'")
        
        if [ -f "$MASTER_LOGOTYPE" ]; then
            validate_image "$MASTER_LOGOTYPE" "300x90" "logotype"
        else
            echo -e "${YELLOW}⚠️  Logotype file not found - will use icon only${NC}"
            MASTER_LOGOTYPE=""
        fi
    fi
    
    echo ""
    
    # Step 3: Backup option
    echo -e "${BOLD}Step 3: Backup existing logos${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    read -p "Create backup of existing logos? (recommended) [Y/n]: " backup_choice
    backup_choice=${backup_choice:-Y}
    
    if [[ $backup_choice == "y" || $backup_choice == "Y" ]]; then
        backup_logos
    fi
    
    echo ""
    
    # Step 4: Preview mode
    echo -e "${BOLD}Step 4: Preview changes${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    read -p "Preview changes before applying? [Y/n]: " preview_choice
    preview_choice=${preview_choice:-Y}
    
    if [[ $preview_choice == "y" || $preview_choice == "Y" ]]; then
        DRY_RUN=true
        echo ""
        echo -e "${CYAN}PREVIEW MODE - No files will be changed${NC}"
        generate_all_logos "$MASTER_ICON" "$MASTER_LOGOTYPE"
        
        echo ""
        read -p "Apply these changes? (y/n): " apply_changes
        if [[ $apply_changes != "y" && $apply_changes != "Y" ]]; then
            echo -e "${YELLOW}Changes cancelled${NC}"
            exit 0
        fi
        DRY_RUN=false
    fi
    
    echo ""
    
    # Step 5: Generate logos
    echo -e "${BOLD}Step 5: Generating logos${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    generate_all_logos "$MASTER_ICON" "$MASTER_LOGOTYPE"
    
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Logo replacement complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    echo ""
    echo -e "${BOLD}📋 Next Steps:${NC}"
    echo "1. ${BLUE}Clear cache:${NC} yarn start -c"
    echo "2. ${BLUE}Rebuild app:${NC} yarn prebuild --clear"
    echo "3. ${BLUE}Test on iOS:${NC} yarn ios"
    echo "4. ${BLUE}Test on Android:${NC} yarn android"
    
    if [ ! -z "$BACKUP_DIR" ]; then
        echo ""
        echo -e "${CYAN}💾 Backup location: $BACKUP_DIR${NC}"
        echo "   To restore: cp $BACKUP_DIR/*.png $OUTPUT_DIR/"
    fi
    
    echo ""
    echo -e "${MAGENTA}🎉 Your app has been successfully rebranded!${NC}"
}

# Parse command line arguments
POSITIONAL_ARGS=()
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            print_banner
            print_usage
            exit 0
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -b|--backup)
            BACKUP_BEFORE=true
            shift
            ;;
        -c|--check)
            CHECK_ONLY=true
            shift
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -*|--*)
            echo "Unknown option $1"
            print_usage
            exit 1
            ;;
        *)
            POSITIONAL_ARGS+=("$1")
            shift
            ;;
    esac
done

# Restore positional parameters
set -- "${POSITIONAL_ARGS[@]}"

# Main execution
if [ $# -eq 0 ]; then
    # No arguments - run interactive mode
    interactive_mode
elif [ $# -eq 1 ] || [ $# -eq 2 ]; then
    # Arguments provided - quick mode
    print_banner
    
    MASTER_ICON="$1"
    MASTER_LOGOTYPE="$2"
    
    echo -e "${BOLD}Quick Mode${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Check dependencies
    check_dependencies
    
    # Validate input files
    echo ""
    echo -e "${BOLD}Validating input files${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if ! validate_image "$MASTER_ICON" "1024x1024" "icon"; then
        exit 1
    fi
    
    if [ ! -z "$MASTER_LOGOTYPE" ] && [ -f "$MASTER_LOGOTYPE" ]; then
        if ! validate_image "$MASTER_LOGOTYPE" "300x90" "logotype"; then
            echo -e "${YELLOW}Continuing without logotype${NC}"
            MASTER_LOGOTYPE=""
        fi
    fi
    
    # Check-only mode
    if [ "$CHECK_ONLY" = true ]; then
        echo ""
        echo -e "${GREEN}✅ Validation complete - files are valid${NC}"
        exit 0
    fi
    
    # Backup if requested
    if [ "$BACKUP_BEFORE" = true ]; then
        echo ""
        backup_logos
    fi
    
    # Generate logos
    echo ""
    generate_all_logos "$MASTER_ICON" "$MASTER_LOGOTYPE"
    
    if [ "$DRY_RUN" = true ]; then
        echo ""
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${CYAN}DRY RUN COMPLETE - No files changed${NC}"
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    else
        echo ""
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}✅ Logo replacement complete!${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "Next: yarn prebuild --clear && yarn start -c"
    fi
else
    echo -e "${RED}Error: Too many arguments${NC}"
    print_usage
    exit 1
fi