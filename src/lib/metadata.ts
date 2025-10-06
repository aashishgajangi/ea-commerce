import { Metadata } from "next";
import { getAllSettings } from "./settings";
import { db } from "./db";

export async function generateSiteMetadata(): Promise<Metadata> {
  try {
    const settings = await getAllSettings();
    const general = settings.general;
    const appearance = settings.appearance;

    // Fetch favicon media if exists
    let faviconUrl = "/favicon.ico"; // default
    if (appearance.faviconId) {
      try {
        const media = await db.media.findUnique({
          where: { id: appearance.faviconId },
        });
        if (media) {
          faviconUrl = media.path;
        }
      } catch {
        // Use default if fetch fails
      }
    }

    return {
      title: general.siteName || "E-Commerce Store",
      description: general.description || "Welcome to our online store",
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      },
    };
  } catch {
    // Return defaults if settings fetch fails
    return {
      title: "E-Commerce Store",
      description: "Welcome to our online store",
    };
  }
}