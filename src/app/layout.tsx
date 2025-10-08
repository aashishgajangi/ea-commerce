import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSiteMetadata } from "@/lib/metadata";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  // Get favicon from settings
  let faviconPath = "/favicon.ico";
  try {
    const { getAllSettings } = await import("@/lib/settings");
    const { db } = await import("@/lib/db");
    const settings = await getAllSettings();
    
    if (settings.appearance.faviconId) {
      const media = await db.media.findUnique({
        where: { id: settings.appearance.faviconId },
      });
      if (media) {
        faviconPath = media.path;
      }
    }
  } catch (error) {
    console.error("Failed to load favicon:", error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href={faviconPath} />
        <link rel="shortcut icon" type="image/x-icon" href={faviconPath} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
