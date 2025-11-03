#!/usr/bin/env tsx
/**
 * Structured Data (JSON-LD) Verification Script
 * Checks JSON-LD schema markup on pages
 */

import * as cheerio from 'cheerio';

const BASE_URL = 'http://localhost:3000';

interface StructuredDataCheck {
  url: string;
  status: 'pass' | 'fail';
  schemas: Array<{
    type: string;
    valid: boolean;
    issues: string[];
    data: Record<string, unknown>;
  }>;
  issues: string[];
}

async function verifyStructuredData(path: string): Promise<StructuredDataCheck> {
  const url = `${BASE_URL}${path}`;
  const result: StructuredDataCheck = {
    url,
    status: 'pass',
    schemas: [],
    issues: [],
  };

  try {
    console.log(`\n🔍 Checking: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      result.status = 'fail';
      result.issues.push(`HTTP ${response.status} - ${response.statusText}`);
      return result;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Find all JSON-LD scripts
    const scripts = $('script[type="application/ld+json"]');
    
    if (scripts.length === 0) {
      result.status = 'fail';
      result.issues.push('No JSON-LD structured data found');
      console.log('❌ No structured data found');
      return result;
    }

    console.log(`   Found ${scripts.length} JSON-LD script(s)`);

    // Validate each script
    scripts.each((i, elem) => {
      const scriptContent = $(elem).html();
      if (!scriptContent) return;

      try {
        const data = JSON.parse(scriptContent);
        const schemaType = data['@type'] || 'Unknown';
        
        const schemaCheck = {
          type: schemaType,
          valid: true,
          issues: [] as string[],
          data,
        };

        // Validate required fields
        if (!data['@context']) {
          schemaCheck.valid = false;
          schemaCheck.issues.push('Missing @context');
        }

        if (!data['@type']) {
          schemaCheck.valid = false;
          schemaCheck.issues.push('Missing @type');
        }

        // Type-specific validation
        switch (schemaType) {
          case 'Product':
            if (!data.name) schemaCheck.issues.push('Missing name');
            if (!data.description) schemaCheck.issues.push('Missing description');
            if (!data.offers) {
              schemaCheck.issues.push('Missing offers');
            } else {
              if (!data.offers.price) schemaCheck.issues.push('Missing offers.price');
              if (!data.offers.priceCurrency) schemaCheck.issues.push('Missing offers.priceCurrency');
            }
            break;

          case 'Organization':
            if (!data.name) schemaCheck.issues.push('Missing name');
            if (!data.url) schemaCheck.issues.push('Missing url');
            break;

          case 'WebSite':
            if (!data.name) schemaCheck.issues.push('Missing name');
            if (!data.url) schemaCheck.issues.push('Missing url');
            break;

          case 'BreadcrumbList':
            if (!data.itemListElement) {
              schemaCheck.issues.push('Missing itemListElement');
            } else if (!Array.isArray(data.itemListElement)) {
              schemaCheck.issues.push('itemListElement must be an array');
            }
            break;

          case 'Article':
            if (!data.headline) schemaCheck.issues.push('Missing headline');
            if (!data.author) schemaCheck.issues.push('Missing author');
            if (!data.datePublished) schemaCheck.issues.push('Missing datePublished');
            break;

          case 'LocalBusiness':
            if (!data.name) schemaCheck.issues.push('Missing name');
            if (!data.address) schemaCheck.issues.push('Missing address');
            break;
        }

        if (schemaCheck.issues.length > 0) {
          schemaCheck.valid = false;
          result.status = 'fail';
        }

        result.schemas.push(schemaCheck);

      } catch (error) {
        result.status = 'fail';
        result.issues.push(`Invalid JSON in script ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

    // Print results
    result.schemas.forEach((schema, i) => {
      const status = schema.valid ? '✅' : '❌';
      console.log(`   ${status} Schema ${i + 1}: ${schema.type}`);
      if (schema.issues.length > 0) {
        schema.issues.forEach(issue => console.log(`      ❌ ${issue}`));
      }
    });

    if (result.issues.length > 0) {
      result.issues.forEach(issue => console.log(`   ❌ ${issue}`));
    }

  } catch (error) {
    result.status = 'fail';
    result.issues.push(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.log(`❌ FAIL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}

async function main() {
  console.log('🔍 STRUCTURED DATA VERIFICATION TOOL');
  console.log('====================================\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  // Test pages - you can customize these
  const testPages = [
    '/',                                    // Homepage
    '/products',                            // Products listing
    // Add specific product/category URLs from your database
  ];

  console.log('⏳ Fetching test URLs from API...\n');

  // Fetch some real URLs from API
  try {
    // Get products
    const productsRes = await fetch(`${BASE_URL}/api/admin/products?page=1&limit=2`);
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      if (productsData.products?.length > 0) {
        productsData.products.forEach((p: { slug: string }) => {
          testPages.push(`/products/${p.slug}`);
        });
      }
    }

    // Get categories
    const categoriesRes = await fetch(`${BASE_URL}/api/admin/categories`);
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      if (categoriesData.categories?.length > 0) {
        categoriesData.categories.slice(0, 2).forEach((c: { slug: string }) => {
          testPages.push(`/categories/${c.slug}`);
        });
      }
    }

    // Get pages
    const pagesRes = await fetch(`${BASE_URL}/api/admin/pages`);
    if (pagesRes.ok) {
      const pagesData = await pagesRes.json();
      if (pagesData.pages?.length > 0) {
        pagesData.pages.slice(0, 2).forEach((p: { slug: string }) => {
          const url = p.slug === '' ? '/' : `/${p.slug}`;
          if (!testPages.includes(url)) {
            testPages.push(url);
          }
        });
      }
    }
  } catch {
    console.log('⚠️  Could not fetch URLs from API, using default test pages');
  }

  console.log(`Testing ${testPages.length} page(s):\n`);

  const results: StructuredDataCheck[] = [];

  for (const page of testPages) {
    const result = await verifyStructuredData(page);
    results.push(result);
  }

  // Summary
  console.log('\n\n📊 SUMMARY');
  console.log('====================================\n');

  let totalPass = 0;
  let totalFail = 0;
  let totalSchemas = 0;

  results.forEach((result) => {
    const status = result.status === 'pass' ? '✅' : '❌';
    console.log(`${status} ${result.url}`);
    console.log(`   Schemas found: ${result.schemas.length}`);
    
    result.schemas.forEach((schema) => {
      const schemaStatus = schema.valid ? '✅' : '❌';
      console.log(`   ${schemaStatus} ${schema.type}`);
    });

    if (result.issues.length > 0) {
      result.issues.forEach((issue) => {
        console.log(`   ❌ ${issue}`);
      });
    }
    console.log('');

    if (result.status === 'pass') totalPass++;
    else totalFail++;
    totalSchemas += result.schemas.length;
  });

  console.log('TOTALS:');
  console.log(`  ✅ Passed: ${totalPass}`);
  console.log(`  ❌ Failed: ${totalFail}`);
  console.log(`  📄 Total Schemas: ${totalSchemas}`);

  // Tools recommendation
  console.log('\n\n🔧 RECOMMENDED TESTING TOOLS:');
  console.log('====================================\n');
  console.log('1. Google Rich Results Test:');
  console.log('   https://search.google.com/test/rich-results\n');
  console.log('2. Schema.org Validator:');
  console.log('   https://validator.schema.org/\n');
  console.log('3. Google Search Console:');
  console.log('   https://search.google.com/search-console\n');

  // Exit code
  if (totalFail > 0) {
    console.log('❌ Some pages failed validation');
    process.exit(1);
  } else {
    console.log('✅ All pages validated successfully!');
    process.exit(0);
  }
}

main();
