import Link from 'next/link';
import { getAllSettings } from '@/lib/settings';
import { getMenuByLocation } from '@/lib/menus';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

export default async function Footer() {
  const settings = await getAllSettings();
  const footerMenu = await getMenuByLocation('footer');

  // Social media icons mapping
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
  };

  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--theme-footer-background, #1a1a1a)',
        color: 'var(--theme-footer-text, #ffffff)',
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              {settings.footer.text || 'Thank you for shopping with us!'}
            </p>
          </div>

          {/* Footer Menu Links */}
          {footerMenu && footerMenu.items && footerMenu.items.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerMenu.items.map((item) => {
                  const href = item.type === 'page' && item.page
                    ? item.page.slug === '' ? '/' : `/${item.page.slug}`
                    : item.url || '#';

                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        target={item.target}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Social Media Links */}
          {settings.footer.showSocial && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {Object.entries(settings.social).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                      aria-label={platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        {settings.footer.showPaymentMethods && (
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-center mb-4">We Accept</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {['Visa', 'Mastercard', 'PayPal', 'Stripe'].map((method) => (
                <div
                  key={method}
                  className="px-4 py-2 bg-gray-800 rounded text-xs font-semibold"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            {settings.footer.copyrightText || `© ${new Date().getFullYear()} My Store. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}