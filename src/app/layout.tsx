import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSiteMetadata } from "@/lib/metadata";
import AuthSessionProvider from '@/components/providers/SessionProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/cart/CartContext';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import InstallButton from '@/components/pwa/InstallButton';
import PWARegister from '@/components/pwa/PWARegister';
import { getThemeSettings } from "@/lib/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically from database settings
export async function generateMetadata() {
  return await generateSiteMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get theme and appearance settings for global theme provider
  const themeSettings = await getThemeSettings();
  const { getAppearanceSettings, getPWASettings } = await import("@/lib/settings");
  const appearanceSettings = await getAppearanceSettings();
  const pwaSettings = await getPWASettings();
  
  // Merge appearance colors into theme settings
  const mergedTheme = {
    ...themeSettings,
    primaryColor: appearanceSettings.primaryColor,
    secondaryColor: appearanceSettings.secondaryColor,
  };

  // Favicon is handled by /app/icon.tsx for dynamic support
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={pwaSettings.themeColor} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={pwaSettings.appName} />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="msapplication-TileColor" content={pwaSettings.themeColor} />
        <meta name="msapplication-TileImage" content="/icon-192.svg" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider initialTheme={mergedTheme}>
          <AuthSessionProvider>
            <CartProvider>
              {children}
              <WhatsAppWidget />
              <InstallButton />
              <PWARegister />
            </CartProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
