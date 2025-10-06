import { db as prisma } from "./db";

// Setting types
export type SettingType = "general" | "appearance" | "social" | "header" | "footer" | "seo";

// Setting interfaces
export interface GeneralSettings {
  siteName: string;
  tagline: string;
  description: string;
  timezone: string;
  currency: string;
  language: string;
}

export interface AppearanceSettings {
  logoId: string | null;
  faviconId: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface SocialSettings {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  github: string;
}

export interface HeaderSettings {
  showLogo: boolean;
  showTagline: boolean;
  showSearch: boolean;
  sticky: boolean;
}

export interface FooterSettings {
  text: string;
  showSocial: boolean;
  copyrightText: string;
  showPaymentMethods: boolean;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
}

// Default settings
export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  siteName: "My Store",
  tagline: "Your tagline here",
  description: "An e-commerce platform",
  timezone: "UTC",
  currency: "USD",
  language: "en",
};

export const DEFAULT_APPEARANCE_SETTINGS: AppearanceSettings = {
  logoId: null,
  faviconId: null,
  primaryColor: "#0070f3",
  secondaryColor: "#ff0080",
  fontFamily: "Inter, sans-serif",
};

export const DEFAULT_SOCIAL_SETTINGS: SocialSettings = {
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  github: "",
};

export const DEFAULT_HEADER_SETTINGS: HeaderSettings = {
  showLogo: true,
  showTagline: true,
  showSearch: true,
  sticky: true,
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  text: "Thank you for shopping with us!",
  showSocial: true,
  copyrightText: "© 2024 My Store. All rights reserved.",
  showPaymentMethods: true,
};

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  googleAnalyticsId: "",
  googleTagManagerId: "",
  facebookPixelId: "",
};

/**
 * Get setting by key
 */
export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    });

    if (!setting) {
      return defaultValue;
    }

    return JSON.parse(setting.value) as T;
  } catch (error) {
    console.error(`Failed to get setting: ${key}`, error);
    return defaultValue;
  }
}

/**
 * Set setting by key
 */
export async function setSetting<T>(
  key: string,
  value: T,
  type: SettingType = "general"
): Promise<void> {
  try {
    await prisma.siteSettings.upsert({
      where: { key },
      update: {
        value: JSON.stringify(value),
        type,
      },
      create: {
        key,
        value: JSON.stringify(value),
        type,
      },
    });
  } catch (error) {
    console.error(`Failed to set setting: ${key}`, error);
    throw error;
  }
}

/**
 * Get all settings by type
 */
export async function getSettingsByType(type: SettingType) {
  try {
    const settings = await prisma.siteSettings.findMany({
      where: { type },
      orderBy: { key: "asc" },
    });

    return settings.reduce((acc, setting) => {
      try {
        acc[setting.key] = JSON.parse(setting.value);
      } catch {
        acc[setting.key] = setting.value;
      }
      return acc;
    }, {} as Record<string, unknown>);
  } catch (error) {
    console.error(`Failed to get settings by type: ${type}`, error);
    return {};
  }
}

/**
 * Get general settings
 */
export async function getGeneralSettings(): Promise<GeneralSettings> {
  return await getSetting("general", DEFAULT_GENERAL_SETTINGS);
}

/**
 * Set general settings
 */
export async function setGeneralSettings(settings: GeneralSettings): Promise<void> {
  await setSetting("general", settings, "general");
}

/**
 * Get appearance settings
 */
export async function getAppearanceSettings(): Promise<AppearanceSettings> {
  return await getSetting("appearance", DEFAULT_APPEARANCE_SETTINGS);
}

/**
 * Set appearance settings
 */
export async function setAppearanceSettings(settings: AppearanceSettings): Promise<void> {
  await setSetting("appearance", settings, "appearance");
}

/**
 * Get social settings
 */
export async function getSocialSettings(): Promise<SocialSettings> {
  return await getSetting("social", DEFAULT_SOCIAL_SETTINGS);
}

/**
 * Set social settings
 */
export async function setSocialSettings(settings: SocialSettings): Promise<void> {
  await setSetting("social", settings, "social");
}

/**
 * Get header settings
 */
export async function getHeaderSettings(): Promise<HeaderSettings> {
  return await getSetting("header", DEFAULT_HEADER_SETTINGS);
}

/**
 * Set header settings
 */
export async function setHeaderSettings(settings: HeaderSettings): Promise<void> {
  await setSetting("header", settings, "header");
}

/**
 * Get footer settings
 */
export async function getFooterSettings(): Promise<FooterSettings> {
  return await getSetting("footer", DEFAULT_FOOTER_SETTINGS);
}

/**
 * Set footer settings
 */
export async function setFooterSettings(settings: FooterSettings): Promise<void> {
  await setSetting("footer", settings, "footer");
}

/**
 * Get SEO settings
 */
export async function getSEOSettings(): Promise<SEOSettings> {
  return await getSetting("seo", DEFAULT_SEO_SETTINGS);
}

/**
 * Set SEO settings
 */
export async function setSEOSettings(settings: SEOSettings): Promise<void> {
  await setSetting("seo", settings, "seo");
}

/**
 * Get all settings
 */
export async function getAllSettings() {
  const [general, appearance, social, header, footer, seo] = await Promise.all([
    getGeneralSettings(),
    getAppearanceSettings(),
    getSocialSettings(),
    getHeaderSettings(),
    getFooterSettings(),
    getSEOSettings(),
  ]);

  return {
    general,
    appearance,
    social,
    header,
    footer,
    seo,
  };
}

/**
 * Reset settings to defaults
 */
export async function resetSettings(type?: SettingType): Promise<void> {
  if (type) {
    // Reset specific type
    await prisma.siteSettings.deleteMany({
      where: { type },
    });
  } else {
    // Reset all settings
    await prisma.siteSettings.deleteMany();
  }
}