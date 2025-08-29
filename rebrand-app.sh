#!/bin/bash

# Universal App Rebranding Script
# This script changes app names and branding from "Happy" to any specified brand name

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Global variables
NEW_BRAND_NAME=""
NEW_BUNDLE_ID=""
NEW_SLUG=""
NEW_DESCRIPTION=""
BACKUP_DIR=""

print_banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║           🔄 UNIVERSAL REBRANDING TOOL 🔄            ║"
    echo "║         Change Happy App → Your Brand                ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_usage() {
    echo -e "${BOLD}Usage:${NC}"
    echo "  ./rebrand-app.sh <brand-name> [options]"
    echo ""
    echo -e "${BOLD}Arguments:${NC}"
    echo "  brand-name          New brand name (e.g., 'D3AI', 'MyApp', 'TechCorp')"
    echo ""
    echo -e "${BOLD}Options:${NC}"
    echo "  -b, --bundle ID     Custom bundle identifier (default: com.company.brandname)"
    echo "  -s, --slug SLUG     Custom app slug (default: lowercase brand name)"
    echo "  -d, --description   Custom app description"
    echo "  --backup           Create backup before changes (default: yes)"
    echo "  --no-backup        Skip backup creation"
    echo "  -h, --help         Show this help message"
    echo ""
    echo -e "${BOLD}Examples:${NC}"
    echo "  ./rebrand-app.sh 'D3AI'"
    echo "  ./rebrand-app.sh 'MyApp' --bundle com.mycompany.myapp"
    echo "  ./rebrand-app.sh 'TechCorp' --slug techcorp --description 'Advanced Tech Platform'"
    echo "  ./rebrand-app.sh 'AI Assistant' --bundle com.ai.assistant --no-backup"
}

# Validate brand name
validate_brand_name() {
    local brand="$1"
    
    if [ -z "$brand" ]; then
        echo -e "${RED}❌ Brand name cannot be empty${NC}"
        return 1
    fi
    
    # Check length
    if [ ${#brand} -gt 30 ]; then
        echo -e "${RED}❌ Brand name too long (max 30 characters): '$brand'${NC}"
        return 1
    fi
    
    # Check for problematic characters in app names
    if [[ "$brand" =~ [\<\>\:\"\/\\\|\?\*] ]]; then
        echo -e "${RED}❌ Brand name contains invalid characters: '$brand'${NC}"
        echo "   Avoid: < > : \" / \\ | ? *"
        return 1
    fi
    
    echo -e "${GREEN}✓ Brand name is valid: '$brand'${NC}"
    return 0
}

# Generate default values
generate_defaults() {
    local brand="$1"
    
    # Default bundle ID (convert to lowercase, replace spaces/special chars)
    local bundle_name=$(echo "$brand" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]//g')
    NEW_BUNDLE_ID="${NEW_BUNDLE_ID:-com.company.$bundle_name}"
    
    # Default slug
    local slug_name=$(echo "$brand" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
    NEW_SLUG="${NEW_SLUG:-$slug_name}"
    
    # Default description
    NEW_DESCRIPTION="${NEW_DESCRIPTION:-$brand is an advanced AI Assistant Platform}"
    
    echo -e "${BLUE}Generated defaults:${NC}"
    echo "  Brand name: $brand"
    echo "  Bundle ID: $NEW_BUNDLE_ID"
    echo "  Slug: $NEW_SLUG"
    echo "  Description: $NEW_DESCRIPTION"
}

# Validate bundle ID
validate_bundle_id() {
    local bundle="$1"
    
    # Check format (should be like com.company.app)
    if [[ ! "$bundle" =~ ^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$ ]]; then
        echo -e "${RED}❌ Invalid bundle ID format: '$bundle'${NC}"
        echo "   Should be like: com.company.app"
        return 1
    fi
    
    # Check length
    if [ ${#bundle} -gt 100 ]; then
        echo -e "${RED}❌ Bundle ID too long (max 100 characters)${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✓ Bundle ID is valid: '$bundle'${NC}"
    return 0
}

# Create backup
create_backup() {
    BACKUP_DIR="backup-rebrand-$(date +%Y%m%d-%H%M%S)"
    echo -e "${BLUE}📦 Creating backup...${NC}"
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup key files that will be modified
    local files_backed_up=0
    
    if [ -f "app.config.js" ]; then
        cp app.config.js "$BACKUP_DIR/" && ((files_backed_up++))
    fi
    
    if [ -f "package.json" ]; then
        cp package.json "$BACKUP_DIR/" && ((files_backed_up++))
    fi
    
    if [ -d "sources/text/" ]; then
        cp -r sources/text/ "$BACKUP_DIR/text/" && ((files_backed_up++))
    fi
    
    if [ -f "README.md" ]; then
        cp README.md "$BACKUP_DIR/" && ((files_backed_up++))
    fi
    
    # Backup other markdown files
    for file in *.md; do
        if [ -f "$file" ]; then
            cp "$file" "$BACKUP_DIR/" && ((files_backed_up++))
        fi
    done
    
    echo -e "${GREEN}✓ Backed up $files_backed_up files to $BACKUP_DIR${NC}"
    echo ""
}

# Update app.config.js
update_app_config() {
    local brand="$1"
    echo -e "${BLUE}📱 Updating app configuration...${NC}"
    
    if [ ! -f "app.config.js" ]; then
        echo -e "${RED}❌ app.config.js not found${NC}"
        return 1
    fi
    
    # Update app names
    sed -i.tmp "s/\"Happy (dev)\"/\"$brand (dev)\"/g" app.config.js
    sed -i.tmp "s/\"Happy (preview)\"/\"$brand (preview)\"/g" app.config.js
    sed -i.tmp "s/\"Happy\"/\"$brand\"/g" app.config.js
    
    # Update bundle identifiers
    sed -i.tmp "s/com\.slopus\.happy\.dev/$NEW_BUNDLE_ID.dev/g" app.config.js
    sed -i.tmp "s/com\.slopus\.happy\.preview/$NEW_BUNDLE_ID.preview/g" app.config.js
    sed -i.tmp "s/com\.ex3ndr\.happy/$NEW_BUNDLE_ID/g" app.config.js
    
    # Update slug
    sed -i.tmp "s/slug: \"happy\"/slug: \"$NEW_SLUG\"/g" app.config.js
    
    # Clean up temporary files
    rm app.config.js.tmp 2>/dev/null
    
    echo -e "  ✓ App name: Happy → $brand"
    echo -e "  ✓ Bundle ID: com.*.happy → $NEW_BUNDLE_ID"
    echo -e "  ✓ Slug: happy → $NEW_SLUG"
}

# Update package.json
update_package_json() {
    local brand="$1"
    echo -e "${BLUE}📦 Updating package.json...${NC}"
    
    if [ ! -f "package.json" ]; then
        echo -e "${YELLOW}⚠️  package.json not found, skipping${NC}"
        return 0
    fi
    
    local package_name=$(echo "$NEW_SLUG" | tr '[:upper:]' '[:lower:]')
    sed -i.tmp "s/\"name\": \"happy\"/\"name\": \"$package_name\"/g" package.json
    rm package.json.tmp 2>/dev/null
    
    echo -e "  ✓ Package name: happy → $package_name"
}

# Update translation files
update_translations() {
    local brand="$1"
    echo -e "${BLUE}🌍 Updating translations...${NC}"
    
    local files_updated=0
    
    # English translations
    if [ -f "sources/text/_default.ts" ]; then
        sed -i.tmp "s/Happy Coder/$brand/g" sources/text/_default.ts
        sed -i.tmp "s/Happy App/$brand App/g" sources/text/_default.ts
        sed -i.tmp "s/Happy/$brand/g" sources/text/_default.ts
        
        # Update about description
        sed -i.tmp "s/Claude Code mobile client/AI Assistant Platform/g" sources/text/_default.ts
        sed -i.tmp "s/aboutFooter: '[^']*'/aboutFooter: '$NEW_DESCRIPTION. Fully end-to-end encrypted and your account is stored only on your device. Not affiliated with Anthropic.'/g" sources/text/_default.ts
        
        rm sources/text/_default.ts.tmp 2>/dev/null
        echo -e "  ✓ English translations updated"
        ((files_updated++))
    fi
    
    # Update other language files
    local lang_files=("es" "vi" "ru" "pl")
    local lang_names=("Spanish" "Vietnamese" "Russian" "Polish")
    
    for i in "${!lang_files[@]}"; do
        local lang="${lang_files[$i]}"
        local name="${lang_names[$i]}"
        local file="sources/text/translations/$lang.ts"
        
        if [ -f "$file" ]; then
            sed -i.tmp "s/Happy Coder/$brand/g" "$file"
            sed -i.tmp "s/Happy App/$brand App/g" "$file"
            sed -i.tmp "s/Happy/$brand/g" "$file"
            
            # Update common descriptions
            sed -i.tmp "s/Claude Code/AI Assistant Platform/g" "$file"
            sed -i.tmp "s/Plataforma de Asistente IA/AI Assistant Platform/g" "$file"
            sed -i.tmp "s/Nền tảng Trợ lý AI/AI Assistant Platform/g" "$file"
            
            rm "$file.tmp" 2>/dev/null
            echo -e "  ✓ $name translations updated"
            ((files_updated++))
        fi
    done
    
    if [ $files_updated -eq 0 ]; then
        echo -e "${YELLOW}  ⚠️  No translation files found${NC}"
    fi
}

# Update documentation files
update_documentation() {
    local brand="$1"
    echo -e "${BLUE}📚 Updating documentation...${NC}"
    
    local files_updated=0
    
    # Update all markdown files
    for file in *.md; do
        if [ -f "$file" ]; then
            sed -i.tmp "s/Happy Coder/$brand/g" "$file"
            sed -i.tmp "s/Happy Mobile App/$brand Mobile App/g" "$file"
            sed -i.tmp "s/Happy App/$brand App/g" "$file"
            sed -i.tmp "s/Happy app/$brand app/g" "$file"
            sed -i.tmp "s/Happy mobile app/$brand mobile app/g" "$file"
            
            # Update specific references
            sed -i.tmp "s/Claude Code mobile client/AI Assistant Platform/g" "$file"
            sed -i.tmp "s/Claude Code/AI Assistant/g" "$file"
            
            rm "$file.tmp" 2>/dev/null
            echo -e "  ✓ $file updated"
            ((files_updated++))
        fi
    done
    
    if [ $files_updated -eq 0 ]; then
        echo -e "${YELLOW}  ⚠️  No documentation files found${NC}"
    fi
}

# Update source code comments
update_source_comments() {
    local brand="$1"
    echo -e "${BLUE}💻 Updating source code comments...${NC}"
    
    if [ ! -d "sources/" ]; then
        echo -e "${YELLOW}  ⚠️  sources/ directory not found${NC}"
        return 0
    fi
    
    local files_updated=0
    
    # Find and update comments in TypeScript files
    find sources/ -name "*.ts" -o -name "*.tsx" | while read -r file; do
        if grep -q "Happy" "$file" 2>/dev/null; then
            sed -i.tmp "s/Happy app/$brand app/g" "$file" 2>/dev/null
            sed -i.tmp "s/Happy App/$brand App/g" "$file" 2>/dev/null
            sed -i.tmp "s/Happy mobile/$brand mobile/g" "$file" 2>/dev/null
            rm "${file}.tmp" 2>/dev/null
            ((files_updated++))
        fi
    done
    
    echo -e "  ✓ Updated $files_updated source files"
}

# Show manual steps
show_manual_steps() {
    local brand="$1"
    echo ""
    echo -e "${BOLD}📋 Manual Steps Required:${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${YELLOW}1. Update App Icons & Logos:${NC}"
    echo "   • Replace logo files with $brand branding"
    echo "   • Run: ./replace-logos-enhanced.sh"
    echo "   • Use $brand colors and design language"
    echo ""
    echo -e "${YELLOW}2. App Store Configuration:${NC}"
    echo "   • Bundle ID: $NEW_BUNDLE_ID"
    echo "   • App Name: $brand"
    echo "   • Create new app listing (bundle ID changed)"
    echo "   • Update screenshots and store description"
    echo ""
    echo -e "${YELLOW}3. Development Environment:${NC}"
    echo "   • Clear cache: yarn start -c"
    echo "   • Rebuild: yarn prebuild --clear"
    echo "   • Test: yarn ios / yarn android"
    echo ""
    echo -e "${YELLOW}4. Additional Customization:${NC}"
    echo "   • Update deep link scheme: $NEW_SLUG"
    echo "   • Customize app colors and themes"
    echo "   • Update privacy policy and terms"
    echo "   • Configure app-specific settings"
}

# Show rollback instructions
show_rollback() {
    if [ ! -z "$BACKUP_DIR" ]; then
        echo ""
        echo -e "${CYAN}💾 Rollback Instructions:${NC}"
        echo "If something goes wrong, restore from backup:"
        echo ""
        echo "  cp $BACKUP_DIR/app.config.js ./"
        echo "  cp $BACKUP_DIR/package.json ./"
        echo "  cp -r $BACKUP_DIR/text/* sources/text/"
        echo "  cp $BACKUP_DIR/*.md ./"
        echo ""
        echo "Then rebuild: yarn prebuild --clear && yarn start -c"
    fi
}

# Parse command line arguments
parse_arguments() {
    local create_backup=true
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                print_banner
                print_usage
                exit 0
                ;;
            -b|--bundle)
                NEW_BUNDLE_ID="$2"
                shift 2
                ;;
            -s|--slug)
                NEW_SLUG="$2"
                shift 2
                ;;
            -d|--description)
                NEW_DESCRIPTION="$2"
                shift 2
                ;;
            --backup)
                create_backup=true
                shift
                ;;
            --no-backup)
                create_backup=false
                shift
                ;;
            -*)
                echo -e "${RED}❌ Unknown option: $1${NC}"
                print_usage
                exit 1
                ;;
            *)
                if [ -z "$NEW_BRAND_NAME" ]; then
                    NEW_BRAND_NAME="$1"
                else
                    echo -e "${RED}❌ Multiple brand names provided: '$NEW_BRAND_NAME' and '$1'${NC}"
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # Check if brand name was provided
    if [ -z "$NEW_BRAND_NAME" ]; then
        echo -e "${RED}❌ Brand name is required${NC}"
        echo ""
        print_usage
        exit 1
    fi
    
    # Return backup preference
    [ "$create_backup" = true ]
}

# Main execution
main() {
    print_banner
    
    # Parse arguments and determine backup preference
    if parse_arguments "$@"; then
        local should_backup=true
    else
        local should_backup=false
    fi
    
    # Validate inputs
    if ! validate_brand_name "$NEW_BRAND_NAME"; then
        exit 1
    fi
    
    # Generate defaults
    generate_defaults "$NEW_BRAND_NAME"
    
    # Validate bundle ID
    if ! validate_bundle_id "$NEW_BUNDLE_ID"; then
        exit 1
    fi
    
    echo ""
    echo -e "${BOLD}Rebranding Summary:${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}From:${NC} Happy"
    echo -e "${GREEN}To:${NC}   $NEW_BRAND_NAME"
    echo -e "${BLUE}Bundle:${NC} $NEW_BUNDLE_ID"
    echo -e "${BLUE}Slug:${NC}   $NEW_SLUG"
    echo ""
    
    read -p "Continue with rebranding? (y/n): " confirm
    if [[ $confirm != "y" && $confirm != "Y" ]]; then
        echo -e "${YELLOW}Rebranding cancelled${NC}"
        exit 0
    fi
    
    echo ""
    
    # Create backup if requested
    if [ "$should_backup" = true ]; then
        create_backup
    fi
    
    # Execute updates
    echo -e "${BOLD}🔄 Starting rebranding process...${NC}"
    echo ""
    
    update_app_config "$NEW_BRAND_NAME"
    echo ""
    
    update_package_json "$NEW_BRAND_NAME"
    echo ""
    
    update_translations "$NEW_BRAND_NAME"
    echo ""
    
    update_documentation "$NEW_BRAND_NAME"
    echo ""
    
    update_source_comments "$NEW_BRAND_NAME"
    echo ""
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Automatic rebranding complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    show_manual_steps "$NEW_BRAND_NAME"
    show_rollback
    
    echo ""
    echo -e "${MAGENTA}🎉 Welcome to $NEW_BRAND_NAME! 🎉${NC}"
    echo ""
    echo -e "${CYAN}Next steps:${NC}"
    echo "1. Replace logos: ./replace-logos-enhanced.sh"
    echo "2. Test the app: yarn start -c && yarn ios"
    echo "3. Update app store listing"
}

# Run the script
main "$@"