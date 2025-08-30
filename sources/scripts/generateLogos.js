const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

const { createCanvas, loadImage } = canvas;

// Output directory
const OUTPUT_DIR = 'sources/assets/images';

async function generateLogoVariant(sourcePath, outputPath, width, height, options = {}) {
    try {
        const image = await loadImage(sourcePath);
        
        // Create canvas with specified dimensions
        const logoCanvas = createCanvas(width, height);
        const ctx = logoCanvas.getContext('2d');
        
        // Set transparent background
        ctx.clearRect(0, 0, width, height);
        
        // Apply options
        if (options.backgroundColor) {
            ctx.fillStyle = options.backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }
        
        // Set high quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        if (options.invert) {
            // For inverted logos, we'll create a simple inversion
            ctx.filter = 'invert(1)';
        }
        
        if (options.grayscale) {
            ctx.filter = 'grayscale(1)';
        }
        
        if (options.padding) {
            // Add padding for adaptive icons
            const paddedWidth = width * (1 - options.padding);
            const paddedHeight = height * (1 - options.padding);
            const offsetX = (width - paddedWidth) / 2;
            const offsetY = (height - paddedHeight) / 2;
            
            ctx.drawImage(image, offsetX, offsetY, paddedWidth, paddedHeight);
        } else {
            // Draw image to fill canvas
            ctx.drawImage(image, 0, 0, width, height);
        }
        
        // Save the result
        const buffer = logoCanvas.toBuffer('image/png');
        
        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, buffer);
        return true;
    } catch (error) {
        console.error(`❌ Failed to generate ${outputPath}:`, error.message);
        return false;
    }
}

async function backupLogos() {
    const backupDir = path.join(OUTPUT_DIR, `backup-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}`);
    console.log(`📦 Creating backup: ${backupDir}`);
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    
    let backupCount = 0;
    const logoFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
    
    for (const file of logoFiles) {
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
    
    console.log(`✅ Backed up ${backupCount} files to ${backupDir}`);
    return backupDir;
}

async function generateAllLogos(masterIcon, masterLogotype = null) {
    console.log('\n📱 Generating App Icons');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const results = [];
    
    // Main app icon
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'icon.png'), 1024, 1024)) {
        console.log('✅ Main app icon (1024x1024)');
        results.push('icon.png');
    }
    
    // Android adaptive icon (with safe zone padding)
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'icon-adaptive.png'), 1024, 1024, { padding: 0.15 })) {
        console.log('✅ Android adaptive icon with safe zone');
        results.push('icon-adaptive.png');
    }
    
    // Monochrome version
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'icon-monochrome.png'), 1024, 1024, { grayscale: true })) {
        console.log('✅ Monochrome icon for themed mode');
        results.push('icon-monochrome.png');
    }
    
    // Notification icon
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'icon-notification.png'), 96, 96)) {
        console.log('✅ Notification icon (96x96)');
        results.push('icon-notification.png');
    }
    
    // Favicons
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'favicon.png'), 32, 32)) {
        console.log('✅ Web favicon (32x32)');
        results.push('favicon.png');
    }
    
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'favicon-active.png'), 32, 32)) {
        console.log('✅ Web favicon active state');
        results.push('favicon-active.png');
    }
    
    console.log('\n🎨 Generating Logo Marks');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Square logos
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'logo-black.png'), 200, 200)) {
        console.log('✅ Square logo - black version');
        results.push('logo-black.png');
    }
    
    if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'logo-white.png'), 200, 200, { invert: true })) {
        console.log('✅ Square logo - white version');
        results.push('logo-white.png');
    }
    
    // Generate logotypes if provided
    if (masterLogotype && fs.existsSync(masterLogotype)) {
        console.log('\n📝 Generating Logotypes');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Light theme variants (dark text)
        const logotypeVariants = [
            { name: 'logotype-dark.png', size: [300, 90], desc: 'Logotype @1x - light theme' },
            { name: 'logotype-dark@2x.png', size: [600, 180], desc: 'Logotype @2x - light theme' },
            { name: 'logotype-dark@3x.png', size: [900, 270], desc: 'Logotype @3x - light theme' },
        ];
        
        for (const variant of logotypeVariants) {
            if (await generateLogoVariant(masterLogotype, path.join(OUTPUT_DIR, variant.name), ...variant.size)) {
                console.log(`✅ ${variant.desc}`);
                results.push(variant.name);
            }
        }
        
        // Dark theme variants (light text) - inverted
        const logotypeVariantsLight = [
            { name: 'logotype-light.png', size: [300, 90], desc: 'Logotype @1x - dark theme' },
            { name: 'logotype-light@2x.png', size: [600, 180], desc: 'Logotype @2x - dark theme' },
            { name: 'logotype-light@3x.png', size: [900, 270], desc: 'Logotype @3x - dark theme' },
        ];
        
        for (const variant of logotypeVariantsLight) {
            if (await generateLogoVariant(masterLogotype, path.join(OUTPUT_DIR, variant.name), ...variant.size, { invert: true })) {
                console.log(`✅ ${variant.desc}`);
                results.push(variant.name);
            }
        }
        
        // Legacy files for compatibility
        try {
            fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark.png'), path.join(OUTPUT_DIR, 'logotype.png'));
            fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark@2x.png'), path.join(OUTPUT_DIR, 'logotype@2x.png'));
            fs.copyFileSync(path.join(OUTPUT_DIR, 'logotype-dark@3x.png'), path.join(OUTPUT_DIR, 'logotype@3x.png'));
            console.log('✅ Legacy logotype files created');
            results.push('logotype.png', 'logotype@2x.png', 'logotype@3x.png');
        } catch (error) {
            console.log('⚠️ Could not create legacy files');
        }
    } else {
        console.log('\n📝 Creating Fallback Logotypes from Icon');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Create simple logotypes from icon with transparent background
        if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'logotype-dark.png'), 300, 90)) {
            console.log('✅ Fallback logotype @1x - light theme');
            results.push('logotype-dark.png');
        }
        
        if (await generateLogoVariant(masterIcon, path.join(OUTPUT_DIR, 'logotype-light.png'), 300, 90, { invert: true })) {
            console.log('✅ Fallback logotype @1x - dark theme');
            results.push('logotype-light.png');
        }
    }
    
    return results;
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log('🎨 Logo Generator - Node.js Version');
        console.log('Usage: node generateLogos.js <icon-file> [logotype-file]');
        console.log('');
        console.log('  icon-file:     Square logo file (1024x1024 recommended)');
        console.log('  logotype-file: Horizontal logo with text (optional)');
        console.log('');
        console.log('Examples:');
        console.log('  node generateLogos.js d3ai-logo-new-logo-1024.png');
        console.log('  node generateLogos.js icon.png logotype.png');
        process.exit(1);
    }
    
    const masterIcon = args[0];
    const masterLogotype = args[1] || null;
    
    if (!fs.existsSync(masterIcon)) {
        console.error(`❌ Icon file not found: ${masterIcon}`);
        process.exit(1);
    }
    
    if (masterLogotype && !fs.existsSync(masterLogotype)) {
        console.error(`❌ Logotype file not found: ${masterLogotype}`);
        process.exit(1);
    }
    
    async function main() {
        try {
            console.log('🎨 D3 AI Logo Generator');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📁 Input icon: ${masterIcon}`);
            if (masterLogotype) {
                console.log(`📁 Input logotype: ${masterLogotype}`);
            }
            console.log(`📁 Output directory: ${OUTPUT_DIR}`);
            
            // Create backup
            await backupLogos();
            
            // Generate all logos
            const results = await generateAllLogos(masterIcon, masterLogotype);
            
            console.log('\n🎉 Logo generation complete!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`✅ Generated ${results.length} logo variants`);
            
            console.log('\n📋 Next Steps:');
            console.log('1. 🧹 Clear cache: npx expo start --clear');
            console.log('2. 🏗️ Rebuild app: npx expo prebuild --clear');
            console.log('3. 📱 Test on device');
            
            console.log('\n✨ Your app has been successfully rebranded!');
            
        } catch (error) {
            console.error('\n💥 Logo generation failed:', error.message);
            process.exit(1);
        }
    }
    
    main();
}

module.exports = { generateAllLogos, generateLogoVariant, backupLogos };