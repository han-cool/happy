const fs = require('fs');
const path = require('path');

// Simple HTML canvas approach to generate splash screens
const generateSplashHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Splash Screen Generator</title>
</head>
<body>
    <canvas id="canvas" width="1152" height="1152"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        // Configuration
        const configs = [
            { name: 'splash-android-light.png', bg: '#F5F5F5' },
            { name: 'splash-android-dark.png', bg: '#1e1e1e' }
        ];
        
        let currentIndex = 0;
        
        function generateSplash(config) {
            // Clear canvas and set background
            ctx.fillStyle = config.bg;
            ctx.fillRect(0, 0, 1152, 1152);
            
            // Load and draw logo
            const img = new Image();
            img.onload = function() {
                const logoSize = 288;
                const x = (1152 - logoSize) / 2;
                const y = (1152 - logoSize) / 2;
                
                ctx.drawImage(img, x, y, logoSize, logoSize);
                
                // Convert to blob and download
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = config.name;
                    a.click();
                    URL.revokeObjectURL(url);
                    
                    // Generate next splash screen
                    currentIndex++;
                    if (currentIndex < configs.length) {
                        setTimeout(() => generateSplash(configs[currentIndex]), 1000);
                    }
                }, 'image/png');
            };
            img.src = '../assets/images/icon.png';
        }
        
        // Start generation
        generateSplash(configs[currentIndex]);
    </script>
</body>
</html>
`;

// Write the HTML file
const htmlPath = path.join(__dirname, 'splash-generator.html');
fs.writeFileSync(htmlPath, generateSplashHtml);

console.log('🎨 Splash screen generator HTML created!');
console.log(`📄 Open: ${htmlPath}`);
console.log('🔧 The HTML will generate and download the splash screens automatically.');
console.log('💡 Make sure your browser allows downloads from local files.');