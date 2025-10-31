'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HomepageSettings } from '@/lib/settings';
import { ThemedButton } from '@/components/ui/themed-button';

interface HeroImage {
  id: string;
  path: string;
  alt: string | null;
}

interface HeroSectionProps {
  settings: HomepageSettings;
  heroImage?: HeroImage | null;
}

export default function HeroSection({ settings, heroImage }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!settings.showHero) return null;

  return (
    <section
      className={`relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{
        background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
      }}
    >
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 loading-shimmer"></div>
          )}
          <Image
            src={heroImage.path}
            alt={heroImage.alt || settings.heroTitle}
            fill
            className={`object-cover opacity-30 transition-opacity duration-500 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
            priority
            quality={85}
            onLoad={() => setImageLoaded(true)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 text-white ${isVisible ? 'animate-slide-in-bottom' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}>
          {settings.heroTitle}
        </h1>
        <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 text-white ${isVisible ? 'animate-slide-in-bottom' : 'opacity-0'}`}
           style={{ animationDelay: '0.4s' }}>
          {settings.heroSubtitle}
        </p>
        {settings.heroButtonText && settings.heroButtonUrl && (
          <div className={`${isVisible ? 'animate-zoom-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <ThemedButton
              href={settings.heroButtonUrl}
              variant="accent"
              className="text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {settings.heroButtonText}
            </ThemedButton>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t to-transparent"
        style={{
          background: `linear-gradient(to top, var(--theme-background, #ffffff), transparent)`
        }}
      ></div>
    </section>
  );
}