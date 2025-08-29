# Logo & Branding Customization Guide

## 🎨 Overview

The Happy app uses different logo variants for various contexts. This guide explains how to replace all logos and icons to rebrand the app with your own identity.

## 📁 Logo Files Location

All logo and icon files are located in: `sources/assets/images/`

## 🖼️ Logo Types & Requirements

### 1. App Icon (Required)
**File:** `icon.png`
- **Size:** 1024x1024px
- **Format:** PNG with no transparency
- **Usage:** Main app icon for app stores and device home screens
- **Note:** This is automatically resized for different platforms

### 2. Adaptive Icon (Android)
**File:** `icon-adaptive.png`
- **Size:** 1024x1024px
- **Format:** PNG with transparency
- **Usage:** Android adaptive icon foreground
- **Note:** Should have padding as Android will mask it

### 3. Monochrome Icon (Android)
**File:** `icon-monochrome.png`
- **Size:** 1024x1024px
- **Format:** PNG monochrome
- **Usage:** Android themed icons
- **Note:** Single color design for themed icon support

### 4. Notification Icon
**File:** `icon-notification.png`
- **Size:** 96x96px
- **Format:** PNG with transparency
- **Usage:** Push notification icon
- **Note:** Should be simple and recognizable at small size

### 5. Logotype (App Header)
Multiple variants for different screens and themes:

#### Light Theme Logotypes
- `logotype-dark.png` - 300x90px (1x)
- `logotype-dark@2x.png` - 600x180px (2x)
- `logotype-dark@3x.png` - 900x270px (3x)

#### Dark Theme Logotypes
- `logotype-light.png` - 300x90px (1x)
- `logotype-light@2x.png` - 600x180px (2x)
- `logotype-light@3x.png` - 900x270px (3x)

**Usage:** Welcome screen, settings screen
**Note:** Should include your app name/branding

### 6. Simple Logo
- `logo-black.png` - Square logo for light backgrounds
- `logo-white.png` - Square logo for dark backgrounds
- **Size:** 200x200px
- **Usage:** Sidebar, headers

### 7. Favicon (Web)
- `favicon.png` - 32x32px
- `favicon-active.png` - 32x32px (active state)
- **Usage:** Browser tab icon

### 8. Splash Screen Images
- `splash-android-light.png` - 1080x1920px
- `splash-android-dark.png` - 1080x1920px
- **Usage:** Android splash screen
- **Location:** Configured in `app.config.js`

## 🔧 Step-by-Step Logo Replacement

### Step 1: Prepare Your Logo Files

Create your logo variants with these specifications:

```bash
# Required files structure:
sources/assets/images/
├── icon.png                    # 1024x1024 - Main app icon
├── icon-adaptive.png            # 1024x1024 - Android adaptive
├── icon-monochrome.png          # 1024x1024 - Android monochrome
├── icon-notification.png        # 96x96 - Notifications
├── logo-black.png               # 200x200 - Light theme logo
├── logo-white.png               # 200x200 - Dark theme logo
├── logotype-dark.png            # 300x90 - Light theme header
├── logotype-dark@2x.png         # 600x180
├── logotype-dark@3x.png         # 900x270
├── logotype-light.png           # 300x90 - Dark theme header
├── logotype-light@2x.png        # 600x180
├── logotype-light@3x.png        # 900x270
├── favicon.png                  # 32x32 - Web favicon
└── favicon-active.png           # 32x32 - Active favicon
```

### Step 2: Replace Icon Files

```bash
# Navigate to assets directory
cd sources/assets/images/

# Backup existing logos (optional)
mkdir backup
cp *.png backup/

# Copy your new logo files
# Replace each file with your custom version
cp ~/your-logos/icon.png ./icon.png
cp ~/your-logos/logo-black.png ./logo-black.png
# ... repeat for all files
```

### Step 3: Update App Configuration

Edit `app.config.js` to point to your icons:

```javascript
export default {
    expo: {
        name: "Your App Name",  // Change app name
        icon: "./sources/assets/images/icon.png",  // Main icon
        notification: {
            icon: "./sources/assets/images/icon-notification.png"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./sources/assets/images/icon-adaptive.png",
                monochromeImage: "./sources/assets/images/icon-monochrome.png",
                backgroundColor: "#YOUR_COLOR"  // Change background color
            }
        },
        web: {
            favicon: "./sources/assets/images/favicon.png"
        }
    }
}
```

### Step 4: Update Splash Screens

Edit `app.config.js` splash screen configuration:

```javascript
plugins: [
    [
        'expo-splash-screen',
        {
            android: {
                image: "./sources/assets/images/splash-android-light.png",
                backgroundColor: "#FFFFFF",
                dark: {
                    image: "./sources/assets/images/splash-android-dark.png",
                    backgroundColor: "#000000",
                }
            }
        }
    ]
]
```

### Step 5: Rebuild Native Projects

After replacing logos, rebuild the native projects:

```bash
# Clean previous builds
rm -rf android ios

# Regenerate native projects with new logos
yarn prebuild

# For iOS, you may need to clean Xcode cache
cd ios && pod cache clean --all && cd ..
```

### Step 6: Test Your Changes

```bash
# Test on Android
yarn android

# Test on iOS
yarn ios

# Test on Web
yarn web
```

## 🎨 Logo Design Tips

### Best Practices
1. **Simplicity:** Keep logos simple for small sizes
2. **Padding:** Leave 10-20% padding in app icons
3. **Contrast:** Ensure good contrast in both themes
4. **Scalability:** Test logos at different sizes
5. **Consistency:** Maintain consistent branding across variants

### Recommended Tools
- **Figma/Sketch:** Design your logos
- **ImageMagick:** Batch resize logos
- **Android Asset Studio:** Generate Android icons
- **iOS App Icon Generator:** Generate iOS icons

### Quick Resize Script

Create a script to generate all sizes from a master logo:

```bash
#!/bin/bash
# resize-logos.sh

# Input: 1024x1024 master icon
MASTER="master-icon.png"

# Generate sizes
convert $MASTER -resize 1024x1024 icon.png
convert $MASTER -resize 96x96 icon-notification.png
convert $MASTER -resize 32x32 favicon.png

# Generate logotypes (adjust as needed)
convert master-logotype.png -resize 300x90 logotype-dark.png
convert master-logotype.png -resize 600x180 logotype-dark@2x.png
convert master-logotype.png -resize 900x270 logotype-dark@3x.png

echo "✅ Logos generated!"
```

## 🔍 Where Logos Appear

### In Code
Logos are used in these components:

1. **Welcome Screen** (`sources/app/(app)/index.tsx`)
   ```typescript
   source={theme.dark ? require('@/assets/images/logotype-light.png') : require('@/assets/images/logotype-dark.png')}
   ```

2. **Settings Screen** (`sources/app/(app)/settings/index.tsx`)
   ```typescript
   source={theme.dark ? require('@/assets/images/logotype-light.png') : require('@/assets/images/logotype-dark.png')}
   ```

3. **Sidebar** (`sources/components/SidebarView.tsx`)
   ```typescript
   source={theme.dark ? require('@/assets/images/logo-white.png') : require('@/assets/images/logo-black.png')}
   ```

4. **Home Header** (`sources/components/HomeHeader.tsx`)
   ```typescript
   source={require('@/assets/images/logo-black.png')}
   ```

### In App
- App icon on device home screen
- Splash screen while app loads
- Navigation headers
- Settings about section
- Push notifications
- Browser tab (web version)

## 🚀 Advanced Customization

### Dynamic Logo Based on Theme

To make logos respond to theme changes:

```typescript
import { useUnistyles } from 'react-native-unistyles';
import { Image } from 'react-native';

const Logo = () => {
    const { theme } = useUnistyles();
    
    return (
        <Image
            source={theme.dark 
                ? require('@/assets/images/logo-white.png')
                : require('@/assets/images/logo-black.png')
            }
            style={{ width: 100, height: 100 }}
        />
    );
};
```

### Animated Logo

Add Lottie animation for splash screen:

```typescript
import LottieView from 'lottie-react-native';

<LottieView
    source={require('@/assets/animations/logo-animation.json')}
    autoPlay
    loop={false}
    style={{ width: 200, height: 200 }}
/>
```

## ⚠️ Important Notes

1. **Clear Cache:** After changing logos, clear build cache
   ```bash
   yarn start -c  # Clear Expo cache
   ```

2. **iOS Specific:** iOS caches icons aggressively
   - Delete app from simulator/device
   - Clean build folder
   - Reinstall app

3. **Android Specific:** Adaptive icons require proper padding
   - Use Android Asset Studio for best results
   - Test on different launchers

4. **Web Specific:** Favicon may be cached by browser
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache

## 📱 Platform-Specific Requirements

### iOS
- App Store Icon: 1024x1024px (no transparency, no rounded corners)
- Spotlight Icon: 40x40, 80x80, 120x120
- Settings Icon: 29x29, 58x58, 87x87
- App Icon: 60x60, 120x120, 180x180

### Android
- Launcher Icon: 48x48, 72x72, 96x96, 144x144, 192x192
- Adaptive Icon: 108x108 (with 72x72 safe zone)
- Notification Icon: Must be white with transparency

### Web
- Favicon: 16x16, 32x32
- Apple Touch Icon: 180x180
- PWA Icons: 192x192, 512x512

## 🎯 Checklist

Before deploying with new logos:

- [ ] All logo files replaced with correct sizes
- [ ] App icon looks good on both iOS and Android
- [ ] Logotypes work in both light and dark themes
- [ ] Notification icon is visible and clear
- [ ] Splash screens updated
- [ ] Tested on physical devices
- [ ] Cache cleared and app rebuilt
- [ ] No old logo references remain in code

## 🆘 Troubleshooting

### Logo Not Updating?
1. Clear Metro bundler cache: `yarn start -c`
2. Delete app from device/simulator
3. Rebuild: `yarn prebuild --clear`
4. Reinstall app

### Logo Looks Blurry?
- Ensure using correct resolution (@2x, @3x variants)
- Check image compression settings
- Use PNG format for best quality

### Logo Cut Off on Android?
- Add more padding to adaptive icon
- Ensure safe zone is respected (center 66% of icon)

### Different Logo Per Environment?
Configure in `app.config.js`:
```javascript
const icon = process.env.APP_ENV === 'production' 
    ? './icon-prod.png' 
    : './icon-dev.png';
```

---

Remember: Good branding is consistent across all touchpoints. Take time to ensure your logos look professional and represent your app well!