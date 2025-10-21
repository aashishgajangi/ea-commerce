'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Smartphone, Monitor, Square, Maximize2, RotateCw, Palette } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PWASettings {
  enabled: boolean;
  appName: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  displayMode: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'portrait' | 'landscape';
  iconId: string | null;
  icon192Id: string | null;
  enableOfflineMode: boolean;
  enablePushNotifications: boolean;
  installPromptEnabled: boolean;
  installPromptDelay: number;
}

export default function PWASettingsPage() {
  const [settings, setSettings] = useState<PWASettings>({
    enabled: false,
    appName: 'My Store',
    shortName: 'Store',
    description: 'Shop our amazing products on the go',
    themeColor: '#10b981',
    backgroundColor: '#ffffff',
    displayMode: 'standalone',
    orientation: 'any',
    iconId: null,
    icon192Id: null,
    enableOfflineMode: true,
    enablePushNotifications: false,
    installPromptEnabled: true,
    installPromptDelay: 5,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [selectingIconType, setSelectingIconType] = useState<'512' | '192' | null>(null);
  const [media, setMedia] = useState<Array<{id: string; url: string; altText?: string}>>([]);

  useEffect(() => {
    loadSettings();
    loadMedia();
  }, []);

  async function loadSettings() {
    try {
      const response = await fetch('/api/admin/settings/pwa');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load PWA settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMedia() {
    try {
      const response = await fetch('/api/admin/media?limit=100');
      if (response.ok) {
        const data = await response.json();
        setMedia(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings/pwa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('PWA settings saved successfully!');
      } else {
        alert('Failed to save PWA settings');
      }
    } catch (error) {
      console.error('Failed to save PWA settings:', error);
      alert('Failed to save PWA settings');
    } finally {
      setSaving(false);
    }
  }

  function handleSelectIcon(mediaId: string) {
    if (selectingIconType === '512') {
      setSettings({ ...settings, iconId: mediaId });
    } else if (selectingIconType === '192') {
      setSettings({ ...settings, icon192Id: mediaId });
    }
    setShowMediaLibrary(false);
    setSelectingIconType(null);
  }

  const selectedIcon512 = media.find(m => m.id === settings.iconId);
  const selectedIcon192 = media.find(m => m.id === settings.icon192Id);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">PWA Settings</h1>
            <p className="text-gray-600 mt-1">
              Configure your Progressive Web App settings
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enable PWA */}
          <Card>
            <CardHeader>
              <CardTitle>Enable PWA</CardTitle>
              <CardDescription>
                Allow users to install your store as an app on their devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="font-medium">Enable Progressive Web App</span>
              </label>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                App name and description shown to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  App Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="My Store"
                  maxLength={45}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Full name displayed under the app icon ({settings.appName.length}/45)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Short Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={settings.shortName}
                  onChange={(e) => setSettings({ ...settings, shortName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Store"
                  maxLength={12}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Short name for home screen ({settings.shortName.length}/12)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Shop our amazing products on the go"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Brief description of your app ({settings.description.length}/200)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* App Icons */}
          <Card>
            <CardHeader>
              <CardTitle>App Icons</CardTitle>
              <CardDescription>
                Icons shown on user&apos;s home screen and app launcher
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 512x512 Icon */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Icon (512x512) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {selectedIcon512 ? (
                    <div className="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={selectedIcon512.url}
                        alt="App Icon"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Button
                      onClick={() => {
                        setSelectingIconType('512');
                        setShowMediaLibrary(true);
                      }}
                      variant="outline"
                    >
                      {selectedIcon512 ? 'Change Icon' : 'Select Icon'}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Required size: 512x512px (PNG or JPG)
                    </p>
                  </div>
                </div>
              </div>

              {/* 192x192 Icon */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Small Icon (192x192) <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  {selectedIcon192 ? (
                    <div className="relative w-16 h-16 border-2 border-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={selectedIcon192.url}
                        alt="Small Icon"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Button
                      onClick={() => {
                        setSelectingIconType('192');
                        setShowMediaLibrary(true);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      {selectedIcon192 ? 'Change Icon' : 'Select Icon'}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended size: 192x192px
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Colors and display settings for your app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.themeColor}
                      onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.themeColor}
                      onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="#10b981"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Status bar and browser theme color
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="#ffffff"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Splash screen background
                  </p>
                </div>
              </div>

              {/* Display Mode */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'standalone', label: 'Standalone', icon: Smartphone, desc: 'Like a native app' },
                    { value: 'fullscreen', label: 'Fullscreen', icon: Maximize2, desc: 'No browser UI' },
                    { value: 'minimal-ui', label: 'Minimal UI', icon: Monitor, desc: 'Minimal browser UI' },
                    { value: 'browser', label: 'Browser', icon: Square, desc: 'Normal browser' },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => setSettings({ ...settings, displayMode: mode.value as PWASettings['displayMode'] })}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          settings.displayMode === mode.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{mode.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{mode.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Orientation */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Screen Orientation
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'any', label: 'Any', icon: RotateCw },
                    { value: 'portrait', label: 'Portrait', icon: Smartphone },
                    { value: 'landscape', label: 'Landscape', icon: Monitor },
                  ].map((orient) => {
                    const Icon = orient.icon;
                    return (
                      <button
                        key={orient.value}
                        type="button"
                        onClick={() => setSettings({ ...settings, orientation: orient.value as PWASettings['orientation'] })}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          settings.orientation === orient.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">{orient.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Additional PWA capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableOfflineMode}
                  onChange={(e) => setSettings({ ...settings, enableOfflineMode: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 mt-0.5"
                />
                <div className="flex-1">
                  <div className="font-medium">Offline Mode</div>
                  <p className="text-sm text-gray-500">
                    Cache pages for offline access (recommended)
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enablePushNotifications}
                  onChange={(e) => setSettings({ ...settings, enablePushNotifications: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 mt-0.5"
                />
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    Push Notifications
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Coming Soon</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Send notifications to users (requires setup)
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.installPromptEnabled}
                  onChange={(e) => setSettings({ ...settings, installPromptEnabled: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 mt-0.5"
                />
                <div className="flex-1">
                  <div className="font-medium">Install Prompt</div>
                  <p className="text-sm text-gray-500">
                    Show &quot;Install App&quot; button to users
                  </p>
                </div>
              </label>

              {settings.installPromptEnabled && (
                <div className="ml-8 mt-2">
                  <label className="block text-sm font-medium mb-2">
                    Prompt Delay (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.installPromptDelay}
                    onChange={(e) => setSettings({ ...settings, installPromptDelay: parseInt(e.target.value) || 5 })}
                    className="w-32 px-3 py-2 border rounded-lg"
                    min="0"
                    max="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Wait this many seconds before showing the install prompt
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Phone Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">App Preview</CardTitle>
                <CardDescription>How your app will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Phone Mockup */}
                  <div className="mx-auto w-64 h-[500px] bg-black rounded-[2.5rem] p-3 shadow-2xl">
                    <div 
                      className="w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
                      style={{ backgroundColor: settings.backgroundColor }}
                    >
                      {/* Status Bar */}
                      <div 
                        className="h-8 flex items-center justify-between px-4 text-white text-xs"
                        style={{ backgroundColor: settings.themeColor }}
                      >
                        <span>9:41</span>
                        <span>⚡ 📶</span>
                      </div>
                      
                      {/* App Content */}
                      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white">
                        {selectedIcon512 ? (
                          <div className="relative w-20 h-20 mb-3">
                            <Image
                              src={selectedIcon512.url}
                              alt="App Icon"
                              fill
                              className="object-cover rounded-2xl"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mb-3">
                            <Smartphone className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <h3 className="font-bold text-lg mb-1">{settings.appName}</h3>
                        <p className="text-xs text-gray-500 text-center">{settings.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Display:</span>
                      <span className="font-medium capitalize">{settings.displayMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Orientation:</span>
                      <span className="font-medium capitalize">{settings.orientation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Offline:</span>
                      <span className="font-medium">{settings.enableOfflineMode ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <p>Use a square icon (512x512px)</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <p>Keep app name under 12 characters</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <p>Test on real Android device</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <p>Use HTTPS in production</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Select Icon ({selectingIconType === '512' ? '512x512' : '192x192'})
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowMediaLibrary(false);
                  setSelectingIconType(null);
                }}
              >
                Close
              </Button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-4 gap-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectIcon(item.id)}
                    className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors"
                  >
                    <Image
                      src={item.url}
                      alt={item.altText || 'Media'}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              {media.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No images found. Upload images in Media Library first.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
