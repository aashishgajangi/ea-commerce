import { getOrCreateHomepage } from '@/lib/pages';
import PublicLayout from '@/components/layout/PublicLayout';
import ServerBlockRenderer from '@/components/blocks/ServerBlockRenderer';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { BlockInstance } from '@/lib/blocks/block-types';

// Force dynamic rendering to ensure ServerBlockRenderer runs on every request
// This is needed for Products Grid to fetch real products from database
export const dynamic = 'force-dynamic';

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
  try {
    // Get or create homepage
    const homepage = await getOrCreateHomepage();

    // Parse blocks if they exist
    let blocks: BlockInstance[] = [];
    if (homepage.blocks) {
      try {
        blocks = typeof homepage.blocks === 'string' 
          ? JSON.parse(homepage.blocks) 
          : homepage.blocks;
      } catch (e) {
        console.error('Failed to parse homepage blocks:', e);
      }
    }

    // Render homepage with blocks
    return (
      <PublicLayout>
        <div
          style={{
            backgroundColor: 'var(--theme-background, #ffffff)',
            color: 'var(--theme-text, #1a1a1a)',
          }}
        >
          <ServerBlockRenderer blocks={blocks} />
        </div>
      </PublicLayout>
    );
  } catch (error) {
    console.error('Error loading homepage:', error);
    
    // Fallback: Show empty homepage with message
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-gray-600 mb-6">
              The homepage is being set up. Please check back soon!
            </p>
            <Link 
              href="/products" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
