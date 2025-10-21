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

type TabType = "general" | "social";

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
              <p className="text-slate-600 dark:text-slate-400 mt-2">Manage general site settings and social media links</p>
              <div className="flex gap-4 mt-2 text-xs">
                <p className="text-slate-500 dark:text-slate-500">
                  💡 <Link href="/admin/theme" className="text-blue-500 hover:underline">Theme Settings</Link>
                </p>
                <p className="text-slate-500 dark:text-slate-500">
                  💬 <Link href="/admin/settings/whatsapp" className="text-green-500 hover:underline">WhatsApp Widget</Link>
                </p>
              </div>
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
        </div>
      </div>
    </div>
  );
}
