'use client';

import Image from 'next/image';
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
  if (!settings.showHero) return null;

  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
      }}
    >
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage.path}
            alt={heroImage.alt || settings.heroTitle}
            fill
            className="object-cover opacity-30"
            priority
            unoptimized={true}
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-white">
          {settings.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 text-white">
          {settings.heroSubtitle}
        </p>
        {settings.heroButtonText && settings.heroButtonUrl && (
          <ThemedButton
            href={settings.heroButtonUrl}
            variant="accent"
            className="text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {settings.heroButtonText}
          </ThemedButton>
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