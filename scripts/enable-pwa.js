/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function enablePWA() {
  // Create complete PWA settings object
  const pwaSettings = {
    enabled: true,
    appName: "Nisara Store",
    shortName: "Store",
    description: "Shop our amazing products on the go",
    themeColor: "#10b981",
    backgroundColor: "#ffffff",
    displayMode: "standalone",
    orientation: "any",
    iconId: null,
    icon192Id: null,
    enableOfflineMode: true,
    enablePushNotifications: false,
    installPromptEnabled: true,
    installPromptDelay: 5,
  };

  // Store as single JSON object
  await db.siteSettings.upsert({
    where: { key: 'pwa' },
    update: { 
      value: JSON.stringify(pwaSettings), 
      type: 'pwa' 
    },
    create: {
      key: 'pwa',
      value: JSON.stringify(pwaSettings),
      type: 'pwa'
    },
  });
  
  console.log('PWA settings enabled successfully!');
  console.log('Settings:', pwaSettings);
  await db.$disconnect();
}

enablePWA().catch(console.error);
