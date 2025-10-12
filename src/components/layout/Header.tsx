import Link from 'next/link';
import Image from 'next/image';
import { getMenuByLocation } from '@/lib/menus';
import { getAllSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import { config, ConfigKeys } from '@/lib/config';
import { Search } from 'lucide-react';
import MobileMenu from './MobileMenu';
import AuthLinks from '@/components/auth/AuthLinks';

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
    ? 'sticky top-0 z-50 backdrop-blur-sm'
    : '';

  // Pass icon names as strings to client components
  const hamburgerIconName = settings.header.hamburgerIcon;
  const accountIconName = settings.header.accountIcon;

  return (
    <header
      className={`${styleClasses[settings.header.headerStyle]} ${stickyClass} relative`}
      style={{
        backgroundColor: 'var(--theme-header-background)',
        borderColor: 'var(--theme-header-text)',
      }}
    >
      <div className={`container mx-auto px-4 ${heightClasses[settings.header.headerHeight]}`}>
        <div className="flex items-center justify-between">
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
            <nav className="hidden md:flex items-center gap-6">
              {menu.items.map((item) => {
                const href = item.type === 'page' && item.page
                  ? item.page.slug === '' ? '/' : `/${item.page.slug}`
                  : item.url || '#';

                return (
                  <Link
                    key={item.id}
                    href={href}
                    target={item.target}
                    className={`font-medium hover:opacity-80 ${item.cssClass || ''}`}
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
              <MobileMenu menuItems={menu.items} hamburgerIconName={hamburgerIconName} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}