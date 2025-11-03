# Product SEO Upgrade & Category-Based Slug Generation

## ✅ Completed Steps

### 1. Database Migration
- **File Created:** `prisma/migrations/20251103000001_add_advanced_product_seo/migration.sql`
- **Added Fields:**
  - `canonicalUrl`
  - `ogTitle`, `ogDescription`, `ogImageId`
  - `twitterTitle`, `twitterDescription`, `twitterImageId`
  - `focusKeyphrase`, `focusKeyphrases`
  - `robots`, `schemaType`, `schemaData`

### 2. Prisma Schema Updated
- Added all SEO fields to Product model
- Added relations to Media for OG and Twitter images

### 3. Product Edit Page Interface Updated
- Added all SEO fields to Product interface
- Added category information to Product
- Imported SEO components (GoogleSearchPreview, FacebookSharePreview, etc.)

## 🔧 Remaining Implementation Steps

### Step 1: Run Migration

```bash
npx prisma migrate dev
npx prisma generate
```

### Step 2: Add Category Change Handler with Slug Generation

Add this function after `fetchCategories` in `/src/app/admin/products/[id]/page.tsx` (around line 180):

```typescript
// Handle category change and auto-update slug
const handleCategoryChange = (categoryId: string) => {
  if (!product) return;

  const selectedCategory = categories.find(cat => cat.id === categoryId);
  
  setProduct({
    ...product,
    categoryId,
  });

  // Auto-generate slug based on category + product name
  if (selectedCategory) {
    const newSlug = generateSEOSlug(`${selectedCategory.slug} ${product.name}`);
    setProduct(prev => prev ? { ...prev, categoryId, slug: newSlug } : null);
  }
};
```

### Step 3: Update Category Select to Use New Handler

Find the category select dropdown (around line 600) and replace:

```typescript
// OLD:
<select
  value={product.categoryId || ''}
  onChange={(e) => setProduct({ ...product, categoryId: e.target.value || null })}
>

// NEW:
<select
  value={product.categoryId || ''}
  onChange={(e) => handleCategoryChange(e.target.value || '')}
>
```

### Step 4: Update handleSave to Include All SEO Fields

Find `handleSave` function (around line 200) and update the `updateData` object to include:

```typescript
const updateData = {
  // ... existing fields ...
  
  // SEO - Basic
  metaTitle: product.metaTitle?.trim() || null,
  metaDescription: product.metaDescription?.trim() || null,
  metaKeywords: product.metaKeywords?.trim() || null,
  canonicalUrl: product.canonicalUrl?.trim() || null,
  
  // SEO - Open Graph
  ogTitle: product.ogTitle?.trim() || null,
  ogDescription: product.ogDescription?.trim() || null,
  ogImageId: product.ogImageId || null,
  
  // SEO - Twitter Card
  twitterTitle: product.twitterTitle?.trim() || null,
  twitterDescription: product.twitterDescription?.trim() || null,
  twitterImageId: product.twitterImageId || null,
  
  // SEO - Advanced
  focusKeyphrase: product.focusKeyphrase?.trim() || null,
  focusKeyphrases: product.focusKeyphrases || null,
  robots: product.robots || 'index,follow',
  schemaType: product.schemaType || 'Product',
  schemaData: product.schemaData || null,
};
```

### Step 5: Replace SEO Tab with Split-Screen Layout

Find the SEO tab section (around line 1163) and replace the entire section with:

```typescript
{/* SEO Tab */}
{activeTab === 'seo' && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main Content - 2/3 width */}
    <div className="lg:col-span-2 space-y-6">
      {/* Basic SEO */}
      <Card>
        <CardHeader>
          <CardTitle>Basic SEO</CardTitle>
          <CardDescription>Essential fields for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title *</Label>
            <Input
              id="metaTitle"
              value={product.metaTitle || ''}
              onChange={(e) => setProduct({ ...product, metaTitle: e.target.value })}
              placeholder="Product title for search engines (50-60 characters)"
            />
            <p className="text-sm text-gray-500">
              {product.metaTitle?.length || 0}/60 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description *</Label>
            <textarea
              id="metaDescription"
              value={product.metaDescription || ''}
              onChange={(e) => setProduct({ ...product, metaDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              placeholder="Product description for search engines (120-160 characters)"
            />
            <p className="text-sm text-gray-500">
              {product.metaDescription?.length || 0}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="focusKeyphrase">Focus Keyphrase</Label>
            <Input
              id="focusKeyphrase"
              value={product.focusKeyphrase || ''}
              onChange={(e) => setProduct({ ...product, focusKeyphrase: e.target.value })}
              placeholder="Main keyword (e.g., 'organic tomatoes')"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaKeywords">Keywords</Label>
            <Input
              id="metaKeywords"
              value={product.metaKeywords || ''}
              onChange={(e) => setProduct({ ...product, metaKeywords: e.target.value })}
              placeholder="Comma-separated keywords"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <Input
              id="canonicalUrl"
              value={product.canonicalUrl || ''}
              onChange={(e) => setProduct({ ...product, canonicalUrl: e.target.value })}
              placeholder="/products/{slug}"
            />
          </div>
        </CardContent>
      </Card>

      {/* Open Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Open Graph (Facebook)</CardTitle>
          <CardDescription>How your product appears when shared on Facebook</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ogTitle">OG Title</Label>
            <Input
              id="ogTitle"
              value={product.ogTitle || ''}
              onChange={(e) => setProduct({ ...product, ogTitle: e.target.value })}
              placeholder="Title for social sharing"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ogDescription">OG Description</Label>
            <textarea
              id="ogDescription"
              value={product.ogDescription || ''}
              onChange={(e) => setProduct({ ...product, ogDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-md min-h-[80px]"
              placeholder="Description for social sharing"
            />
          </div>

          <div className="space-y-2">
            <Label>OG Image (1200x630px recommended)</Label>
            <p className="text-sm text-gray-500">
              Use Media Library to select an image
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Twitter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Twitter Card</CardTitle>
          <CardDescription>How your product appears when shared on Twitter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="twitterTitle">Twitter Title</Label>
            <Input
              id="twitterTitle"
              value={product.twitterTitle || ''}
              onChange={(e) => setProduct({ ...product, twitterTitle: e.target.value })}
              placeholder="Title for Twitter"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="twitterDescription">Twitter Description</Label>
            <textarea
              id="twitterDescription"
              value={product.twitterDescription || ''}
              onChange={(e) => setProduct({ ...product, twitterDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-md min-h-[80px]"
              placeholder="Description for Twitter"
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced SEO */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced SEO</CardTitle>
          <CardDescription>Additional SEO settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="robots">Robots Meta Tag</Label>
            <select
              id="robots"
              value={product.robots || 'index,follow'}
              onChange={(e) => setProduct({ ...product, robots: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="index,follow">Index, Follow (Default)</option>
              <option value="noindex,follow">No Index, Follow</option>
              <option value="index,nofollow">Index, No Follow</option>
              <option value="noindex,nofollow">No Index, No Follow</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* SEO Sidebar - 1/3 width */}
    <div className="space-y-6">
      {/* SEO Score */}
      <SEOScorePanel
        title={product.metaTitle || product.name}
        description={product.metaDescription || product.description || ''}
        keywords={product.metaKeywords || ''}
        focusKeyphrase={product.focusKeyphrase || ''}
        content={product.description || ''}
        hasCanonicalUrl={!!product.canonicalUrl}
        hasOGTags={!!(product.ogTitle && product.ogDescription)}
        hasTwitterTags={!!(product.twitterTitle && product.twitterDescription)}
      />

      {/* Google Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Google Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleSearchPreview
            title={product.metaTitle || product.name}
            description={product.metaDescription || product.description || ''}
            url={`/products/${product.slug}`}
          />
        </CardContent>
      </Card>

      {/* Facebook Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Facebook Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <FacebookSharePreview
            title={product.ogTitle || product.metaTitle || product.name}
            description={product.ogDescription || product.metaDescription || product.description || ''}
            imageUrl={product.images?.[0]?.url}
            url={`/products/${product.slug}`}
          />
        </CardContent>
      </Card>

      {/* Twitter Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Twitter Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <TwitterCardPreview
            title={product.twitterTitle || product.metaTitle || product.name}
            description={product.twitterDescription || product.metaDescription || product.description || ''}
            imageUrl={product.images?.[0]?.url}
          />
        </CardContent>
      </Card>
    </div>
  </div>
)}
```

## 📋 Summary of Changes

### Category-Based Slug Generation:
- ✅ When user selects a category, slug auto-generates as: `category-slug-product-name`
- ✅ Example: Category "Organic" + Product "Fresh Tomatoes" = `organic-fresh-tomatoes`
- ✅ Uses existing `generateSEOSlug()` function from `slug-utils.ts`

### SEO Sidebar Features:
- ✅ Real-time SEO score (0-100)
- ✅ Live Google search preview
- ✅ Live Facebook share preview
- ✅ Live Twitter card preview
- ✅ All 13 new SEO fields
- ✅ Character counters
- ✅ Split-screen layout (2/3 form, 1/3 sidebar)

## 🧪 Testing Checklist

- [ ] Run migration successfully
- [ ] Edit a product and change category
- [ ] Verify slug updates automatically
- [ ] Fill in SEO fields
- [ ] Check all 3 preview cards update in real-time
- [ ] Verify SEO score calculation
- [ ] Save product and verify all SEO fields persist
- [ ] Check frontend product page uses new SEO data

## 🚀 Run Commands

```bash
# 1. Apply migration
npx prisma migrate dev

# 2. Regenerate Prisma Client
npx prisma generate

# 3. Restart dev server
npm run dev

# 4. Test
# Navigate to: http://localhost:3000/admin/products/{id}
# Click SEO tab to see new sidebar
```

## 📁 Files Modified

1. `prisma/schema.prisma` - Added SEO fields
2. `prisma/migrations/20251103000001_add_advanced_product_seo/migration.sql` - Migration
3. `src/app/admin/products/[id]/page.tsx` - Updated interface, imports, added handlers
4. This guide - Implementation steps

## ✨ Benefits

- **Better SEO:** 13 advanced SEO fields like pages
- **Smart Slugs:** Auto-generate based on category + product name
- **Live Previews:** See exactly how product appears in Google, Facebook, Twitter
- **SEO Score:** Real-time feedback on optimization level
- **Professional UI:** Split-screen layout with sidebar like page editor
- **Consistent:** Same SEO experience across pages and products

---

**Status:** Ready to implement - follow steps above to complete! 🚀
