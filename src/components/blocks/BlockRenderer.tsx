'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlockInstance } from '@/lib/blocks/block-types';
import MediaHeroBlock from './MediaHeroBlock';

interface BlockRendererProps {
  blocks: BlockInstance[];
}

// Block data interfaces
interface HeroBlockData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

interface ContentBlockData {
  title?: string;
  html?: string; // Changed from 'content' to 'html' to match editor
  content?: string; // Keep for backward compatibility
  backgroundColor?: string;
  textColor?: string;
}

interface ProductsGridBlockData {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface NewsletterBlockData {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} data={block.data as HeroBlockData} />;
          case 'media_hero':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <MediaHeroBlock key={block.id} data={block.data as any} />;
          case 'content':
            return <ContentBlock key={block.id} data={block.data as ContentBlockData} />;
          case 'products_grid':
            return <ProductsGridBlock key={block.id} data={block.data as ProductsGridBlockData} />;
          case 'newsletter':
            return <NewsletterBlock key={block.id} data={block.data as NewsletterBlockData} />;
          default:
            return null;
        }
      })}
    </>
  );
}

// Hero Block Component
function HeroBlock({ data }: { data: HeroBlockData }) {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: data.backgroundColor || 'var(--theme-primary, #0070f3)',
      }}
    >
      {/* Background Image */}
      {data.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={data.backgroundImage}
            alt={data.title || 'Hero background'}
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {data.title && (
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
            style={{ color: data.textColor || '#ffffff' }}
          >
            {data.title}
          </h1>
        )}

        {data.subtitle && (
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto opacity-90"
            style={{ color: data.textColor || '#ffffff' }}
          >
            {data.subtitle}
          </p>
        )}

        {data.buttonText && data.buttonLink && (
          <Link
            href={data.buttonLink}
            className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{
              backgroundColor: data.buttonColor || 'var(--theme-accent, #ff6b35)',
              color: '#ffffff',
            }}
          >
            {data.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

// Content Block Component
function ContentBlock({ data }: { data: ContentBlockData }) {
  // Use 'html' field (from editor) or fallback to 'content' for backward compatibility
  const htmlContent = data.html || data.content;
  
  // Don't render if no content
  if (!htmlContent) {
    return null;
  }

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: data.backgroundColor || 'transparent',
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              color: data.textColor || 'var(--theme-text, #1a1a1a)',
            }}
          >
            {data.title}
          </h2>
        )}

        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:leading-relaxed prose-p:mb-4
            prose-a:no-underline hover:prose-a:underline prose-a:transition-all
            prose-strong:font-semibold
            prose-ul:list-disc prose-ul:my-4
            prose-ol:list-decimal prose-ol:my-4
            prose-li:my-2
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
            prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
          style={{
            '--tw-prose-body': data.textColor || 'var(--theme-text, #1a1a1a)',
            '--tw-prose-headings': data.textColor || 'var(--theme-text, #1a1a1a)',
            '--tw-prose-links': 'var(--theme-primary, #0070f3)',
            '--tw-prose-bold': data.textColor || 'var(--theme-text, #1a1a1a)',
            '--tw-prose-quotes': data.textColor || 'var(--theme-text, #1a1a1a)',
            '--tw-prose-code': data.textColor || 'var(--theme-text, #1a1a1a)',
            '--tw-prose-quote-borders': 'var(--theme-primary, #0070f3)',
            '--tw-prose-code-bg': 'var(--theme-background, #f3f4f6)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </section>
  );
}

// Products Grid Block Component
function ProductsGridBlock({ data }: { data: ProductsGridBlockData }) {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: data.backgroundColor || 'var(--theme-background, #f9fafb)',
      }}
    >
      <div className="container mx-auto px-4">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{
              color: data.textColor || 'var(--theme-text, #1a1a1a)',
            }}
          >
            {data.title}
          </h2>
        )}

        {data.subtitle && (
          <p
            className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80"
            style={{
              color: data.textColor || 'var(--theme-text, #1a1a1a)',
            }}
          >
            {data.subtitle}
          </p>
        )}

        {/* Products Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Product Image Placeholder */}
              <div className="relative aspect-square overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Product {i}</span>
              </div>

              {/* Product Info Placeholder */}
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--theme-primary, #0070f3)',
              color: '#ffffff',
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

// Newsletter Block Component
function NewsletterBlock({ data }: { data: NewsletterBlockData }) {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: data.backgroundColor || 'var(--theme-primary, #0070f3)',
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl text-center">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              color: data.textColor || '#ffffff',
            }}
          >
            {data.title}
          </h2>
        )}

        {data.subtitle && (
          <p
            className="text-lg md:text-xl mb-8 opacity-90"
            style={{
              color: data.textColor || '#ffffff',
            }}
          >
            {data.subtitle}
          </p>
        )}

        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={data.placeholder || 'Enter your email'}
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            style={{
              backgroundColor: data.buttonColor || 'var(--theme-accent, #ff6b35)',
              color: '#ffffff',
            }}
          >
            {data.buttonText || 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
