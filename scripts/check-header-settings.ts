import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkHeaderSettings() {
  try {
    console.log('Checking header settings in database...\n');
    
    const headerSetting = await prisma.siteSettings.findUnique({
      where: { key: 'header' }
    });

    if (headerSetting) {
      console.log('✅ Header settings found in database!');
      console.log('\nKey:', headerSetting.key);
      console.log('Type:', headerSetting.type);
      console.log('\nValue (parsed):');
      const parsed = JSON.parse(headerSetting.value);
      console.log(JSON.stringify(parsed, null, 2));
      
      // Check for announcement bar settings
      if (parsed.showAnnouncementBar !== undefined) {
        console.log('\n✅ Announcement bar settings are present!');
        console.log('- Show Announcement Bar:', parsed.showAnnouncementBar);
        console.log('- Announcement Text:', parsed.announcementText);
        console.log('- Background Color:', parsed.announcementBgColor);
        console.log('- Text Color:', parsed.announcementTextColor);
      } else {
        console.log('\n⚠️  Announcement bar settings are NOT saved yet.');
        console.log('Please save the settings from /admin/theme/header');
      }
    } else {
      console.log('❌ No header settings found in database!');
      console.log('Please configure header settings at /admin/theme/header');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkHeaderSettings();
