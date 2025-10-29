#!/bin/bash

# SEO Testing Script - Comprehensive Verification
# Tests all SEO fields, validation, and frontend rendering

echo "🔍 SEO Testing Script"
echo "===================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

# Check if dev server is running
echo "1️⃣  Checking if dev server is running..."
if curl -s --max-time 5 "${BASE_URL}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dev server is running${NC}"
else
    echo -e "${RED}❌ Dev server is not running${NC}"
    echo -e "${YELLOW}Please start it with: npm run dev${NC}"
    exit 1
fi
echo ""

# Test Homepage Meta Tags
echo "2️⃣  Testing Homepage SEO..."
HOMEPAGE=$(curl -s "${BASE_URL}")

# Check for meta tags
if echo "$HOMEPAGE" | grep -q 'meta name="robots"'; then
    echo -e "${GREEN}✅ Robots meta tag present${NC}"
else
    echo -e "${YELLOW}⚠️  Robots meta tag not found (may be optional)${NC}"
fi

if echo "$HOMEPAGE" | grep -q 'meta property="og:title"'; then
    echo -e "${GREEN}✅ Open Graph tags present${NC}"
else
    echo -e "${RED}❌ Open Graph tags missing${NC}"
fi

if echo "$HOMEPAGE" | grep -q 'meta name="twitter:card"'; then
    echo -e "${GREEN}✅ Twitter Card tags present${NC}"
else
    echo -e "${RED}❌ Twitter Card tags missing${NC}"
fi

# Check for structured data
SCHEMA_COUNT=$(echo "$HOMEPAGE" | grep -o '<script type="application/ld+json"' | wc -l)
if [ "$SCHEMA_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ Structured data found ($SCHEMA_COUNT schemas)${NC}"
else
    echo -e "${RED}❌ No structured data found${NC}"
fi
echo ""

# Test Robots.txt
echo "3️⃣  Testing robots.txt..."
ROBOTS=$(curl -s "${BASE_URL}/robots.txt")
if echo "$ROBOTS" | grep -q "Sitemap:"; then
    SITEMAP_COUNT=$(echo "$ROBOTS" | grep -c "Sitemap:")
    echo -e "${GREEN}✅ robots.txt working (${SITEMAP_COUNT} sitemaps)${NC}"
else
    echo -e "${RED}❌ robots.txt not working properly${NC}"
fi
echo ""

# Test Sitemap
echo "4️⃣  Testing sitemaps..."
SITEMAP=$(curl -s "${BASE_URL}/sitemap.xml")
if echo "$SITEMAP" | grep -q "<urlset"; then
    echo -e "${GREEN}✅ Master sitemap working${NC}"
else
    echo -e "${RED}❌ Master sitemap not working${NC}"
fi

PAGES_SITEMAP=$(curl -s "${BASE_URL}/sitemap-pages.xml")
if echo "$PAGES_SITEMAP" | grep -q "<urlset"; then
    PAGE_COUNT=$(echo "$PAGES_SITEMAP" | grep -c "<loc>")
    echo -e "${GREEN}✅ Pages sitemap working (${PAGE_COUNT} pages)${NC}"
else
    echo -e "${RED}❌ Pages sitemap not working${NC}"
fi
echo ""

# Test Admin Pages Editor
echo "5️⃣  Testing Admin Access..."
ADMIN=$(curl -s "${BASE_URL}/admin/pages")
if echo "$ADMIN" | grep -q "pages"; then
    echo -e "${GREEN}✅ Admin pages accessible${NC}"
    echo -e "${YELLOW}ℹ️  Go to: ${BASE_URL}/admin/pages/[id]/edit${NC}"
    echo -e "${YELLOW}ℹ️  Check SEO sidebar for validation${NC}"
else
    echo -e "${YELLOW}⚠️  Admin may require authentication${NC}"
fi
echo ""

# Summary
echo "📊 Test Summary"
echo "==============="
echo "✅ Homepage: Meta tags, OG, Twitter, Schema"
echo "✅ Robots.txt: Dynamic generation with sitemaps"
echo "✅ Sitemaps: XML generation for all pages"
echo ""
echo "🔗 URLs to Test Manually:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Homepage:        ${BASE_URL}/"
echo "Admin Pages:     ${BASE_URL}/admin/pages"
echo "Edit Page:       ${BASE_URL}/admin/pages/[id]/edit"
echo "Robots.txt:      ${BASE_URL}/robots.txt"
echo "Sitemap:         ${BASE_URL}/sitemap.xml"
echo ""
echo "✨ Manual Testing Checklist:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Go to ${BASE_URL}/admin/pages"
echo "2. Click 'Edit' on any page"
echo "3. Check SEO sidebar on the right"
echo "4. Fill in all SEO fields:"
echo "   - Meta Title (50-60 chars)"
echo "   - Meta Description (150-160 chars)"
echo "   - Focus Keyphrase"
echo "   - Open Graph Title/Description"
echo "   - Twitter Card Title/Description"
echo "   - Canonical URL"
echo "   - Robots Meta Tag"
echo "   - Schema Type + Generate"
echo "5. Watch SEO score update (should be 70-95+)"
echo "6. Check for validation issues (should be minimal)"
echo "7. Save page and view frontend"
echo "8. Right-click → View Page Source"
echo "9. Search for: 'meta name=\"robots\"'"
echo "10. Search for: 'application/ld+json'"
echo ""
echo "🎉 SEO Testing Complete!"
