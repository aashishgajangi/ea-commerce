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

  // Fetch latest theme settings on mount
  useEffect(() => {
    const fetchLatestTheme = async () => {
      try {
        const response = await fetch('/api/admin/settings/theme');
        if (response.ok) {
          const latestTheme = await response.json();
          setTheme(latestTheme);
        }
      } catch (error) {
        console.error('Failed to fetch latest theme:', error);
      }
    };

    fetchLatestTheme();
  }, []);

  // Apply theme to CSS custom properties
  useEffect(() => {
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
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}