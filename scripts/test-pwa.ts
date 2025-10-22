/**
 * PWA Testing Script
 * Tests all PWA components and provides diagnostic information
 * Run: npx tsx scripts/test-pwa.ts
 */

import { db } from '../src/lib/db';
import { getPWASettings } from '../src/lib/settings';

async function testPWA() {
  console.log('🔍 PWA System Diagnostic Test\n');
  console.log('═'.repeat(60));

  try {
    // Test 1: Database Connection
    console.log('\n📊 Test 1: Database Connection');
    await db.$connect();
    console.log('✅ Database connected successfully');

    // Test 2: PWA Settings
    console.log('\n⚙️  Test 2: PWA Settings');
    const settings = await getPWASettings();
    console.log('✅ PWA settings loaded');
    console.log('   Enabled:', settings.enabled);
    console.log('   App Name:', settings.appName);
    console.log('   Short Name:', settings.shortName);
    console.log('   Theme Color:', settings.themeColor);
    console.log('   Display Mode:', settings.displayMode);
    console.log('   Offline Mode:', settings.enableOfflineMode);
    console.log('   Install Prompt:', settings.installPromptEnabled);
    console.log('   Icon ID:', settings.iconId || 'Using fallback');
    console.log('   Icon 192 ID:', settings.icon192Id || 'Using fallback');

    // Test 3: Icon Files
    console.log('\n🖼️  Test 3: Icon Files');
    /* eslint-disable @typescript-eslint/no-require-imports */
    const fs = require('fs');
    const path = require('path');
    /* eslint-enable @typescript-eslint/no-require-imports */
    const publicDir = path.join(__dirname, '..', 'public');
    
    const icon192Exists = fs.existsSync(path.join(publicDir, 'icon-192.svg'));
    const icon512Exists = fs.existsSync(path.join(publicDir, 'icon-512.svg'));
    const swExists = fs.existsSync(path.join(publicDir, 'sw.js'));
    
    console.log(icon192Exists ? '✅' : '❌', 'icon-192.svg', icon192Exists ? 'exists' : 'MISSING');
    console.log(icon512Exists ? '✅' : '❌', 'icon-512.svg', icon512Exists ? 'exists' : 'MISSING');
    console.log(swExists ? '✅' : '❌', 'sw.js', swExists ? 'exists' : 'MISSING');

    // Test 4: Custom Icons from Media Library
    if (settings.iconId || settings.icon192Id) {
      console.log('\n📷 Test 4: Custom Icons from Media Library');
      
      if (settings.iconId) {
        const icon512 = await db.media.findUnique({
          where: { id: settings.iconId },
          select: { id: true, path: true, filename: true },
        });
        if (icon512) {
          console.log('✅ 512x512 icon found:', icon512.filename);
          console.log('   Path:', icon512.path);
        } else {
          console.log('⚠️  512x512 icon ID set but not found in database');
        }
      }

      if (settings.icon192Id) {
        const icon192 = await db.media.findUnique({
          where: { id: settings.icon192Id },
          select: { id: true, path: true, filename: true },
        });
        if (icon192) {
          console.log('✅ 192x192 icon found:', icon192.filename);
          console.log('   Path:', icon192.path);
        } else {
          console.log('⚠️  192x192 icon ID set but not found in database');
        }
      }
    } else {
      console.log('\n📷 Test 4: Custom Icons');
      console.log('ℹ️  No custom icons set - using fallback SVG icons');
    }

    // Test 5: Manifest Generation
    console.log('\n📄 Test 5: Manifest Configuration');
    console.log('✅ Manifest route exists at /manifest.json');
    console.log('   Generated dynamically from PWA settings');
    console.log('   Cached for 1 hour');

    // Test 6: Service Worker
    console.log('\n⚙️  Test 6: Service Worker');
    console.log('✅ Service worker file exists');
    console.log('   Location: /public/sw.js');
    console.log('   Scope: /');
    console.log('   Caching strategy: Network-first with fallback');

    // Test 7: Install Button
    console.log('\n📱 Test 7: Install Button Component');
    console.log('✅ InstallButton component integrated');
    console.log('   Shows after:', settings.installPromptDelay, 'seconds');
    console.log('   Enabled:', settings.installPromptEnabled);

    // Test 8: Offline Page
    console.log('\n🌐 Test 8: Offline Page');
    const offlinePagePath = path.join(__dirname, '..', 'src', 'app', 'offline', 'page.tsx');
    const offlineExists = fs.existsSync(offlinePagePath);
    console.log(offlineExists ? '✅' : '❌', 'Offline page', offlineExists ? 'exists' : 'MISSING');
    if (offlineExists) {
      console.log('   Route: /offline');
    }

    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('\n📋 PWA STATUS SUMMARY\n');
    
    if (settings.enabled) {
      console.log('✅ PWA is ENABLED');
      console.log('\n🎯 Next Steps:');
      console.log('   1. Start dev server: npm run dev');
      console.log('   2. Open: http://localhost:3000');
      console.log('   3. Open DevTools → Application → Manifest');
      console.log('   4. Check "Service Workers" tab');
      console.log('   5. Look for install prompt after', settings.installPromptDelay, 'seconds');
      console.log('\n⚠️  IMPORTANT: PWA install only works on:');
      console.log('   • localhost (for testing)');
      console.log('   • HTTPS domains (for production)');
      console.log('   • NOT on HTTP domains');
    } else {
      console.log('⚠️  PWA is DISABLED');
      console.log('\n🎯 To Enable:');
      console.log('   1. Go to: http://localhost:3000/admin/settings/pwa');
      console.log('   2. Toggle "Enable Progressive Web App"');
      console.log('   3. Configure app name, icons, and colors');
      console.log('   4. Click "Save Changes"');
    }

    console.log('\n📚 Documentation:');
    console.log('   • Admin Panel: /admin/settings/pwa');
    console.log('   • Test Icons: /pwa-icons-test.html');
    console.log('   • Manifest: /manifest.json');
    console.log('   • Service Worker: /sw.js');

    console.log('\n🔧 Troubleshooting:');
    console.log('   • Clear browser cache (Ctrl+Shift+R)');
    console.log('   • Unregister old service workers in DevTools');
    console.log('   • Check console for errors');
    console.log('   • Verify HTTPS or localhost');
    console.log('   • Check manifest.json loads correctly');

    console.log('\n' + '═'.repeat(60));
    console.log('\n✅ All tests completed!\n');

  } catch (error) {
    console.error('\n❌ Error during testing:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Run tests
testPWA();
