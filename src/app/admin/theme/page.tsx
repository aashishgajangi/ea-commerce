"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft, Image as ImageIcon, X, Search } from "lucide-react";

interface ThemeSettings {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  footerBackgroundColor: string;
  footerTextColor: string;
  borderRadius: string;
  darkMode: boolean;
}

interface AppearanceSettings {
  logoId: string | null;
  faviconId: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
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

export default function ThemePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [theme, setTheme] = useState<ThemeSettings>({
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

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    logoId: null,
    faviconId: null,
    primaryColor: "#0070f3",
    secondaryColor: "#ff0080",
    fontFamily: "Inter, sans-serif",
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

  // Fetch theme settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      setTheme(prev => ({ ...prev, ...data.theme }));
      setAppearance(prev => ({ ...prev, ...data.appearance }));

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
  }, []);

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

  // Save theme settings
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Sync appearance colors to theme settings for consistency
      const syncedTheme = {
        ...theme,
        primaryColor: appearance.primaryColor,
        secondaryColor: appearance.secondaryColor,
        fontFamily: appearance.fontFamily,
      };

      // Save both theme and appearance settings
      const themeResponse = await fetch(`/api/admin/settings/theme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(syncedTheme),
      });

      if (!themeResponse.ok) throw new Error("Failed to save theme settings");

      const appearanceResponse = await fetch(`/api/admin/settings/appearance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appearance),
      });

      if (!appearanceResponse.ok) throw new Error("Failed to save appearance settings");

      setSuccess("✅ All theme colors synced and saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">Loading theme settings...</div>
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Theme Settings</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Customize your site&apos;s colors and styling - all changes apply to your modern homepage sections</p>
            </div>
          </div>

          {/* Info Alert */}
          <Alert>
            <AlertDescription>
              <strong>💡 Tip:</strong> Your homepage uses a modern sections layout. The Primary and Secondary colors create gradients in the Hero and Newsletter sections. The Accent color is used for buttons and highlights throughout your site.
            </AlertDescription>
          </Alert>

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

          {/* Appearance Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Logo, favicon, brand colors, and font settings - these colors are used throughout your modern homepage sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo & Favicon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Brand Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Brand Colors</h3>
                <p className="text-sm text-gray-600 mb-4">
                  These colors are used in your Hero Section and Newsletter Section gradients
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <p className="text-xs text-gray-500 mt-1">Used in gradients (start color), buttons, and links</p>
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
                    <p className="text-xs text-gray-500 mt-1">Used in gradients (end color) for Hero and Newsletter sections</p>
                  </div>
                </div>
              </div>

              {/* Font Family */}
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
            </CardContent>
          </Card>

          {/* Theme Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>Advanced color and styling options for your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Presets */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Theme Presets</h3>
                <p className="text-sm text-gray-600 mb-4">Click any preset to instantly apply a complete color scheme</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Ocean Blue */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#0ea5e9",
                        secondaryColor: "#06b6d4"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#f59e0b",
                        backgroundColor: "#ffffff",
                        textColor: "#0f172a",
                        headerBackgroundColor: "#f0f9ff",
                        headerTextColor: "#0c4a6e",
                        footerBackgroundColor: "#0c4a6e",
                        footerTextColor: "#f0f9ff",
                        borderRadius: "md"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Ocean Blue</div>
                    <div className="text-xs text-gray-600 mt-1">Professional & Trustworthy</div>
                  </button>

                  {/* Forest Green */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#10b981",
                        secondaryColor: "#14b8a6"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#f97316",
                        backgroundColor: "#ffffff",
                        textColor: "#064e3b",
                        headerBackgroundColor: "#f0fdf4",
                        headerTextColor: "#064e3b",
                        footerBackgroundColor: "#064e3b",
                        footerTextColor: "#f0fdf4",
                        borderRadius: "lg"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Forest Green</div>
                    <div className="text-xs text-gray-600 mt-1">Fresh & Eco-Friendly</div>
                  </button>

                  {/* Royal Purple */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#8b5cf6",
                        secondaryColor: "#a855f7"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#ec4899",
                        backgroundColor: "#ffffff",
                        textColor: "#1e1b4b",
                        headerBackgroundColor: "#faf5ff",
                        headerTextColor: "#5b21b6",
                        footerBackgroundColor: "#5b21b6",
                        footerTextColor: "#faf5ff",
                        borderRadius: "xl"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Royal Purple</div>
                    <div className="text-xs text-gray-600 mt-1">Luxurious & Creative</div>
                  </button>

                  {/* Sunset Orange */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#f97316",
                        secondaryColor: "#fb923c"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#dc2626",
                        backgroundColor: "#ffffff",
                        textColor: "#7c2d12",
                        headerBackgroundColor: "#fff7ed",
                        headerTextColor: "#9a3412",
                        footerBackgroundColor: "#9a3412",
                        footerTextColor: "#fff7ed",
                        borderRadius: "md"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Sunset Orange</div>
                    <div className="text-xs text-gray-600 mt-1">Warm & Energetic</div>
                  </button>

                  {/* Cherry Red */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#dc2626",
                        secondaryColor: "#ef4444"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#f59e0b",
                        backgroundColor: "#ffffff",
                        textColor: "#7f1d1d",
                        headerBackgroundColor: "#fef2f2",
                        headerTextColor: "#991b1b",
                        footerBackgroundColor: "#991b1b",
                        footerTextColor: "#fef2f2",
                        borderRadius: "lg"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-red-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Cherry Red</div>
                    <div className="text-xs text-gray-600 mt-1">Bold & Passionate</div>
                  </button>

                  {/* Midnight Blue */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#1e40af",
                        secondaryColor: "#3b82f6"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#06b6d4",
                        backgroundColor: "#ffffff",
                        textColor: "#1e3a8a",
                        headerBackgroundColor: "#eff6ff",
                        headerTextColor: "#1e3a8a",
                        footerBackgroundColor: "#1e3a8a",
                        footerTextColor: "#eff6ff",
                        borderRadius: "md"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-blue-700 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Midnight Blue</div>
                    <div className="text-xs text-gray-600 mt-1">Corporate & Reliable</div>
                  </button>

                  {/* Rose Pink */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#ec4899",
                        secondaryColor: "#f472b6"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#8b5cf6",
                        backgroundColor: "#ffffff",
                        textColor: "#831843",
                        headerBackgroundColor: "#fdf2f8",
                        headerTextColor: "#9f1239",
                        footerBackgroundColor: "#9f1239",
                        footerTextColor: "#fdf2f8",
                        borderRadius: "xl"
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-pink-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Rose Pink</div>
                    <div className="text-xs text-gray-600 mt-1">Elegant & Feminine</div>
                  </button>

                  {/* Dark Mode */}
                  <button
                    onClick={() => {
                      setAppearance({
                        ...appearance,
                        primaryColor: "#3b82f6",
                        secondaryColor: "#8b5cf6"
                      });
                      setTheme({
                        ...theme,
                        accentColor: "#10b981",
                        backgroundColor: "#0f172a",
                        textColor: "#f1f5f9",
                        headerBackgroundColor: "#1e293b",
                        headerTextColor: "#f1f5f9",
                        footerBackgroundColor: "#020617",
                        footerTextColor: "#f1f5f9",
                        borderRadius: "lg",
                        darkMode: true
                      });
                    }}
                    className="p-4 border-2 rounded-lg text-left hover:border-slate-700 hover:shadow-lg transition-all cursor-pointer bg-slate-900"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-700 shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-slate-700 shadow"></div>
                      <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-700 shadow"></div>
                    </div>
                    <div className="text-sm font-bold text-white">Dark Mode</div>
                    <div className="text-xs text-slate-400 mt-1">Sleek & Modern</div>
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
                      <p className="text-xs text-gray-500 mt-1">Used for call-to-action buttons, badges, and hover effects</p>
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

              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save All Settings"}
              </Button>
            </CardContent>
          </Card>

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
