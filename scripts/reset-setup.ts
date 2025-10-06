import { db } from '../src/lib/db';
import { config } from '../src/lib/config';
import { promises as fs } from 'fs';
import path from 'path';

async function resetSetup() {
  console.log('🔄 Resetting Setup...\n');

  try {
    // Option 1: Reset setup flag and admin (keeps settings and logs)
    console.log('Choose reset option:');
    console.log('1. Soft Reset - Reset setup flag and admin (keeps settings and logs)');
    console.log('2. Full Reset - Delete all data and start fresh\n');

    const resetType = process.argv[2] || '1';

    if (resetType === '2') {
      console.log('⚠️  Full Reset - Deleting all data...\n');

      // Delete all audit logs
      const deletedLogs = await db.auditLog.deleteMany({});
      console.log(`   ✅ Deleted ${deletedLogs.count} audit logs`);

      // Delete all users
      const deletedUsers = await db.user.deleteMany({});
      console.log(`   ✅ Deleted ${deletedUsers.count} users`);

      // Delete all configurations
      const deletedConfigs = await db.configuration.deleteMany({});
      console.log(`   ✅ Deleted ${deletedConfigs.count} configurations`);

      // Delete all media files and records (Phase 4)
      const deletedMedia = await db.media.deleteMany({});
      console.log(`   ✅ Deleted ${deletedMedia.count} media records`);

      // Delete all site settings (Phase 4)
      const deletedSiteSettings = await db.siteSettings.deleteMany({});
      console.log(`   ✅ Deleted ${deletedSiteSettings.count} site settings`);

      // Delete all pages (Phase 4)
      const deletedPages = await db.page.deleteMany({});
      console.log(`   ✅ Deleted ${deletedPages.count} pages`);

      // Delete all menus and menu items (Phase 4)
      const deletedMenuItems = await db.menuItem.deleteMany({});
      console.log(`   ✅ Deleted ${deletedMenuItems.count} menu items`);
      const deletedMenus = await db.menu.deleteMany({});
      console.log(`   ✅ Deleted ${deletedMenus.count} menus`);

      // Clean up uploaded files from filesystem
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.rm(uploadsDir, { recursive: true, force: true });
        console.log('   ✅ Deleted uploaded files from filesystem');
      } catch (error) {
        console.log('   ℹ️  No uploaded files to clean up');
      }

      console.log('\n✅ Full reset complete! You can now run setup again.\n');
    } else {
      console.log('🔄 Soft Reset - Resetting setup flag and admin...\n');

      // Delete all users (so you can create new admin)
      const deletedUsers = await db.user.deleteMany({});
      console.log(`   ✅ Deleted ${deletedUsers.count} user(s)`);

      // Check if setup_complete flag exists
      const setupFlag = await db.configuration.findUnique({
        where: { key: 'setup_complete' },
      });

      if (setupFlag) {
        // Delete the setup_complete flag
        await db.configuration.delete({
          where: { key: 'setup_complete' },
        });
        console.log('   ✅ Setup flag removed');
      } else {
        console.log('   ℹ️  Setup flag was not set');
      }

      console.log('   ℹ️  Settings, audit logs, and media files are preserved\n');
      console.log('✅ Soft reset complete! You can now run setup again.\n');
    }

    console.log('📝 Next steps:');
    console.log('   1. Restart your dev server: npm run dev');
    console.log('   2. Visit: http://localhost:3000/setup\n');

  } catch (error) {
    console.error('❌ Error during reset:', error);
  } finally {
    await db.$disconnect();
    process.exit(0);
  }
}

// Run reset
console.log('='.repeat(50));
console.log('   E-Commerce Platform - Setup Reset Tool');
console.log('='.repeat(50));
console.log('');

resetSetup();