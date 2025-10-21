import { getOrCreateHomepage } from '@/lib/pages';
import { db } from '@/lib/db';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedProductsSection from '@/components/homepage/FeaturedProductsSection';
import CategoriesShowcaseSection from '@/components/homepage/CategoriesShowcaseSection';
import NewsletterSection from '@/components/homepage/NewsletterSection';
import type { Metadata } from 'next';

// Enable ISR - revalidate every 10 seconds for faster updates
export const revalidate = 10;

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const homepage = await getOrCreateHomepage();
    
    // ALWAYS use Title as primary for browser tab
    // Meta Title only used as fallback if Title is empty
    const browserTitle = homepage.title || homepage.metaTitle || 'Welcome';
    
    return {
      title: browserTitle,
      description: homepage.metaDescription || 'E-Commerce Platform',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Welcome',
      description: 'E-Commerce Platform',
    };
  }
}

export default async function Home() {
  // Get homepage from pages
  let homepage;
  let homepageSettings;
  
  try {
    homepage = await getOrCreateHomepage();
    
    // Parse homepage data
    homepageSettings = homepage.homepageData 
      ? JSON.parse(homepage.homepageData) 
      : {
          showHero: true,
          heroTitle: 'Welcome to Our Store',
          heroSubtitle: 'Discover amazing products at great prices',
          heroImageId: null,
          heroButtonText: 'Shop Now',
          heroButtonUrl: '/products',
          showFeaturedProducts: true,
          featuredProductsTitle: 'Featured Products',
          featuredProductsCount: 8,
          showCategories: true,
          categoriesTitle: 'Shop by Category',
          categoriesCount: 6,
          showNewsletter: true,
          newsletterTitle: 'Stay Updated',
          newsletterSubtitle: 'Subscribe to get special offers and updates',
        };
  } catch (error) {
    console.error('Error loading homepage:', error);
    // Fallback to default settings
    homepageSettings = {
      showHero: true,
      heroTitle: 'Welcome to Our Store',
      heroSubtitle: 'Discover amazing products at great prices',
      heroImageId: null,
      heroButtonText: 'Shop Now',
      heroButtonUrl: '/products',
      showFeaturedProducts: true,
      featuredProductsTitle: 'Featured Products',
      featuredProductsCount: 8,
      showCategories: true,
      categoriesTitle: 'Shop by Category',
      categoriesCount: 6,
      showNewsletter: true,
      newsletterTitle: 'Stay Updated',
      newsletterSubtitle: 'Subscribe to get special offers and updates',
    };
  }

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

  // Render sections based on settings
  return (
    <PublicLayout>
      {homepageSettings.showHero && <HeroSection settings={homepageSettings} heroImage={heroImage} />}
      
      {/* Page Content Section - Rich text editor content */}
      {homepage && homepage.content && homepage.content.trim() !== '' && homepage.content !== '<p></p>' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: homepage.content }}
            />
          </div>
        </section>
      )}
      
      {homepageSettings.showCategories && <CategoriesShowcaseSection settings={homepageSettings} />}
      {homepageSettings.showFeaturedProducts && <FeaturedProductsSection settings={homepageSettings} />}
      {homepageSettings.showNewsletter && <NewsletterSection settings={homepageSettings} />}
    </PublicLayout>
  );
}
