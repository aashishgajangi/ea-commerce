#!/usr/bin/env tsx
/**
 * Sitemap Verification Script
 * Checks all sitemaps for proper XML format, validation, and data
 */

const BASE_URL = 'http://localhost:3000';

interface SitemapCheck {
  url: string;
  status: 'pass' | 'fail';
  issues: string[];
  entries: number;
  sample?: string[];
}

async function verifySitemap(path: string): Promise<SitemapCheck> {
  const url = `${BASE_URL}${path}`;
  const result: SitemapCheck = {
    url,
    status: 'pass',
    issues: [],
    entries: 0,
    sample: [],
  };

  try {
    console.log(`\n🔍 Checking: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      result.status = 'fail';
      result.issues.push(`HTTP ${response.status} - ${response.statusText}`);
      return result;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('xml')) {
      result.status = 'fail';
      result.issues.push(`Wrong content-type: ${contentType} (expected: application/xml)`);
    }

    const text = await response.text();
    
    // Check XML format
    if (!text.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      result.issues.push('Missing XML declaration');
    }
    
    if (!text.includes('<urlset') && !text.includes('<sitemapindex')) {
      result.status = 'fail';
      result.issues.push('Invalid XML structure (missing urlset or sitemapindex)');
      return result;
    }

    // Count entries
    const urlMatches = text.match(/<url>/g);
    const sitemapMatches = text.match(/<sitemap>/g);
    result.entries = (urlMatches?.length || 0) + (sitemapMatches?.length || 0);

    // Extract sample URLs
    const locMatches = text.match(/<loc>(.*?)<\/loc>/g);
    if (locMatches) {
      result.sample = locMatches
        .slice(0, 3)
        .map(match => match.replace(/<\/?loc>/g, ''));
    }

    // Validate required fields
    if (text.includes('<url>')) {
      // Check for required fields in URLs
      const hasLoc = text.includes('<loc>');
      const hasLastmod = text.includes('<lastmod>');
      const hasChangefreq = text.includes('<changefreq>');
      const hasPriority = text.includes('<priority>');

      if (!hasLoc) {
        result.status = 'fail';
        result.issues.push('Missing <loc> tags');
      }
      if (!hasLastmod) {
        result.issues.push('Warning: Missing <lastmod> tags');
      }
      if (!hasChangefreq) {
        result.issues.push('Warning: Missing <changefreq> tags');
      }
      if (!hasPriority) {
        result.issues.push('Warning: Missing <priority> tags');
      }
    }

    // Check date format
    const dateMatches = text.match(/<lastmod>(.*?)<\/lastmod>/g);
    if (dateMatches) {
      const invalidDates = dateMatches.filter(date => {
        const dateStr = date.replace(/<\/?lastmod>/g, '');
        return !/^\d{4}-\d{2}-\d{2}/.test(dateStr);
      });
      if (invalidDates.length > 0) {
        result.issues.push(`Invalid date format in ${invalidDates.length} entries`);
      }
    }

    if (result.issues.length === 0) {
      console.log('✅ PASS');
    } else if (result.status === 'pass') {
      console.log('⚠️  PASS (with warnings)');
    } else {
      console.log('❌ FAIL');
    }

  } catch (error) {
    result.status = 'fail';
    result.issues.push(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.log('❌ FAIL');
  }

  return result;
}

async function main() {
  console.log('🗺️  SITEMAP VERIFICATION TOOL');
  console.log('================================\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const sitemaps = [
    '/sitemap.xml',           // Main sitemap index
    '/sitemap-products.xml',  // Products sitemap
    '/sitemap-categories.xml', // Categories sitemap
    '/sitemap-pages.xml',     // Pages sitemap
  ];

  const results: SitemapCheck[] = [];

  for (const sitemap of sitemaps) {
    const result = await verifySitemap(sitemap);
    results.push(result);
  }

  // Summary
  console.log('\n\n📊 SUMMARY');
  console.log('================================\n');

  let totalPass = 0;
  let totalFail = 0;
  let totalEntries = 0;

  results.forEach((result) => {
    const status = result.status === 'pass' ? '✅' : '❌';
    console.log(`${status} ${result.url}`);
    console.log(`   Entries: ${result.entries}`);
    
    if (result.issues.length > 0) {
      result.issues.forEach((issue) => {
        const prefix = issue.startsWith('Warning:') ? '⚠️ ' : '❌';
        console.log(`   ${prefix} ${issue}`);
      });
    }

    if (result.sample && result.sample.length > 0) {
      console.log(`   Sample URLs:`);
      result.sample.forEach(url => console.log(`     - ${url}`));
    }
    console.log('');

    if (result.status === 'pass') totalPass++;
    else totalFail++;
    totalEntries += result.entries;
  });

  console.log('TOTALS:');
  console.log(`  ✅ Passed: ${totalPass}`);
  console.log(`  ❌ Failed: ${totalFail}`);
  console.log(`  📄 Total Entries: ${totalEntries}`);

  // Exit code
  if (totalFail > 0) {
    console.log('\n❌ Some sitemaps failed validation');
    process.exit(1);
  } else {
    console.log('\n✅ All sitemaps validated successfully!');
    process.exit(0);
  }
}

main();
