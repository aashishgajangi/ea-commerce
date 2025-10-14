"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft } from "lucide-react";

interface FooterSettings {
  text: string;
  showSocial: boolean;
  copyrightText: string;
  showPaymentMethods: boolean;
}

export default function FooterSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [footer, setFooter] = useState<FooterSettings>({
    text: "",
    showSocial: true,
    copyrightText: "",
    showPaymentMethods: true,
  });

  // Fetch footer settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();

      setFooter(prev => ({ ...prev, ...data.footer }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save settings
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/admin/settings/footer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footer),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setSuccess("Footer settings saved successfully!");
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
        <div className="text-center py-12">Loading footer settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/theme">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Theme
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Footer Settings</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Configure your site footer appearance and content</p>
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
              <CardTitle>Footer Configuration</CardTitle>
              <CardDescription>Customize your footer content and display options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Content</h3>
                
                <div>
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input
                    id="footerText"
                    value={footer.text}
                    onChange={(e) => setFooter({ ...footer, text: e.target.value })}
                    placeholder="Thank you for shopping with us!"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional text to display in the footer
                  </p>
                </div>

                <div>
                  <Label htmlFor="copyrightText">Copyright Text</Label>
                  <Input
                    id="copyrightText"
                    value={footer.copyrightText}
                    onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
                    placeholder="© 2024 My Store. All rights reserved."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Copyright notice displayed at the bottom of the footer
                  </p>
                </div>
              </div>

              {/* Display Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Display Options</h3>
                
                <div className="space-y-3">
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
                  <p className="text-xs text-gray-500 ml-6">
                    Display social media icons in the footer (configure links in Settings → Social Media)
                  </p>

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
                  <p className="text-xs text-gray-500 ml-6">
                    Display accepted payment method icons in the footer
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSave} disabled={saving} size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Footer Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
