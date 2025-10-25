import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSiteMetadata } from "@/lib/metadata";
import AuthSessionProvider from '@/components/providers/SessionProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/cart/CartContext';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import InstallButton from '@/components/pwa/InstallButton';
import PWARegister from '@/components/pwa/PWARegister';
import { getThemeSettings, getAppearanceSettings, getPWASettings, getGeneralSettings } from "@/lib/settings";

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
  const [themeSettings, appearanceSettings, pwaSettings, generalSettings] = await Promise.all([
    getThemeSettings(),
    getAppearanceSettings(),
    getPWASettings(),
    getGeneralSettings(),
  ]);
  
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
        suppressHydrationWarning
        style={{
          // Apply theme CSS variables directly to body
          ['--theme-primary' as string]: mergedTheme.primaryColor || '#0070f3',
          ['--theme-secondary' as string]: mergedTheme.secondaryColor || '#6c757d',
          ['--theme-accent' as string]: mergedTheme.accentColor || '#ff6b35',
          ['--theme-background' as string]: mergedTheme.backgroundColor || '#ffffff',
          ['--theme-text' as string]: mergedTheme.textColor || '#1a1a1a',
          ['--theme-header-background' as string]: mergedTheme.headerBackgroundColor || '#ffffff',
          ['--theme-header-text' as string]: mergedTheme.headerTextColor || '#1a1a1a',
          ['--theme-footer-background' as string]: mergedTheme.footerBackgroundColor || '#1a1a1a',
          ['--theme-footer-text' as string]: mergedTheme.footerTextColor || '#ffffff',
          ['--theme-radius' as string]: 
            mergedTheme.borderRadius === 'none' ? '0px' :
            mergedTheme.borderRadius === 'sm' ? '0.125rem' :
            mergedTheme.borderRadius === 'lg' ? '0.5rem' :
            mergedTheme.borderRadius === 'xl' ? '0.75rem' :
            '0.375rem',
          ['--theme-font' as string]: mergedTheme.fontFamily || 'Inter, sans-serif',
        } as React.CSSProperties}
      >
        <ThemeProvider initialTheme={mergedTheme}>
          <CurrencyProvider currency={generalSettings.currency}>
            <AuthSessionProvider>
              <CartProvider>
                {children}
                <WhatsAppWidget />
                <InstallButton />
                <PWARegister />
              </CartProvider>
            </AuthSessionProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
