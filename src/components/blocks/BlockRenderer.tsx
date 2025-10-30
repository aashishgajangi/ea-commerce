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

interface CategoriesGridBlockData {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  showCount?: boolean;
  style?: 'card' | 'minimal' | 'overlay';
  columns?: number;
  shape?: 'square' | 'circle';
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
          case 'categories_grid':
            return <CategoriesGridBlock key={block.id} data={block.data as CategoriesGridBlockData} />;
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
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden animate-in fade-in-0 duration-1000"
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
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {data.title && (
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-200"
            style={{ color: data.textColor || '#ffffff' }}
          >
            {data.title}
          </h1>
        )}

        {data.subtitle && (
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto opacity-90 animate-in slide-in-from-bottom-4 duration-700 delay-400"
            style={{ color: data.textColor || '#ffffff' }}
          >
            {data.subtitle}
          </p>
        )}

        {data.buttonText && data.buttonLink && (
          <Link
            href={data.buttonLink}
            className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-4 duration-700 delay-600"
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
      className="py-16 animate-in fade-in-0 duration-700"
      style={{
        backgroundColor: data.backgroundColor || 'transparent',
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 animate-in slide-in-from-left-4 duration-500"
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
      className="py-16 animate-in fade-in-0 duration-700"
      style={{
        backgroundColor: data.backgroundColor || 'var(--theme-background, #f9fafb)',
      }}
    >
      <div className="container mx-auto px-4">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center animate-in slide-in-from-top-4 duration-500"
            style={{
              color: data.textColor || 'var(--theme-text, #1a1a1a)',
            }}
          >
            {data.title}
          </h2>
        )}

        {data.subtitle && (
          <p
            className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80 animate-in slide-in-from-top-4 duration-500 delay-100"
            style={{
              color: data.textColor || 'var(--theme-text, #1a1a1a)',
            }}
          >
            {data.subtitle}
          </p>
        )}

        {/* Products Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in-0 duration-700 delay-200">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-in slide-in-from-bottom-4 duration-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 50}ms` }}
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
        <div className="text-center animate-in fade-in-0 duration-700 delay-500">
          <Link
            href="/products"
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95"
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

// Categories Grid Block Component
function CategoriesGridBlock({ data }: { data: CategoriesGridBlockData }) {
  // For now, show placeholder - in real implementation, this would fetch categories
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

        {/* Categories Grid Placeholder */}
        <div className={`grid ${data.columns ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(data.columns, 3)}` : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'} gap-6 mb-8`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`group relative overflow-hidden transition-all duration-300 ${
                data.style === 'card'
                  ? `bg-white ${data.shape === 'circle' ? 'rounded-full' : 'rounded-xl'} border border-gray-200 hover:border-gray-300 hover:shadow-lg`
                  : data.style === 'minimal'
                  ? 'hover:scale-105'
                  : 'relative'
              }`}
            >
              {/* Category Image Placeholder */}
              <div className={`relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${data.shape === 'circle' ? 'rounded-full' : 'rounded-lg'} flex items-center justify-center`}>
                <span className="text-gray-400">Category {i}</span>
              </div>

              {/* Category Info Placeholder */}
              <div className="p-4">
                <div className={`h-4 bg-gray-200 rounded mb-2 ${data.shape === 'circle' ? 'text-center' : ''}`}></div>
                <div className={`h-3 bg-gray-300 rounded w-16 ${data.shape === 'circle' ? 'mx-auto' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/categories"
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--theme-primary, #0070f3)',
              color: '#ffffff',
            }}
          >
            View All Categories
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
      className="py-16 animate-in fade-in-0 duration-700"
      style={{
        backgroundColor: data.backgroundColor || 'var(--theme-primary, #0070f3)',
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl text-center">
        {data.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 animate-in slide-in-from-top-4 duration-500"
            style={{
              color: data.textColor || '#ffffff',
            }}
          >
            {data.title}
          </h2>
        )}

        {data.subtitle && (
          <p
            className="text-lg md:text-xl mb-8 opacity-90 animate-in slide-in-from-top-4 duration-500 delay-100"
            style={{
              color: data.textColor || '#ffffff',
            }}
          >
            {data.subtitle}
          </p>
        )}

        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <input
            type="email"
            placeholder={data.placeholder || 'Enter your email'}
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-offset-2 transition-all duration-300 focus:scale-105"
            style={{
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
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
