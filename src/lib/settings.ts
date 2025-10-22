import { db as prisma } from "./db";
import { cache } from "./redis";

// Setting types
export type SettingType = "general" | "appearance" | "social" | "header" | "footer" | "seo" | "theme" | "homepage" | "whatsapp" | "pwa";

// Cache configuration
const SETTINGS_CACHE_PREFIX = 'settings:';
const SETTINGS_CACHE_TTL = 3600; // 1 hour cache

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
  logoImageSize: 'sm' | 'md' | 'lg' | 'xl';
  logoTextSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showTagline: boolean;
  showSearch: boolean;
  sticky: boolean;
  headerHeight: 'sm' | 'md' | 'lg' | 'xl';
  headerStyle: 'normal' | 'bold' | 'minimal' | 'modern';
  hamburgerIcon: 'menu' | 'bars' | 'grid' | 'list' | 'more';
  accountIcon: 'user' | 'person' | 'profile' | 'account' | 'avatar';
  
  // Announcement Bar
  showAnnouncementBar?: boolean;
  announcementText?: string;
  announcementBgColor?: string;
  announcementTextColor?: string;
  announcementLink?: string;
  announcementCloseable?: boolean;
  
  // Header Layout
  headerLayout?: 'default' | 'centered' | 'split' | 'minimal';
  logoPosition?: 'left' | 'center' | 'right';
  navigationPosition?: 'left' | 'center' | 'right';
  
  // Navigation Menu Styles
  navMenuStyle?: 'default' | 'underline' | 'pills' | 'bordered';
  navMenuSpacing?: 'compact' | 'normal' | 'relaxed';
  navMenuFontSize?: 'sm' | 'md' | 'lg';
  navMenuFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  showNavMenuIcons?: boolean;
  
  // Mobile Dropdown
  mobileMenuStyle?: 'slide' | 'dropdown' | 'fullscreen';
  mobileMenuPosition?: 'left' | 'right';
  mobileMenuAnimation?: 'fade' | 'slide' | 'scale';
  showMobileSearch?: boolean;
  mobileMenuListStyle?: 'default' | 'bordered' | 'pills' | 'cards' | 'minimal' | 'underline' | 'gradient' | 'outlined' | 'divided' | 'compact' | 'spacious' | 'modern';
  mobileMenuBgColor?: string;
  mobileMenuTextColor?: string;
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

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  message: string;
  position: 'bottom-left' | 'bottom-right';
  backgroundColor: string;
  iconColor: string;
  showAnimation: boolean;
}

export interface PWASettings {
  enabled: boolean;
  appName: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  displayMode: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'portrait' | 'landscape';
  iconId: string | null; // 512x512 icon from media library
  icon192Id: string | null; // 192x192 icon (optional)
  enableOfflineMode: boolean;
  enablePushNotifications: boolean;
  installPromptEnabled: boolean;
  installPromptDelay: number; // seconds before showing prompt
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
  logoImageSize: 'md',
  logoTextSize: 'md',
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

export const DEFAULT_WHATSAPP_SETTINGS: WhatsAppSettings = {
  enabled: false,
  phoneNumber: "",
  message: "Hello! I'm interested in your products.",
  position: "bottom-right",
  backgroundColor: "#25D366",
  iconColor: "#ffffff",
  showAnimation: true,
};

export const DEFAULT_PWA_SETTINGS: PWASettings = {
  enabled: false,
  appName: "My Store",
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

/**
 * Get setting by key with Redis caching
 */
export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  try {
    // Try cache first
    const cacheKey = `${SETTINGS_CACHE_PREFIX}${key}`;
    const cached = await cache.get<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Fallback to database
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    });

    if (!setting) {
      return defaultValue;
    }

    const value = JSON.parse(setting.value) as T;
    
    // Cache for future requests
    await cache.set(cacheKey, value, SETTINGS_CACHE_TTL);

    return value;
  } catch (error) {
    console.error(`Failed to get setting: ${key}`, error);
    return defaultValue;
  }
}

/**
 * Set setting by key and invalidate cache
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

    // Invalidate cache
    const cacheKey = `${SETTINGS_CACHE_PREFIX}${key}`;
    await cache.del(cacheKey);
    
    // Also clear the "all settings" cache
    await cache.del(`${SETTINGS_CACHE_PREFIX}all`);
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
 * Get WhatsApp settings
 */
export async function getWhatsAppSettings(): Promise<WhatsAppSettings> {
  return await getSetting("whatsapp", DEFAULT_WHATSAPP_SETTINGS);
}

/**
 * Set WhatsApp settings
 */
export async function setWhatsAppSettings(settings: WhatsAppSettings): Promise<void> {
  await setSetting("whatsapp", settings, "whatsapp");
}

/**
 * Get PWA settings
 */
export async function getPWASettings(): Promise<PWASettings> {
  return await getSetting("pwa", DEFAULT_PWA_SETTINGS);
}

/**
 * Set PWA settings
 */
export async function setPWASettings(settings: PWASettings): Promise<void> {
  await setSetting("pwa", settings, "pwa");
}

/**
 * Get all settings with caching
 */
export async function getAllSettings() {
  try {
    // Try cache first
    const cacheKey = `${SETTINGS_CACHE_PREFIX}all`;
    const cached = await cache.get<{
      general: GeneralSettings;
      appearance: AppearanceSettings;
      social: SocialSettings;
      header: HeaderSettings;
      footer: FooterSettings;
      seo: SEOSettings;
      theme: ThemeSettings;
      homepage: HomepageSettings;
      whatsapp: WhatsAppSettings;
      pwa: PWASettings;
    }>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }

    // Fetch from database
    const [general, appearance, social, header, footer, seo, theme, homepage, whatsapp, pwa] = await Promise.all([
      getGeneralSettings(),
      getAppearanceSettings(),
      getSocialSettings(),
      getHeaderSettings(),
      getFooterSettings(),
      getSEOSettings(),
      getThemeSettings(),
      getHomepageSettings(),
      getWhatsAppSettings(),
      getPWASettings(),
    ]);

    const settings = {
      general,
      appearance,
      social,
      header,
      footer,
      seo,
      theme,
      homepage,
      whatsapp,
      pwa,
    };

    // Cache for future requests
    await cache.set(cacheKey, settings, SETTINGS_CACHE_TTL);

    return settings;
  } catch (error) {
    console.error('Failed to get all settings:', error);
    // Fallback to fetching without cache on error
    const [general, appearance, social, header, footer, seo, theme, homepage, whatsapp, pwa] = await Promise.all([
      getGeneralSettings(),
      getAppearanceSettings(),
      getSocialSettings(),
      getHeaderSettings(),
      getFooterSettings(),
      getSEOSettings(),
      getThemeSettings(),
      getHomepageSettings(),
      getWhatsAppSettings(),
      getPWASettings(),
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
      whatsapp,
      pwa,
    };
  }
}

/**
 * Reset settings to defaults and clear cache
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
  
  // Clear all settings cache
  await clearSettingsCache();
}

/**
 * Clear all settings cache
 */
export async function clearSettingsCache(): Promise<void> {
  try {
    await cache.delPattern(`${SETTINGS_CACHE_PREFIX}*`);
  } catch (error) {
    console.error('Failed to clear settings cache:', error);
  }
}