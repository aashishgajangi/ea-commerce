/**
 * Page Templates for E-commerce Platform
 * Pre-built, SEO-optimized page structures for essential pages
 */

import type { HomepageData } from './pages';

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  pageType: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  content: string;
  excerpt?: string;
  isEssential: boolean;
  homepageData?: HomepageData;
  structuredData?: Record<string, unknown>;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  // 1. Homepage Template
  {
    id: 'homepage',
    name: 'Homepage',
    description: 'Modern homepage with hero, products, categories, and newsletter sections',
    icon: '🏠',
    pageType: 'homepage',
    slug: '',
    title: 'Welcome to Our Store',
    metaTitle: 'Welcome to Our Store - Quality Products, Great Prices',
    metaDescription: 'Discover amazing products at our store. Shop the latest trends with fast shipping, secure checkout, and 24/7 customer support. Your satisfaction is our priority!',
    metaKeywords: 'online shopping, e-commerce, quality products, fast shipping, secure checkout',
    excerpt: 'Your one-stop shop for quality products',
    isEssential: true,
    homepageData: {
      showHero: true,
      heroTitle: 'Welcome to Our Store',
      heroSubtitle: 'Discover amazing products at great prices',
      heroImageId: null,
      heroButtonText: 'Shop Now',
      heroButtonUrl: '/products',
      showFeaturedProducts: true,
      featuredProductsTitle: 'Featured Products',
      featuredProductsCount: 8,
      featuredProductsColumnsMobile: 2,
      featuredProductsColumnsDesktop: 4,
      showCategories: true,
      categoriesTitle: 'Shop by Category',
      categoriesCount: 6,
      showNewsletter: true,
      newsletterTitle: 'Stay Updated',
      newsletterSubtitle: 'Subscribe to get special offers and updates',
    },
    content: `
      <h1>Welcome to Our Store</h1>
      <p>Discover our curated collection of premium products designed to enhance your lifestyle. We're committed to providing exceptional quality, unbeatable prices, and outstanding customer service.</p>
      
      <h2>Why Shop With Us?</h2>
      <ul>
        <li><strong>Quality Guaranteed:</strong> We source only the finest products from trusted suppliers</li>
        <li><strong>Fast & Free Shipping:</strong> Get your orders delivered quickly with free shipping on orders over $50</li>
        <li><strong>Secure Checkout:</strong> Shop with confidence using our encrypted payment system</li>
        <li><strong>24/7 Customer Support:</strong> Our team is always here to help you</li>
        <li><strong>Easy Returns:</strong> Not satisfied? Return within 30 days for a full refund</li>
      </ul>

      <h2>Shop Our Featured Collections</h2>
      <p>Browse through our carefully curated collections featuring the season's hottest trends and customer favorites.</p>

      <h2>Customer Reviews</h2>
      <p>Don't just take our word for it - hear what our satisfied customers have to say!</p>

      <p><a href="/products">Start Shopping Now →</a></p>
    `,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Our Store',
      'url': 'https://yourstore.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://yourstore.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  },

  // 2. About Us Template
  {
    id: 'about',
    name: 'About Us',
    description: 'Company story, mission, values, and team introduction',
    icon: '📄',
    pageType: 'about',
    slug: 'about-us',
    title: 'About Us - Our Story & Mission',
    metaTitle: 'About [Your Store Name] - Our Story, Mission & Values',
    metaDescription: 'Learn about [Your Store Name]\'s journey, mission, and values. Discover why thousands of customers trust us for quality products and exceptional service since [Year].',
    metaKeywords: 'about us, company story, mission, values, our team, company history',
    excerpt: 'Discover our story, mission, and the team behind our success',
    isEssential: true,
    content: `
      <h1>About [Your Store Name]</h1>
      <p>Welcome to [Your Store Name]! We're passionate about bringing you the best products at the best prices, with service that exceeds your expectations.</p>

      <h2>Our Story</h2>
      <p>Founded in [Year], [Your Store Name] started with a simple mission: to make quality products accessible to everyone. What began as a small operation has grown into a thriving online marketplace serving customers worldwide.</p>
      <p>Our founder, [Founder Name], saw an opportunity to bridge the gap between quality and affordability. Today, we're proud to offer thousands of products across multiple categories, all backed by our commitment to excellence.</p>

      <h2>Our Mission</h2>
      <p>Our mission is to provide exceptional products that enhance your daily life, delivered with outstanding customer service and a seamless shopping experience.</p>

      <h3>Core Values</h3>
      <ul>
        <li><strong>Quality First:</strong> We never compromise on product quality</li>
        <li><strong>Customer Obsessed:</strong> Your satisfaction drives everything we do</li>
        <li><strong>Transparency:</strong> Honest communication in all our dealings</li>
        <li><strong>Innovation:</strong> Continuously improving to serve you better</li>
        <li><strong>Sustainability:</strong> Committed to eco-friendly practices</li>
      </ul>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>Over [X] satisfied customers worldwide</li>
        <li>[X]+ products across [X] categories</li>
        <li>Award-winning customer service</li>
        <li>Fast and reliable shipping</li>
        <li>Secure and easy returns</li>
      </ul>

      <h2>Meet Our Team</h2>
      <p>Behind [Your Store Name] is a dedicated team of professionals passionate about delivering the best experience possible. From product curation to customer support, every team member plays a vital role in our success.</p>

      <h2>Our Commitment to You</h2>
      <p>We're committed to providing you with:</p>
      <ul>
        <li>Carefully selected, high-quality products</li>
        <li>Competitive prices and regular promotions</li>
        <li>Fast, reliable shipping</li>
        <li>Responsive customer support</li>
        <li>A secure and user-friendly shopping experience</li>
      </ul>

      <p>Thank you for choosing [Your Store Name]. We look forward to serving you!</p>

      <p><strong>Have questions?</strong> <a href="/contact">Contact our team</a> - we'd love to hear from you!</p>
    `,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': '[Your Store Name]',
      'url': '[Your Site URL]',
      'foundingDate': '[Year]',
      'description': '[Your Store Description]',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'email': 'support@yourstore.com',
      },
    },
  },

  // 3. Contact Us Template
  {
    id: 'contact',
    name: 'Contact Us',
    description: 'Contact form, business hours, location, and support information',
    icon: '📞',
    pageType: 'contact',
    slug: 'contact-us',
    title: 'Contact Us - We\'re Here to Help',
    metaTitle: 'Contact [Your Store Name] - Customer Support & Inquiries',
    metaDescription: 'Need help? Contact [Your Store Name] customer support team. Email, phone, or live chat available. We respond within 24 hours. Get answers to your questions today!',
    metaKeywords: 'contact us, customer support, help desk, customer service, phone, email',
    excerpt: 'Get in touch with our customer support team',
    isEssential: true,
    content: `
      <h1>Contact Us</h1>
      <p>Have a question, concern, or just want to say hello? We'd love to hear from you! Our customer support team is ready to assist you with any inquiries.</p>

      <h2>Get in Touch</h2>
      <p>Choose the contact method that works best for you:</p>

      <h3>📧 Email Support</h3>
      <p>Email us at: <strong>support@yourstore.com</strong></p>
      <p>Response time: Within 24 hours (usually faster!)</p>

      <h3>📱 Phone Support</h3>
      <p>Call us at: <strong>1-800-XXX-XXXX</strong></p>
      <p>Monday-Friday: 9:00 AM - 6:00 PM EST</p>
      <p>Saturday: 10:00 AM - 4:00 PM EST</p>
      <p>Sunday: Closed</p>

      <h3>💬 Live Chat</h3>
      <p>Chat with us live during business hours for instant assistance. Look for the chat icon in the bottom right corner of your screen!</p>

      <h3>📍 Visit Us</h3>
      <p><strong>[Your Store Name]</strong><br>
      [Your Street Address]<br>
      [City, State ZIP Code]<br>
      [Country]</p>

      <h2>Business Hours</h2>
      <ul>
        <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
        <li>Saturday: 10:00 AM - 4:00 PM EST</li>
        <li>Sunday: Closed</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <p>Before reaching out, you might find the answer to your question in our <a href="/faq">FAQ section</a>. We've compiled answers to the most common questions about orders, shipping, returns, and more.</p>

      <h2>For Specific Inquiries</h2>
      <ul>
        <li><strong>Order Status:</strong> Track your order <a href="/account">in your account</a></li>
        <li><strong>Returns & Refunds:</strong> See our <a href="/return-policy">Return Policy</a></li>
        <li><strong>Shipping Information:</strong> View our <a href="/shipping-policy">Shipping Policy</a></li>
        <li><strong>Product Questions:</strong> Check individual product pages or email us</li>
        <li><strong>Partnership Inquiries:</strong> Email partnerships@yourstore.com</li>
        <li><strong>Press & Media:</strong> Email press@yourstore.com</li>
      </ul>

      <h2>Follow Us on Social Media</h2>
      <p>Stay connected and get the latest updates:</p>
      <ul>
        <li>Facebook: @yourstorename</li>
        <li>Instagram: @yourstorename</li>
        <li>Twitter: @yourstorename</li>
        <li>LinkedIn: Your Store Name</li>
      </ul>

      <p><strong>We're here to help make your shopping experience exceptional!</strong></p>
    `,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'mainEntity': {
        '@type': 'Organization',
        'name': '[Your Store Name]',
        'email': 'support@yourstore.com',
        'telephone': '+1-800-XXX-XXXX',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '[Your Street Address]',
          'addressLocality': '[City]',
          'addressRegion': '[State]',
          'postalCode': '[ZIP]',
          'addressCountry': '[Country]',
        },
      },
    },
  },

  // 4. Terms & Conditions Template
  {
    id: 'terms',
    name: 'Terms & Conditions',
    description: 'Legal terms of service and usage agreement',
    icon: '📋',
    pageType: 'terms',
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    metaTitle: 'Terms and Conditions - [Your Store Name]',
    metaDescription: 'Read the Terms and Conditions for [Your Store Name]. Understand your rights and responsibilities when shopping with us. Last updated [Date].',
    metaKeywords: 'terms and conditions, terms of service, legal terms, usage agreement',
    excerpt: 'Legal terms governing the use of our website and services',
    isEssential: true,
    content: `
      <h1>Terms and Conditions</h1>
      <p><strong>Last Updated: [Date]</strong></p>

      <p>Welcome to [Your Store Name]. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our website.</p>

      <h2>2. Use of Website</h2>
      <h3>2.1 Eligibility</h3>
      <p>You must be at least 18 years old to make purchases on our website. By using this site, you represent that you meet this age requirement.</p>

      <h3>2.2 Account Registration</h3>
      <p>To make purchases, you may need to create an account. You are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your account information</li>
        <li>All activities that occur under your account</li>
        <li>Notifying us immediately of any unauthorized use</li>
      </ul>

      <h3>2.3 Prohibited Activities</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Use the website for any illegal purpose</li>
        <li>Attempt to gain unauthorized access to any portion of the website</li>
        <li>Interfere with or disrupt the website or servers</li>
        <li>Transmit viruses, malware, or harmful code</li>
        <li>Impersonate another person or entity</li>
        <li>Collect or harvest information about other users</li>
      </ul>

      <h2>3. Products and Services</h2>
      <h3>3.1 Product Information</h3>
      <p>We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is error-free, complete, or current.</p>

      <h3>3.2 Pricing</h3>
      <p>All prices are listed in [Currency] and are subject to change without notice. We reserve the right to modify prices at any time.</p>

      <h3>3.3 Product Availability</h3>
      <p>All products are subject to availability. We reserve the right to discontinue any product at any time.</p>

      <h2>4. Orders and Payment</h2>
      <h3>4.1 Order Acceptance</h3>
      <p>Your receipt of an electronic order confirmation does not signify our acceptance of your order. We reserve the right to accept or decline your order for any reason.</p>

      <h3>4.2 Payment Methods</h3>
      <p>We accept the following payment methods: [List payment methods]. By providing payment information, you represent that you are authorized to use the payment method.</p>

      <h3>4.3 Order Cancellation</h3>
      <p>We reserve the right to cancel orders in cases of:</p>
      <ul>
        <li>Product unavailability</li>
        <li>Pricing errors</li>
        <li>Suspected fraudulent transactions</li>
        <li>Failure to meet order requirements</li>
      </ul>

      <h2>5. Shipping and Delivery</h2>
      <p>Shipping terms and delivery times are outlined in our <a href="/shipping-policy">Shipping Policy</a>. We are not responsible for delays caused by shipping carriers or customs.</p>

      <h2>6. Returns and Refunds</h2>
      <p>Our return and refund policies are detailed in our <a href="/return-policy">Return Policy</a>. Please review this policy before making a purchase.</p>

      <h2>7. Intellectual Property</h2>
      <p>All content on this website, including text, graphics, logos, images, and software, is the property of [Your Store Name] and is protected by copyright and trademark laws.</p>

      <h2>8. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, [Your Store Name] shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or products purchased.</p>

      <h2>9. Privacy</h2>
      <p>Your use of the website is also governed by our <a href="/privacy-policy">Privacy Policy</a>. Please review this policy to understand how we collect and use your information.</p>

      <h2>10. Governing Law</h2>
      <p>These Terms and Conditions are governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

      <h2>11. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Continued use of the website after changes constitutes acceptance of the modified terms.</p>

      <h2>12. Contact Information</h2>
      <p>If you have questions about these Terms and Conditions, please contact us:</p>
      <p>Email: legal@yourstore.com<br>
      Address: [Your Business Address]</p>

      <p><strong>By using our website, you acknowledge that you have read and agree to these Terms and Conditions.</strong></p>
    `,
  },

  // 5. Privacy Policy Template
  {
    id: 'privacy',
    name: 'Privacy Policy',
    description: 'How we collect, use, and protect customer data (GDPR compliant)',
    icon: '🔒',
    pageType: 'privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy - How We Protect Your Data | [Your Store Name]',
    metaDescription: 'Read our Privacy Policy to understand how [Your Store Name] collects, uses, and protects your personal information. GDPR compliant. Last updated [Date].',
    metaKeywords: 'privacy policy, data protection, GDPR, personal information, cookies',
    excerpt: 'How we collect, use, and protect your personal information',
    isEssential: true,
    content: `
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated: [Date]</strong></p>

      <p>At [Your Store Name], we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases.</p>

      <h2>1. Information We Collect</h2>
      
      <h3>1.1 Personal Information</h3>
      <p>We collect information you provide directly, including:</p>
      <ul>
        <li>Name and contact information (email, phone number, address)</li>
        <li>Billing and shipping addresses</li>
        <li>Payment information (processed securely by our payment processors)</li>
        <li>Account credentials (username, password)</li>
        <li>Purchase history and preferences</li>
        <li>Communications with customer support</li>
      </ul>

      <h3>1.2 Automatically Collected Information</h3>
      <p>When you visit our website, we automatically collect:</p>
      <ul>
        <li>Device information (browser type, operating system)</li>
        <li>IP address and location data</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Usage data (pages visited, time spent, clicks)</li>
        <li>Referral sources</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders</li>
        <li>Provide customer support</li>
        <li>Send marketing communications (with your consent)</li>
        <li>Improve our website and services</li>
        <li>Prevent fraud and enhance security</li>
        <li>Comply with legal obligations</li>
        <li>Analyze usage patterns and trends</li>
      </ul>

      <h2>3. Information Sharing and Disclosure</h2>
      <p>We do not sell your personal information. We may share your information with:</p>
      
      <h3>3.1 Service Providers</h3>
      <ul>
        <li>Payment processors</li>
        <li>Shipping carriers</li>
        <li>Email service providers</li>
        <li>Analytics providers</li>
        <li>Customer support tools</li>
      </ul>

      <h3>3.2 Legal Requirements</h3>
      <p>We may disclose your information if required by law or to:</p>
      <ul>
        <li>Comply with legal processes</li>
        <li>Protect our rights and property</li>
        <li>Prevent fraud or security issues</li>
        <li>Protect the safety of our users</li>
      </ul>

      <h3>3.3 Business Transfers</h3>
      <p>If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Remember your preferences</li>
        <li>Understand how you use our website</li>
        <li>Provide personalized content</li>
        <li>Measure the effectiveness of our marketing</li>
      </ul>
      <p>You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>

      <h2>5. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your information, including:</p>
      <ul>
        <li>Encryption of sensitive data (SSL/TLS)</li>
        <li>Secure payment processing</li>
        <li>Regular security assessments</li>
        <li>Access controls and authentication</li>
        <li>Employee training on data protection</li>
      </ul>
      <p>However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>

      <h2>6. Your Rights and Choices</h2>
      
      <h3>6.1 Access and Correction</h3>
      <p>You have the right to access and update your personal information through your account settings or by contacting us.</p>

      <h3>6.2 Marketing Communications</h3>
      <p>You can opt-out of marketing emails by clicking the "unsubscribe" link in any email or adjusting your account preferences.</p>

      <h3>6.3 GDPR Rights (for EU residents)</h3>
      <p>If you're in the EU, you have additional rights:</p>
      <ul>
        <li>Right to access your data</li>
        <li>Right to rectification</li>
        <li>Right to erasure ("right to be forgotten")</li>
        <li>Right to restrict processing</li>
        <li>Right to data portability</li>
        <li>Right to object to processing</li>
        <li>Right to withdraw consent</li>
      </ul>

      <h3>6.4 California Privacy Rights (CCPA)</h3>
      <p>California residents have the right to:</p>
      <ul>
        <li>Know what personal information is collected</li>
        <li>Know whether personal information is sold or disclosed</li>
        <li>Opt-out of the sale of personal information</li>
        <li>Request deletion of personal information</li>
        <li>Not be discriminated against for exercising privacy rights</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>We retain your information for as long as necessary to:</p>
      <ul>
        <li>Fulfill the purposes outlined in this policy</li>
        <li>Comply with legal obligations</li>
        <li>Resolve disputes</li>
        <li>Enforce our agreements</li>
      </ul>

      <h2>8. Children's Privacy</h2>
      <p>Our website is not intended for children under 13 years old. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us.</p>

      <h2>9. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.</p>

      <h2>10. International Data Transfers</h2>
      <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information.</p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date.</p>

      <h2>12. Contact Us</h2>
      <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
      <p>Email: privacy@yourstore.com<br>
      Address: [Your Business Address]<br>
      Phone: [Your Phone Number]</p>

      <p><strong>By using our website, you consent to this Privacy Policy.</strong></p>
    `,
  },

  // 6. Return and Refund Policy Template
  {
    id: 'return',
    name: 'Return & Refund Policy',
    description: 'Return conditions, refund process, and customer rights',
    icon: '🔄',
    pageType: 'return',
    slug: 'return-policy',
    title: 'Return and Refund Policy',
    metaTitle: 'Return & Refund Policy - Easy Returns | [Your Store Name]',
    metaDescription: 'Read our hassle-free Return and Refund Policy. 30-day returns, full refunds, and easy process. Customer satisfaction guaranteed at [Your Store Name].',
    metaKeywords: 'return policy, refund policy, returns, money back guarantee, customer satisfaction',
    excerpt: 'Our commitment to hassle-free returns and refunds',
    isEssential: true,
    content: `
      <h1>Return and Refund Policy</h1>
      <p><strong>Last Updated: [Date]</strong></p>

      <p>At [Your Store Name], your satisfaction is our priority. We want you to love your purchase! If you're not completely satisfied, we're here to help with our straightforward return and refund policy.</p>

      <h2>30-Day Return Policy</h2>
      <p>You have <strong>30 calendar days</strong> from the date you receive your item to request a return.</p>

      <h2>Eligibility for Returns</h2>
      <p>To be eligible for a return, your item must meet these conditions:</p>
      <ul>
        <li>Item must be unused and in the same condition that you received it</li>
        <li>Item must be in its original packaging</li>
        <li>Item must have the receipt or proof of purchase</li>
        <li>Tags and labels must be intact</li>
        <li>Item must not be a non-returnable item (see below)</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <p>Certain items cannot be returned for hygiene and safety reasons:</p>
      <ul>
        <li>Perishable goods (food, flowers, plants)</li>
        <li>Personal care items (cosmetics, underwear, earrings)</li>
        <li>Hazardous materials or flammable liquids</li>
        <li>Gift cards</li>
        <li>Downloadable software or digital products</li>
        <li>Items marked as "Final Sale" or "Non-Returnable"</li>
      </ul>

      <h2>How to Initiate a Return</h2>
      <p>Follow these simple steps:</p>
      <ol>
        <li><strong>Contact Us:</strong> Email support@yourstore.com with your order number and reason for return</li>
        <li><strong>Get Authorization:</strong> We'll send you a Return Merchandise Authorization (RMA) number</li>
        <li><strong>Pack Your Item:</strong> Securely pack the item in its original packaging with all accessories</li>
        <li><strong>Include RMA:</strong> Include the RMA number inside the package</li>
        <li><strong>Ship It Back:</strong> Send to the address provided (you're responsible for return shipping costs)</li>
      </ol>

      <h3>Return Shipping Address</h3>
      <p>[Your Store Name] Returns Department<br>
      [Your Return Address]<br>
      [City, State ZIP Code]<br>
      [Country]</p>

      <h2>Return Shipping Costs</h2>
      <ul>
        <li><strong>Customer Responsibility:</strong> You are responsible for return shipping costs unless the item is defective or we made an error</li>
        <li><strong>Damaged/Defective Items:</strong> We cover return shipping for defective or damaged items</li>
        <li><strong>Recommendation:</strong> Use a trackable shipping service. We are not responsible for lost return packages</li>
        <li><strong>Tip:</strong> Consider purchasing shipping insurance for valuable items</li>
      </ul>

      <h2>Refunds</h2>
      
      <h3>Processing Time</h3>
      <p>Once we receive your returned item:</p>
      <ul>
        <li>We'll inspect it within 2-3 business days</li>
        <li>You'll receive an email notification about the approval or rejection of your refund</li>
        <li>If approved, your refund will be processed automatically</li>
        <li>Refunds typically appear in 5-10 business days depending on your payment provider</li>
      </ul>

      <h3>Refund Method</h3>
      <p>Refunds will be issued to your original payment method:</p>
      <ul>
        <li>Credit/Debit Card: 5-10 business days</li>
        <li>PayPal: 2-5 business days</li>
        <li>Other payment methods: As specified by the provider</li>
      </ul>

      <h3>Partial Refunds</h3>
      <p>In certain situations, only partial refunds may be granted:</p>
      <ul>
        <li>Items not in original condition or damaged not due to our error</li>
        <li>Items returned more than 30 days after delivery</li>
        <li>Items missing parts not due to our error</li>
      </ul>

      <h2>Exchanges</h2>
      <p>We accept exchanges for:</p>
      <ul>
        <li>Different sizes or colors (subject to availability)</li>
        <li>Defective or damaged items</li>
      </ul>
      <p>To exchange an item, follow the return process and place a new order for the item you want.</p>

      <h2>Damaged or Defective Items</h2>
      <p>If you receive a damaged or defective item:</p>
      <ol>
        <li>Contact us immediately (within 48 hours of delivery)</li>
        <li>Provide photos of the damage or defect</li>
        <li>We'll arrange for a replacement or full refund</li>
        <li>We'll cover all return shipping costs</li>
      </ol>

      <h2>Wrong Item Received</h2>
      <p>If we sent you the wrong item:</p>
      <ul>
        <li>Contact us immediately</li>
        <li>We'll send the correct item at no charge</li>
        <li>We'll provide a prepaid return label for the wrong item</li>
      </ul>

      <h2>Sale and Clearance Items</h2>
      <p>Items purchased during sales or from clearance sections:</p>
      <ul>
        <li>Are eligible for return within 30 days</li>
        <li>Must meet all standard return conditions</li>
        <li>Some items may be marked as "Final Sale" and cannot be returned</li>
      </ul>

      <h2>International Returns</h2>
      <p>For international orders:</p>
      <ul>
        <li>Same 30-day return policy applies</li>
        <li>Customer is responsible for return shipping costs and customs fees</li>
        <li>We recommend using trackable international shipping</li>
        <li>Refunds exclude original shipping costs and customs fees</li>
      </ul>

      <h2>Late or Missing Refunds</h2>
      <p>If you haven't received your refund after the expected timeframe:</p>
      <ol>
        <li>Check your bank account again</li>
        <li>Contact your credit card company (processing may take time)</li>
        <li>Contact your bank</li>
        <li>If still no refund, contact us at support@yourstore.com</li>
      </ol>

      <h2>Contact Us</h2>
      <p>Questions about returns or refunds?</p>
      <p>Email: returns@yourstore.com<br>
      Phone: 1-800-XXX-XXXX<br>
      Hours: Monday-Friday, 9 AM - 6 PM EST</p>

      <p><strong>We're committed to making your return experience as smooth as possible!</strong></p>
    `,
  },

  // 7. Shipping Policy Template
  {
    id: 'shipping',
    name: 'Shipping Policy',
    description: 'Shipping methods, costs, delivery times, and tracking information',
    icon: '🚚',
    pageType: 'shipping',
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    metaTitle: 'Shipping Policy - Fast & Reliable Delivery | [Your Store Name]',
    metaDescription: 'Learn about our shipping options, costs, and delivery times. Free shipping on orders over $50. Track your order easily at [Your Store Name].',
    metaKeywords: 'shipping policy, delivery, shipping costs, tracking, free shipping',
    excerpt: 'Fast and reliable shipping to your doorstep',
    isEssential: true,
    content: `
      <h1>Shipping Policy</h1>
      <p><strong>Last Updated: [Date]</strong></p>

      <p>We strive to get your order to you as quickly and safely as possible. Here's everything you need to know about our shipping process.</p>

      <h2>Free Shipping</h2>
      <p>🎉 <strong>Free standard shipping on all orders over $50!</strong></p>
      <p>Orders under $50 have a flat shipping rate based on your location.</p>

      <h2>Shipping Methods & Costs</h2>
      
      <h3>Domestic Shipping (United States)</h3>
      <table>
        <tr>
          <th>Method</th>
          <th>Delivery Time</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td>Standard Shipping</td>
          <td>5-7 business days</td>
          <td>$5.99 (Free over $50)</td>
        </tr>
        <tr>
          <td>Express Shipping</td>
          <td>2-3 business days</td>
          <td>$12.99</td>
        </tr>
        <tr>
          <td>Overnight Shipping</td>
          <td>1 business day</td>
          <td>$24.99</td>
        </tr>
      </table>

      <h3>International Shipping</h3>
      <p>We ship to over 50 countries worldwide!</p>
      <ul>
        <li><strong>Canada:</strong> 7-14 business days, starting at $15.99</li>
        <li><strong>Europe:</strong> 10-20 business days, starting at $19.99</li>
        <li><strong>Australia:</strong> 12-25 business days, starting at $22.99</li>
        <li><strong>Asia:</strong> 10-20 business days, starting at $18.99</li>
        <li><strong>Other Countries:</strong> Contact us for rates</li>
      </ul>

      <h2>Processing Time</h2>
      <p>Orders are typically processed within:</p>
      <ul>
        <li><strong>1-2 business days</strong> for in-stock items</li>
        <li><strong>3-5 business days</strong> for made-to-order items</li>
        <li><strong>Weekends & Holidays:</strong> Not included in processing time</li>
      </ul>
      <p><em>Processing time is separate from delivery time.</em></p>

      <h2>Order Tracking</h2>
      <p>Stay informed about your order:</p>
      <ol>
        <li><strong>Order Confirmation:</strong> Immediate email after order placement</li>
        <li><strong>Shipping Confirmation:</strong> Email with tracking number when order ships</li>
        <li><strong>Track Online:</strong> Use tracking number on carrier's website or in your <a href="/account">account</a></li>
        <li><strong>Delivery Confirmation:</strong> Notification when package is delivered</li>
      </ol>

      <h2>Shipping Carriers</h2>
      <p>We use trusted carriers:</p>
      <ul>
        <li>USPS (United States Postal Service)</li>
        <li>UPS (United Parcel Service)</li>
        <li>FedEx</li>
        <li>DHL (for international orders)</li>
      </ul>
      <p>Carrier selection is based on your location and shipping method chosen.</p>

      <h2>Delivery Locations</h2>
      
      <h3>We Ship To:</h3>
      <ul>
        <li>Residential addresses</li>
        <li>Business addresses</li>
        <li>PO Boxes (standard shipping only)</li>
        <li>APO/FPO addresses</li>
        <li>Hotels (with advance notice to concierge)</li>
      </ul>

      <h3>We Cannot Ship To:</h3>
      <ul>
        <li>Forwarding addresses (package forwarding services)</li>
        <li>Countries under trade sanctions</li>
        <li>Some remote or inaccessible locations</li>
      </ul>

      <h2>Order Modifications</h2>
      <p><strong>Before Shipment:</strong></p>
      <ul>
        <li>Contact us immediately at support@yourstore.com</li>
        <li>We'll do our best to modify your order</li>
        <li>Once processed, changes may not be possible</li>
      </ul>

      <p><strong>After Shipment:</strong></p>
      <ul>
        <li>Orders cannot be modified once shipped</li>
        <li>You may refuse delivery or return the order per our <a href="/return-policy">Return Policy</a></li>
      </ul>

      <h2>Customs, Duties & Taxes</h2>
      <p>For international orders:</p>
      <ul>
        <li><strong>Customer Responsibility:</strong> You are responsible for customs duties and import taxes</li>
        <li><strong>Varies by Country:</strong> Fees vary based on your country's regulations</li>
        <li><strong>Not Included:</strong> These fees are NOT included in our shipping costs</li>
        <li><strong>Payment:</strong> Typically collected by the carrier at delivery</li>
        <li><strong>Refusal:</strong> Refusing to pay results in return to sender (no refund)</li>
      </ul>

      <h2>Shipping Issues</h2>
      
      <h3>Delayed Packages</h3>
      <p>If your package is delayed:</p>
      <ul>
        <li>Check tracking information for updates</li>
        <li>Allow 2-3 extra days beyond estimated delivery</li>
        <li>Contact us if package is significantly delayed</li>
        <li>We'll work with the carrier to locate your package</li>
      </ul>

      <h3>Lost Packages</h3>
      <p>If your package is lost:</p>
      <ol>
        <li>Contact us within 30 days of order date</li>
        <li>We'll file a claim with the carrier</li>
        <li>Once confirmed lost, we'll send a replacement or issue a refund</li>
      </ol>

      <h3>Damaged Packages</h3>
      <p>If your package arrives damaged:</p>
      <ol>
        <li>Take photos of the package and contents</li>
        <li>Contact us within 48 hours</li>
        <li>We'll arrange for replacement or refund</li>
      </ol>

      <h2>Undeliverable Packages</h2>
      <p>If a package is returned to us as undeliverable:</p>
      <ul>
        <li>We'll contact you to verify address</li>
        <li>You may need to pay additional shipping for redelivery</li>
        <li>Unclaimed packages are refunded minus shipping costs and restocking fee</li>
      </ul>

      <h2>Holidays & Peak Seasons</h2>
      <p>During holidays and peak seasons:</p>
      <ul>
        <li>Processing and shipping times may be extended</li>
        <li>Order early to ensure timely delivery</li>
        <li>Check homepage for holiday shipping deadlines</li>
        <li>Carrier delays are beyond our control</li>
      </ul>

      <h2>Shipping Restrictions</h2>
      <p>Some items have shipping restrictions:</p>
      <ul>
        <li>Hazardous materials</li>
        <li>Oversized items</li>
        <li>Items prohibited by carrier regulations</li>
        <li>Items requiring special handling</li>
      </ul>
      <p>These restrictions will be noted on the product page.</p>

      <h2>Contact Us</h2>
      <p>Questions about shipping?</p>
      <p>Email: shipping@yourstore.com<br>
      Phone: 1-800-XXX-XXXX<br>
      Hours: Monday-Friday, 9 AM - 6 PM EST</p>

      <p><strong>We're committed to delivering your order safely and on time!</strong></p>
    `,
  },

  // 8. FAQ Template
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Frequently asked questions and answers',
    icon: '❓',
    pageType: 'faq',
    slug: 'faq',
    title: 'Frequently Asked Questions (FAQ)',
    metaTitle: 'FAQ - Your Questions Answered | [Your Store Name]',
    metaDescription: 'Find answers to frequently asked questions about orders, shipping, returns, payments, and more at [Your Store Name]. Quick and helpful support.',
    metaKeywords: 'faq, frequently asked questions, help, support, customer service',
    excerpt: 'Quick answers to your most common questions',
    isEssential: true,
    content: `
      <h1>Frequently Asked Questions (FAQ)</h1>
      <p>Find quick answers to the most common questions about shopping with [Your Store Name]. Can't find what you're looking for? <a href="/contact">Contact us</a>!</p>

      <h2>Ordering</h2>

      <h3>How do I place an order?</h3>
      <p>Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping information and payment details. You'll receive an order confirmation email once your order is placed.</p>

      <h3>Can I modify or cancel my order?</h3>
      <p>Contact us immediately at support@yourstore.com if you need to modify or cancel your order. We'll do our best to accommodate your request, but once an order is processed and shipped, it cannot be modified.</p>

      <h3>Do I need an account to place an order?</h3>
      <p>No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and enjoy faster checkout in the future.</p>

      <h3>Is my payment information secure?</h3>
      <p>Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.</p>

      <h2>Shipping & Delivery</h2>

      <h3>How long will my order take to arrive?</h3>
      <p>Standard shipping takes 5-7 business days within the US. Express and overnight options are available. International orders take 10-25 business days depending on the destination.</p>

      <h3>Do you offer free shipping?</h3>
      <p>Yes! We offer free standard shipping on all orders over $50 within the United States.</p>

      <h3>How can I track my order?</h3>
      <p>Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.</p>

      <h3>Do you ship internationally?</h3>
      <p>Yes, we ship to over 50 countries worldwide! International shipping rates and delivery times vary by location. See our <a href="/shipping-policy">Shipping Policy</a> for details.</p>

      <h3>What if my package is lost or damaged?</h3>
      <p>If your package is lost or arrives damaged, contact us immediately with your order number and photos (if damaged). We'll work with the carrier and send a replacement or issue a refund.</p>

      <h2>Returns & Refunds</h2>

      <h3>What is your return policy?</h3>
      <p>We offer a 30-day return policy on most items. Items must be unused, in original packaging, and in the same condition you received them. See our <a href="/return-policy">Return Policy</a> for full details.</p>

      <h3>How do I return an item?</h3>
      <p>Contact us at returns@yourstore.com with your order number and reason for return. We'll provide a Return Authorization (RMA) number and instructions. You'll be responsible for return shipping costs unless the item is defective.</p>

      <h3>How long does it take to get a refund?</h3>
      <p>Once we receive and inspect your return (2-3 business days), we'll process your refund. Refunds typically appear in your account within 5-10 business days depending on your payment provider.</p>

      <h3>Can I exchange an item?</h3>
      <p>Yes! Contact us to initiate an exchange for a different size or color (subject to availability). For defective items, we'll send a replacement at no charge.</p>

      <h2>Products</h2>

      <h3>Are your product photos accurate?</h3>
      <p>We strive to display accurate product photos. However, colors may vary slightly due to monitor settings and lighting conditions.</p>

      <h3>How do I know what size to order?</h3>
      <p>Each product page includes size charts and measurement guides. If you're unsure, contact us for personalized sizing assistance!</p>

      <h3>Are products in stock?</h3>
      <p>Product availability is shown on each product page. If an item is out of stock, you can sign up for restock notifications.</p>

      <h3>Do you restock sold-out items?</h3>
      <p>Many items are restocked regularly. Sign up for email notifications on the product page to be alerted when items are back in stock.</p>

      <h2>Payment</h2>

      <h3>What payment methods do you accept?</h3>
      <p>We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and other payment methods displayed at checkout.</p>

      <h3>When will my card be charged?</h3>
      <p>Your payment method is charged when you place your order, not when it ships.</p>

      <h3>Do you accept gift cards?</h3>
      <p>Yes! Gift cards can be purchased on our website and redeemed at checkout.</p>

      <h3>Can I use multiple discount codes?</h3>
      <p>Typically, only one discount code can be applied per order unless otherwise stated. The discount that provides the best savings will be automatically applied.</p>

      <h2>Account & Privacy</h2>

      <h3>How do I reset my password?</h3>
      <p>Click "Forgot Password" on the login page. You'll receive an email with instructions to reset your password.</p>

      <h3>How do I update my account information?</h3>
      <p>Log into your account and navigate to Account Settings to update your email, password, and saved addresses.</p>

      <h3>How do you protect my personal information?</h3>
      <p>We take privacy seriously. Read our <a href="/privacy-policy">Privacy Policy</a> to learn how we collect, use, and protect your information.</p>

      <h3>Can I delete my account?</h3>
      <p>Yes, contact us at privacy@yourstore.com to request account deletion. We'll remove your personal information in accordance with applicable laws.</p>

      <h2>Contact & Support</h2>

      <h3>How can I contact customer support?</h3>
      <p>You can reach us via:</p>
      <ul>
        <li>Email: support@yourstore.com</li>
        <li>Phone: 1-800-XXX-XXXX (Mon-Fri, 9 AM - 6 PM EST)</li>
        <li>Live Chat: Available on our website during business hours</li>
      </ul>

      <h3>What are your business hours?</h3>
      <p>Customer support is available Monday-Friday, 9 AM - 6 PM EST, and Saturday 10 AM - 4 PM EST. We're closed on Sundays and major holidays.</p>

      <h3>How quickly will I get a response?</h3>
      <p>We aim to respond to all inquiries within 24 hours, usually much faster! Live chat provides immediate assistance during business hours.</p>

      <h2>Still Have Questions?</h2>
      <p>Can't find the answer you're looking for? Our customer support team is here to help!</p>
      <p><a href="/contact"><strong>Contact Us →</strong></a></p>
    `,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How long will my order take to arrive?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Standard shipping takes 5-7 business days within the US. Express and overnight options are available. International orders take 10-25 business days depending on the destination.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is your return policy?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We offer a 30-day return policy on most items. Items must be unused, in original packaging, and in the same condition you received them.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Do you offer free shipping?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! We offer free standard shipping on all orders over $50 within the United States.',
          },
        },
      ],
    },
  },

  // 9. 404 Not Found Template
  {
    id: 'notfound',
    name: '404 Not Found',
    description: 'Custom 404 error page with helpful navigation',
    icon: '❌',
    pageType: 'notfound',
    slug: '404',
    title: '404 - Page Not Found',
    metaTitle: '404 - Page Not Found | [Your Store Name]',
    metaDescription: 'Sorry, the page you are looking for could not be found. Browse our store or contact us for assistance.',
    metaKeywords: '404, not found, error page',
    excerpt: 'The page you are looking for could not be found',
    isEssential: true,
    content: `
      <h1>404 - Page Not Found</h1>
      <p>We're sorry, but the page you are looking for could not be found. It may have been moved, deleted, or never existed.</p>

      <h2>What Can You Do?</h2>
      <ul>
        <li><strong>Check the URL:</strong> Make sure the web address is spelled correctly</li>
        <li><strong>Go to Homepage:</strong> Start fresh from our homepage</li>
        <li><strong>Browse Products:</strong> Discover our latest collection</li>
        <li><strong>Use Search:</strong> Try searching for what you're looking for</li>
        <li><strong>Contact Us:</strong> We're here to help if you need assistance</li>
      </ul>

      <h2>Popular Pages</h2>
      <p>Here are some pages you might be interested in:</p>
      <ul>
        <li><a href="/">Homepage</a> - Start shopping</li>
        <li><a href="/products">All Products</a> - Browse our full catalog</li>
        <li><a href="/about-us">About Us</a> - Learn more about our store</li>
        <li><a href="/contact-us">Contact Us</a> - Get in touch with our team</li>
      </ul>

      <h2>Need Help?</h2>
      <p>If you believe this is an error or need assistance finding what you're looking for, please don't hesitate to <a href="/contact-us">contact our customer support team</a>. We're here to help!</p>
    `,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': '404 Not Found',
      'description': 'The page you are looking for could not be found',
    },
  },
];

/**
 * Get all available templates
 */
export function getAllTemplates(): PageTemplate[] {
  return PAGE_TEMPLATES;
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(id: string): PageTemplate | undefined {
  return PAGE_TEMPLATES.find(template => template.id === id);
}

/**
 * Get templates by category/type
 */
export function getTemplatesByType(type: string): PageTemplate[] {
  return PAGE_TEMPLATES.filter(template => template.pageType === type);
}

/**
 * Get essential pages (pages that should always exist)
 */
export function getEssentialTemplates(): PageTemplate[] {
  return PAGE_TEMPLATES.filter(template => template.isEssential);
}
