import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSiteMetadata } from "@/lib/metadata";
import AuthSessionProvider from '@/components/providers/SessionProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/cart/CartContext';
import WhatsAppWidget from '@/components/WhatsAppWidget';
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
  const { getAppearanceSettings } = await import("@/lib/settings");
  const appearanceSettings = await getAppearanceSettings();
  
  // Merge appearance colors into theme settings
  const mergedTheme = {
    ...themeSettings,
    primaryColor: appearanceSettings.primaryColor,
    secondaryColor: appearanceSettings.secondaryColor,
  };

  // Favicon is handled by /app/icon.tsx for dynamic support
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider initialTheme={mergedTheme}>
          <AuthSessionProvider>
            <CartProvider>
              {children}
              <WhatsAppWidget />
            </CartProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
