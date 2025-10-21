'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [settings, setSettings] = useState<{
    enabled: boolean;
    themeColor: string;
    appName: string;
    installPromptEnabled: boolean;
    installPromptDelay: number;
  } | null>(null);

  useEffect(() => {
    loadSettings();
    checkIfInstalled();
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (deferredPrompt && settings?.installPromptEnabled && !isInstalled) {
      // Show prompt after delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, (settings.installPromptDelay || 5) * 1000);

      return () => clearTimeout(timer);
    }
  }, [deferredPrompt, settings, isInstalled]);

  async function loadSettings() {
    try {
      const response = await fetch('/api/pwa/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load PWA settings:', error);
    }
  }

  function checkIfInstalled() {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response: ${outcome}`);

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    // Clear the prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  }

  function handleDismiss() {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  }

  // Don't show if:
  // - Settings not loaded
  // - PWA disabled
  // - Already installed
  // - No prompt available
  // - User dismissed
  // - Install prompt disabled
  if (
    !settings ||
    !settings.enabled ||
    isInstalled ||
    !deferredPrompt ||
    !showPrompt ||
    !settings.installPromptEnabled ||
    sessionStorage.getItem('pwa-prompt-dismissed')
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-slide-up">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 p-4 flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Install {settings.appName}</h3>
          <p className="text-sm text-gray-600">
            Install our app for a better experience!
          </p>
        </div>
        <button
          onClick={handleInstallClick}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 whitespace-nowrap"
          style={{ backgroundColor: settings.themeColor }}
        >
          <Download className="w-4 h-4" />
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
