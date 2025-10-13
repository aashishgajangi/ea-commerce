'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ThemedButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'accent';
  className?: string;
}

export function ThemedButton({ href, children, variant = 'primary', className = '' }: ThemedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: isHovered ? 'var(--theme-accent, #ff6b35)' : 'var(--theme-primary, #0070f3)',
        color: 'var(--theme-background, #ffffff)',
        borderRadius: 'var(--theme-radius, 0.375rem)',
      };
    } else if (variant === 'outline') {
      return {
        backgroundColor: isHovered ? 'var(--theme-primary, #0070f3)' : 'transparent',
        color: isHovered ? 'var(--theme-background, #ffffff)' : 'var(--theme-primary, #0070f3)',
        border: '2px solid var(--theme-primary, #0070f3)',
        borderRadius: 'var(--theme-radius, 0.375rem)',
      };
    } else if (variant === 'accent') {
      return {
        backgroundColor: isHovered ? 'var(--theme-accent, #ff6b35)' : 'var(--theme-background, #ffffff)',
        color: isHovered ? 'var(--theme-background, #ffffff)' : 'var(--theme-text, #1a1a1a)',
        border: isHovered ? '2px solid var(--theme-background, #ffffff)' : '2px solid transparent',
        borderRadius: 'var(--theme-radius, 0.375rem)',
      };
    }
  };

  return (
    <Link
      href={href}
      className={`inline-block px-8 py-3 font-semibold transition-all duration-300 ${className}`}
      style={getStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}
