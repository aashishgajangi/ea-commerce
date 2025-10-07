import Link from 'next/link';
import Image from 'next/image';
import { getMenuByLocation } from '@/lib/menus';
import { getAllSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import { config, ConfigKeys } from '@/lib/config';
import { Search } from 'lucide-react';
import MobileMenu from './MobileMenu';

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

  const stickyClass = settings.header.sticky
    ? 'sticky top-0 z-50 backdrop-blur-sm bg-white/95'
    : '';

  return (
    <header className={`border-b ${stickyClass} relative`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Site Name */}
          <Link href="/" className="flex items-center gap-3">
            {settings.header.showLogo && logo && (
              <Image
                src={logo.path}
                alt={logo.alt || siteName}
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{siteName}</h1>
              {settings.header.showTagline && tagline && (
                <p className="text-sm text-gray-600">{tagline}</p>
              )}
            </div>
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
                    className={`text-gray-700 hover:text-gray-900 font-medium ${item.cssClass || ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {menu && menu.items && menu.items.length > 0 && (
            <MobileMenu menuItems={menu.items} />
          )}

          {/* Search Bar */}
          {settings.header.showSearch && (
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}