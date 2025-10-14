import Link from 'next/link';
import Image from 'next/image';
import { getMenuByLocation } from '@/lib/menus';
import { getAllSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import { config, ConfigKeys } from '@/lib/config';
import { Search } from 'lucide-react';
import MobileMenu from './MobileMenu';
import AuthLinks from '@/components/auth/AuthLinks';
import AnnouncementBar from './AnnouncementBar';

export default async function Header() {
  // Get settings
  const settings = await getAllSettings();
  const siteName = await config.get(ConfigKeys.SITE_NAME) || 'My Store';
  const tagline = await config.get('tagline') || '';
  
  // Get logo if exists
  let logo = null;
  if (settings.appearance.logoId) {
    logo = await db.media.findUnique({
      where: { id: settings.appearance.logoId },
    });
  }

  // Get header menu
  const menu = await getMenuByLocation('header');

  // Header height classes
  const heightClasses = {
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-8'
  };

  // Header style classes
  const styleClasses = {
    normal: 'border-b',
    bold: 'border-b-2 shadow-lg',
    minimal: 'border-b border-gray-200',
    modern: 'border-b-2 rounded-b-lg shadow-md'
  };

  const stickyClass = settings.header.sticky
    ? 'sticky top-0 z-40 backdrop-blur-sm'
    : '';

  // Pass icon names as strings to client components
  const hamburgerIconName = settings.header.hamburgerIcon || 'menu';
  const accountIconName = settings.header.accountIcon || 'user';

  // Navigation menu style classes
  const navSpacingClasses = {
    compact: 'gap-3',
    normal: 'gap-6',
    relaxed: 'gap-8'
  };

  const navFontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const navFontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const navStyleClasses = {
    default: '',
    underline: 'hover:underline underline-offset-4',
    pills: 'px-3 py-1.5 rounded-full hover:bg-opacity-10 hover:bg-current',
    bordered: 'px-3 py-1.5 border border-current border-opacity-20 rounded hover:border-opacity-40'
  };

  const navMenuStyle = settings.header.navMenuStyle || 'default';
  const navMenuSpacing = settings.header.navMenuSpacing || 'normal';
  const navMenuFontSize = settings.header.navMenuFontSize || 'md';
  const navMenuFontWeight = settings.header.navMenuFontWeight || 'medium';

  // Header layout configuration
  const headerLayout = settings.header.headerLayout || 'default';
  const navigationPosition = settings.header.navigationPosition || 'center';

  // Layout classes based on header layout setting
  const getLayoutClasses = () => {
    switch (headerLayout) {
      case 'centered':
        return 'flex-col items-center gap-4';
      case 'split':
        return 'flex-row items-center justify-between';
      case 'minimal':
        return 'flex-row items-center gap-8';
      default:
        return 'flex-row items-center justify-between';
    }
  };

  // Position classes for navigation
  const navPositionClass = navigationPosition === 'center' ? 'mx-auto' : navigationPosition === 'right' ? 'ml-auto' : '';

  return (
    <>
      {/* Announcement Bar */}
      {settings.header.showAnnouncementBar && settings.header.announcementText && (
        <AnnouncementBar
          text={settings.header.announcementText}
          bgColor={settings.header.announcementBgColor || '#0070f3'}
          textColor={settings.header.announcementTextColor || '#ffffff'}
          link={settings.header.announcementLink}
          closeable={settings.header.announcementCloseable !== false}
        />
      )}

      <header
        className={`${styleClasses[settings.header.headerStyle]} ${stickyClass} relative`}
        style={{
          backgroundColor: 'var(--theme-header-background)',
          borderColor: 'var(--theme-header-text)',
        }}
      >
      <div className={`container mx-auto px-4 ${heightClasses[settings.header.headerHeight]}`}>
        <div className={`flex ${getLayoutClasses()}`}>
          {/* Logo & Site Name */}
          <Link href="/" className="flex items-center gap-3">
            {settings.header.showLogoImage && logo && (
              <Image
                src={logo.path}
                alt={logo.alt || siteName}
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                unoptimized={true}
              />
            )}
            {settings.header.showLogoText && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--theme-header-text)' }}>
                  {settings.header.logoText || siteName}
                </h1>
                {settings.header.showTagline && tagline && (
                  <p className="text-sm" style={{ color: 'var(--theme-header-text)' }}>{tagline}</p>
                )}
              </div>
            )}
            {!settings.header.showLogoImage && !settings.header.showLogoText && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--theme-header-text)' }}>{siteName}</h1>
                {settings.header.showTagline && tagline && (
                  <p className="text-sm" style={{ color: 'var(--theme-header-text)' }}>{tagline}</p>
                )}
              </div>
            )}
          </Link>

          {/* Desktop Navigation Menu */}
          {menu && menu.items && menu.items.length > 0 && (
            <nav className={`hidden md:flex items-center ${navSpacingClasses[navMenuSpacing]} ${navPositionClass}`}>
              {menu.items.map((item) => {
                const href = item.type === 'page' && item.page
                  ? item.page.slug === '' ? '/' : `/${item.page.slug}`
                  : item.url || '#';

                return (
                  <Link
                    key={item.id}
                    href={href}
                    target={item.target}
                    className={`
                      ${navFontSizeClasses[navMenuFontSize]}
                      ${navFontWeightClasses[navMenuFontWeight]}
                      ${navStyleClasses[navMenuStyle]}
                      hover:opacity-80 transition-all
                      ${item.cssClass || ''}
                    `}
                    style={{
                      color: 'var(--theme-header-text)',
                      textDecorationColor: 'var(--theme-primary)'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Side: Search, Auth, Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            {settings.header.showSearch && (
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--theme-text)' }} />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 w-64"
                    style={{
                      borderColor: 'var(--theme-text)',
                      backgroundColor: 'var(--theme-background)',
                      color: 'var(--theme-text)',
                      '--tw-ring-color': 'var(--theme-primary)'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}

            {/* Auth Links */}
            <AuthLinks accountIconName={accountIconName} />

            {/* Mobile Menu Button */}
            {menu && menu.items && menu.items.length > 0 && (
              <MobileMenu
                menuItems={menu.items}
                hamburgerIconName={hamburgerIconName}
                mobileMenuStyle={settings.header.mobileMenuStyle || 'slide'}
                mobileMenuPosition={settings.header.mobileMenuPosition || 'right'}
                mobileMenuAnimation={settings.header.mobileMenuAnimation || 'slide'}
                showMobileSearch={settings.header.showMobileSearch !== false}
                mobileMenuListStyle={settings.header.mobileMenuListStyle || 'default'}
              />
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}