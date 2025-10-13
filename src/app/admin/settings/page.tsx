"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft } from "lucide-react";

interface GeneralSettings {
  siteName: string;
  tagline: string;
  description: string;
  timezone: string;
  currency: string;
  language: string;
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

type TabType = "general" | "social" | "header" | "footer";

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



  // Fetch all settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();

      // Ensure all fields have proper defaults when merging
      setGeneral(prev => ({ ...prev, ...data.general }));
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependencies - only fetch once on mount

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);


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
        case "social":
          data = social;
          break;
        case "header":
          data = header;
          break;
        case "footer":
          data = footer;
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
        </div>
      </div>
    </div>
  );
}
