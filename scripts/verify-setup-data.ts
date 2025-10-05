import { db } from '../src/lib/db';
import { config } from '../src/lib/config';

async function verifySetupData() {
  console.log('🔍 Verifying Setup Data...\n');

  try {
    // Check setup completion status
    console.log('1️⃣ Setup Status:');
    const isComplete = await config.isSetupComplete();
    console.log(`   Setup Complete: ${isComplete ? '✅ Yes' : '❌ No'}\n`);

    // Check admin users
    console.log('2️⃣ Admin Users:');
    const admins = await db.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (admins.length === 0) {
      console.log('   ❌ No admin users found\n');
    } else {
      console.log(`   ✅ Found ${admins.length} admin user(s):`);
      admins.forEach((admin) => {
        console.log(`      - Name: ${admin.name}`);
        console.log(`        Email: ${admin.email}`);
        console.log(`        Role: ${admin.role}`);
        console.log(`        Created: ${admin.createdAt.toISOString()}`);
        console.log('');
      });
    }

    // Check site settings
    console.log('3️⃣ Site Settings:');
    const siteName = await config.get('site_name');
    const siteDescription = await config.get('site_description');
    const currency = await config.get('currency');
    const timezone = await config.get('timezone');

    console.log(`   Site Name: ${siteName || '❌ Not set'}`);
    console.log(`   Description: ${siteDescription || '❌ Not set'}`);
    console.log(`   Currency: ${currency || '❌ Not set'}`);
    console.log(`   Timezone: ${timezone || '❌ Not set'}\n`);

    // Check all configurations
    console.log('4️⃣ All Configurations:');
    const allConfigs = await db.configuration.findMany({
      orderBy: { key: 'asc' },
    });

    if (allConfigs.length === 0) {
      console.log('   ❌ No configurations found\n');
    } else {
      console.log(`   ✅ Found ${allConfigs.length} configuration(s):`);
      allConfigs.forEach((cfg) => {
        console.log(`      - ${cfg.key}: ${cfg.value}`);
      });
      console.log('');
    }

    // Check audit logs
    console.log('5️⃣ Recent Audit Logs:');
    const logs = await db.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    if (logs.length === 0) {
      console.log('   ❌ No audit logs found\n');
    } else {
      console.log(`   ✅ Found ${logs.length} recent log(s):`);
      logs.forEach((log) => {
        console.log(`      - Action: ${log.action}`);
        console.log(`        User ID: ${log.userId || 'N/A'}`);
        console.log(`        Time: ${log.createdAt.toISOString()}`);
        if (log.metadata) {
          try {
            const meta = JSON.parse(log.metadata);
            console.log(`        Details: ${JSON.stringify(meta, null, 2)}`);
          } catch {
            console.log(`        Metadata: ${log.metadata}`);
          }
        }
        console.log('');
      });
    }

    console.log('✅ Verification Complete!\n');

    // Summary
    console.log('📊 Summary:');
    console.log(`   Setup Complete: ${isComplete ? '✅' : '❌'}`);
    console.log(`   Admin Users: ${admins.length > 0 ? '✅' : '❌'} (${admins.length})`);
    console.log(`   Site Name: ${siteName ? '✅' : '❌'}`);
    console.log(`   Currency: ${currency ? '✅' : '❌'}`);
    console.log(`   Configurations: ${allConfigs.length}`);
    console.log(`   Audit Logs: ${logs.length}\n`);

  } catch (error) {
    console.error('❌ Error during verification:', error);
  } finally {
    await db.$disconnect();
    process.exit(0);
  }
}

// Run verification
verifySetupData();