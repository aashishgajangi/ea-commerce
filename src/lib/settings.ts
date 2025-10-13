import { db as prisma } from "./db";

// Setting types
export type SettingType = "general" | "appearance" | "social" | "header" | "footer" | "seo" | "theme" | "homepage";

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
  showLogoImage: boolean;
  showLogoText: boolean;
  logoText: string;
  showTagline: boolean;
  showSearch: boolean;
  sticky: boolean;
  headerHeight: 'sm' | 'md' | 'lg' | 'xl';
  headerStyle: 'normal' | 'bold' | 'minimal' | 'modern';
  hamburgerIcon: 'menu' | 'bars' | 'grid' | 'list' | 'more';
  accountIcon: 'user' | 'person' | 'profile' | 'account' | 'avatar';
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

export interface ThemeSettings {
  primaryColor: string; // Synced from AppearanceSettings
  secondaryColor: string; // Synced from AppearanceSettings
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  footerBackgroundColor: string;
  footerTextColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fontFamily: string; // Synced from AppearanceSettings
  darkMode: boolean;
}

export interface HomepageSettings {
  layout: 'sections'; // Always use modern sections layout
  showHero: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroImageId: string | null;
  heroButtonText: string;
  heroButtonUrl: string;
  showFeaturedProducts: boolean;
  featuredProductsTitle: string;
  featuredProductsCount: number;
  showCategories: boolean;
  categoriesTitle: string;
  categoriesCount: number;
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterSubtitle: string;
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
  showLogoImage: true,
  showLogoText: false,
  logoText: "",
  showTagline: true,
  showSearch: true,
  sticky: true,
  headerHeight: 'md',
  headerStyle: 'normal',
  hamburgerIcon: 'menu',
  accountIcon: 'user',
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

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryColor: "#0070f3",
  secondaryColor: "#6c757d",
  accentColor: "#ff6b35",
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  headerBackgroundColor: "#ffffff",
  headerTextColor: "#1a1a1a",
  footerBackgroundColor: "#1a1a1a",
  footerTextColor: "#ffffff",
  borderRadius: "md",
  fontFamily: "Inter, sans-serif",
  darkMode: false,
};

export const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  layout: "sections",
  showHero: true,
  heroTitle: "Welcome to Our Store",
  heroSubtitle: "Discover amazing products at great prices",
  heroImageId: null,
  heroButtonText: "Shop Now",
  heroButtonUrl: "/products",
  showFeaturedProducts: true,
  featuredProductsTitle: "Featured Products",
  featuredProductsCount: 8,
  showCategories: true,
  categoriesTitle: "Shop by Category",
  categoriesCount: 6,
  showNewsletter: true,
  newsletterTitle: "Stay Updated",
  newsletterSubtitle: "Subscribe to get special offers and updates",
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
 * Get theme settings
 */
export async function getThemeSettings(): Promise<ThemeSettings> {
  return await getSetting("theme", DEFAULT_THEME_SETTINGS);
}

/**
 * Set theme settings
 */
export async function setThemeSettings(settings: ThemeSettings): Promise<void> {
  await setSetting("theme", settings, "theme");
}

/**
 * Get homepage settings
 */
export async function getHomepageSettings(): Promise<HomepageSettings> {
  return await getSetting("homepage", DEFAULT_HOMEPAGE_SETTINGS);
}

/**
 * Set homepage settings
 */
export async function setHomepageSettings(settings: HomepageSettings): Promise<void> {
  await setSetting("homepage", settings, "homepage");
}

/**
 * Get all settings
 */
export async function getAllSettings() {
  const [general, appearance, social, header, footer, seo, theme, homepage] = await Promise.all([
    getGeneralSettings(),
    getAppearanceSettings(),
    getSocialSettings(),
    getHeaderSettings(),
    getFooterSettings(),
    getSEOSettings(),
    getThemeSettings(),
    getHomepageSettings(),
  ]);

  return {
    general,
    appearance,
    social,
    header,
    footer,
    seo,
    theme,
    homepage,
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