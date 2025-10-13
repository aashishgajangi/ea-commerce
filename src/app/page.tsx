import { getHomepageSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedProductsSection from '@/components/homepage/FeaturedProductsSection';
import CategoriesShowcaseSection from '@/components/homepage/CategoriesShowcaseSection';
import NewsletterSection from '@/components/homepage/NewsletterSection';
import type { Metadata } from 'next';

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Welcome',
    description: 'E-Commerce Platform',
  };
}

export default async function Home() {
  // Get homepage settings
  const homepageSettings = await getHomepageSettings();

  // Fetch hero image if needed
  let heroImage = null;
  if (homepageSettings.heroImageId) {
    heroImage = await db.media.findUnique({
      where: { id: homepageSettings.heroImageId },
      select: {
        id: true,
        path: true,
        alt: true,
      },
    });
  }

  // Always use modern sections layout for homepage
  return (
    <PublicLayout>
      <HeroSection settings={homepageSettings} heroImage={heroImage} />
      <FeaturedProductsSection settings={homepageSettings} />
      <CategoriesShowcaseSection settings={homepageSettings} />
      <NewsletterSection settings={homepageSettings} />
    </PublicLayout>
  );
}
