#!/bin/bash

# Logo Replacement Script for Happy App
# This script helps you replace all logo files with your custom branding

echo "🎨 Happy App Logo Replacement Tool"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}⚠️  ImageMagick not found. Installing...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    else
        sudo apt-get update && sudo apt-get install -y imagemagick
    fi
fi

# Function to create logo from master file
generate_logos() {
    local MASTER_ICON=$1
    local MASTER_LOGOTYPE=$2
    local OUTPUT_DIR="sources/assets/images"
    
    if [ ! -f "$MASTER_ICON" ]; then
        echo -e "${RED}❌ Master icon file not found: $MASTER_ICON${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📱 Generating app icons...${NC}"
    
    # Main app icon
    convert "$MASTER_ICON" -resize 1024x1024 "$OUTPUT_DIR/icon.png"
    echo "  ✓ icon.png (1024x1024)"
    
    # Android adaptive icon (with padding)
    convert "$MASTER_ICON" -resize 880x880 -gravity center -extent 1024x1024 "$OUTPUT_DIR/icon-adaptive.png"
    echo "  ✓ icon-adaptive.png (1024x1024 with padding)"
    
    # Monochrome version
    convert "$MASTER_ICON" -colorspace Gray -resize 1024x1024 "$OUTPUT_DIR/icon-monochrome.png"
    echo "  ✓ icon-monochrome.png (1024x1024 monochrome)"
    
    # Notification icon
    convert "$MASTER_ICON" -resize 96x96 "$OUTPUT_DIR/icon-notification.png"
    echo "  ✓ icon-notification.png (96x96)"
    
    # Favicons
    convert "$MASTER_ICON" -resize 32x32 "$OUTPUT_DIR/favicon.png"
    convert "$MASTER_ICON" -resize 32x32 "$OUTPUT_DIR/favicon-active.png"
    echo "  ✓ favicon.png & favicon-active.png (32x32)"
    
    # Simple square logos
    convert "$MASTER_ICON" -resize 200x200 "$OUTPUT_DIR/logo-black.png"
    convert "$MASTER_ICON" -resize 200x200 -negate "$OUTPUT_DIR/logo-white.png"
    echo "  ✓ logo-black.png & logo-white.png (200x200)"
    
    if [ -f "$MASTER_LOGOTYPE" ]; then
        echo -e "${BLUE}📝 Generating logotypes...${NC}"
        
        # Light theme logotypes (dark text)
        convert "$MASTER_LOGOTYPE" -resize 300x90 "$OUTPUT_DIR/logotype-dark.png"
        convert "$MASTER_LOGOTYPE" -resize 600x180 "$OUTPUT_DIR/logotype-dark@2x.png"
        convert "$MASTER_LOGOTYPE" -resize 900x270 "$OUTPUT_DIR/logotype-dark@3x.png"
        echo "  ✓ logotype-dark variants (for light theme)"
        
        # Dark theme logotypes (light text - inverted)
        convert "$MASTER_LOGOTYPE" -negate -resize 300x90 "$OUTPUT_DIR/logotype-light.png"
        convert "$MASTER_LOGOTYPE" -negate -resize 600x180 "$OUTPUT_DIR/logotype-light@2x.png"
        convert "$MASTER_LOGOTYPE" -negate -resize 900x270 "$OUTPUT_DIR/logotype-light@3x.png"
        echo "  ✓ logotype-light variants (for dark theme)"
        
        # Legacy logotype files
        cp "$OUTPUT_DIR/logotype-dark.png" "$OUTPUT_DIR/logotype.png"
        cp "$OUTPUT_DIR/logotype-dark@2x.png" "$OUTPUT_DIR/logotype@2x.png"
        cp "$OUTPUT_DIR/logotype-dark@3x.png" "$OUTPUT_DIR/logotype@3x.png"
        echo "  ✓ legacy logotype variants"
    fi
    
    echo -e "${GREEN}✅ Logo generation complete!${NC}"
}

# Interactive mode
interactive_mode() {
    echo "This tool will help you replace all Happy app logos with your custom branding."
    echo ""
    echo "You'll need:"
    echo "1. A square logo/icon (recommended: 1024x1024px PNG)"
    echo "2. (Optional) A horizontal logotype with your app name (recommended: 900x270px PNG)"
    echo ""
    
    read -p "Enter path to your master icon file (1024x1024 PNG): " MASTER_ICON
    read -p "Enter path to your logotype file (optional, press Enter to skip): " MASTER_LOGOTYPE
    
    # Expand tilde to home directory
    MASTER_ICON="${MASTER_ICON/#\~/$HOME}"
    MASTER_LOGOTYPE="${MASTER_LOGOTYPE/#\~/$HOME}"
    
    # Backup existing logos
    echo ""
    read -p "Do you want to backup existing logos? (y/n): " BACKUP
    if [[ $BACKUP == "y" || $BACKUP == "Y" ]]; then
        BACKUP_DIR="sources/assets/images/backup-$(date +%Y%m%d-%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        cp sources/assets/images/*.png "$BACKUP_DIR/" 2>/dev/null
        echo -e "${GREEN}✓ Existing logos backed up to $BACKUP_DIR${NC}"
    fi
    
    # Generate logos
    echo ""
    generate_logos "$MASTER_ICON" "$MASTER_LOGOTYPE"
    
    echo ""
    echo -e "${BLUE}🔄 Next steps:${NC}"
    echo "1. Run 'yarn prebuild' to rebuild native projects"
    echo "2. Run 'yarn start -c' to clear cache"
    echo "3. Test on devices with 'yarn ios' or 'yarn android'"
    echo ""
    echo -e "${GREEN}🎉 Your app has been rebranded!${NC}"
}

# Check if running with arguments or interactive
if [ $# -eq 0 ]; then
    interactive_mode
elif [ $# -eq 1 ] || [ $# -eq 2 ]; then
    generate_logos "$1" "$2"
else
    echo "Usage:"
    echo "  Interactive mode: ./replace-logos.sh"
    echo "  With arguments:   ./replace-logos.sh <master-icon> [master-logotype]"
    echo ""
    echo "Example:"
    echo "  ./replace-logos.sh ~/my-icon.png ~/my-logotype.png"
    exit 1
fi