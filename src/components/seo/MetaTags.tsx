import type { SEOData } from '@/lib/seo';

interface MetaTagsProps {
  seo: SEOData;
}

export default function MetaTags({ seo }: MetaTagsProps) {
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seo.ogType || 'website'} />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={seo.twitterTitle || seo.title} />
      <meta name="twitter:description" content={seo.twitterDescription || seo.description} />
      {seo.twitterImage && <meta name="twitter:image" content={seo.twitterImage} />}
    </>
  );
}