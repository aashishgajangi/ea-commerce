/**
 * Generate PWA Icon Files
 * Creates fallback 192x192 and 512x512 PNG icons for PWA
 * Run: node scripts/generate-pwa-icons.js
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Create SVG icons that can be converted to PNG
function createSVGIcon(size, text) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size/8}"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-family="Arial, sans-serif" font-size="${size/3}" fill="white" font-weight="bold">
    ${text}
  </text>
</svg>`;
}

// Save SVG files
const publicDir = path.join(__dirname, '..', 'public');

// Create 192x192 icon
const icon192 = createSVGIcon(192, 'S');
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), icon192);
console.log('✅ Created icon-192.svg');

// Create 512x512 icon
const icon512 = createSVGIcon(512, 'S');
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), icon512);
console.log('✅ Created icon-512.svg');

// Create a simple HTML file to test icons
const testHTML = `<!DOCTYPE html>
<html>
<head>
  <title>PWA Icon Test</title>
</head>
<body style="font-family: Arial; padding: 20px;">
  <h1>PWA Icons Generated</h1>
  <div style="display: flex; gap: 20px; margin-top: 20px;">
    <div>
      <h3>192x192</h3>
      <img src="/icon-192.svg" width="192" height="192" style="border: 1px solid #ccc;" />
    </div>
    <div>
      <h3>512x512</h3>
      <img src="/icon-512.svg" width="192" height="192" style="border: 1px solid #ccc;" />
    </div>
  </div>
  <p style="margin-top: 20px; color: #666;">
    These are fallback icons. Upload custom icons in /admin/settings/pwa for better branding.
  </p>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'pwa-icons-test.html'), testHTML);
console.log('✅ Created pwa-icons-test.html');

console.log('\n🎉 PWA icons generated successfully!');
console.log('📁 Files created in /public:');
console.log('   - icon-192.svg');
console.log('   - icon-512.svg');
console.log('   - pwa-icons-test.html');
console.log('\n🔗 Test at: http://localhost:3000/pwa-icons-test.html');
console.log('\n⚠️  Note: These are fallback icons. Upload custom icons in /admin/settings/pwa');
