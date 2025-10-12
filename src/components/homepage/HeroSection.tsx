import Image from 'next/image';
import Link from 'next/link';
import { HomepageSettings } from '@/lib/settings';
import { db } from '@/lib/db';

interface HeroSectionProps {
  settings: HomepageSettings;
}

export default async function HeroSection({ settings }: HeroSectionProps) {
  if (!settings.showHero) return null;

  let heroImage = null;
  if (settings.heroImageId) {
    heroImage = await db.media.findUnique({
      where: { id: settings.heroImageId },
    });
  }

  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden"
      style={{
        background: `linear-gradient(to right, var(--theme-primary, #0070f3), var(--theme-secondary, #6c757d))`
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          {settings.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          {settings.heroSubtitle}
        </p>
        {settings.heroButtonText && settings.heroButtonUrl && (
          <Link
            href={settings.heroButtonUrl}
            className="inline-block px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-[var(--theme-accent,#ff6b35)] hover:text-[var(--theme-background,#ffffff)]"
            style={{
              backgroundColor: 'var(--theme-background, #ffffff)',
              color: 'var(--theme-text, #1a1a1a)',
              borderRadius: 'var(--theme-radius, 0.375rem)',
            }}
          >
            {settings.heroButtonText}
          </Link>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}