'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeSettings } from '@/lib/settings';

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (newTheme: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme: ThemeSettings;
}

export default function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeSettings>(initialTheme);

  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  // Only poll for theme updates on admin/theme pages
  useEffect(() => {
    // Check if we're on admin theme pages
    const isThemePage = typeof window !== 'undefined' && 
      (window.location.pathname === '/admin/theme' || 
       window.location.pathname.startsWith('/admin/theme/'));
    
    if (!isThemePage) {
      return; // Don't poll on non-theme pages
    }

    const fetchLatestTheme = async () => {
      try {
        const [themeRes, appearanceRes] = await Promise.all([
          fetch('/api/admin/settings/theme', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).catch(() => null),
          fetch('/api/admin/settings/appearance', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).catch(() => null)
        ]);
        
        // Only update if both requests succeeded
        if (themeRes?.ok && appearanceRes?.ok) {
          const latestTheme = await themeRes.json();
          const latestAppearance = await appearanceRes.json();
          
          // Merge appearance colors into theme
          setTheme({
            ...latestTheme,
            primaryColor: latestAppearance.primaryColor,
            secondaryColor: latestAppearance.secondaryColor,
          });
        }
      } catch {
        // Silently fail - use initial theme
        console.warn('Could not fetch latest theme, using initial theme');
      }
    };
    
    // Poll for changes every 10 seconds (reduced from 5)
    const interval = setInterval(fetchLatestTheme, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Apply theme to CSS custom properties (only when theme changes from admin)
  useEffect(() => {
    // Skip initial render - CSS variables are already set on body by layout.tsx
    // Only update when theme actually changes (e.g., from admin panel)
    if (theme === initialTheme) {
      return;
    }

    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--theme-primary', theme.primaryColor || '#0070f3');
    root.style.setProperty('--theme-secondary', theme.secondaryColor || '#6c757d');
    root.style.setProperty('--theme-accent', theme.accentColor || '#ff6b35');
    root.style.setProperty('--theme-background', theme.backgroundColor || '#ffffff');
    root.style.setProperty('--theme-text', theme.textColor || '#1a1a1a');
    root.style.setProperty('--theme-header-background', theme.headerBackgroundColor || '#ffffff');
    root.style.setProperty('--theme-header-text', theme.headerTextColor || '#1a1a1a');
    root.style.setProperty('--theme-footer-background', theme.footerBackgroundColor || '#1a1a1a');
    root.style.setProperty('--theme-footer-text', theme.footerTextColor || '#ffffff');

    // Apply border radius
    const radiusMap: Record<string, string> = {
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    };
    root.style.setProperty('--theme-radius', radiusMap[theme.borderRadius] || '0.375rem');

    // Apply font family
    root.style.setProperty('--theme-font', theme.fontFamily || 'Inter, sans-serif');

    // Apply dark mode
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, initialTheme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}