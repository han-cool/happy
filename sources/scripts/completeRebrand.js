const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

const { createCanvas, loadImage, registerFont } = canvas;

// Configuration
const BRAND_CONFIG = {
    appName: 'D3 AI',
    iconText: 'D3',
    slogan: 'Your Productive',
    colors: {
        primary: '#2563EB',      // Blue
        secondary: '#1E40AF',    // Dark blue
        background: '#FFFFFF',   // White
        dark: '#1F2937',         // Dark gray
        text: '#111827',         // Very dark gray
        textLight: '#FFFFFF'     // White text
    },
    fonts: {
        main: 'Arial, sans-serif',
        weight: {
            normal: 400,
            medium: 500,
            bold: 700,
            extraBold: 800
        }
    }
};

const OUTPUT_DIR = 'sources/assets/images';

// Create backup directory
async function createBackup() {
    const backupDir = path.join(OUTPUT_DIR, `backup-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}`);
    console.log(`📦 Creating backup: ${backupDir}`);
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    
    let backupCount = 0;
    try {
        const files = fs.readdirSync(OUTPUT_DIR);
        for (const file of files) {
            if (file.endsWith('.png') && !file.startsWith('backup-')) {
                try {
                    fs.copyFileSync(
                        path.join(OUTPUT_DIR, file), 
                        path.join(backupDir, file)
                    );
                    backupCount++;
                } catch (error) {
                    // File might not exist, continue
                }
            }
        }
    } catch (error) {
        console.log('⚠️ No existing files to backup');
    }
    
    console.log(`✅ Backed up ${backupCount} files to ${backupDir}`);
    return backupDir;
}

// Generate text-based logo using canvas
function drawTextLogo(ctx, text, x, y, maxWidth, fontSize, weight = 'bold') {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${weight} ${fontSize}px Arial, sans-serif`;
    ctx.fillText(text, x, y, maxWidth);
}

// Create app icon with "D3" text
async function generateAppIcon(width, height, options = {}) {
    const logoCanvas = createCanvas(width, height);
    const ctx = logoCanvas.getContext('2d');
    
    // Clear background
    ctx.clearRect(0, 0, width, height);
    
    // Background options
    if (options.backgroundColor) {
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, width, height);
    }
    
    // Apply padding for adaptive icons
    const padding = options.padding || 0;
    const effectiveWidth = width * (1 - padding);
    const effectiveHeight = height * (1 - padding);
    const offsetX = (width - effectiveWidth) / 2;
    const offsetY = (height - effectiveHeight) / 2;
    
    // Create gradient background for icon
    if (!options.monochrome && !options.transparent) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, BRAND_CONFIG.colors.primary);
        gradient.addColorStop(1, BRAND_CONFIG.colors.secondary);
        
        // Create rounded rectangle background
        const radius = width * 0.15;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(offsetX + effectiveWidth * 0.1, offsetY + effectiveHeight * 0.1, 
                     effectiveWidth * 0.8, effectiveHeight * 0.8, radius);
        ctx.fill();
    }
    
    // Set text properties
    const fontSize = Math.min(effectiveWidth, effectiveHeight) * 0.4;
    ctx.fillStyle = options.textColor || BRAND_CONFIG.colors.textLight;
    
    if (options.monochrome) {
        ctx.fillStyle = '#000000';
    }
    
    if (options.invert) {
        ctx.filter = 'invert(1)';
    }
    
    // Draw "D3" text
    drawTextLogo(ctx, BRAND_CONFIG.iconText, width / 2, height / 2, effectiveWidth * 0.8, fontSize, '800');
    
    return logoCanvas;
}

// Create logotype with "D3 AI" and slogan
async function generateLogotype(width, height, options = {}) {
    const logoCanvas = createCanvas(width, height);
    const ctx = logoCanvas.getContext('2d');
    
    // Clear background
    ctx.clearRect(0, 0, width, height);
    
    // Background
    if (options.backgroundColor) {
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, width, height);
    }
    
    // Text color
    const textColor = options.textColor || (options.darkTheme ? BRAND_CONFIG.colors.textLight : BRAND_CONFIG.colors.text);
    
    if (options.invert) {
        ctx.filter = 'invert(1)';
    }
    
    // Main logo text "D3 AI"
    const logoFontSize = height * 0.45;
    ctx.fillStyle = textColor;
    drawTextLogo(ctx, BRAND_CONFIG.appName, width / 2, height * 0.35, width * 0.9, logoFontSize, '800');
    
    // Slogan "Your Productive"
    const sloganFontSize = height * 0.2;
    ctx.fillStyle = options.darkTheme ? BRAND_CONFIG.colors.textLight + '99' : BRAND_CONFIG.colors.text + '99';
    drawTextLogo(ctx, BRAND_CONFIG.slogan, width / 2, height * 0.75, width * 0.9, sloganFontSize, '400');
    
    return logoCanvas;
}

// Create splash screen
async function generateSplashScreen(width, height, darkTheme = false) {
    const splashCanvas = createCanvas(width, height);
    const ctx = splashCanvas.getContext('2d');
    
    // Background
    const bgColor = darkTheme ? BRAND_CONFIG.colors.dark : BRAND_CONFIG.colors.background;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Center logo
    const logoSize = Math.min(width, height) * 0.3;
    const logoCanvas = await generateAppIcon(logoSize, logoSize, { 
        transparent: true,
        textColor: darkTheme ? BRAND_CONFIG.colors.textLight : BRAND_CONFIG.colors.primary
    });
    
    ctx.drawImage(logoCanvas, (width - logoSize) / 2, (height - logoSize) / 2 - logoSize * 0.1);
    
    // App name below logo
    const textY = (height + logoSize) / 2 + logoSize * 0.3;
    const fontSize = Math.min(width, height) * 0.05;
    ctx.fillStyle = darkTheme ? BRAND_CONFIG.colors.textLight : BRAND_CONFIG.colors.text;
    drawTextLogo(ctx, BRAND_CONFIG.appName, width / 2, textY, width * 0.8, fontSize, '600');
    
    // Slogan
    const sloganY = textY + fontSize * 1.2;
    const sloganSize = fontSize * 0.7;
    ctx.fillStyle = darkTheme ? BRAND_CONFIG.colors.textLight + '99' : BRAND_CONFIG.colors.text + '99';
    drawTextLogo(ctx, BRAND_CONFIG.slogan, width / 2, sloganY, width * 0.8, sloganSize, '400');
    
    return splashCanvas;
}

// Save canvas as PNG
async function saveCanvas(canvas, filePath) {
    const buffer = canvas.toBuffer('image/png');
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, buffer);
}

// Generate all branding assets
async function generateAllBrandingAssets() {
    console.log('🎨 D3 AI Complete Rebranding Tool');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📋 Brand Configuration:`);
    console.log(`   App Name: ${BRAND_CONFIG.appName}`);
    console.log(`   Icon Text: ${BRAND_CONFIG.iconText}`);
    console.log(`   Slogan: ${BRAND_CONFIG.slogan}`);
    console.log(`   Primary Color: ${BRAND_CONFIG.colors.primary}`);
    console.log(`   Output Directory: ${OUTPUT_DIR}`);
    
    // Create backup
    await createBackup();
    
    const results = [];
    let successCount = 0;
    
    try {
        console.log('\n📱 Generating App Icons');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Main app icon (1024x1024)
        const mainIcon = await generateAppIcon(1024, 1024);
        await saveCanvas(mainIcon, path.join(OUTPUT_DIR, 'icon.png'));
        console.log('✅ Main app icon (1024x1024)');
        successCount++;
        
        // Android adaptive icon (with padding)
        const adaptiveIcon = await generateAppIcon(1024, 1024, { padding: 0.15, transparent: true });
        await saveCanvas(adaptiveIcon, path.join(OUTPUT_DIR, 'icon-adaptive.png'));
        console.log('✅ Android adaptive icon');
        successCount++;
        
        // Monochrome icon for Android themed mode
        const monoIcon = await generateAppIcon(1024, 1024, { 
            monochrome: true, 
            backgroundColor: 'transparent',
            textColor: '#000000'
        });
        await saveCanvas(monoIcon, path.join(OUTPUT_DIR, 'icon-monochrome.png'));
        console.log('✅ Android monochrome icon');
        successCount++;
        
        // Notification icon (96x96)
        const notificationIcon = await generateAppIcon(96, 96, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.primary 
        });
        await saveCanvas(notificationIcon, path.join(OUTPUT_DIR, 'icon-notification.png'));
        console.log('✅ Notification icon (96x96)');
        successCount++;
        
        // Favicon (32x32)
        const favicon = await generateAppIcon(32, 32);
        await saveCanvas(favicon, path.join(OUTPUT_DIR, 'favicon.png'));
        console.log('✅ Web favicon (32x32)');
        successCount++;
        
        // Active favicon (32x32)
        const activeFavicon = await generateAppIcon(32, 32, { 
            backgroundColor: BRAND_CONFIG.colors.secondary 
        });
        await saveCanvas(activeFavicon, path.join(OUTPUT_DIR, 'favicon-active.png'));
        console.log('✅ Web favicon active state');
        successCount++;
        
        console.log('\n🎨 Generating Logo Marks');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Square logo - black version (200x200)
        const logoBlack = await generateAppIcon(200, 200, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.text
        });
        await saveCanvas(logoBlack, path.join(OUTPUT_DIR, 'logo-black.png'));
        console.log('✅ Square logo - black version');
        successCount++;
        
        // Square logo - white version (200x200)
        const logoWhite = await generateAppIcon(200, 200, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.textLight
        });
        await saveCanvas(logoWhite, path.join(OUTPUT_DIR, 'logo-white.png'));
        console.log('✅ Square logo - white version');
        successCount++;
        
        console.log('\n📝 Generating Logotypes');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Light theme logotypes (dark text)
        const logotypeDark1x = await generateLogotype(300, 90);
        await saveCanvas(logotypeDark1x, path.join(OUTPUT_DIR, 'logotype-dark.png'));
        console.log('✅ Logotype @1x - light theme');
        successCount++;
        
        const logotypeDark2x = await generateLogotype(600, 180);
        await saveCanvas(logotypeDark2x, path.join(OUTPUT_DIR, 'logotype-dark@2x.png'));
        console.log('✅ Logotype @2x - light theme');
        successCount++;
        
        const logotypeDark3x = await generateLogotype(900, 270);
        await saveCanvas(logotypeDark3x, path.join(OUTPUT_DIR, 'logotype-dark@3x.png'));
        console.log('✅ Logotype @3x - light theme');
        successCount++;
        
        // Dark theme logotypes (light text)
        const logotypeLight1x = await generateLogotype(300, 90, { darkTheme: true });
        await saveCanvas(logotypeLight1x, path.join(OUTPUT_DIR, 'logotype-light.png'));
        console.log('✅ Logotype @1x - dark theme');
        successCount++;
        
        const logotypeLight2x = await generateLogotype(600, 180, { darkTheme: true });
        await saveCanvas(logotypeLight2x, path.join(OUTPUT_DIR, 'logotype-light@2x.png'));
        console.log('✅ Logotype @2x - dark theme');
        successCount++;
        
        const logotypeLight3x = await generateLogotype(900, 270, { darkTheme: true });
        await saveCanvas(logotypeLight3x, path.join(OUTPUT_DIR, 'logotype-light@3x.png'));
        console.log('✅ Logotype @3x - dark theme');
        successCount++;
        
        // Legacy compatibility files
        fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark.png'), path.join(OUTPUT_DIR, 'logotype.png'));
        fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark@2x.png'), path.join(OUTPUT_DIR, 'logotype@2x.png'));
        fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark@3x.png'), path.join(OUTPUT_DIR, 'logotype@3x.png'));
        console.log('✅ Legacy logotype files created');
        successCount += 3;
        
        console.log('\n🌟 Generating Splash Screens');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Android splash screens
        const splashLight = await generateSplashScreen(1080, 1920, false);
        await saveCanvas(splashLight, path.join(OUTPUT_DIR, 'splash-android-light.png'));
        console.log('✅ Android splash screen - light theme');
        successCount++;
        
        const splashDark = await generateSplashScreen(1080, 1920, true);
        await saveCanvas(splashDark, path.join(OUTPUT_DIR, 'splash-android-dark.png'));
        console.log('✅ Android splash screen - dark theme');
        successCount++;
        
        console.log('\n🎤 Generating Voice Icons');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Voice icons (keeping existing voice-related icons but with D3 branding)
        const voiceIcon = await generateAppIcon(100, 100, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.primary
        });
        await saveCanvas(voiceIcon, path.join(OUTPUT_DIR, 'icon-voice.png'));
        
        const voiceIcon2x = await generateAppIcon(200, 200, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.primary
        });
        await saveCanvas(voiceIcon2x, path.join(OUTPUT_DIR, 'icon-voice@2x.png'));
        
        const voiceIcon3x = await generateAppIcon(300, 300, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.primary
        });
        await saveCanvas(voiceIcon3x, path.join(OUTPUT_DIR, 'icon-voice@3x.png'));
        
        const voiceIconWhite = await generateAppIcon(100, 100, { 
            transparent: true,
            textColor: BRAND_CONFIG.colors.textLight
        });
        await saveCanvas(voiceIconWhite, path.join(OUTPUT_DIR, 'icon-voice-white.png'));
        
        console.log('✅ Voice icons generated');
        successCount += 4;
        
        console.log('\n🔧 Generating Additional Assets');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Tauri desktop icon (if needed)
        const tauriIcon = await generateAppIcon(512, 512);
        await saveCanvas(tauriIcon, path.join(OUTPUT_DIR, 'icon-tauri.png'));
        console.log('✅ Tauri desktop icon');
        successCount++;
        
        console.log('\n🎉 Complete Rebranding Finished!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Generated ${successCount} branding assets successfully`);
        
        console.log('\n📋 What was replaced:');
        console.log('   📱 App icons (all sizes and variants)');
        console.log('   🎨 Logo marks (light/dark themes)');
        console.log('   📝 Logotypes (all resolutions)');
        console.log('   🌟 Splash screens (light/dark)');
        console.log('   🌐 Web favicons');
        console.log('   🎤 Voice feature icons');
        console.log('   🖥️ Desktop app icon');
        
        console.log('\n📋 Next Steps:');
        console.log('1. 🧹 Clear cache: npx expo start --clear');
        console.log('2. 🏗️ Rebuild: npx expo prebuild --clear');
        console.log('3. 📱 Test on devices');
        
        console.log('\n✨ Your app is now fully rebranded with D3 AI!');
        
    } catch (error) {
        console.error('\n💥 Rebranding failed:', error.message);
        throw error;
    }
}

// CLI usage
if (require.main === module) {
    generateAllBrandingAssets()
        .then(() => {
            console.log('\n🏆 Rebranding complete! Welcome to D3 AI.');
        })
        .catch((error) => {
            console.error('\n💥 Failed to complete rebranding:', error.message);
            process.exit(1);
        });
}

module.exports = { generateAllBrandingAssets, generateAppIcon, generateLogotype, generateSplashScreen };