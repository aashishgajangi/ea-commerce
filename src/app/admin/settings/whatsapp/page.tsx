"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ArrowLeft, MessageCircle } from "lucide-react";

interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  message: string;
  position: 'bottom-left' | 'bottom-right';
  backgroundColor: string;
  iconColor: string;
  showAnimation: boolean;
}

export default function WhatsAppSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [settings, setSettings] = useState<WhatsAppSettings>({
    enabled: false,
    phoneNumber: "",
    message: "Hello! I'm interested in your products.",
    position: "bottom-right",
    backgroundColor: "#25D366",
    iconColor: "#ffffff",
    showAnimation: true,
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/settings/whatsapp");
        if (!response.ok) throw new Error("Failed to fetch settings");

        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/admin/settings/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setSuccess("WhatsApp settings saved successfully!");
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
        <div className="text-center py-12">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="h-8 w-8" />
                WhatsApp Widget
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Configure WhatsApp chat widget for customer support
              </p>
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

          {/* Main Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Configuration</CardTitle>
              <CardDescription>
                Enable and configure the floating WhatsApp chat button on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="text-base font-semibold">Enable WhatsApp Widget</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Show the WhatsApp chat button on your website
                  </p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Animation Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="text-base font-semibold">Pulse Animation</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Show animated pulse effect around the button
                  </p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, showAnimation: !settings.showAnimation })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showAnimation ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showAnimation ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber">WhatsApp Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  placeholder="e.g., +1234567890"
                  className="mt-2"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Include country code (e.g., +91 for India, +1 for USA)
                </p>
              </div>

              {/* Default Message */}
              <div>
                <Label htmlFor="message">Default Message</Label>
                <Textarea
                  id="message"
                  value={settings.message}
                  onChange={(e) => setSettings({ ...settings, message: e.target.value })}
                  placeholder="Hello! I'm interested in your products."
                  rows={3}
                  className="mt-2"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This message will be pre-filled when customers click the WhatsApp button
                </p>
              </div>

              {/* Position Selection */}
              <div>
                <Label>Widget Position</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    onClick={() => setSettings({ ...settings, position: "bottom-left" })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      settings.position === "bottom-left"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold mb-1">Bottom Left</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Widget appears on the left side
                    </div>
                  </button>
                  <button
                    onClick={() => setSettings({ ...settings, position: "bottom-right" })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      settings.position === "bottom-right"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold mb-1">Bottom Right</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Widget appears on the right side
                    </div>
                  </button>
                </div>
              </div>

              {/* Color Customization */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      placeholder="#25D366"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Default: #25D366 (WhatsApp Green)
                  </p>
                </div>
                <div>
                  <Label htmlFor="iconColor">Icon Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="iconColor"
                      type="color"
                      value={settings.iconColor}
                      onChange={(e) => setSettings({ ...settings, iconColor: e.target.value })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={settings.iconColor}
                      onChange={(e) => setSettings({ ...settings, iconColor: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Default: #ffffff (White)
                  </p>
                </div>
              </div>

              {/* Preview */}
              {settings.enabled && settings.phoneNumber && (
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Label className="text-sm font-semibold mb-3 block">Preview</Label>
                  <div className="relative h-32 bg-white dark:bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      className={`absolute bottom-2 ${
                        settings.position === "bottom-left" ? "left-2" : "right-2"
                      }`}
                    >
                      <div className="relative">
                        <div
                          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center relative z-10"
                          style={{ backgroundColor: settings.backgroundColor }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7"
                            style={{ color: settings.iconColor }}
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </div>
                        {settings.showAnimation && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping opacity-75"
                            style={{ backgroundColor: settings.backgroundColor }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <Button onClick={handleSave} disabled={saving} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>✅ The WhatsApp button will appear on all public pages when enabled</p>
              <p>✅ Customers can click to start a chat with your WhatsApp number</p>
              <p>✅ The default message will be pre-filled for convenience</p>
              <p>✅ Fully responsive and works on all devices</p>
              <p className="text-amber-600 dark:text-amber-400">
                ⚠️ Make sure to include the country code in your phone number
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
