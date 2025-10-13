'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PageData {
  title: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: {
    path: string;
    alt: string | null;
  } | null;
  publishedAt?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
  author?: {
    name: string | null;
    email: string;
  } | null;
}

interface ModernPageContentProps {
  page: PageData;
}

export default function ModernPageContent({ page }: ModernPageContentProps) {
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article 
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--theme-background, #ffffff)',
        color: 'var(--theme-text, #1a1a1a)',
      }}
    >
      {/* Hero Section with Featured Image */}
      {page.featuredImage && (
        <section 
          className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={page.featuredImage.path}
              alt={page.featuredImage.alt || page.title}
              fill
              className="object-cover opacity-40"
              priority
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="relative z-10 container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                {page.excerpt}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header (if no featured image) */}
          {!page.featuredImage && (
            <header className="mb-12">
              <h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ 
                  background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {page.title}
              </h1>
              
              {page.excerpt && (
                <p 
                  className="text-xl md:text-2xl leading-relaxed opacity-80"
                  style={{ color: 'var(--theme-text, #1a1a1a)' }}
                >
                  {page.excerpt}
                </p>
              )}
            </header>
          )}

          {/* Meta Information */}
          <div 
            className="flex flex-wrap gap-4 mb-8 text-sm pb-6 border-b"
            style={{ 
              borderColor: 'var(--theme-primary, #0070f3)',
              opacity: 0.6,
            }}
          >
            {page.publishedAt && (
              <time dateTime={page.publishedAt.toISOString()}>
                📅 Published {formatDate(page.publishedAt)}
              </time>
            )}
            
            {page.author && (
              <span>✍️ {page.author.name || page.author.email}</span>
            )}
          </div>

          {/* Page Content with Modern Styling */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:no-underline hover:prose-a:underline prose-a:transition-all
              prose-strong:font-semibold
              prose-ul:list-disc prose-ul:my-6
              prose-ol:list-decimal prose-ol:my-6
              prose-li:my-2
              prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
              prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
            style={{
              '--tw-prose-body': 'var(--theme-text, #1a1a1a)',
              '--tw-prose-headings': 'var(--theme-text, #1a1a1a)',
              '--tw-prose-links': 'var(--theme-primary, #0070f3)',
              '--tw-prose-bold': 'var(--theme-text, #1a1a1a)',
              '--tw-prose-quotes': 'var(--theme-text, #1a1a1a)',
              '--tw-prose-code': 'var(--theme-text, #1a1a1a)',
              '--tw-prose-quote-borders': 'var(--theme-primary, #0070f3)',
              '--tw-prose-code-bg': 'var(--theme-background, #f3f4f6)',
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* Last Updated */}
          {page.updatedAt && page.createdAt && page.updatedAt.toISOString() !== page.createdAt.toISOString() && (
            <footer 
              className="mt-12 pt-6 border-t text-sm opacity-60"
              style={{ borderColor: 'var(--theme-primary, #0070f3)' }}
            >
              Last updated {formatDate(page.updatedAt)}
            </footer>
          )}
        </div>
      </section>

      {/* Decorative Bottom Section */}
      <section 
        className="py-16 text-white text-center"
        style={{
          background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-lg opacity-90 mb-6">Explore our products and services</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--theme-accent, #ff6b35)',
              color: 'white',
              borderRadius: 'var(--theme-radius, 0.375rem)',
            }}
          >
            Browse Products
          </Link>
        </div>
      </section>
    </article>
  );
}
