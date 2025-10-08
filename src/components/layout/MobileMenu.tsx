'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, AlignJustify, Grid3X3, List, MoreHorizontal } from 'lucide-react';
import type { MenuItemWithChildren } from '@/lib/menus';

interface MobileMenuProps {
  menuItems: MenuItemWithChildren[];
  hamburgerIconName?: 'menu' | 'bars' | 'grid' | 'list' | 'more';
}

export default function MobileMenu({ menuItems, hamburgerIconName = 'menu' }: MobileMenuProps) {
  // Icon mapping
  const hamburgerIcons = {
    menu: Menu,
    bars: AlignJustify,
    grid: Grid3X3,
    list: List,
    more: MoreHorizontal
  };

  const HamburgerIcon = hamburgerIcons[hamburgerIconName] || Menu;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="absolute left-0 right-0 top-full bg-white border-b shadow-md z-50">
            <nav className="container mx-auto">
              <div className="flex flex-col divide-y">
                {menuItems.map((item) => {
                  const href = item.type === 'page' && item.page
                    ? item.page.slug === '' ? '/' : `/${item.page.slug}`
                    : item.url || '#';

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      target={item.target}
                      onClick={() => setIsOpen(false)}
                      className={`py-3 px-4 text-gray-700 hover:bg-gray-50 ${item.cssClass || ''}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}