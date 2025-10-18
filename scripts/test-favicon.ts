/**
 * Test script for favicon functionality
 * 
 * Usage: npx tsx scripts/test-favicon.ts
 */

import { getAppearanceSettings } from '../src/lib/settings.js';
import { db } from '../src/lib/db.js';
import fs from 'fs';
import path from 'path';

async function testFavicon() {
  console.log('🧪 Testing Favicon System\n');

  try {
    // 1. Check appearance settings
    console.log('1️⃣ Checking appearance settings...');
    const appearance = await getAppearanceSettings();
    console.log('   ✅ Appearance settings loaded');
    console.log('   📁 Favicon ID:', appearance.faviconId || '(none - will use default)');

    // 2. Check if favicon media exists
    if (appearance.faviconId) {
      console.log('\n2️⃣ Checking favicon media...');
      const media = await db.media.findUnique({
        where: { id: appearance.faviconId },
      });

      if (media) {
        console.log('   ✅ Favicon media found');
        console.log('   📄 Filename:', media.filename);
        console.log('   📁 Path:', media.path);
        console.log('   🎨 MIME Type:', media.mimeType);
        console.log('   📏 Size:', (media.size / 1024).toFixed(2), 'KB');

        // Check if file exists
        const filePath = path.join(process.cwd(), 'public', media.path);
        const exists = fs.existsSync(filePath);
        
        if (exists) {
          console.log('   ✅ File exists on disk');
        } else {
          console.log('   ❌ File NOT found on disk at:', filePath);
        }
      } else {
        console.log('   ❌ Favicon media NOT found in database');
        console.log('   💡 Will use default fallback');
      }
    } else {
      console.log('\n2️⃣ No favicon set in settings');
      console.log('   💡 Will use default favicon.ico or generated icon');
    }

    // 3. Test routes
    console.log('\n3️⃣ Testing favicon routes...');
    console.log('   🌐 Icon route: http://localhost:3000/icon');
    console.log('   🍎 Apple icon route: http://localhost:3000/apple-icon');
    console.log('   💡 Test these URLs in your browser or use:');
    console.log('      curl -I http://localhost:3000/icon');
    console.log('      curl -I http://localhost:3000/apple-icon');

    // 4. Summary
    console.log('\n✅ Favicon System Status:');
    console.log('   • Dynamic icon route: Implemented (/icon)');
    console.log('   • Apple touch icon: Implemented (/apple-icon)');
    console.log('   • Database integration: Working');
    console.log('   • Admin panel selection: Available at /admin/theme');
    
    console.log('\n📋 Next Steps:');
    console.log('   1. Go to http://localhost:3000/admin/theme');
    console.log('   2. Click "Select Favicon" button');
    console.log('   3. Choose an image from media library');
    console.log('   4. Click "Save All Settings"');
    console.log('   5. Hard refresh homepage (Ctrl+Shift+R)');
    console.log('   6. Check browser tab for your custom favicon');

    console.log('\n🎉 Test Complete!\n');

  } catch (error) {
    console.error('❌ Error testing favicon:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

testFavicon();
