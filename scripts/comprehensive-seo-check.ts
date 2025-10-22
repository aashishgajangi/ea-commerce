/**
 * Comprehensive SEO Check - All Elements
 * Run: npx tsx scripts/comprehensive-seo-check.ts
 */

import { db } from '../src/lib/db';

interface SEOIssue {
  category: string;
  severity: 'critical' | 'warning' | 'good';
  message: string;
  currentValue?: string;
  recommendation: string;
}

async function comprehensiveSEOCheck() {
  console.log('🔍 COMPREHENSIVE SEO AUDIT\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const issues: SEOIssue[] = [];
  let score = 100;
  
  // Find homepage
  const homepage = await db.page.findFirst({
    where: { isHomepage: true },
  });

  if (!homepage) {
    console.log('❌ No homepage found!');
    return;
  }

  const homepageData = homepage.homepageData as any;

  // 1. PAGE TITLE
  console.log('1️⃣  PAGE TITLE (Browser Tab)');
  const pageTitle = homepage.title || '';
  const titleLength = pageTitle.length;
  
  if (titleLength === 0) {
    issues.push({
      category: 'Page Title',
      severity: 'critical',
      message: 'Page title is empty',
      currentValue: '(empty)',
      recommendation: 'Add a descriptive title (50-60 characters)',
    });
    score -= 20;
    console.log(`   ❌ CRITICAL: Title is empty`);
  } else if (titleLength < 30) {
    issues.push({
      category: 'Page Title',
      severity: 'warning',
      message: `Title too short (${titleLength} chars)`,
      currentValue: pageTitle,
      recommendation: 'Expand to 50-60 characters for better SEO',
    });
    score -= 10;
    console.log(`   ⚠️  WARNING: Too short (${titleLength} chars)`);
    console.log(`   Current: "${pageTitle}"`);
    console.log(`   Recommended: 50-60 characters\n`);
  } else if (titleLength > 60) {
    issues.push({
      category: 'Page Title',
      severity: 'warning',
      message: `Title too long (${titleLength} chars)`,
      currentValue: pageTitle,
      recommendation: 'Shorten to 50-60 characters to avoid truncation',
    });
    score -= 5;
    console.log(`   ⚠️  WARNING: Too long (${titleLength} chars)`);
    console.log(`   Current: "${pageTitle}"`);
    console.log(`   Will be truncated in search results\n`);
  } else {
    console.log(`   ✅ GOOD: ${titleLength} characters`);
    console.log(`   "${pageTitle}"\n`);
  }

  // 2. META DESCRIPTION
  console.log('2️⃣  META DESCRIPTION');
  const metaDesc = homepage.metaDescription || '';
  const descLength = metaDesc.length;

  if (descLength === 0) {
    issues.push({
      category: 'Meta Description',
      severity: 'critical',
      message: 'Meta description is empty',
      recommendation: 'Add compelling description (150-160 characters)',
    });
    score -= 15;
    console.log(`   ❌ CRITICAL: Description is empty\n`);
  } else if (descLength < 120) {
    issues.push({
      category: 'Meta Description',
      severity: 'warning',
      message: `Description too short (${descLength} chars)`,
      currentValue: metaDesc,
      recommendation: 'Expand to 150-160 characters',
    });
    score -= 10;
    console.log(`   ⚠️  WARNING: Too short (${descLength} chars)`);
    console.log(`   Current: "${metaDesc}"`);
    console.log(`   Recommended: 150-160 characters\n`);
  } else if (descLength > 160) {
    issues.push({
      category: 'Meta Description',
      severity: 'warning',
      message: `Description too long (${descLength} chars)`,
      recommendation: 'Shorten to 150-160 characters',
    });
    score -= 5;
    console.log(`   ⚠️  WARNING: Too long (${descLength} chars)\n`);
  } else {
    console.log(`   ✅ GOOD: ${descLength} characters`);
    console.log(`   "${metaDesc}"\n`);
  }

  // 3. HEADING STRUCTURE
  console.log('3️⃣  HEADING STRUCTURE (H1, H2, H3)');
  let homepageData;
  try {
    homepageData = homepage.homepageData ? JSON.parse(homepage.homepageData) : null;
  } catch (e) {
    homepageData = null;
  }

  let h1Count = 0;
  let h2Count = 0;

  // Check H1 (Hero title)
  if (homepageData?.showHero && homepageData?.heroTitle) {
    h1Count = 1;
    console.log(`   ✅ H1: Found (Hero: "${homepageData.heroTitle}")`);
  } else {
    console.log(`   ❌ H1: Missing (Hero section disabled)`);
    score -= 20;
  }

  // Check H2 (Section titles)
  const h2Sections: string[] = [];
  if (homepageData?.showFeaturedProducts && homepageData?.featuredProductsTitle) {
    h2Count++;
    h2Sections.push(`Products: "${homepageData.featuredProductsTitle}"`);
  }
  if (homepageData?.showCategories && homepageData?.categoriesTitle) {
    h2Count++;
    h2Sections.push(`Categories: "${homepageData.categoriesTitle}"`);
  }
  if (homepageData?.showNewsletter && homepageData?.newsletterTitle) {
    h2Count++;
    h2Sections.push(`Newsletter: "${homepageData.newsletterTitle}"`);
  }

  if (h2Count === 0) {
    issues.push({
      category: 'Heading Structure',
      severity: 'critical',
      message: 'No H2 headings found',
      recommendation: 'Enable at least 2-3 homepage sections',
    });
    score -= 15;
    console.log(`   ❌ H2: None found (enable homepage sections)`);
  } else if (h2Count < 2) {
    console.log(`   ⚠️  H2: Only ${h2Count} found`);
    h2Sections.forEach(s => console.log(`       - ${s}`));
    console.log(`   Recommended: At least 2-3 sections\n`);
    score -= 5;
  } else {
    console.log(`   ✅ H2: ${h2Count} found`);
    h2Sections.forEach(s => console.log(`       - ${s}`));
  }
  console.log();

  // 4. CONTENT LENGTH
  console.log('4️⃣  CONTENT LENGTH');
  const content = homepage.content || '';
  const contentText = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = contentText ? contentText.split(/\s+/).length : 0;

  if (wordCount === 0) {
    issues.push({
      category: 'Content Length',
      severity: 'warning',
      message: 'No page content',
      recommendation: 'Add 300+ words of quality content',
    });
    score -= 10;
    console.log(`   ⚠️  WARNING: No content (0 words)`);
    console.log(`   Recommended: At least 300 words\n`);
  } else if (wordCount < 300) {
    issues.push({
      category: 'Content Length',
      severity: 'warning',
      message: `Content too short (${wordCount} words)`,
      recommendation: 'Add more content to reach 300+ words',
    });
    score -= 10;
    console.log(`   ⚠️  WARNING: Too short (${wordCount} words)`);
    console.log(`   Recommended: At least 300 words\n`);
  } else {
    console.log(`   ✅ GOOD: ${wordCount} words\n`);
  }

  // 5. INTERNAL LINKS
  console.log('5️⃣  INTERNAL LINKS');
  const linkMatches = content.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || [];
  const internalLinks = linkMatches.filter(link => !link.includes('http'));
  const linkCount = internalLinks.length;

  // Count button links from sections
  let sectionLinks = 0;
  if (homepageData?.showHero && homepageData?.heroButtonUrl) sectionLinks++;
  
  const totalLinks = linkCount + sectionLinks;

  if (totalLinks === 0) {
    issues.push({
      category: 'Internal Links',
      severity: 'warning',
      message: 'No internal links found',
      recommendation: 'Add 2-5 links to important pages',
    });
    score -= 10;
    console.log(`   ⚠️  WARNING: No internal links (0)`);
    console.log(`   Recommended: Add 2-5 links to pages/products\n`);
  } else if (totalLinks < 2) {
    console.log(`   ⚠️  WARNING: Only ${totalLinks} link(s)`);
    console.log(`   Recommended: 2-5 internal links\n`);
    score -= 5;
  } else {
    console.log(`   ✅ GOOD: ${totalLinks} internal link(s)\n`);
  }

  // 6. OPEN GRAPH TAGS
  console.log('6️⃣  OPEN GRAPH (Facebook/Social)');
  const ogTitle = homepage.ogTitle || '';
  const ogDesc = homepage.ogDescription || '';

  if (!ogTitle && !ogDesc) {
    issues.push({
      category: 'Open Graph',
      severity: 'warning',
      message: 'OG tags missing',
      recommendation: 'Add OG title and description for social sharing',
    });
    score -= 8;
    console.log(`   ⚠️  WARNING: No OG tags set`);
    console.log(`   Add in: /admin/pages → Edit Homepage → SEO Tab\n`);
  } else if (!ogTitle) {
    console.log(`   ⚠️  OG Title: Missing`);
    console.log(`   ✅ OG Description: Set\n`);
    score -= 4;
  } else if (!ogDesc) {
    console.log(`   ✅ OG Title: Set`);
    console.log(`   ⚠️  OG Description: Missing\n`);
    score -= 4;
  } else {
    console.log(`   ✅ OG Title: "${ogTitle}"`);
    console.log(`   ✅ OG Description: "${ogDesc}"\n`);
  }

  // 7. TWITTER CARD
  console.log('7️⃣  TWITTER CARD');
  const twitterTitle = homepage.twitterTitle || '';
  const twitterDesc = homepage.twitterDescription || '';

  if (!twitterTitle && !twitterDesc) {
    issues.push({
      category: 'Twitter Card',
      severity: 'warning',
      message: 'Twitter tags missing',
      recommendation: 'Add Twitter title and description',
    });
    score -= 7;
    console.log(`   ⚠️  WARNING: No Twitter tags set`);
    console.log(`   Add in: /admin/pages → Edit Homepage → SEO Tab\n`);
  } else if (!twitterTitle) {
    console.log(`   ⚠️  Twitter Title: Missing`);
    console.log(`   ✅ Twitter Description: Set\n`);
    score -= 4;
  } else if (!twitterDesc) {
    console.log(`   ✅ Twitter Title: Set`);
    console.log(`   ⚠️  Twitter Description: Missing\n`);
    score -= 3;
  } else {
    console.log(`   ✅ Twitter Title: "${twitterTitle}"`);
    console.log(`   ✅ Twitter Description: "${twitterDesc}"\n`);
  }

  // 8. KEYWORDS
  console.log('8️⃣  META KEYWORDS');
  const keywords = homepage.metaKeywords || '';
  if (!keywords) {
    console.log(`   ℹ️  INFO: No keywords set (optional but helpful)\n`);
  } else {
    const keywordCount = keywords.split(',').length;
    console.log(`   ✅ Keywords: ${keywordCount} set`);
    console.log(`   "${keywords}"\n`);
  }

  // FINAL SCORE
  score = Math.max(0, Math.min(100, score));
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 SEO SCORE:', score, '/100');
  
  let rating = '';
  let emoji = '';
  if (score >= 90) {
    rating = 'EXCELLENT';
    emoji = '⭐⭐⭐⭐⭐';
  } else if (score >= 80) {
    rating = 'VERY GOOD';
    emoji = '⭐⭐⭐⭐';
  } else if (score >= 70) {
    rating = 'GOOD';
    emoji = '⭐⭐⭐';
  } else if (score >= 60) {
    rating = 'FAIR';
    emoji = '⭐⭐';
  } else {
    rating = 'NEEDS IMPROVEMENT';
    emoji = '⭐';
  }
  
  console.log(`Rating: ${rating} ${emoji}\n`);

  // ISSUES SUMMARY
  if (issues.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔧 ISSUES TO FIX:\n');
    
    const critical = issues.filter(i => i.severity === 'critical');
    const warnings = issues.filter(i => i.severity === 'warning');
    
    if (critical.length > 0) {
      console.log('❌ CRITICAL (' + critical.length + '):\n');
      critical.forEach((issue, i) => {
        console.log(`${i + 1}. ${issue.category}: ${issue.message}`);
        console.log(`   Fix: ${issue.recommendation}\n`);
      });
    }
    
    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS (' + warnings.length + '):\n');
      warnings.forEach((issue, i) => {
        console.log(`${i + 1}. ${issue.category}: ${issue.message}`);
        console.log(`   Fix: ${issue.recommendation}\n`);
      });
    }
  } else {
    console.log('✅ No issues found! Your SEO is perfect!\n');
  }

  // QUICK FIXES
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('💡 QUICK FIXES:\n');
  console.log('1. Go to: /admin/pages → Edit Homepage\n');
  console.log('2. Content Tab:');
  console.log('   - Title: Make it 50-60 characters');
  console.log('   - Page Content: Add 300+ words of quality content\n');
  console.log('3. SEO Tab:');
  console.log('   - Meta Description: 150-160 characters');
  console.log('   - OG Title: Same as page title or custom');
  console.log('   - OG Description: Same as meta description');
  console.log('   - Twitter Title: Same as page title');
  console.log('   - Twitter Description: Same as meta description\n');
  console.log('4. Homepage Sections:');
  console.log('   - Enable at least 2-3 sections (Products, Categories, etc.)');
  console.log('   - Each section adds an H2 heading\n');
  console.log('5. Add Internal Links:');
  console.log('   - Link to /products, /about, /contact in page content');
  console.log('   - Use descriptive anchor text\n');
}

comprehensiveSEOCheck()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
