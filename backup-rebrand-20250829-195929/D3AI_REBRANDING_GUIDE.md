# D3AI Rebranding Guide

## 🎯 Quick Start - Rebrand to D3AI

Transform your Happy app into D3AI with these simple steps:

### Step 1: Run the Rebranding Script
```bash
./rebrand-to-d3ai.sh
```

**What this script does:**
- ✅ Changes app name: "Happy" → "D3AI"  
- ✅ Updates bundle ID: `com.*.happy` → `com.d3ai.app`
- ✅ Updates all translations (English, Spanish, Vietnamese, Russian, Polish)
- ✅ Updates documentation files
- ✅ Creates automatic backup
- ✅ Updates package.json and app.config.js

### Step 2: Replace Logos (Choose One)

#### Option A: Interactive Mode (Recommended)
```bash
./replace-logos-enhanced.sh
```
Follow the wizard to upload your D3AI logo files.

#### Option B: Quick Command
```bash
./replace-logos-enhanced.sh /path/to/d3ai-icon.png /path/to/d3ai-logotype.png
```

### Step 3: Rebuild and Test
```bash
# Clear cache
yarn start -c

# Rebuild native projects
yarn prebuild --clear

# Test on devices
yarn ios
yarn android
```

## 📋 Files That Get Updated

### Configuration Files
- `app.config.js` - App name, bundle ID, slug
- `package.json` - Package name

### Translation Files
- `sources/text/_default.ts` - English
- `sources/text/translations/es.ts` - Spanish
- `sources/text/translations/vi.ts` - Vietnamese  
- `sources/text/translations/ru.ts` - Russian
- `sources/text/translations/pl.ts` - Polish

### Documentation
- `README.md`
- `CUSTOMIZATION_GUIDE.md`
- All other `.md` files

### Source Code
- Comments in TypeScript files

## 🎨 D3AI Branding Changes

### App Names
| Location | Before | After |
|----------|--------|-------|
| Production | "Happy" | "D3AI" |
| Development | "Happy (dev)" | "D3AI (dev)" |
| Preview | "Happy (preview)" | "D3AI (preview)" |

### Bundle Identifiers
| Environment | Before | After |
|-------------|--------|-------|
| Development | `com.slopus.happy.dev` | `com.d3ai.app.dev` |
| Preview | `com.slopus.happy.preview` | `com.d3ai.app.preview` |
| Production | `com.ex3ndr.happy` | `com.d3ai.app` |

### Descriptions
| Language | Before | After |
|----------|--------|-------|
| English | "Happy Coder is a Claude Code mobile client" | "D3AI is an advanced AI Assistant Platform" |
| Spanish | "Happy Coder es un cliente móvil..." | "D3AI es una Plataforma de Asistente IA..." |
| Vietnamese | "Happy Coder là ứng dụng..." | "D3AI là Nền tảng Trợ lý AI..." |

## 🏪 Play Store Deployment

### New App Requirements
Since you're changing the package name, you'll need to:

1. **Create New Play Store Listing**
   - New app in Google Play Console
   - Package name: `com.d3ai.app`
   - App name: "D3AI"

2. **New App Assets**
   - D3AI icon and screenshots
   - Updated app description
   - New feature graphic with D3AI branding

3. **App Store Optimization**
   - Keywords: "D3AI", "AI Assistant", "Mobile AI"
   - Categories: Productivity or Tools
   - Updated privacy policy URL

### Migration Strategy
- Launch D3AI as a new app
- Keep Happy app for existing users (optional)
- Or deprecate Happy and migrate users

## 🔧 Development Changes

### New Development URLs
```javascript
// In app.config.js, you might want to update:
scheme: "d3ai",  // Deep linking
slug: "d3ai",    // Expo slug
```

### Environment Variables
```bash
# If you have any env vars with "HAPPY", update them:
EXPO_PUBLIC_D3AI_API_URL=...
EXPO_PUBLIC_D3AI_DEBUG=...
```

### Git Repository
Consider renaming:
- Repository name: `happy` → `d3ai-mobile`
- Repository description
- GitHub/GitLab URLs in documentation

## 🎯 Logo Requirements for D3AI

### Essential Logo Files
Create these files with your D3AI branding:

```
sources/assets/images/
├── icon.png (1024x1024) - D3AI app icon
├── logo-black.png (200x200) - D3AI logo mark (dark)
├── logo-white.png (200x200) - D3AI logo mark (light)
├── logotype-dark.png (300x90) - "D3AI" text logo (dark)
├── logotype-light.png (300x90) - "D3AI" text logo (light)
└── favicon.png (32x32) - Web favicon
```

### D3AI Logo Specifications
- **Icon:** Square, recognizable at small sizes
- **Colors:** Professional tech colors (blues, grays, accent)
- **Style:** Modern, clean, AI-focused
- **Typography:** Sans-serif, readable, tech-forward

## ✅ Testing Checklist

After rebranding, verify:

### App Identity
- [ ] App name shows "D3AI" everywhere
- [ ] App icon displays correctly
- [ ] Splash screen shows D3AI branding
- [ ] Settings screen shows D3AI info

### Functionality
- [ ] All features work the same
- [ ] Translations are correct in all languages
- [ ] Navigation and UI unchanged
- [ ] Push notifications work

### Technical
- [ ] App installs with new bundle ID
- [ ] Deep links work with new scheme
- [ ] No crashes or errors
- [ ] Performance unchanged

## 🚀 Quick Commands

```bash
# Complete rebranding in one flow:
./rebrand-to-d3ai.sh
./replace-logos-enhanced.sh d3ai-icon.png d3ai-logotype.png
yarn prebuild --clear
yarn start -c

# Test immediately:
yarn ios  # or yarn android

# Check the result:
grep -r "Happy" sources/text/  # Should find minimal results
grep "D3AI" app.config.js      # Should show new name
```

## 🆘 Rollback (If Needed)

If something goes wrong:

```bash
# The script creates backups like: backup-rebrand-20241215-143022/
# To restore:
cp backup-rebrand-*/app.config.js ./
cp backup-rebrand-*/package.json ./
cp -r backup-rebrand-*/text/* sources/text/
cp backup-rebrand-*/README.md ./

# Rebuild
yarn prebuild --clear
yarn start -c
```

## 🎉 Welcome to D3AI!

Once complete, you'll have:
- ✅ Professional D3AI branding throughout the app
- ✅ New bundle ID for clean Play Store listing
- ✅ All translations updated
- ✅ Same powerful functionality with new identity

Your AI Assistant Platform is ready to launch! 🚀

---

*Need help? Check the backup files created during rebranding or refer to the original CUSTOMIZATION_GUIDE.md*