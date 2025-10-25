'use client';
// All sections made smaller - v2.5.0

import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

interface HeaderSettings {
  mobileMenuStyle: 'dropdown' | 'fullscreen';
  mobileMenuAnimation: 'fade' | 'slide' | 'scale';
  hamburgerIcon: 'menu' | 'bars' | 'grid' | 'list' | 'more';
  accountIcon: 'user' | 'person' | 'profile' | 'account' | 'avatar';
  showMobileSearch: boolean;
  mobileMenuListStyle: 'default' | 'bordered' | 'pills' | 'cards' | 'minimal' | 'underline' | 'gradient' | 'outlined' | 'divided' | 'compact' | 'spacious' | 'modern';
}

interface MobileSettingsSectionProps {
  header: HeaderSettings;
  setHeader: React.Dispatch<React.SetStateAction<HeaderSettings & {
    showLogoImage: boolean;
    showLogoText: boolean;
    logoText: string;
    logoImageSize: 'sm' | 'md' | 'lg' | 'xl';
    logoTextSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    showTagline: boolean;
    showSearch: boolean;
    sticky: boolean;
    headerHeight: 'sm' | 'md' | 'lg' | 'xl';
    headerStyle: 'normal' | 'bold' | 'minimal' | 'modern';
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
  }>>;
}

export default function MobileSettingsSection({ header, setHeader }: MobileSettingsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="p-4 rounded-lg border-2 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary)15, var(--theme-secondary)15)',
          borderColor: 'var(--theme-primary)40'
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="p-2 rounded-xl shadow-lg"
            style={{ backgroundColor: 'var(--theme-primary)', color: '#ffffff' }}
          >
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Mobile Menu Settings
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Configure how your mobile navigation menu behaves and appears on smaller screens. 
              All settings automatically use your theme colors for a consistent design.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Style Section */}
      <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--theme-primary)20' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Menu Display Style</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose how the mobile menu appears</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown Option */}
            <div
              onClick={() => setHeader(prev => ({ ...prev, mobileMenuStyle: 'dropdown' }))}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                header.mobileMenuStyle === 'dropdown'
                  ? 'shadow-lg transform scale-105'
                  : 'hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              style={{
                borderColor: header.mobileMenuStyle === 'dropdown' ? 'var(--theme-primary)' : undefined,
                backgroundColor: header.mobileMenuStyle === 'dropdown' ? 'var(--theme-primary)10' : undefined
              }}
            >
              {header.mobileMenuStyle === 'dropdown' && (
                <div 
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <div className="mb-1.5 flex justify-center">
                  <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <svg className="w-2.5 h-2.5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Dropdown</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Drops down from the top</p>
              </div>
            </div>

            {/* Fullscreen Option */}
            <div
              onClick={() => setHeader(prev => ({ ...prev, mobileMenuStyle: 'fullscreen' }))}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                header.mobileMenuStyle === 'fullscreen'
                  ? 'shadow-lg transform scale-105'
                  : 'hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              style={{
                borderColor: header.mobileMenuStyle === 'fullscreen' ? 'var(--theme-primary)' : undefined,
                backgroundColor: header.mobileMenuStyle === 'fullscreen' ? 'var(--theme-primary)10' : undefined
              }}
            >
              {header.mobileMenuStyle === 'fullscreen' && (
                <div 
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <div className="mb-1.5 flex justify-center">
                  <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <svg className="w-2.5 h-2.5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Fullscreen</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Covers entire screen</p>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Animation Settings */}
      <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--theme-secondary)20' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Animation Effects</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose how the menu animates in and out</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'fade', emoji: '✨', label: 'Fade', desc: 'Smooth fade in/out' },
              { value: 'slide', emoji: '➡️', label: 'Slide', desc: 'Slide motion effect' },
              { value: 'scale', emoji: '🔍', label: 'Scale', desc: 'Zoom in/out effect' }
            ].map(animation => (
              <div
                key={animation.value}
                onClick={() => setHeader(prev => ({ ...prev, mobileMenuAnimation: animation.value as 'fade' | 'slide' | 'scale' }))}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  header.mobileMenuAnimation === animation.value ? 'shadow-lg transform scale-105' : ''
                }`}
                style={{
                  borderColor: header.mobileMenuAnimation === animation.value ? 'var(--theme-secondary)' : undefined,
                  backgroundColor: header.mobileMenuAnimation === animation.value ? 'var(--theme-secondary)10' : undefined
                }}
              >
                <div className="text-center">
                  <div className="mb-1 flex justify-center">
                    <div 
                      className="p-1 rounded-lg"
                      style={{
                        backgroundColor: header.mobileMenuAnimation === animation.value 
                          ? 'var(--theme-secondary)20' 
                          : undefined
                      }}
                    >
                      <span className="text-lg">{animation.emoji}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{animation.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{animation.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Icons & Features */}
      <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--theme-accent)20' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Icons & Features</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Customize icon styles and menu features</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hamburger Icon */}
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block flex items-center gap-2">
                <span>🍔</span> Hamburger Icon Style
              </Label>
              <div className="space-y-2">
                {[
                  { value: 'menu', icon: '☰', label: 'Menu' },
                  { value: 'bars', icon: '≡', label: 'Bars' },
                  { value: 'grid', icon: '⊞', label: 'Grid' },
                  { value: 'list', icon: '☰', label: 'List' },
                  { value: 'more', icon: '⋯', label: 'More' }
                ].map(option => (
                  <div
                    key={option.value}
                    onClick={() => setHeader(prev => ({ ...prev, hamburgerIcon: option.value as 'menu' | 'bars' | 'grid' | 'list' | 'more' }))}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-sm`}
                    style={{
                      borderColor: header.hamburgerIcon === option.value ? 'var(--theme-accent)' : undefined,
                      backgroundColor: header.hamburgerIcon === option.value ? 'var(--theme-accent)10' : undefined
                    }}
                  >
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold`}
                      style={{
                        backgroundColor: header.hamburgerIcon === option.value ? 'var(--theme-accent)' : undefined,
                        color: header.hamburgerIcon === option.value ? '#ffffff' : undefined
                      }}
                    >
                      {option.icon}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{option.label}</span>
                    {header.hamburgerIcon === option.value && (
                      <svg className="w-4 h-4 ml-auto" style={{ color: 'var(--theme-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Icon */}
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block flex items-center gap-2">
                <span>👤</span> Account Icon Style
              </Label>
              <div className="space-y-2">
                {[
                  { value: 'user', icon: '👤', label: 'User' },
                  { value: 'person', icon: '👨', label: 'Person' },
                  { value: 'profile', icon: '👤', label: 'Profile' },
                  { value: 'account', icon: '🔐', label: 'Account' },
                  { value: 'avatar', icon: '🙂', label: 'Avatar' }
                ].map(option => (
                  <div
                    key={option.value}
                    onClick={() => setHeader(prev => ({ ...prev, accountIcon: option.value as 'user' | 'person' | 'profile' | 'account' | 'avatar' }))}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-sm`}
                    style={{
                      borderColor: header.accountIcon === option.value ? 'var(--theme-accent)' : undefined,
                      backgroundColor: header.accountIcon === option.value ? 'var(--theme-accent)10' : undefined
                    }}
                  >
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg`}
                      style={{
                        backgroundColor: header.accountIcon === option.value ? 'var(--theme-accent)' : undefined
                      }}
                    >
                      {option.icon}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{option.label}</span>
                    {header.accountIcon === option.value && (
                      <svg className="w-4 h-4 ml-auto" style={{ color: 'var(--theme-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show Mobile Search Toggle */}
          <div 
            className="p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-sm"
            onClick={() => setHeader(prev => ({ ...prev, showMobileSearch: !prev.showMobileSearch }))}
            style={{
              borderColor: header.showMobileSearch ? 'var(--theme-primary)' : undefined,
              backgroundColor: header.showMobileSearch ? 'var(--theme-primary)10' : undefined
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className={`w-12 h-7 rounded-full transition-all relative ${
                  header.showMobileSearch ? 'bg-opacity-100' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                style={{
                  backgroundColor: header.showMobileSearch ? 'var(--theme-primary)' : undefined
                }}
              >
                <div
                  className={`absolute top-1.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                    header.showMobileSearch ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">Show Search Bar</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Display search input in mobile menu</div>
              </div>
              <div className="text-lg">{header.showMobileSearch ? '🔍' : '❌'}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Menu List Style */}
      <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--theme-primary)20' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Menu List Style</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose how menu items are displayed</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { value: 'default', icon: '📄', label: 'Default', desc: 'Simple list' },
              { value: 'bordered', icon: '📐', label: 'Bordered', desc: 'Left accent' },
              { value: 'pills', icon: '💊', label: 'Pills', desc: 'Rounded' },
              { value: 'cards', icon: '🗂️', label: 'Cards', desc: 'Elevated' },
              { value: 'minimal', icon: '▫️', label: 'Minimal', desc: 'Clean' },
              { value: 'underline', icon: '＿', label: 'Underline', desc: 'Bottom line' },
              { value: 'gradient', icon: '🌈', label: 'Gradient', desc: 'Color fade' },
              { value: 'outlined', icon: '⬜', label: 'Outlined', desc: 'Full border' },
              { value: 'divided', icon: '━', label: 'Divided', desc: 'Separators' },
              { value: 'compact', icon: '▪️', label: 'Compact', desc: 'Dense list' },
              { value: 'spacious', icon: '◻️', label: 'Spacious', desc: 'Wide gaps' },
              { value: 'modern', icon: '✨', label: 'Modern', desc: 'Sleek look' }
            ].map(style => (
              <button
                key={style.value}
                type="button"
                onClick={() => {
                  console.log('Clicked style:', style.value);
                  const listStyle = style.value as HeaderSettings['mobileMenuListStyle'];
                  setHeader(prev => ({ ...prev, mobileMenuListStyle: listStyle }));
                }}
                className={`p-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md w-full ${
                  header.mobileMenuListStyle === style.value ? 'shadow-lg ring-2 ring-primary ring-offset-1' : ''
                }`}
                style={{
                  borderColor: header.mobileMenuListStyle === style.value ? 'var(--theme-primary)' : '#e2e8f0',
                  backgroundColor: header.mobileMenuListStyle === style.value ? 'var(--theme-primary)10' : undefined
                }}
              >
                <div className="text-center">
                  <div className="mb-0.5 text-sm">{style.icon}</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-0.5 text-xs">{style.label}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{style.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-400 mt-0.5">ℹ️</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Preview:</strong> Menu list styles affect how individual menu items appear in the mobile menu.
                  Try different styles to match your brand aesthetics!
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Banner */}
      <div 
        className="p-5 rounded-xl border-2 shadow-sm"
        style={{
          backgroundColor: 'var(--theme-primary)10',
          borderColor: 'var(--theme-primary)30'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl">🎨</div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              Automatic Theme Synchronization
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your mobile menu automatically inherits colors from your main theme settings. 
              Background, text, and accent colors are seamlessly applied to ensure a cohesive 
              design across all devices. Change your theme colors in the main Theme Settings 
              to update the mobile menu appearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
