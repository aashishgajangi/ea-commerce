# Admin Panel Guide - Modern Homepage

## Quick Start

Your e-commerce platform now uses a **modern sections-based homepage** with full theme customization.

## Customizing Your Homepage

### 1. Homepage Content (`/admin/homepage`)

Configure what appears on your homepage:

#### Hero Section
- **Toggle:** Show/Hide the hero banner
- **Title:** Main headline (e.g., "Welcome to Our Store")
- **Subtitle:** Supporting text
- **Button Text & URL:** Call-to-action button
- **Background Image:** Optional (upload via Media Library)

#### Featured Products Section
- **Toggle:** Show/Hide featured products
- **Title:** Section heading
- **Count:** Number of products to display (1-20)
- Products marked as "Featured" in `/admin/products` will appear here

#### Categories Section
- **Toggle:** Show/Hide categories
- **Title:** Section heading
- **Count:** Number of categories to display (1-12)

#### Newsletter Section
- **Toggle:** Show/Hide newsletter signup
- **Title:** Section heading
- **Subtitle:** Description text

### 2. Theme Colors (`/admin/theme`)

Control the visual appearance of your entire site:

#### Brand Colors (Used in Gradients)
- **Primary Color:** Start color for Hero and Newsletter gradients
- **Secondary Color:** End color for Hero and Newsletter gradients
- These create beautiful gradient backgrounds

#### Accent & Background
- **Accent Color:** Buttons, badges, hover effects
- **Background Color:** Main page background
- **Text Color:** Primary text throughout the site

#### Header & Footer
- **Header Background/Text:** Navigation bar colors
- **Footer Background/Text:** Footer area colors

#### Styling Options
- **Border Radius:** Corner rounding (none, small, medium, large, extra large)
- **Font Family:** Choose from web-safe fonts
- **Dark Mode:** Enable dark color scheme (experimental)

### 3. Quick Presets

Use pre-configured color schemes:
- **Default Blue:** Clean & Professional
- **Nature Green:** Fresh & Natural
- **Vibrant Purple:** Creative & Modern
- **Warm Red:** Bold & Energetic

## Color Usage Examples

### Hero Section
```
Background: Primary → Secondary gradient
Text: White
Button: Accent color
```

### Featured Products
```
Background: Background color
Text: Text color
Badges: Primary color
Buttons: Accent color (hover effect)
```

### Categories
```
Background: Background color
Card Overlays: Primary → Secondary gradient (20% opacity)
Buttons: Accent color
```

### Newsletter
```
Background: Primary → Secondary gradient
Text: White
Subscribe Button: Background color (hover: Accent)
```

## Best Practices

### Color Selection
1. **Contrast:** Ensure Primary and Secondary colors work well together in gradients
2. **Readability:** White text should be readable on your gradient backgrounds
3. **Accent:** Choose an Accent color that stands out for call-to-action buttons
4. **Consistency:** Use colors that match your brand identity

### Content Guidelines
1. **Hero Title:** Keep it short and impactful (3-8 words)
2. **Hero Subtitle:** Explain your value proposition (10-20 words)
3. **Button Text:** Use action words (Shop Now, Get Started, Learn More)
4. **Newsletter:** Be clear about what subscribers will receive

### Section Visibility
- **Minimum:** Keep at least Hero + one other section enabled
- **Recommended:** Enable all sections for a complete homepage experience
- **Testing:** Preview your site after making changes

## Common Tasks

### Change Homepage Colors
1. Go to `/admin/theme`
2. Update Primary and Secondary colors
3. Click "Save All Settings"
4. Visit homepage to see changes

### Update Hero Content
1. Go to `/admin/homepage`
2. Scroll to "Hero Section"
3. Update title, subtitle, and button
4. Click "Save Settings"

### Feature Products
1. Go to `/admin/products`
2. Edit a product
3. Check "Featured Product"
4. Save product
5. It will appear in Featured Products section

### Upload Hero Image
1. Go to `/admin/media`
2. Upload your image (recommended: 1920x1080px)
3. Go to `/admin/homepage`
4. Select image for Hero Section
5. Save settings

## Troubleshooting

### Colors Not Updating
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure you clicked "Save All Settings"
- Check that you're editing the correct color field

### Sections Not Showing
- Verify the section toggle is enabled in `/admin/homepage`
- Check that you have content (products, categories) to display
- Ensure the section count is greater than 0

### Hero Image Not Displaying
- Verify image is uploaded to Media Library
- Check image format (JPG, PNG, WebP supported)
- Ensure image is selected in homepage settings

## Support

For additional help:
- Check the `MODERN_HOMEPAGE_UPDATE.md` file for technical details
- Review the `THEME_OPTIMIZATION_SUMMARY.md` for theme system information
- Test changes in a development environment first
