"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Image as ImageIcon, X, Search, ArrowLeft } from "lucide-react";

interface GeneralSettings {
  siteName: string;
  tagline: string;
  description: string;
  timezone: string;
  currency: string;
  language: string;
}

interface AppearanceSettings {
  logoId: string | null;
  faviconId: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

interface SocialSettings {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  github: string;
}

interface HeaderSettings {
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

interface FooterSettings {
  text: string;
  showSocial: boolean;
  copyrightText: string;
  showPaymentMethods: boolean;
}

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt: string | null;
  title: string | null;
}

type TabType = "general" | "appearance" | "theme" | "social" | "header" | "footer";
type MediaSelectType = "logo" | "favicon" | null;

// Valid font families for validation
const VALID_FONT_FAMILIES = [
  "Inter, sans-serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Times New Roman, serif",
  "Georgia, serif",
  "Verdana, sans-serif",
  "Courier New, monospace",
  "Roboto, sans-serif",
  "Open Sans, sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Poppins, sans-serif",
  "Nunito, sans-serif",
  "Ubuntu, sans-serif",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Settings state
  const [general, setGeneral] = useState<GeneralSettings>({
    siteName: "",
    tagline: "",
    description: "",
    timezone: "UTC",
    currency: "USD",
    language: "en",
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    logoId: null,
    faviconId: null,
    primaryColor: "#0070f3",
    secondaryColor: "#ff0080",
    fontFamily: "Inter, sans-serif",
  });

  const [social, setSocial] = useState<SocialSettings>({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    github: "",
  });

  const [header, setHeader] = useState<HeaderSettings>({
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
  });

  const [footer, setFooter] = useState<FooterSettings>({
    text: "",
    showSocial: true,
    copyrightText: "",
    showPaymentMethods: true,
  });

  const [theme, setTheme] = useState({
    accentColor: "#ff6b35",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    headerBackgroundColor: "#ffffff",
    headerTextColor: "#1a1a1a",
    footerBackgroundColor: "#1a1a1a",
    footerTextColor: "#ffffff",
    borderRadius: "md",
    darkMode: false,
  });

  // Media selection state
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaSelectType, setMediaSelectType] = useState<MediaSelectType>(null);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState("");
  const [logoMedia, setLogoMedia] = useState<Media | null>(null);
  const [faviconMedia, setFaviconMedia] = useState<Media | null>(null);

  // Fetch logo/favicon media details
  const fetchMediaDetails = async (mediaId: string): Promise<Media | null> => {
    try {
      const response = await fetch(`/api/admin/media?page=1&limit=1000`);
      if (!response.ok) return null;
      const data = await response.json();
      return data.media.find((m: Media) => m.id === mediaId) || null;
    } catch {
      return null;
    }
  };

  // Fetch all settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();

      // Ensure all fields have proper defaults when merging
      setGeneral(prev => ({ ...prev, ...data.general }));
      setAppearance(prev => ({ ...prev, ...data.appearance }));
      setSocial(prev => ({ ...prev, ...data.social }));
      setHeader(prev => ({
        showLogoImage: data.header?.showLogoImage ?? prev.showLogoImage,
        showLogoText: data.header?.showLogoText ?? prev.showLogoText,
        logoText: data.header?.logoText ?? prev.logoText,
        showTagline: data.header?.showTagline ?? prev.showTagline,
        showSearch: data.header?.showSearch ?? prev.showSearch,
        sticky: data.header?.sticky ?? prev.sticky,
        headerHeight: data.header?.headerHeight ?? prev.headerHeight,
        headerStyle: data.header?.headerStyle ?? prev.headerStyle,
        hamburgerIcon: data.header?.hamburgerIcon ?? prev.hamburgerIcon,
        accountIcon: data.header?.accountIcon ?? prev.accountIcon,
      }));
      setFooter(prev => ({ ...prev, ...data.footer }));
      setTheme(prev => ({ ...prev, ...data.theme }));

      // Fetch logo and favicon media details
      if (data.appearance.logoId) {
        const logo = await fetchMediaDetails(data.appearance.logoId);
        setLogoMedia(logo);
      }
      if (data.appearance.faviconId) {
        const favicon = await fetchMediaDetails(data.appearance.faviconId);
        setFaviconMedia(favicon);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependencies - only fetch once on mount

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Fetch media for selection
  const fetchMedia = async () => {
    try {
      setMediaLoading(true);
      const params = new URLSearchParams({
        page: "1",
        limit: "50",
      });

      if (mediaSearch) {
        params.append("search", mediaSearch);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");

      const data = await response.json();
      setMediaList(data.media);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setMediaLoading(false);
    }
  };

  // Open media selection modal
  const openMediaModal = (type: MediaSelectType) => {
    setMediaSelectType(type);
    setShowMediaModal(true);
    fetchMedia();
  };

  // Select media
  const selectMedia = (media: Media) => {
    if (mediaSelectType === "logo") {
      setAppearance({ ...appearance, logoId: media.id });
      setLogoMedia(media);
    } else if (mediaSelectType === "favicon") {
      setAppearance({ ...appearance, faviconId: media.id });
      setFaviconMedia(media);
    }
    setShowMediaModal(false);
    setMediaSelectType(null);
  };

  // Remove selected media
  const removeMedia = (type: "logo" | "favicon") => {
    if (type === "logo") {
      setAppearance({ ...appearance, logoId: null });
      setLogoMedia(null);
    } else if (type === "favicon") {
      setAppearance({ ...appearance, faviconId: null });
      setFaviconMedia(null);
    }
  };

  // Save settings
  const handleSave = async (type: TabType) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      let data;
      switch (type) {
        case "general":
          data = general;
          break;
        case "appearance":
          data = appearance;
          break;
        case "social":
          data = social;
          break;
        case "header":
          data = header;
          break;
        case "footer":
          data = footer;
          break;
        case "theme":
          data = theme;
          break;
      }

      const response = await fetch(`/api/admin/settings/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general" as TabType, label: "General" },
    { id: "appearance" as TabType, label: "Appearance" },
    { id: "theme" as TabType, label: "Theme" },
    { id: "social" as TabType, label: "Social Media" },
    { id: "header" as TabType, label: "Header" },
    { id: "footer" as TabType, label: "Footer" },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your site configuration</p>
            </div>
          </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic site information and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={general.siteName}
                onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                placeholder="My Store"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={general.tagline}
                onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                placeholder="Your tagline here"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={general.description}
                onChange={(e) => setGeneral({ ...general, description: e.target.value })}
                placeholder="Site description"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={general.timezone}
                  onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={general.currency}
                  onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={general.language}
                  onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={() => handleSave("general")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Appearance Settings */}
      {activeTab === "appearance" && (
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize your site&apos;s look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="flex gap-4 items-center mt-2">
                {appearance.logoId && logoMedia ? (
                  <div className="relative">
                    <div className="w-32 h-32 border rounded overflow-hidden">
                      <Image
                        src={logoMedia.path}
                        alt={logoMedia.alt || "Selected logo"}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      onClick={() => removeMedia("logo")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div>
                  <Button variant="outline" size="sm" onClick={() => openMediaModal("logo")}>
                    {appearance.logoId ? "Change Logo" : "Select Logo"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 200x80px, PNG/SVG
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    <a href="/admin/media" target="_blank" className="hover:underline">
                      Upload images →
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Label>Favicon</Label>
              <div className="flex gap-4 items-center mt-2">
                {appearance.faviconId && faviconMedia ? (
                  <div className="relative">
                    <div className="w-16 h-16 border rounded overflow-hidden">
                      <Image
                        src={faviconMedia.path}
                        alt={faviconMedia.alt || "Selected favicon"}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      onClick={() => removeMedia("favicon")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <Button variant="outline" size="sm" onClick={() => openMediaModal("favicon")}>
                    {appearance.faviconId ? "Change Favicon" : "Select Favicon"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Multiple sizes: 16x16, 32x32, 64x64px
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    <a href="/admin/media" target="_blank" className="hover:underline">
                      Upload images →
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={appearance.primaryColor}
                    onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={appearance.primaryColor}
                    onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                    placeholder="#0070f3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={appearance.secondaryColor}
                    onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={appearance.secondaryColor}
                    onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                    placeholder="#ff0080"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <select
                id="fontFamily"
                value={appearance.fontFamily}
                onChange={(e) => setAppearance({ ...appearance, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {VALID_FONT_FAMILIES.map((font) => (
                  <option key={font} value={font}>
                    {font.split(',')[0]}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose from web-safe fonts for best compatibility
              </p>
            </div>
            <Button onClick={() => handleSave("appearance")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Theme Settings */}
      {activeTab === "theme" && (
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Advanced color and styling options for your site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Presets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Presets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setTheme({
                    ...theme,
                    accentColor: "#ff6b35",
                    backgroundColor: "#ffffff",
                    textColor: "#1a1a1a",
                    headerBackgroundColor: "#ffffff",
                    headerTextColor: "#1a1a1a",
                    footerBackgroundColor: "#1a1a1a",
                    footerTextColor: "#ffffff"
                  })}
                  className="p-3 border rounded-lg text-left hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <div className="w-4 h-4 rounded bg-gray-500"></div>
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                  </div>
                  <div className="text-sm font-medium">Default Blue</div>
                  <div className="text-xs text-gray-500">Clean & Professional</div>
                </button>
                
                <button
                  onClick={() => setTheme({
                    ...theme,
                    accentColor: "#f59e0b",
                    backgroundColor: "#ffffff",
                    textColor: "#1f2937",
                    headerBackgroundColor: "#f9fafb",
                    headerTextColor: "#1f2937",
                    footerBackgroundColor: "#111827",
                    footerTextColor: "#f9fafb"
                  })}
                  className="p-3 border rounded-lg text-left hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <div className="w-4 h-4 rounded bg-gray-500"></div>
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  </div>
                  <div className="text-sm font-medium">Nature Green</div>
                  <div className="text-xs text-gray-500">Fresh & Natural</div>
                </button>
                
                <button
                  onClick={() => setTheme({
                    ...theme,
                    accentColor: "#06b6d4",
                    backgroundColor: "#ffffff",
                    textColor: "#1e293b",
                    headerBackgroundColor: "#f8fafc",
                    headerTextColor: "#1e293b",
                    footerBackgroundColor: "#1e1b4b",
                    footerTextColor: "#f8fafc"
                  })}
                  className="p-3 border rounded-lg text-left hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-purple-500"></div>
                    <div className="w-4 h-4 rounded bg-pink-500"></div>
                    <div className="w-4 h-4 rounded bg-cyan-500"></div>
                  </div>
                  <div className="text-sm font-medium">Vibrant Purple</div>
                  <div className="text-xs text-gray-500">Creative & Modern</div>
                </button>
                
                <button
                  onClick={() => setTheme({
                    ...theme,
                    accentColor: "#d97706",
                    backgroundColor: "#ffffff",
                    textColor: "#1c1917",
                    headerBackgroundColor: "#fef2f2",
                    headerTextColor: "#1c1917",
                    footerBackgroundColor: "#450a0a",
                    footerTextColor: "#fef2f2"
                  })}
                  className="p-3 border rounded-lg text-left hover:border-red-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-red-600"></div>
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                    <div className="w-4 h-4 rounded bg-amber-500"></div>
                  </div>
                  <div className="text-sm font-medium">Warm Red</div>
                  <div className="text-xs text-gray-500">Bold & Energetic</div>
                </button>
              </div>
            </div>

            {/* Main Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accent & Background Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Accent & Background</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.accentColor}
                        onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                        placeholder="#ff6b35"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Highlights, special elements</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.backgroundColor}
                        onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                        placeholder="#ffffff"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Main page background</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={theme.textColor}
                        onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.textColor}
                        onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                        placeholder="#1a1a1a"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Main text color</p>
                  </div>
                </div>
              </div>

              {/* Header & Footer Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Header & Footer</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headerBackgroundColor">Header Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerBackgroundColor"
                        type="color"
                        value={theme.headerBackgroundColor}
                        onChange={(e) => setTheme({ ...theme, headerBackgroundColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.headerBackgroundColor}
                        onChange={(e) => setTheme({ ...theme, headerBackgroundColor: e.target.value })}
                        placeholder="#ffffff"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Header background color</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="headerTextColor">Header Text</Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerTextColor"
                        type="color"
                        value={theme.headerTextColor}
                        onChange={(e) => setTheme({ ...theme, headerTextColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.headerTextColor}
                        onChange={(e) => setTheme({ ...theme, headerTextColor: e.target.value })}
                        placeholder="#1a1a1a"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Header text and navigation color</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="footerBackgroundColor">Footer Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="footerBackgroundColor"
                        type="color"
                        value={theme.footerBackgroundColor}
                        onChange={(e) => setTheme({ ...theme, footerBackgroundColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.footerBackgroundColor}
                        onChange={(e) => setTheme({ ...theme, footerBackgroundColor: e.target.value })}
                        placeholder="#1a1a1a"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Footer background color</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="footerTextColor">Footer Text</Label>
                    <div className="flex gap-2">
                      <Input
                        id="footerTextColor"
                        type="color"
                        value={theme.footerTextColor}
                        onChange={(e) => setTheme({ ...theme, footerTextColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={theme.footerTextColor}
                        onChange={(e) => setTheme({ ...theme, footerTextColor: e.target.value })}
                        placeholder="#ffffff"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Footer text color</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styling Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Styling Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <select
                    id="borderRadius"
                    value={theme.borderRadius}
                    onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">None (0px)</option>
                    <option value="sm">Small (0.125rem)</option>
                    <option value="md">Medium (0.375rem)</option>
                    <option value="lg">Large (0.5rem)</option>
                    <option value="xl">Extra Large (0.75rem)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Corner rounding for elements</p>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Advanced Options</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={theme.darkMode}
                  onChange={(e) => setTheme({ ...theme, darkMode: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="darkMode">Enable Dark Mode</Label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Switch to dark color scheme (experimental)</p>
            </div>

            <Button onClick={() => handleSave("theme")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Theme Settings"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Social Media Settings */}
      {activeTab === "social" && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Add your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter/X URL</Label>
              <Input
                id="twitter"
                value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input
                id="youtube"
                value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={social.github}
                onChange={(e) => setSocial({ ...social, github: e.target.value })}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <Button onClick={() => handleSave("social")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Header Settings */}
      {activeTab === "header" && (
        <Card>
          <CardHeader>
            <CardTitle>Header Settings</CardTitle>
            <CardDescription>Configure your site header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showLogoImage"
                  checked={header.showLogoImage}
                  onChange={(e) => setHeader({ ...header, showLogoImage: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="showLogoImage">Show Logo Image</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showLogoText"
                  checked={header.showLogoText}
                  onChange={(e) => setHeader({ ...header, showLogoText: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="showLogoText">Show Logo Text</Label>
              </div>
            </div>
            {header.showLogoText && (
              <div>
                <Label htmlFor="logoText">Logo Text</Label>
                <Input
                  id="logoText"
                  value={header.logoText}
                  onChange={(e) => setHeader({ ...header, logoText: e.target.value })}
                  placeholder="Your Brand Name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Text to display as logo in the header
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showTagline"
                checked={header.showTagline}
                onChange={(e) => setHeader({ ...header, showTagline: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="showTagline">Show Tagline</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showSearch"
                checked={header.showSearch}
                onChange={(e) => setHeader({ ...header, showSearch: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="showSearch">Show Search Bar</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sticky"
                checked={header.sticky}
                onChange={(e) => setHeader({ ...header, sticky: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="sticky">Sticky Header (stays on scroll)</Label>
            </div>

            <div>
              <Label htmlFor="headerHeight">Header Height</Label>
              <select
                id="headerHeight"
                value={header.headerHeight}
                onChange={(e) => setHeader({ ...header, headerHeight: e.target.value as 'sm' | 'md' | 'lg' | 'xl' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sm">Small (48px)</option>
                <option value="md">Medium (64px)</option>
                <option value="lg">Large (80px)</option>
                <option value="xl">Extra Large (96px)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Controls the overall height of the header
              </p>
            </div>

            <div>
              <Label htmlFor="headerStyle">Header Style</Label>
              <select
                id="headerStyle"
                value={header.headerStyle}
                onChange={(e) => setHeader({ ...header, headerStyle: e.target.value as 'normal' | 'bold' | 'minimal' | 'modern' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold (thicker borders, stronger shadows)</option>
                <option value="minimal">Minimal (clean, subtle)</option>
                <option value="modern">Modern (rounded corners, gradients)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose the visual style of your header
              </p>
            </div>

            <div>
              <Label htmlFor="hamburgerIcon">Mobile Menu Icon</Label>
              <select
                id="hamburgerIcon"
                value={header.hamburgerIcon}
                onChange={(e) => setHeader({ ...header, hamburgerIcon: e.target.value as 'menu' | 'bars' | 'grid' | 'list' | 'more' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="menu">☰ Menu (Classic hamburger)</option>
                <option value="bars">≡ Bars (Triple bar)</option>
                <option value="grid">⊞ Grid (9 dots)</option>
                <option value="list">☰ List (Bullet list)</option>
                <option value="more">⋯ More (Three dots)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Icon used for the mobile navigation menu
              </p>
            </div>

            <div>
              <Label htmlFor="accountIcon">Account Icon</Label>
              <select
                id="accountIcon"
                value={header.accountIcon}
                onChange={(e) => setHeader({ ...header, accountIcon: e.target.value as 'user' | 'person' | 'profile' | 'account' | 'avatar' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user">👤 User (Simple silhouette)</option>
                <option value="person">👨 Person (Detailed figure)</option>
                <option value="profile">👤 Profile (Circle silhouette)</option>
                <option value="account">⚙️ Account (Settings gear)</option>
                <option value="avatar">🧑 Avatar (Generic person)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Icon used for the account dropdown on mobile
              </p>
            </div>

            <Button onClick={() => handleSave("header")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Footer Settings */}
      {activeTab === "footer" && (
        <Card>
          <CardHeader>
            <CardTitle>Footer Settings</CardTitle>
            <CardDescription>Configure your site footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="footerText">Footer Text</Label>
              <Input
                id="footerText"
                value={footer.text}
                onChange={(e) => setFooter({ ...footer, text: e.target.value })}
                placeholder="Thank you for shopping with us!"
              />
            </div>
            <div>
              <Label htmlFor="copyrightText">Copyright Text</Label>
              <Input
                id="copyrightText"
                value={footer.copyrightText}
                onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
                placeholder="© 2024 My Store. All rights reserved."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showSocial"
                checked={footer.showSocial}
                onChange={(e) => setFooter({ ...footer, showSocial: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="showSocial">Show Social Media Links</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPaymentMethods"
                checked={footer.showPaymentMethods}
                onChange={(e) => setFooter({ ...footer, showPaymentMethods: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="showPaymentMethods">Show Payment Method Icons</Label>
            </div>
            <Button onClick={() => handleSave("footer")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
          )}

          {/* Media Selection Modal */}
          {showMediaModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card className="max-w-4xl w-full max-h-[80vh] overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Select {mediaSelectType === "logo" ? "Logo" : "Favicon"} from Media Library
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMediaModal(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    Choose an image from your uploaded media files. Click on any image to select it.
                  </CardDescription>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search media..."
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === 'Enter' && fetchMedia()}
                      />
                    </div>
                    <Button onClick={fetchMedia} disabled={mediaLoading}>
                      {mediaLoading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="overflow-y-auto max-h-96">
                  {mediaLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading media files...</p>
                    </div>
                  ) : mediaList.length === 0 ? (
                    <div className="text-center py-8">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No media files found</h3>
                      <p className="text-gray-600 mb-4">
                        You haven&apos;t uploaded any images yet. Upload some images first to select them here.
                      </p>
                      <div className="space-y-2">
                        <Button asChild>
                          <a href="/admin/media" target="_blank">
                            Go to Media Library
                          </a>
                        </Button>
                        <p className="text-sm text-gray-500">
                          Opens in new tab so you don&apos;t lose your settings
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          Found {mediaList.length} media file{mediaList.length !== 1 ? 's' : ''}.
                          Click on an image to select it.
                        </p>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {mediaList.map((media) => (
                          <div
                            key={media.id}
                            className="cursor-pointer hover:opacity-75 transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-blue-300 rounded"
                            onClick={() => selectMedia(media)}
                            title={`Click to select: ${media.originalName}`}
                          >
                            <div className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                              {media.mimeType.startsWith("image/") ? (
                                <Image
                                  src={media.path}
                                  alt={media.alt || media.originalName}
                                  width={100}
                                  height={100}
                                  className="object-cover w-full h-full"
                                  unoptimized={true}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs mt-1 truncate text-center" title={media.originalName}>
                              {media.originalName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
