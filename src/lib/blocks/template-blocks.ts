/**
 * Template Blocks Configuration
 * 
 * Default blocks for each page template type.
 * When a user selects a template, these blocks are automatically added.
 */

import { BlockInstance } from './block-types';

export interface TemplateBlocksConfig {
  [key: string]: BlockInstance[];
}

/**
 * Generate a unique block ID
 */
function generateBlockId(): string {
  return `block-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Default blocks for About Us page
 */
export const aboutUsBlocks: BlockInstance[] = [
  {
    id: generateBlockId(),
    type: 'hero',
    order: 0,
    enabled: true,
    data: {
      title: 'About Our Company',
      subtitle: 'Learn about our story, mission, and the team behind our success',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      backgroundColor: '#0070f3',
      textColor: '#ffffff',
      buttonColor: '#ff6b35',
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 1,
    enabled: true,
    data: {
      title: 'Our Story',
      html: `
        <p>Founded in 2020, our company has been dedicated to providing exceptional products and services to our customers. What started as a small venture has grown into a trusted brand known for quality and reliability.</p>
        <p>We believe in putting our customers first, and that philosophy drives everything we do. From product selection to customer service, we're committed to excellence at every step.</p>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 2,
    enabled: true,
    data: {
      title: 'Our Mission',
      html: `
        <p>Our mission is simple: to deliver outstanding value to our customers while maintaining the highest standards of quality and integrity.</p>
        <h3>Core Values</h3>
        <ul>
          <li><strong>Quality First:</strong> We never compromise on the quality of our products</li>
          <li><strong>Customer Focus:</strong> Your satisfaction is our top priority</li>
          <li><strong>Innovation:</strong> We continuously improve and adapt to serve you better</li>
          <li><strong>Transparency:</strong> Honest communication in everything we do</li>
        </ul>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 3,
    enabled: true,
    data: {
      title: 'Meet Our Team',
      html: `
        <p>Behind every great company is a dedicated team of professionals. Our team brings together diverse skills and experiences, all united by a common goal: serving you better.</p>
        <p>From customer service to product development, every team member plays a crucial role in delivering the experience you deserve.</p>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'newsletter',
    order: 4,
    enabled: true,
    data: {
      title: 'Stay Connected',
      subtitle: 'Subscribe to our newsletter for updates and exclusive offers',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      backgroundColor: '#0070f3',
      textColor: '#ffffff',
      buttonColor: '#ff6b35',
    },
  },
];

/**
 * Default blocks for Contact Us page
 */
export const contactBlocks: BlockInstance[] = [
  {
    id: generateBlockId(),
    type: 'hero',
    order: 0,
    enabled: true,
    data: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you. Reach out to us anytime!',
      buttonText: 'View FAQ',
      buttonLink: '/faq',
      backgroundColor: '#10b981',
      textColor: '#ffffff',
      buttonColor: '#ff6b35',
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 1,
    enabled: true,
    data: {
      title: 'Contact Information',
      html: `
        <h3>📧 Email</h3>
        <p>For general inquiries: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>For support: <a href="mailto:support@example.com">support@example.com</a></p>
        
        <h3>📞 Phone</h3>
        <p>Customer Service: +1 (555) 123-4567</p>
        <p>Available Monday - Friday, 9 AM - 6 PM EST</p>
        
        <h3>📍 Address</h3>
        <p>123 Business Street<br>
        Suite 100<br>
        City, State 12345<br>
        United States</p>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 2,
    enabled: true,
    data: {
      title: 'Business Hours',
      html: `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Monday - Friday</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">9:00 AM - 6:00 PM</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Saturday</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">10:00 AM - 4:00 PM</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Sunday</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Closed</td>
          </tr>
        </table>
        <p style="margin-top: 1rem;"><em>Holiday hours may vary. Please call ahead to confirm.</em></p>
      `,
    },
  },
];

/**
 * Default blocks for FAQ page
 */
export const faqBlocks: BlockInstance[] = [
  {
    id: generateBlockId(),
    type: 'hero',
    order: 0,
    enabled: true,
    data: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our products and services',
      backgroundColor: '#8b5cf6',
      textColor: '#ffffff',
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 1,
    enabled: true,
    data: {
      title: 'General Questions',
      html: `
        <h3>How do I place an order?</h3>
        <p>Simply browse our products, add items to your cart, and proceed to checkout. You can pay securely using credit card, debit card, or other payment methods.</p>
        
        <h3>Do you ship internationally?</h3>
        <p>Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost at checkout.</p>
        
        <h3>What is your return policy?</h3>
        <p>We offer a 30-day return policy on most items. Products must be unused and in original packaging. Please see our <a href="/return-policy">Return Policy</a> page for full details.</p>
        
        <h3>How can I track my order?</h3>
        <p>Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.</p>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 2,
    enabled: true,
    data: {
      title: 'Payment & Security',
      html: `
        <h3>What payment methods do you accept?</h3>
        <p>We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods.</p>
        
        <h3>Is my payment information secure?</h3>
        <p>Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.</p>
        
        <h3>Can I save my payment information for future orders?</h3>
        <p>Yes, you can securely save your payment methods in your account for faster checkout on future orders.</p>
      `,
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 3,
    enabled: true,
    data: {
      title: 'Still Have Questions?',
      html: `
        <p>If you couldn't find the answer you're looking for, please don't hesitate to contact us:</p>
        <ul>
          <li>Email: <a href="mailto:support@example.com">support@example.com</a></li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Live Chat: Available on our website during business hours</li>
        </ul>
        <p>Our customer service team is here to help!</p>
      `,
    },
  },
];

/**
 * Default blocks for Terms & Conditions page
 */
export const termsBlocks: BlockInstance[] = [
  {
    id: generateBlockId(),
    type: 'hero',
    order: 0,
    enabled: true,
    data: {
      title: 'Terms & Conditions',
      subtitle: 'Please read these terms carefully before using our services',
      backgroundColor: '#ef4444',
      textColor: '#ffffff',
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 1,
    enabled: true,
    data: {
      html: `
        <p><em>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <h2>1. Agreement to Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
        
        <h2>3. Disclaimer</h2>
        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h2>4. Limitations</h2>
        <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
        
        <h2>5. Revisions</h2>
        <p>We may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        
        <h2>6. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@example.com">legal@example.com</a>.</p>
      `,
    },
  },
];

/**
 * Default blocks for Privacy Policy page
 */
export const privacyBlocks: BlockInstance[] = [
  {
    id: generateBlockId(),
    type: 'hero',
    order: 0,
    enabled: true,
    data: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us. Learn how we protect your data.',
      backgroundColor: '#6366f1',
      textColor: '#ffffff',
    },
  },
  {
    id: generateBlockId(),
    type: 'content',
    order: 1,
    enabled: true,
    data: {
      html: `
        <p><em>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
        <ul>
          <li>Name and contact information</li>
          <li>Billing and shipping address</li>
          <li>Payment information</li>
          <li>Order history</li>
          <li>Communication preferences</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our products and services</li>
          <li>Detect and prevent fraud</li>
        </ul>
        
        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li>Service providers who help us operate our business</li>
          <li>Payment processors to complete transactions</li>
          <li>Shipping companies to deliver your orders</li>
        </ul>
        
        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>
        
        <h2>6. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.</p>
      `,
    },
  },
];

/**
 * Get default blocks for a template type
 */
export function getTemplateBlocks(templateType: string): BlockInstance[] {
  switch (templateType) {
    case 'about':
      return aboutUsBlocks;
    case 'contact':
      return contactBlocks;
    case 'faq':
      return faqBlocks;
    case 'terms':
      return termsBlocks;
    case 'privacy':
      return privacyBlocks;
    case 'custom':
    default:
      return []; // Blank page - no default blocks
  }
}

/**
 * Template blocks configuration
 */
export const TEMPLATE_BLOCKS: TemplateBlocksConfig = {
  about: aboutUsBlocks,
  contact: contactBlocks,
  faq: faqBlocks,
  terms: termsBlocks,
  privacy: privacyBlocks,
  custom: [], // Blank page
};
