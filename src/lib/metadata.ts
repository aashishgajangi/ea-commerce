import { Metadata } from "next";
import { getAllSettings } from "./settings";

export async function generateSiteMetadata(): Promise<Metadata> {
  try {
    const settings = await getAllSettings();
    const general = settings.general;

    return {
      title: general.siteName || "E-Commerce Store",
      description: general.description || "Welcome to our online store",
      // Icons are handled by /app/icon.tsx for dynamic favicon support
    };
  } catch {
    // Return defaults if settings fetch fails
    return {
      title: "E-Commerce Store",
      description: "Welcome to our online store",
    };
  }
}