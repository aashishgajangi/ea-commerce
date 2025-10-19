'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Menu, X, AlignJustify, Grid3X3, List, MoreHorizontal } from 'lucide-react';
import type { MenuItemWithChildren } from '@/lib/menus';
import MobileSearchBar from '@/components/search/MobileSearchBar';

interface MobileMenuProps {
  menuItems: MenuItemWithChildren[];
  hamburgerIconName?: 'menu' | 'bars' | 'grid' | 'list' | 'more';
  mobileMenuStyle?: 'slide' | 'dropdown' | 'fullscreen';
  mobileMenuPosition?: 'left' | 'right';
  mobileMenuAnimation?: 'fade' | 'slide' | 'scale';
  showMobileSearch?: boolean;
  mobileMenuListStyle?: 'default' | 'bordered' | 'pills' | 'cards' | 'minimal' | 'underline' | 'gradient' | 'outlined' | 'divided' | 'compact' | 'spacious' | 'modern';
}

export default function MobileMenu({
  menuItems,
  hamburgerIconName = 'menu',
  mobileMenuStyle = 'slide',
  mobileMenuPosition = 'right',
  mobileMenuAnimation = 'slide',
  showMobileSearch = true,
  mobileMenuListStyle = 'default',
}: MobileMenuProps) {
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
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Get menu container classes based on style and animation
  const getMenuContainerClasses = () => {
    // Higher z-index to be above hero section and announcement bar
    const base = 'transition-all duration-300 ease-in-out';

    switch (mobileMenuStyle) {
      case 'slide':
        // Slide panel from left or right - ensure it's visible and properly positioned
        const slidePosition = mobileMenuPosition === 'left' ? 'left-0' : 'right-0';
        let slideTransform = '';
        if (mobileMenuAnimation === 'fade') {
          slideTransform = isOpen ? 'translate-x-0 opacity-100' : (mobileMenuPosition === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0');
        } else if (mobileMenuAnimation === 'scale') {
          slideTransform = isOpen ? 'translate-x-0 scale-100 opacity-100' : (mobileMenuPosition === 'left' ? '-translate-x-full scale-95 opacity-0' : 'translate-x-full scale-95 opacity-0');
        } else { // slide animation
          slideTransform = isOpen ? 'translate-x-0' : (mobileMenuPosition === 'left' ? '-translate-x-full' : 'translate-x-full');
        }
        return `fixed z-[999999] ${base} top-0 ${slidePosition} h-full w-80 max-w-[85vw] shadow-2xl overflow-hidden ${slideTransform}`;

      case 'fullscreen':
        // Fullscreen overlay - ensure it's visible and covers entire screen
        let fullscreenTransform = '';
        if (mobileMenuAnimation === 'fade') {
          fullscreenTransform = isOpen ? 'opacity-100' : 'opacity-0';
        } else if (mobileMenuAnimation === 'slide') {
          fullscreenTransform = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
        } else { // scale animation
          fullscreenTransform = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
        }
        return `fixed z-[999999] ${base} inset-0 overflow-hidden ${fullscreenTransform}`;

      case 'dropdown':
      default:
        // Dropdown from top - use fixed positioning with proper theme colors
        let dropdownTransform = '';
        if (mobileMenuAnimation === 'fade') {
          dropdownTransform = isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';
        } else if (mobileMenuAnimation === 'scale') {
          dropdownTransform = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none';
        } else { // slide animation
          dropdownTransform = isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none';
        }
        return `fixed z-[999999] ${base} left-4 right-4 top-20 max-h-[calc(100vh-6rem)] overflow-hidden shadow-xl rounded-lg ${dropdownTransform}`;
    }
  };

  // Use theme colors - automatically sync with main theme
  const bgColor = 'var(--theme-background, #ffffff)';
  const textColor = 'var(--theme-text, #1a1a1a)';
  
  // Get list item classes based on style
  const getListItemClasses = () => {
    const baseClasses = 'transition-all duration-200 block font-medium';
    
    switch (mobileMenuListStyle) {
      case 'bordered':
        return `${baseClasses} py-4 px-4 pl-6 border-l-4 hover:pl-8 hover:bg-opacity-5 hover:bg-current`;
      case 'pills':
        return `${baseClasses} py-3.5 px-6 mx-3 my-1.5 rounded-full hover:bg-opacity-15 hover:bg-current hover:shadow-md`;
      case 'cards':
        return `${baseClasses} py-4 px-5 mx-3 my-2 rounded-xl shadow-sm border-2 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5`;
      case 'minimal':
        return `${baseClasses} py-3 px-6 hover:text-opacity-70`;
      case 'underline':
        return `${baseClasses} py-4 px-6 border-b-2 border-transparent hover:border-current hover:pl-7`;
      case 'gradient':
        return `${baseClasses} py-4 px-6 hover:bg-gradient-to-r hover:from-transparent hover:via-current/10 hover:to-transparent`;
      case 'outlined':
        return `${baseClasses} py-3 px-5 mx-3 my-1 border-2 rounded-lg hover:bg-opacity-10 hover:bg-current hover:border-current`;
      case 'divided':
        return `${baseClasses} py-4 px-6 border-b hover:bg-opacity-10 hover:bg-current`;
      case 'compact':
        return `${baseClasses} py-2 px-5 text-sm hover:bg-opacity-10 hover:bg-current hover:pl-6`;
      case 'spacious':
        return `${baseClasses} py-6 px-8 hover:bg-opacity-10 hover:bg-current hover:pl-10`;
      case 'modern':
        return `${baseClasses} py-4 px-6 hover:bg-opacity-10 hover:bg-current hover:translate-x-2 hover:shadow-sm`;
      default: // default
        return `${baseClasses} py-4 px-6 hover:bg-opacity-10 hover:bg-current hover:pl-8`;
    }
  };

  // Portal content
  const portalContent = mounted && (
    <>
      {/* Backdrop - only for slide and fullscreen styles */}
      {isOpen && (mobileMenuStyle === 'slide' || mobileMenuStyle === 'fullscreen') && (
        <div
          className={`fixed inset-0 z-[999998] transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: mobileMenuStyle === 'fullscreen'
              ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,30,0.98) 100%)'
              : 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={getMenuContainerClasses()}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: textColor,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        <nav className="h-full flex flex-col">
          {/* Header with close button (for slide and fullscreen) */}
          {(mobileMenuStyle === 'slide' || mobileMenuStyle === 'fullscreen') && (
            <div 
              className="flex justify-between items-center p-4 border-b flex-shrink-0"
              style={{ borderColor: `${textColor}15` }}
            >
              <span className="font-bold text-lg" style={{ color: textColor }}>
                Menu
              </span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" style={{ color: textColor }} />
              </button>
            </div>
          )}

          {/* Search bar with autocomplete */}
          {showMobileSearch && (
            <div
              className="p-4 border-b flex-shrink-0"
              style={{ borderColor: `${textColor}15` }}
            >
              <MobileSearchBar 
                onClose={() => setIsOpen(false)}
                textColor={textColor}
                mobileMenuStyle={mobileMenuStyle}
              />
            </div>
          )}

          {/* Menu Items */}
          <div className={`
            flex flex-col
            ${mobileMenuStyle === 'fullscreen' ? 'flex-1 justify-center py-8 gap-2' : 'flex-1 overflow-y-auto'}
            ${mobileMenuListStyle === 'cards' || mobileMenuListStyle === 'pills' ? 'py-3' : 'py-1'}
            ${mobileMenuListStyle === 'default' || mobileMenuListStyle === 'bordered' ? 'divide-y' : ''}
          `}
          style={{
            borderColor: `${textColor}15`,
            ...(mobileMenuListStyle === 'default' || mobileMenuListStyle === 'bordered' ? { '--tw-divide-opacity': '0.1' } : {})
          } as React.CSSProperties}
          >
            {menuItems.map((item, index) => {
              const href = item.type === 'page' && item.page
                ? item.page.slug === '' ? '/' : `/${item.page.slug}`
                : item.url || '#';

              return (
                <Link
                  key={item.id}
                  href={href}
                  target={item.target}
                  onClick={() => setIsOpen(false)}
                  className={`
                    ${getListItemClasses()}
                    ${mobileMenuStyle === 'fullscreen' ? 'text-center text-2xl font-medium' : 'text-base'}
                    ${item.cssClass || ''}
                  `}
                  style={{
                    color: textColor,
                    transitionDelay: `${index * 30}ms`,
                    borderColor: 
                      mobileMenuListStyle === 'bordered' ? 'var(--theme-primary)' :
                      mobileMenuListStyle === 'cards' ? 'var(--theme-primary)30' :
                      mobileMenuListStyle === 'outlined' ? `${textColor}30` :
                      mobileMenuListStyle === 'divided' ? `${textColor}15` :
                      mobileMenuListStyle === 'underline' ? 'transparent' :
                      'transparent',
                    borderLeftColor: mobileMenuListStyle === 'bordered' ? 'var(--theme-primary)' : undefined,
                    borderBottomColor: mobileMenuListStyle === 'underline' ? 'transparent' : undefined
                  } as React.CSSProperties}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Footer (for slide/fullscreen) */}
          {(mobileMenuStyle === 'slide' || mobileMenuStyle === 'fullscreen') && (
            <div 
              className="p-4 border-t flex-shrink-0 text-center text-sm opacity-60"
              style={{ borderColor: `${textColor}15`, color: textColor }}
            >
              © {new Date().getFullYear()} All rights reserved
            </div>
          )}
        </nav>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:opacity-80 transition-opacity relative z-[1000000]"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" style={{ color: textColor }} />
        ) : (
          <HamburgerIcon className="w-6 h-6" style={{ color: textColor }} />
        )}
      </button>

      {/* Render backdrop and menu via portal to escape stacking context */}
      {mounted && typeof document !== 'undefined' && createPortal(portalContent, document.body)}
    </div>
  );
}