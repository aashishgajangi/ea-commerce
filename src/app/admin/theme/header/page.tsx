"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft, Megaphone, Layout, Menu as MenuIcon, Smartphone } from "lucide-react";
import MobileSettingsSection from "./MobileSettingsSection";

type TabType = "announcement" | "layout" | "navigation" | "mobile";

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
  showAnnouncementBar: boolean;
  announcementText: string;
  announcementBgColor: string;
  announcementTextColor: string;
  announcementLink: string;
  announcementCloseable: boolean;
  headerLayout: 'default' | 'centered' | 'split' | 'minimal';
  logoPosition: 'left' | 'center' | 'right';
  navigationPosition: 'left' | 'center' | 'right';
  navMenuStyle: 'default' | 'underline' | 'pills' | 'bordered';
  navMenuSpacing: 'compact' | 'normal' | 'relaxed';
  navMenuFontSize: 'sm' | 'md' | 'lg';
  navMenuFontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  showNavMenuIcons: boolean;
  mobileMenuStyle: 'slide' | 'dropdown' | 'fullscreen';
  mobileMenuPosition: 'left' | 'right';
  mobileMenuAnimation: 'fade' | 'slide' | 'scale';
  showMobileSearch: boolean;
  mobileMenuListStyle: 'default' | 'bordered' | 'pills' | 'cards' | 'minimal' | 'underline' | 'gradient' | 'outlined' | 'divided' | 'compact' | 'spacious' | 'modern';
}

export default function HeaderSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("announcement");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    showAnnouncementBar: false,
    announcementText: "🎉 Free shipping on orders over $50!",
    announcementBgColor: "#0070f3",
    announcementTextColor: "#ffffff",
    announcementLink: "",
    announcementCloseable: true,
    headerLayout: 'default',
    logoPosition: 'left',
    navigationPosition: 'center',
    navMenuStyle: 'default',
    navMenuSpacing: 'normal',
    navMenuFontSize: 'md',
    navMenuFontWeight: 'medium',
    showNavMenuIcons: false,
    mobileMenuStyle: 'slide',
    mobileMenuPosition: 'right',
    mobileMenuAnimation: 'slide',
    showMobileSearch: true,
    mobileMenuListStyle: 'default',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Fetch only header settings instead of all settings
      const response = await fetch("/api/admin/settings/header");
      if (!response.ok) throw new Error("Failed to fetch header settings");
      const data = await response.json();
      setHeader(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch header settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      const response = await fetch(`/api/admin/settings/header`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(header),
      });
      if (!response.ok) throw new Error("Failed to save settings");
      setSuccess("Header settings saved successfully!");
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
        <div className="text-center py-12">Loading header settings...</div>
      </div>
    );
  }

  const tabs = [
    { id: "announcement" as TabType, label: "Announcement Bar", icon: Megaphone },
    { id: "layout" as TabType, label: "Layout & Style", icon: Layout },
    { id: "navigation" as TabType, label: "Navigation Menu", icon: MenuIcon },
    { id: "mobile" as TabType, label: "Mobile Settings", icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/theme">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Header Settings</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Customize your site header</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving} size="lg">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save All"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white dark:bg-slate-800 rounded-lg border">
            <div className="border-b">
              <nav className="flex space-x-1 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === "announcement" && (
                <Card className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Announcement Bar</h2>
                    <p className="text-sm text-gray-600">Display a promotional banner above your header</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showAnnouncementBar"
                      checked={header.showAnnouncementBar}
                      onChange={(e) => setHeader({ ...header, showAnnouncementBar: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="showAnnouncementBar">Enable Announcement Bar</Label>
                  </div>

                  {header.showAnnouncementBar && (
                    <div className="space-y-4 pl-6 border-l-2 border-blue-200">
                      <div>
                        <Label>Announcement Text</Label>
                        <Input
                          value={header.announcementText}
                          onChange={(e) => setHeader({ ...header, announcementText: e.target.value })}
                          placeholder="🎉 Free shipping on orders over $50!"
                        />
                      </div>

                      <div>
                        <Label>Link URL (optional)</Label>
                        <Input
                          value={header.announcementLink}
                          onChange={(e) => setHeader({ ...header, announcementLink: e.target.value })}
                          placeholder="/sale"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={header.announcementBgColor}
                              onChange={(e) => setHeader({ ...header, announcementBgColor: e.target.value })}
                              className="w-20 h-10"
                            />
                            <Input
                              value={header.announcementBgColor}
                              onChange={(e) => setHeader({ ...header, announcementBgColor: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={header.announcementTextColor}
                              onChange={(e) => setHeader({ ...header, announcementTextColor: e.target.value })}
                              className="w-20 h-10"
                            />
                            <Input
                              value={header.announcementTextColor}
                              onChange={(e) => setHeader({ ...header, announcementTextColor: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="announcementCloseable"
                          checked={header.announcementCloseable}
                          onChange={(e) => setHeader({ ...header, announcementCloseable: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="announcementCloseable">Allow users to close</Label>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {activeTab === "layout" && (
                <Card className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Layout & Style</h2>
                    <p className="text-sm text-gray-600">Configure header appearance and positioning</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Logo Settings</h3>
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
                      {header.showLogoText && (
                        <div>
                          <Label>Logo Text</Label>
                          <Input
                            value={header.logoText}
                            onChange={(e) => setHeader({ ...header, logoText: e.target.value })}
                            placeholder="Your Brand Name"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Display Options</h3>
                    <div className="space-y-3">
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
                        <Label htmlFor="sticky">Sticky Header</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Header Height</Label>
                      <select
                        value={header.headerHeight}
                        onChange={(e) => setHeader({ ...header, headerHeight: e.target.value as 'sm' | 'md' | 'lg' | 'xl' })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>

                    <div>
                      <Label>Header Style</Label>
                      <select
                        value={header.headerStyle}
                        onChange={(e) => setHeader({ ...header, headerStyle: e.target.value as 'normal' | 'bold' | 'minimal' | 'modern' })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="minimal">Minimal</option>
                        <option value="modern">Modern</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Header Layout</Label>
                    <select
                      value={header.headerLayout}
                      onChange={(e) => setHeader({ ...header, headerLayout: e.target.value as 'default' | 'centered' | 'split' | 'minimal' })}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="default">Default</option>
                      <option value="centered">Centered</option>
                      <option value="split">Split</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </Card>
              )}

              {activeTab === "navigation" && (
                <Card className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Navigation Menu</h2>
                    <p className="text-sm text-gray-600">Customize navigation appearance</p>
                  </div>

                  <div>
                    <Label>Menu Style</Label>
                    <select
                      value={header.navMenuStyle}
                      onChange={(e) => setHeader({ ...header, navMenuStyle: e.target.value as 'default' | 'underline' | 'pills' | 'bordered' })}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="default">Default</option>
                      <option value="underline">Underline</option>
                      <option value="pills">Pills</option>
                      <option value="bordered">Bordered</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Spacing</Label>
                      <select
                        value={header.navMenuSpacing}
                        onChange={(e) => setHeader({ ...header, navMenuSpacing: e.target.value as 'compact' | 'normal' | 'relaxed' })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Relaxed</option>
                      </select>
                    </div>

                    <div>
                      <Label>Font Size</Label>
                      <select
                        value={header.navMenuFontSize}
                        onChange={(e) => setHeader({ ...header, navMenuFontSize: e.target.value as 'sm' | 'md' | 'lg' })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>

                    <div>
                      <Label>Font Weight</Label>
                      <select
                        value={header.navMenuFontWeight}
                        onChange={(e) => setHeader({ ...header, navMenuFontWeight: e.target.value as 'normal' | 'medium' | 'semibold' | 'bold' })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="normal">Normal</option>
                        <option value="medium">Medium</option>
                        <option value="semibold">Semibold</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === "mobile" && (
                <MobileSettingsSection header={header} setHeader={setHeader} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
