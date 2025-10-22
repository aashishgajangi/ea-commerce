'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp, Clock } from 'lucide-react';

interface Suggestion {
  type: 'product';
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
}

export default function ModernSearchBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currency, setCurrency] = useState('USD');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle ESC key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      // CMD+K or CTRL+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch currency on mount
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch('/api/admin/settings/general');
        if (response.ok) {
          const data = await response.json();
          setCurrency(data.currency || 'USD');
        }
      } catch (error) {
        console.error('Failed to fetch currency:', error);
      }
    };
    fetchCurrency();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fetch suggestions
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle search submit
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/products/${suggestions[selectedIndex].slug}`);
        setIsOpen(false);
      } else {
        handleSearch();
      }
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <>
      {/* Search Button/Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md"
        style={{
          borderColor: 'var(--theme-text)',
          backgroundColor: 'var(--theme-background)',
          opacity: 0.9
        }}
      >
        <Search className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: 'var(--theme-text)' }} />
        <span className="hidden md:inline text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
          Search...
        </span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded border ml-2"
          style={{ 
            borderColor: 'var(--theme-text)',
            backgroundColor: 'var(--theme-background)',
            color: 'var(--theme-text)',
            opacity: 0.6
          }}
        >
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl rounded-xl shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-200 border"
            style={{
              backgroundColor: 'var(--theme-background)',
              borderColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
              <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--theme-primary)' }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-lg"
                style={{ color: 'var(--theme-text)' }}
              />
              {loading && (
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'var(--theme-primary)' }}
                  />
                </div>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="flex-shrink-0 p-1 rounded-md hover:bg-opacity-10 hover:bg-current transition-colors"
              >
                <X className="w-5 h-5" style={{ color: 'var(--theme-text)' }} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.length === 0 ? (
                // Empty state - show tips
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: 'var(--theme-primary)', opacity: 0.1 }}
                  >
                    <Search className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                    Search for products
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                    Start typing to find what you&apos;re looking for
                  </p>
                  
                  {/* Quick tips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                      style={{ backgroundColor: 'var(--theme-primary)', opacity: 0.1, color: 'var(--theme-text)' }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      Popular searches
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                      style={{ backgroundColor: 'var(--theme-primary)', opacity: 0.1, color: 'var(--theme-text)' }}
                    >
                      <Clock className="w-3 h-3" />
                      Recent items
                    </div>
                  </div>
                </div>
              ) : query.length < 2 ? (
                // Need more characters
                <div className="p-8 text-center">
                  <p className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                    Type at least 2 characters to search
                  </p>
                </div>
              ) : suggestions.length === 0 && !loading ? (
                // No results
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: 'var(--theme-text)', opacity: 0.05 }}
                  >
                    <Search className="w-8 h-8" style={{ color: 'var(--theme-text)', opacity: 0.3 }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                    No results found
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                // Results list
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--theme-text)', opacity: 0.5 }}
                  >
                    Products
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <Link
                      key={suggestion.id}
                      href={`/products/${suggestion.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-150 group"
                      style={{
                        backgroundColor: index === selectedIndex ? 'var(--theme-primary)' : 'transparent',
                        opacity: index === selectedIndex ? 1 : 1,
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {/* Product Image */}
                      {suggestion.image ? (
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-black/5">
                          <Image
                            src={suggestion.image}
                            alt={suggestion.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                            unoptimized={true}
                            onError={(e) => {
                              // Hide broken image and show fallback
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 flex-shrink-0 rounded-lg flex items-center justify-center ring-1 ring-black/5"
                          style={{ backgroundColor: 'var(--theme-primary)', opacity: 0.1 }}
                        >
                          <Search className="w-6 h-6" style={{ color: 'var(--theme-primary)', opacity: 0.5 }} />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate mb-1"
                          style={{ 
                            color: index === selectedIndex ? '#ffffff' : 'var(--theme-text)'
                          }}
                        >
                          {suggestion.name}
                        </p>
                        <p className="text-sm font-semibold"
                          style={{ 
                            color: index === selectedIndex ? '#ffffff' : 'var(--theme-primary)',
                            opacity: index === selectedIndex ? 0.9 : 1
                          }}
                        >
                          {formatPrice(suggestion.price)}
                        </p>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowRight 
                        className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: index === selectedIndex ? '#ffffff' : 'var(--theme-text)' }}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {query.length >= 2 && suggestions.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t text-xs"
                style={{ borderColor: 'rgba(0, 0, 0, 0.1)', color: 'var(--theme-text)', opacity: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-gray-200">↑</kbd>
                    <kbd className="px-2 py-1 rounded border border-gray-200">↓</kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-gray-200">↵</kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-gray-200">esc</kbd>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
