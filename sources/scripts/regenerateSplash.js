const { generateAllBrandingAssets, generateSplashScreen } = require('./completeRebrand.js');
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

const { createCanvas } = canvas;

// Configuration matching the main rebranding script
const BRAND_CONFIG = {
    colors: {
        primary: '#2563EB',
        secondary: '#1E40AF', 
        background: '#FFFFFF',
        dark: '#1F2937',
        text: '#111827',
        textLight: '#FFFFFF'
    }
};

const OUTPUT_DIR = 'sources/assets/images';

// Generate text-based logo
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
    
    // Create gradient background for icon (unless transparent)
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
    
    // Draw "D3" text
    drawTextLogo(ctx, 'D3', width / 2, height / 2, effectiveWidth * 0.8, fontSize, '800');
    
    return logoCanvas;
}

// Create simplified splash screen with just "D3AI"
async function generateSimpleSplashScreen(width, height, darkTheme = false) {
    const splashCanvas = createCanvas(width, height);
    const ctx = splashCanvas.getContext('2d');
    
    // Background
    const bgColor = darkTheme ? BRAND_CONFIG.colors.dark : BRAND_CONFIG.colors.background;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Center logo with "D3" text
    const logoSize = Math.min(width, height) * 0.25;
    const logoCanvas = await generateAppIcon(logoSize, logoSize, { 
        transparent: true,
        textColor: darkTheme ? BRAND_CONFIG.colors.textLight : BRAND_CONFIG.colors.primary
    });
    
    ctx.drawImage(logoCanvas, (width - logoSize) / 2, (height - logoSize) / 2 - logoSize * 0.1);
    
    // Just "D3AI" text below logo - simplified and clean
    const textY = (height + logoSize) / 2 + logoSize * 0.4;
    const fontSize = Math.min(width, height) * 0.08;
    ctx.fillStyle = darkTheme ? BRAND_CONFIG.colors.textLight : BRAND_CONFIG.colors.text;
    drawTextLogo(ctx, 'D3AI', width / 2, textY, width * 0.8, fontSize, '700');
    
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

// Main function to regenerate splash screens
async function regenerateSplashScreens() {
    console.log('🌟 Regenerating Splash Screens with "D3AI" text');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // Android splash screens with simplified text
        const splashLight = await generateSimpleSplashScreen(1080, 1920, false);
        await saveCanvas(splashLight, path.join(OUTPUT_DIR, 'splash-android-light.png'));
        console.log('✅ Android splash screen - light theme (D3AI)');
        
        const splashDark = await generateSimpleSplashScreen(1080, 1920, true);
        await saveCanvas(splashDark, path.join(OUTPUT_DIR, 'splash-android-dark.png'));
        console.log('✅ Android splash screen - dark theme (D3AI)');
        
        console.log('\n🎉 Splash screens updated successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✨ Splash screens now show: D3 logo + "D3AI" text');
        
        console.log('\n📋 Next: Test the splash screens');
        console.log('   npx expo start --clear');
        
    } catch (error) {
        console.error('\n💥 Failed to regenerate splash screens:', error.message);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    regenerateSplashScreens()
        .then(() => {
            console.log('\n✅ Splash screen regeneration complete!');
        })
        .catch((error) => {
            console.error('\n❌ Splash screen regeneration failed:', error.message);
            process.exit(1);
        });
}

module.exports = { regenerateSplashScreens, generateSimpleSplashScreen };