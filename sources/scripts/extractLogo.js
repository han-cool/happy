const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

// Create canvas and image loading functions
const { createCanvas, loadImage } = canvas;

async function extractLogo(inputPath, splitRatio = 0.65) {
    try {
        console.log('🎨 Loading image:', inputPath);
        
        // Load the input image
        const image = await loadImage(inputPath);
        const width = image.width;
        const height = image.height;
        
        console.log(`📏 Image dimensions: ${width}x${height}`);
        
        // Calculate split points
        const logoHeight = Math.floor(height * splitRatio);
        const textStartY = logoHeight;
        const textHeight = height - logoHeight;
        
        console.log(`✂️ Split info:`);
        console.log(`   Logo portion: ${width}x${logoHeight} (top ${Math.round(splitRatio * 100)}%)`);
        console.log(`   Text portion: ${width}x${textHeight} (bottom ${Math.round((1 - splitRatio) * 100)}%)`);
        
        // Get base name for output files
        const baseName = path.basename(inputPath, path.extname(inputPath));
        const dirName = path.dirname(inputPath);
        
        // Extract logo part (top portion)
        console.log('\n📱 Extracting logo part...');
        const logoCanvas = createCanvas(width, logoHeight);
        const logoCtx = logoCanvas.getContext('2d');
        
        // Draw the logo portion
        logoCtx.drawImage(image, 0, 0, width, logoHeight, 0, 0, width, logoHeight);
        
        // Create square version by cropping to the smaller dimension
        const logoSize = Math.min(width, logoHeight);
        const logoSquareCanvas = createCanvas(logoSize, logoSize);
        const logoSquareCtx = logoSquareCanvas.getContext('2d');
        
        // Center the logo in the square
        const offsetX = (width - logoSize) / 2;
        const offsetY = (logoHeight - logoSize) / 2;
        logoSquareCtx.drawImage(logoCanvas, offsetX, offsetY, logoSize, logoSize, 0, 0, logoSize, logoSize);
        
        // Create final 1024x1024 version
        const finalLogoCanvas = createCanvas(1024, 1024);
        const finalLogoCtx = finalLogoCanvas.getContext('2d');
        finalLogoCtx.imageSmoothingEnabled = true;
        finalLogoCtx.imageSmoothingQuality = 'high';
        finalLogoCtx.drawImage(logoSquareCanvas, 0, 0, logoSize, logoSize, 0, 0, 1024, 1024);
        
        // Save logo files
        const logoFile = path.join(dirName, `${baseName}-logo-1024.png`);
        const logoBuffer = finalLogoCanvas.toBuffer('image/png');
        fs.writeFileSync(logoFile, logoBuffer);
        console.log(`✅ Logo saved: ${logoFile}`);
        
        // Extract text part (bottom portion) if significant
        let logotypeFile = null;
        if (textHeight > 50) {
            console.log('\n📝 Extracting logotype part...');
            const textCanvas = createCanvas(width, textHeight);
            const textCtx = textCanvas.getContext('2d');
            
            // Draw the text portion
            textCtx.drawImage(image, 0, textStartY, width, textHeight, 0, 0, width, textHeight);
            
            // Create standard logotype size (900x270 max, maintaining aspect ratio)
            const maxLogotypeWidth = 900;
            const maxLogotypeHeight = 270;
            
            let logotypeWidth, logotypeHeight;
            const aspectRatio = width / textHeight;
            
            if (aspectRatio > maxLogotypeWidth / maxLogotypeHeight) {
                // Wider - limit by width
                logotypeWidth = Math.min(maxLogotypeWidth, width);
                logotypeHeight = logotypeWidth / aspectRatio;
            } else {
                // Taller - limit by height
                logotypeHeight = Math.min(maxLogotypeHeight, textHeight);
                logotypeWidth = logotypeHeight * aspectRatio;
            }
            
            const logotypeCanvas = createCanvas(Math.floor(logotypeWidth), Math.floor(logotypeHeight));
            const logotypeCtx = logotypeCanvas.getContext('2d');
            logotypeCtx.imageSmoothingEnabled = true;
            logotypeCtx.imageSmoothingQuality = 'high';
            logotypeCtx.drawImage(textCanvas, 0, 0, width, textHeight, 0, 0, logotypeWidth, logotypeHeight);
            
            // Save logotype file
            logotypeFile = path.join(dirName, `${baseName}-logotype-standard.png`);
            const logotypeBuffer = logotypeCanvas.toBuffer('image/png');
            fs.writeFileSync(logotypeFile, logotypeBuffer);
            console.log(`✅ Logotype saved: ${logotypeFile}`);
        } else {
            console.log('\n⚠️ Text portion too small, skipping logotype extraction');
        }
        
        // Print results
        console.log('\n🎉 Extraction complete!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📁 Output files:`);
        console.log(`   🎯 Logo (1024x1024): ${logoFile}`);
        if (logotypeFile) {
            console.log(`   📝 Logotype: ${logotypeFile}`);
        }
        
        console.log(`\n🚀 Ready to use with logo replacement:`);
        if (logotypeFile) {
            console.log(`   node sources/scripts/generateLogos.js "${logoFile}" "${logotypeFile}"`);
        } else {
            console.log(`   node sources/scripts/generateLogos.js "${logoFile}"`);
        }
        
        return { logoFile, logotypeFile };
        
    } catch (error) {
        console.error('❌ Error during extraction:', error.message);
        throw error;
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log('Usage: node extractLogo.js <input-image> [split-ratio]');
        console.log('  input-image: Path to your logo+text image');
        console.log('  split-ratio: Where to split (0.0-1.0, default: 0.65)');
        console.log('');
        console.log('Example: node extractLogo.js d3ai-logo-new.png 0.65');
        process.exit(1);
    }
    
    const inputFile = args[0];
    const splitRatio = parseFloat(args[1]) || 0.65;
    
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ File not found: ${inputFile}`);
        process.exit(1);
    }
    
    if (splitRatio < 0.1 || splitRatio > 0.9) {
        console.error('❌ Split ratio must be between 0.1 and 0.9');
        process.exit(1);
    }
    
    extractLogo(inputFile, splitRatio)
        .then(() => {
            console.log('\n✨ All done! Files are ready for logo replacement.');
        })
        .catch((error) => {
            console.error('\n💥 Extraction failed:', error.message);
            process.exit(1);
        });
}

module.exports = { extractLogo };