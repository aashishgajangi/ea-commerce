'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { HomepageSettings } from '@/lib/settings';

interface NewsletterSectionProps {
  settings: HomepageSettings;
}

export default function NewsletterSection({ settings }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!settings.showNewsletter) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section
      className="py-16 text-white"
      style={{
        background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
      }}
    >
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Mail className="h-12 w-12 mx-auto mb-4 text-white" />
              <h2 className="text-3xl font-bold mb-2 text-white">
                {settings.newsletterTitle}
              </h2>
              <p className="text-lg opacity-90 text-white">
                {settings.newsletterSubtitle}
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Successfully subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="font-semibold px-8 py-2 rounded transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--theme-background, #ffffff)',
                    color: 'var(--theme-text, #1a1a1a)',
                    borderRadius: 'var(--theme-radius, 0.375rem)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = 'var(--theme-accent, #ff6b35)';
                      e.currentTarget.style.color = 'var(--theme-background, #ffffff)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--theme-background, #ffffff)';
                    e.currentTarget.style.color = 'var(--theme-text, #1a1a1a)';
                  }}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}

            <p className="text-sm opacity-75 mt-4 text-white">
              No spam, unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}