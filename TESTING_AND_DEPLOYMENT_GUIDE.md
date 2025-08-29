# Complete Testing & Google Play Store Deployment Guide

## Part 1: Testing Your Changes Locally

### Prerequisites Setup

#### 1. Install Development Tools
```bash
# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
npm install -g yarn

# Install EAS CLI (Expo Application Services)
npm install -g eas-cli

# Install Android Studio (for Android development)
# Download from: https://developer.android.com/studio
```

#### 2. Setup Android Development Environment
1. Install Android Studio
2. Open Android Studio → SDK Manager
3. Install:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

4. Set environment variables in `~/.bashrc` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

### Testing Your Changes

#### 1. Install Dependencies
```bash
cd /home/hannguyen/happy
yarn install
```

#### 2. Start Development Server
```bash
# Start Expo development server
yarn start

# This will show a QR code and options:
# › Press a │ open Android
# › Press w │ open web
# › Press j │ open debugger
# › Press r │ reload app
# › Press m │ toggle menu
```

#### 3. Test on Android Emulator
```bash
# Create and start Android emulator
# In Android Studio: Tools → AVD Manager → Create Virtual Device

# Or run directly
yarn android
```

#### 4. Test on Physical Android Device
```bash
# Enable Developer Mode on your phone:
# Settings → About Phone → Tap "Build Number" 7 times

# Enable USB Debugging:
# Settings → Developer Options → USB Debugging → ON

# Connect phone via USB and run:
adb devices  # Should show your device

# Run the app
yarn android
```

#### 5. Test Specific Features
```bash
# Test your new stats feature:
# 1. Open the app
# 2. Go to Settings → Features
# 3. Enable "Home Screen Statistics"
# 4. Return to home screen - stats should appear
# 5. Tap on stats to open full dashboard

# Test Spanish translation:
# 1. Go to Settings → Appearance → Language
# 2. Select "Español"
# 3. Verify all text is translated
```

## Part 2: Creating Your Own App Identity

### 1. Choose Your App Configuration

Edit `app.config.js`:
```javascript
const variant = process.env.APP_ENV || 'production';
const name = {
    development: "YourAppName (dev)",
    preview: "YourAppName (preview)",
    production: "YourAppName"  // Your app name
}[variant];
const bundleId = {
    development: "com.yourcompany.yourapp.dev",
    preview: "com.yourcompany.yourapp.preview",
    production: "com.yourcompany.yourapp"  // Your unique bundle ID
}[variant];

export default {
    expo: {
        name,
        slug: "your-app-slug",  // URL-safe name
        version: "1.0.0",  // Your initial version
        // ... rest of config
    }
};
```

### 2. Create App Assets

```bash
# Create your app icons (required sizes):
# - 512x512px icon.png (main icon)
# - 1024x1024px for Play Store
# - Adaptive icon for Android (foreground + background)

# Place in:
sources/assets/images/icon.png  # Main app icon
sources/assets/images/icon-adaptive.png  # Android adaptive foreground
sources/assets/images/icon-monochrome.png  # Monochrome version
```

### 3. Update App Metadata

Create/update `app.json` if needed:
```json
{
  "expo": {
    "name": "Your App Name",
    "description": "Your app description",
    "slug": "your-app-slug",
    "owner": "your-expo-account"
  }
}
```

## Part 3: Google Play Store Deployment

### Step 1: Create Google Play Developer Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Pay one-time $25 registration fee
3. Complete identity verification (can take 48 hours)

### Step 2: Prepare App for Production

#### Generate Native Android Project
```bash
# Clean previous builds
rm -rf android ios

# Generate native projects
yarn prebuild

# This creates android/ folder with native code
```

#### Configure Android App
Edit `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.yourcompany.yourapp"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Step 3: Create Signing Keys

#### Generate Upload Key
```bash
# Create keystore for app signing
cd android/app
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore upload-keystore.jks \
  -alias upload \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Remember your passwords!
# Store them securely - you'll need them for every update
```

#### Configure Signing
Create `android/keystore.properties`:
```properties
storeFile=upload-keystore.jks
storePassword=YOUR_STORE_PASSWORD
keyAlias=upload
keyPassword=YOUR_KEY_PASSWORD
```

Update `android/app/build.gradle`:
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        release {
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 4: Build Production APK/AAB

#### Build Android App Bundle (Recommended)
```bash
cd android

# Clean previous builds
./gradlew clean

# Build release AAB (Android App Bundle)
./gradlew bundleRelease

# Output will be at:
# android/app/build/outputs/bundle/release/app-release.aab
```

#### Or Build APK (Alternative)
```bash
cd android

# Build release APK
./gradlew assembleRelease

# Output will be at:
# android/app/build/outputs/apk/release/app-release.apk
```

### Step 5: Create App on Play Console

1. **Go to Play Console** → "Create app"

2. **Fill App Details**:
   - App name: Your App Name
   - Default language: English
   - App or game: App
   - Free or paid: Free
   - Accept declarations

3. **Complete All Sections**:

#### App Setup Checklist:
- [x] App access (Is login required?)
- [x] Ads (Does app contain ads?)
- [x] Content rating (Complete questionnaire)
- [x] Target audience (Select age groups)
- [x] News apps (Not applicable usually)
- [x] COVID-19 apps (Not applicable usually)
- [x] Data safety (Privacy policy required)
- [x] Government apps (Not applicable usually)

### Step 6: Prepare Store Listing

#### Required Assets:
```bash
# Screenshots (minimum 2, recommended 8)
- Phone: 1080x1920px or 1080x2400px
- Tablet: 1920x1080px (optional but recommended)

# Feature Graphic
- 1024x500px banner

# Icon
- 512x512px PNG (32-bit, no alpha)

# Create marketing folder
mkdir -p marketing/screenshots/phone
mkdir -p marketing/screenshots/tablet
mkdir marketing/graphics
```

#### Store Listing Information:
```
Short Description (80 chars max):
"Control AI Assistant remotely with end-to-end encryption"

Full Description (4000 chars max):
"Your comprehensive description here...
- Feature 1
- Feature 2
- Feature 3
..."
```

### Step 7: Upload and Release

#### 1. Create Release Track
- Go to "Release" → "Production"
- Click "Create new release"

#### 2. Upload App Bundle
- Upload your `.aab` file
- Play Console will generate APKs for different devices

#### 3. Complete Release Details
- Release name: "Version 1.0.0"
- Release notes: "Initial release"

#### 4. Review and Rollout
- Review warnings/errors
- Set rollout percentage (100% for full release)
- Click "Review release" → "Start rollout"

### Step 8: Post-Release Tasks

#### Monitor Performance
```bash
# Check crash reports
Play Console → Quality → Android vitals → Crashes

# Monitor reviews
Play Console → User feedback → Reviews

# Track installs
Play Console → Statistics → Installations
```

## Part 4: Using EAS Build (Recommended Alternative)

### Easier Method with Expo EAS:

#### 1. Setup EAS
```bash
# Login to Expo account
eas login

# Configure EAS for your project
eas build:configure

# This creates eas.json
```

#### 2. Configure EAS Build
Edit `eas.json`:
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

#### 3. Build with EAS
```bash
# Build for production
eas build --platform android --profile production

# This handles:
# - Native build in cloud
# - Signing automatically
# - Generates AAB file
# - Download link provided
```

#### 4. Submit with EAS
```bash
# Automatic submission to Play Store
eas submit --platform android

# Or manually upload the AAB from EAS dashboard
```

## Part 5: Testing Checklist

### Before Release:
- [ ] Test all new features work correctly
- [ ] Test on multiple Android versions (7.0+)
- [ ] Test on different screen sizes
- [ ] Test in different languages
- [ ] Test offline functionality
- [ ] Check for crashes in development
- [ ] Verify app permissions are minimal
- [ ] Test app upgrade from previous version
- [ ] Review all user-facing text
- [ ] Ensure no debug code remains

### Performance Testing:
```bash
# Check app size
ls -lah android/app/build/outputs/bundle/release/

# Target: Keep under 100MB for better conversion

# Test startup time
adb shell am start -W com.yourcompany.yourapp/.MainActivity

# Target: Under 5 seconds cold start
```

## Part 6: Troubleshooting

### Common Issues:

#### Build Fails
```bash
# Clear cache
cd android
./gradlew clean
cd ..
yarn cache clean
rm -rf node_modules
yarn install
```

#### Keystore Issues
```bash
# Verify keystore
keytool -list -v -keystore android/app/upload-keystore.jks
```

#### Upload Issues
- Ensure version code is incremented
- Check bundle ID matches Play Console
- Verify signing configuration

### Debug Production Build
```bash
# Test production build locally
cd android
./gradlew installRelease
adb logcat | grep -i yourapp
```

## Part 7: Maintenance

### Regular Updates:
1. Increment version in `app.config.js`
2. Update changelog
3. Build new release
4. Upload to Play Store
5. Monitor crash reports

### Version Management:
```javascript
// app.config.js
version: "1.0.1",  // User-visible version
android: {
    versionCode: 2  // Must increment with each upload
}
```

## Success Metrics

Monitor these KPIs:
- Install conversion rate (target: >30%)
- Day 1 retention (target: >25%)
- Crash rate (target: <1%)
- ANR rate (target: <0.5%)
- App rating (target: >4.0)

## Resources

- [Android Developer Docs](https://developer.android.com)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Docs](https://docs.expo.dev/build/introduction)

## Next Steps

1. Complete local testing
2. Set up Play Console account
3. Prepare marketing assets
4. Build production release
5. Submit for review
6. Monitor and iterate based on feedback

Remember: First submission review can take 2-7 days. Plan accordingly!