const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const logoPath = './sources/assets/images/icon.png'; // Your 1024x1024 logo
const outputDir = './sources/assets/images/';

// Splash screen configurations
const configs = [
    {
        name: 'splash-android-light.png',
        backgroundColor: '#F5F5F5',
        logoSize: 288, // Logo size on splash (28% of 1024)
        canvasSize: 1152, // Common Android splash screen size
    },
    {
        name: 'splash-android-dark.png', 
        backgroundColor: '#1e1e1e',
        logoSize: 288,
        canvasSize: 1152,
    }
];

// Check if ImageMagick is available
function checkImageMagick() {
    try {
        execSync('magick -version', { stdio: 'pipe' });
        return 'magick';
    } catch {
        try {
            execSync('convert -version', { stdio: 'pipe' });
            return 'convert';
        } catch {
            console.error('❌ ImageMagick not found. Please install ImageMagick:');
            console.error('Windows: choco install imagemagick');
            console.error('macOS: brew install imagemagick');
            console.error('Linux: apt-get install imagemagick');
            process.exit(1);
        }
    }
}

function generateSplashScreen(config) {
    const { name, backgroundColor, logoSize, canvasSize } = config;
    const outputPath = path.join(outputDir, name);
    
    console.log(`🎨 Generating ${name}...`);
    
    const command = `${magickCmd} -size ${canvasSize}x${canvasSize} xc:"${backgroundColor}" ` +
        `\\( "${logoPath}" -resize ${logoSize}x${logoSize} \\) ` +
        `-gravity center -composite "${outputPath}"`;
    
    try {
        execSync(command, { stdio: 'pipe' });
        console.log(`✅ Generated ${name}`);
    } catch (error) {
        console.error(`❌ Failed to generate ${name}:`, error.message);
    }
}

// Main execution
const magickCmd = checkImageMagick();

if (!fs.existsSync(logoPath)) {
    console.error(`❌ Logo file not found: ${logoPath}`);
    process.exit(1);
}

console.log('🚀 Generating Android splash screens...');
configs.forEach(generateSplashScreen);
console.log('✨ Splash screen generation complete!');