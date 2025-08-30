const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const logoPath = path.join(__dirname, '../assets/images/icon.png');
const outputDir = path.join(__dirname, '../assets/images');

// Splash screen configurations
const configs = [
    {
        name: 'splash-android-light.png',
        backgroundColor: '#F5F5F5',
        logoSize: 288, // Logo size on splash (25% of 1152)
        canvasSize: 1152, // Common Android splash screen size
    },
    {
        name: 'splash-android-dark.png', 
        backgroundColor: '#1e1e1e',
        logoSize: 288,
        canvasSize: 1152,
    }
];

async function generateSplashScreen(config) {
    const { name, backgroundColor, logoSize, canvasSize } = config;
    
    console.log(`🎨 Generating ${name}...`);
    
    try {
        // Create canvas
        const canvas = createCanvas(canvasSize, canvasSize);
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        // Load and draw logo
        const image = await loadImage(logoPath);
        const x = (canvasSize - logoSize) / 2;
        const y = (canvasSize - logoSize) / 2;
        
        ctx.drawImage(image, x, y, logoSize, logoSize);
        
        // Save to file
        const buffer = canvas.toBuffer('image/png');
        const outputPath = path.join(outputDir, name);
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`✅ Generated ${name}`);
    } catch (error) {
        console.error(`❌ Failed to generate ${name}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Generating Android splash screens...');
    
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
        console.error(`❌ Logo file not found: ${logoPath}`);
        process.exit(1);
    }
    
    // Generate all splash screens
    for (const config of configs) {
        await generateSplashScreen(config);
    }
    
    console.log('✨ Splash screen generation complete!');
}

// Run the script
main().catch(console.error);