#!/bin/bash

# D3AI Rebranding Script
# This script changes all app names and branding from "Happy" to "D3AI"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║           🔄 D3AI REBRANDING TOOL 🔄                 ║"
    echo "║      Changing Happy App → D3AI App                   ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Backup function
create_backup() {
    local backup_dir="backup-rebrand-$(date +%Y%m%d-%H%M%S)"
    echo -e "${BLUE}📦 Creating backup...${NC}"
    
    mkdir -p "$backup_dir"
    
    # Backup key files that will be modified
    cp app.config.js "$backup_dir/" 2>/dev/null
    cp package.json "$backup_dir/" 2>/dev/null
    cp -r sources/text/ "$backup_dir/text/" 2>/dev/null
    cp README.md "$backup_dir/" 2>/dev/null
    cp CUSTOMIZATION_GUIDE.md "$backup_dir/" 2>/dev/null
    
    echo -e "${GREEN}✓ Backup created in $backup_dir${NC}"
    echo ""
}

# Function to update app.config.js
update_app_config() {
    echo -e "${BLUE}📱 Updating app configuration...${NC}"
    
    # Update app names
    sed -i.bak 's/"Happy (dev)"/"D3AI (dev)"/g' app.config.js
    sed -i.bak 's/"Happy (preview)"/"D3AI (preview)"/g' app.config.js
    sed -i.bak 's/"Happy"/"D3AI"/g' app.config.js
    
    # Update bundle identifiers (if you want different ones)
    sed -i.bak 's/com\.slopus\.happy/com.d3ai.app/g' app.config.js
    sed -i.bak 's/com\.ex3ndr\.happy/com.d3ai.app/g' app.config.js
    
    # Update slug
    sed -i.bak 's/slug: "happy"/slug: "d3ai"/g' app.config.js
    
    # Clean up backup files
    rm app.config.js.bak 2>/dev/null
    
    echo -e "  ✓ App name: Happy → D3AI"
    echo -e "  ✓ Bundle ID: com.*.happy → com.d3ai.app"
    echo -e "  ✓ Slug: happy → d3ai"
}

# Function to update package.json
update_package_json() {
    echo -e "${BLUE}📦 Updating package.json...${NC}"
    
    sed -i.bak 's/"name": "happy"/"name": "d3ai"/g' package.json
    rm package.json.bak 2>/dev/null
    
    echo -e "  ✓ Package name: happy → d3ai"
}

# Function to update translations
update_translations() {
    echo -e "${BLUE}🌍 Updating translations...${NC}"
    
    # English translations
    if [ -f "sources/text/_default.ts" ]; then
        # Update main brand name
        sed -i.bak 's/Happy Coder/D3AI/g' sources/text/_default.ts
        sed -i.bak 's/Happy/D3AI/g' sources/text/_default.ts
        sed -i.bak 's/Claude Code mobile client/AI Assistant Platform/g' sources/text/_default.ts
        
        # Update specific strings
        sed -i.bak "s/aboutFooter: 'Happy Coder is a Claude Code mobile client\./aboutFooter: 'D3AI is an advanced AI Assistant Platform./g" sources/text/_default.ts
        
        rm sources/text/_default.ts.bak 2>/dev/null
        echo -e "  ✓ English translations updated"
    fi
    
    # Spanish translations
    if [ -f "sources/text/translations/es.ts" ]; then
        sed -i.bak 's/Happy Coder/D3AI/g' sources/text/translations/es.ts
        sed -i.bak 's/Happy/D3AI/g' sources/text/translations/es.ts
        sed -i.bak 's/Claude Code/Plataforma de Asistente IA/g' sources/text/translations/es.ts
        rm sources/text/translations/es.ts.bak 2>/dev/null
        echo -e "  ✓ Spanish translations updated"
    fi
    
    # Vietnamese translations
    if [ -f "sources/text/translations/vi.ts" ]; then
        sed -i.bak 's/Happy Coder/D3AI/g' sources/text/translations/vi.ts
        sed -i.bak 's/Happy/D3AI/g' sources/text/translations/vi.ts
        sed -i.bak 's/Claude Code/Nền tảng Trợ lý AI/g' sources/text/translations/vi.ts
        rm sources/text/translations/vi.ts.bak 2>/dev/null
        echo -e "  ✓ Vietnamese translations updated"
    fi
    
    # Russian translations
    if [ -f "sources/text/translations/ru.ts" ]; then
        sed -i.bak 's/Happy Coder/D3AI/g' sources/text/translations/ru.ts
        sed -i.bak 's/Happy/D3AI/g' sources/text/translations/ru.ts
        rm sources/text/translations/ru.ts.bak 2>/dev/null
        echo -e "  ✓ Russian translations updated"
    fi
    
    # Polish translations
    if [ -f "sources/text/translations/pl.ts" ]; then
        sed -i.bak 's/Happy Coder/D3AI/g' sources/text/translations/pl.ts
        sed -i.bak 's/Happy/D3AI/g' sources/text/translations/pl.ts
        rm sources/text/translations/pl.ts.bak 2>/dev/null
        echo -e "  ✓ Polish translations updated"
    fi
}

# Function to update documentation
update_documentation() {
    echo -e "${BLUE}📚 Updating documentation...${NC}"
    
    # Update README.md
    if [ -f "README.md" ]; then
        sed -i.bak 's/Happy Coder/D3AI/g' README.md
        sed -i.bak 's/Happy/D3AI/g' README.md
        sed -i.bak 's/Claude Code/AI Assistant/g' README.md
        rm README.md.bak 2>/dev/null
        echo -e "  ✓ README.md updated"
    fi
    
    # Update CUSTOMIZATION_GUIDE.md
    if [ -f "CUSTOMIZATION_GUIDE.md" ]; then
        sed -i.bak 's/Happy Mobile App/D3AI Mobile App/g' CUSTOMIZATION_GUIDE.md
        sed -i.bak 's/Happy app/D3AI app/g' CUSTOMIZATION_GUIDE.md
        rm CUSTOMIZATION_GUIDE.md.bak 2>/dev/null
        echo -e "  ✓ CUSTOMIZATION_GUIDE.md updated"
    fi
    
    # Update other guides
    for file in *.md; do
        if [[ "$file" != "README.md" && "$file" != "CUSTOMIZATION_GUIDE.md" && -f "$file" ]]; then
            sed -i.bak 's/Happy App/D3AI App/g' "$file" 2>/dev/null
            sed -i.bak 's/Happy mobile app/D3AI mobile app/g' "$file" 2>/dev/null
            rm "${file}.bak" 2>/dev/null
        fi
    done
    echo -e "  ✓ All documentation files updated"
}

# Function to update comments in source code (optional)
update_source_comments() {
    echo -e "${BLUE}💻 Updating source code comments...${NC}"
    
    # Find and update comments in TypeScript files
    find sources/ -name "*.ts" -o -name "*.tsx" | while read -r file; do
        if grep -q "Happy" "$file" 2>/dev/null; then
            sed -i.bak 's/Happy app/D3AI app/g' "$file" 2>/dev/null
            sed -i.bak 's/Happy App/D3AI App/g' "$file" 2>/dev/null
            sed -i.bak 's/Happy mobile/D3AI mobile/g' "$file" 2>/dev/null
            rm "${file}.bak" 2>/dev/null
        fi
    done
    
    echo -e "  ✓ Source code comments updated"
}

# Function to show what needs to be done manually
show_manual_steps() {
    echo ""
    echo -e "${BOLD}📋 Manual Steps Required:${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${YELLOW}1. Update App Icons & Logos:${NC}"
    echo "   • Replace logo files with D3AI branding"
    echo "   • Run: ./replace-logos-enhanced.sh"
    echo "   • Or replace files in sources/assets/images/"
    echo ""
    echo -e "${YELLOW}2. Google Play Console (if publishing):${NC}"
    echo "   • Create new app listing for D3AI"
    echo "   • Update store description and screenshots"
    echo "   • Change package name in Play Console"
    echo ""
    echo -e "${YELLOW}3. Development Environment:${NC}"
    echo "   • Clear cache: yarn start -c"
    echo "   • Rebuild: yarn prebuild --clear"
    echo "   • Test: yarn ios / yarn android"
    echo ""
    echo -e "${YELLOW}4. Git Repository (optional):${NC}"
    echo "   • Consider renaming repository"
    echo "   • Update repository description"
    echo "   • Update any GitHub links in documentation"
}

# Main execution
main() {
    print_banner
    
    echo -e "${BOLD}This script will rebrand the app from 'Happy' to 'D3AI'${NC}"
    echo ""
    echo "Changes will be made to:"
    echo "• App configuration (app.config.js)"
    echo "• Package configuration (package.json)" 
    echo "• All translation files"
    echo "• Documentation files"
    echo "• Source code comments"
    echo ""
    
    read -p "Continue with rebranding? (y/n): " confirm
    if [[ $confirm != "y" && $confirm != "Y" ]]; then
        echo -e "${YELLOW}Rebranding cancelled${NC}"
        exit 0
    fi
    
    echo ""
    
    # Create backup
    read -p "Create backup before making changes? (recommended) [Y/n]: " backup_choice
    backup_choice=${backup_choice:-Y}
    if [[ $backup_choice == "y" || $backup_choice == "Y" ]]; then
        create_backup
    fi
    
    # Execute updates
    echo -e "${BOLD}🔄 Starting rebranding process...${NC}"
    echo ""
    
    update_app_config
    echo ""
    
    update_package_json  
    echo ""
    
    update_translations
    echo ""
    
    update_documentation
    echo ""
    
    update_source_comments
    echo ""
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Automatic rebranding complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    show_manual_steps
    
    echo ""
    echo -e "${MAGENTA}🎉 Welcome to D3AI! 🎉${NC}"
    echo ""
    echo -e "${CYAN}Next: Replace logos and test the app${NC}"
}

# Run the script
main