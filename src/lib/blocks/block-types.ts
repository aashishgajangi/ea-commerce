/**
 * Block Types Definition
 * 
 * This file defines all available block types for the page editor.
 * Each block type has a unique identifier, metadata, and default data structure.
 */

export interface BlockType {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'content' | 'media' | 'ecommerce' | 'layout' | 'interactive';
  defaultData: Record<string, unknown>;
}

export interface BlockInstance {
  id: string; // Unique instance ID (e.g., "block-abc123")
  type: string; // Block type ID (e.g., "hero", "content")
  order: number; // Position in the page (0, 1, 2, ...)
  enabled: boolean; // Can be disabled without deleting
  data: Record<string, unknown>; // Block-specific data
}

// ============================================
// BLOCK TYPE DEFINITIONS
// ============================================

export const BLOCK_TYPES: Record<string, BlockType> = {
  // ==================== CONTENT BLOCKS ====================
  
  hero: {
    id: 'hero',
    name: 'Hero Section',
    icon: '🏠',
    description: 'Large banner with title, subtitle, image, and CTA button',
    category: 'content',
    defaultData: {
      title: 'Welcome to Our Store',
      subtitle: 'Discover amazing products at great prices',
      buttonText: 'Shop Now',
      buttonUrl: '/products',
      imageId: null,
      imageUrl: null,
      alignment: 'center', // left, center, right
      height: 'medium', // small, medium, large, full
      overlay: true, // Dark overlay on image
      overlayOpacity: 0.4,
    },
  },

  content: {
    id: 'content',
    name: 'Rich Content',
    icon: '📝',
    description: 'Rich text editor with formatting, images, links, and more',
    category: 'content',
    defaultData: {
      html: '<p>Start writing your content here...</p>',
      // Lexical editor will handle the content
    },
  },

  cta: {
    id: 'cta',
    name: 'Call to Action',
    icon: '🎯',
    description: 'Prominent call-to-action section with button',
    category: 'content',
    defaultData: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers',
      buttonText: 'Get Started',
      buttonUrl: '/products',
      buttonStyle: 'primary', // primary, secondary, outline
      backgroundColor: '#f3f4f6',
      textColor: '#1f2937',
      alignment: 'center',
    },
  },

  // ==================== MEDIA BLOCKS ====================

  image: {
    id: 'image',
    name: 'Image',
    icon: '🖼️',
    description: 'Single image with caption and link',
    category: 'media',
    defaultData: {
      imageId: null,
      imageUrl: null,
      alt: '',
      caption: '',
      link: '',
      alignment: 'center', // left, center, right
      size: 'large', // small, medium, large, full
      rounded: false,
      shadow: false,
    },
  },

  gallery: {
    id: 'gallery',
    name: 'Image Gallery',
    icon: '🎨',
    description: 'Grid of multiple images',
    category: 'media',
    defaultData: {
      images: [], // Array of { imageId, imageUrl, alt, caption }
      columns: 3, // 2, 3, 4, 5, 6
      gap: 'medium', // small, medium, large
      rounded: false,
      lightbox: true, // Open in lightbox on click
    },
  },

  video: {
    id: 'video',
    name: 'Video',
    icon: '🎥',
    description: 'Embedded video (YouTube, Vimeo, or upload)',
    category: 'media',
    defaultData: {
      videoUrl: '', // YouTube/Vimeo URL
      videoId: null, // Uploaded video ID
      aspectRatio: '16:9', // 16:9, 4:3, 1:1
      autoplay: false,
      controls: true,
      muted: false,
    },
  },

  media_hero: {
    id: 'media_hero',
    name: 'Media Hero',
    icon: '🎬',
    description: 'Advanced hero with image/video/slider background and mobile optimization',
    category: 'media',
    defaultData: {
      // Content
      title: 'Welcome to Our Store',
      subtitle: 'Discover amazing products at great prices',
      buttonText: 'Shop Now',
      buttonUrl: '/products',
      
      // Background Type
      backgroundType: 'image', // 'image', 'video', 'slider'
      
      // Single Image Background
      desktopImageId: null,
      desktopImageUrl: null,
      mobileImageId: null,
      mobileImageUrl: null,
      
      // Video Background
      videoType: 'youtube', // 'youtube', 'vimeo', 'upload'
      videoUrl: '', // YouTube/Vimeo URL
      videoId: null, // Uploaded video ID
      videoAutoplay: true,
      videoMuted: true,
      videoLoop: true,
      
      // Slider Background (multiple images)
      slides: [], // Array of { desktopImageId, desktopImageUrl, mobileImageId, mobileImageUrl }
      sliderAutoplay: true,
      sliderSpeed: 5000, // milliseconds
      sliderShowDots: true,
      sliderShowArrows: true,
      sliderTransition: 'fade', // 'fade', 'slide'
      
      // Layout
      height: 'large', // 'medium' (60vh), 'large' (80vh), 'full' (100vh)
      contentAlignment: 'center', // 'left', 'center', 'right'
      verticalAlignment: 'center', // 'top', 'center', 'bottom'
      
      // Desktop Image Settings
      desktopImageFit: 'cover', // 'contain' (show full), 'cover' (fill/crop) - cover fills screen
      desktopImagePosition: 'center', // 'center', 'top', 'bottom', 'left', 'right'
      
      // Mobile Image Settings
      mobileImageFit: 'contain', // 'contain' (show full), 'cover' (fill/crop)
      mobileImagePosition: 'center', // 'center', 'top', 'bottom', 'left', 'right'
      
      // Styling
      overlay: true,
      overlayColor: '#000000',
      textColor: '#ffffff',
      titleSize: 'large', // 'medium', 'large', 'xlarge'
      
      // Button Styling
      buttonStyle: 'solid', // 'solid' (BG only), 'outline' (border only), 'both' (BG + border), 'ghost' (none)
      buttonColor: '#10b981',
      buttonTextColor: '#ffffff',
      buttonSize: 'large', // 'medium', 'large'
      buttonTextBold: false,
      buttonBackgroundOpacity: 1, // 0-1 (0% to 100%)
      
      // Animation
      animateContent: true,
      animationDelay: 300, // milliseconds
      
      // Content visibility toggles
      showTitle: true,
      showSubtitle: true,
      showButton: true,
      
      // Custom positioning
      contentMaxWidth: 'lg', // 'sm' (640px), 'md' (768px), 'lg' (1024px), 'xl' (1280px), 'full'
      contentPaddingX: 'md', // 'none', 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
      contentPaddingY: 'md', // 'none', 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
      
      // Fine-tuned positioning
      useCustomPosition: false,
      customVerticalPosition: 50, // 0-100 (percentage from top)
      customHorizontalPosition: 50, // 0-100 (percentage from left)
    },
  },

  // ==================== ECOMMERCE BLOCKS ====================
  products_grid: {
    id: 'products_grid',
    name: 'Products Grid',
    icon: '📦',
    description: 'Display products in a grid layout',
    category: 'ecommerce',
    defaultData: {
      title: 'Featured Products',
      filter: 'featured', // featured, new, sale, category, manual
      categoryId: null, // If filter is 'category'
      productIds: [], // If filter is 'manual'
      count: 8,
      columnsMobile: 2,
      columnsTablet: 3,
      columnsDesktop: 4,
      showPrice: true,
      showAddToCart: true,
    },
  },

  categories_grid: {
    id: 'categories_grid',
    name: 'Categories Grid',
    icon: '🗂️',
    description: 'Display product categories',
    category: 'ecommerce',
    defaultData: {
      title: 'Shop by Category',
      filter: 'all', // all, featured, manual
      categoryIds: [], // If filter is 'manual'
      count: 6,
      columns: 3,
      showCount: true, // Show product count
      style: 'card', // card, minimal, overlay
    },
  },

  newsletter: {
    id: 'newsletter',
    name: 'Newsletter',
    icon: '📧',
    description: 'Email subscription form',
    category: 'interactive',
    defaultData: {
      title: 'Stay Updated',
      subtitle: 'Subscribe to get special offers and updates',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      successMessage: 'Thanks for subscribing!',
      backgroundColor: '#f3f4f6',
      textColor: '#1f2937',
    },
  },

  // ==================== LAYOUT BLOCKS ====================

  spacer: {
    id: 'spacer',
    name: 'Spacer',
    icon: '⬜',
    description: 'Add vertical spacing between sections',
    category: 'layout',
    defaultData: {
      height: 'medium', // small (20px), medium (40px), large (80px), xlarge (120px)
      customHeight: null, // Custom height in pixels
    },
  },

  divider: {
    id: 'divider',
    name: 'Divider',
    icon: '➖',
    description: 'Horizontal line to separate content',
    category: 'layout',
    defaultData: {
      style: 'solid', // solid, dashed, dotted
      width: 'full', // full, medium, small
      color: '#e5e7eb',
      thickness: 1, // pixels
      spacing: 'medium', // small, medium, large (margin top/bottom)
    },
  },

  columns: {
    id: 'columns',
    name: 'Columns',
    icon: '📊',
    description: 'Multi-column layout for content',
    category: 'layout',
    defaultData: {
      columnCount: 2, // 2, 3, 4
      gap: 'medium', // small, medium, large
      columns: [
        { html: '<p>Column 1 content</p>' },
        { html: '<p>Column 2 content</p>' },
      ],
    },
  },

  // ==================== INTERACTIVE BLOCKS ====================

  accordion: {
    id: 'accordion',
    name: 'Accordion / FAQ',
    icon: '❓',
    description: 'Expandable question and answer sections',
    category: 'interactive',
    defaultData: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is your return policy?',
          answer: '<p>We offer 30-day returns on all products.</p>',
          expanded: false,
        },
        {
          question: 'How long does shipping take?',
          answer: '<p>Standard shipping takes 5-7 business days.</p>',
          expanded: false,
        },
      ],
      allowMultiple: false, // Allow multiple items open at once
    },
  },

  testimonials: {
    id: 'testimonials',
    name: 'Testimonials',
    icon: '💬',
    description: 'Customer reviews and testimonials',
    category: 'interactive',
    defaultData: {
      title: 'What Our Customers Say',
      items: [
        {
          name: 'John Doe',
          role: 'Customer',
          text: 'Great products and excellent service!',
          rating: 5,
          imageId: null,
        },
        {
          name: 'Jane Smith',
          role: 'Customer',
          text: 'Fast shipping and quality products.',
          rating: 5,
          imageId: null,
        },
      ],
      layout: 'grid', // grid, slider
      columns: 3,
      showRating: true,
      showImage: true,
    },
  },

  contact_form: {
    id: 'contact_form',
    name: 'Contact Form',
    icon: '📞',
    description: 'Contact form with customizable fields',
    category: 'interactive',
    defaultData: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you',
      fields: [
        { type: 'text', name: 'name', label: 'Name', required: true },
        { type: 'email', name: 'email', label: 'Email', required: true },
        { type: 'textarea', name: 'message', label: 'Message', required: true },
      ],
      buttonText: 'Send Message',
      successMessage: 'Thanks! We\'ll get back to you soon.',
      emailTo: '', // Admin email to receive submissions
    },
  },

  code: {
    id: 'code',
    name: 'Custom Code',
    icon: '💻',
    description: 'Embed custom HTML, CSS, or JavaScript',
    category: 'interactive',
    defaultData: {
      html: '<!-- Your custom HTML here -->',
      css: '/* Your custom CSS here */',
      javascript: '// Your custom JavaScript here',
      enabled: true,
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all block types
 */
export function getAllBlockTypes(): BlockType[] {
  return Object.values(BLOCK_TYPES);
}

/**
 * Get block types by category
 */
export function getBlockTypesByCategory(category: BlockType['category']): BlockType[] {
  return Object.values(BLOCK_TYPES).filter(block => block.category === category);
}

/**
 * Get block type by ID
 */
export function getBlockType(id: string): BlockType | undefined {
  return BLOCK_TYPES[id];
}

/**
 * Create a new block instance
 */
export function createBlockInstance(
  type: string,
  order: number,
  customData?: Record<string, unknown>
): BlockInstance {
  const blockType = getBlockType(type);
  if (!blockType) {
    throw new Error(`Block type "${type}" not found`);
  }

  return {
    id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    order,
    enabled: true,
    data: { ...blockType.defaultData, ...customData },
  };
}

/**
 * Validate block instance
 */
export function validateBlockInstance(block: BlockInstance): boolean {
  const blockType = getBlockType(block.type);
  if (!blockType) return false;
  
  // Basic validation
  if (!block.id || typeof block.order !== 'number') return false;
  if (typeof block.enabled !== 'boolean') return false;
  if (!block.data || typeof block.data !== 'object') return false;
  
  return true;
}

/**
 * Get block categories
 */
export function getBlockCategories(): Array<{ id: BlockType['category']; name: string; icon: string }> {
  return [
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'media', name: 'Media', icon: '🎨' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒' },
    { id: 'layout', name: 'Layout', icon: '📐' },
    { id: 'interactive', name: 'Interactive', icon: '⚡' },
  ];
}
