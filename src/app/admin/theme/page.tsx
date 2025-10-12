"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft } from "lucide-react";

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

  // Fetch theme settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      setTheme(prev => ({ ...prev, ...data.theme }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save theme settings
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/admin/settings/theme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });

      if (!response.ok) throw new Error("Failed to save theme settings");

      setSuccess("Theme settings saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save theme settings");
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
              <p className="text-slate-600 dark:text-slate-400 mt-2">Customize your site&apos;s colors and styling</p>
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

              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Theme Settings"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
