'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';

interface Suggestion {
  type: 'product';
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
}

export default function ExpandableSearchBar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currency, setCurrency] = useState<string>('USD');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

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

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Fetch suggestions
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
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
      setShowSuggestions(false);
      setIsExpanded(false);
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
        setShowSuggestions(false);
        setIsExpanded(false);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Toggle search bar
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
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
    <div ref={containerRef} className="relative flex items-center">
      {/* Search Icon Button */}
      {!isExpanded && (
        <button
          onClick={handleToggle}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-current transition-all"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" style={{ color: 'var(--theme-header-text)' }} />
        </button>
      )}

      {/* Expanded Search Bar */}
      {isExpanded && (
        <div className="relative">
          <form onSubmit={handleSearch} className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
              style={{ color: 'var(--theme-text)' }} 
            />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              className="w-80 pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:shadow-lg transition-all animate-in slide-in-from-right duration-200"
              style={{
                borderColor: 'var(--theme-text)',
                backgroundColor: 'var(--theme-background)',
                color: 'var(--theme-text)',
                '--tw-ring-color': 'var(--theme-primary)'
              } as React.CSSProperties}
            />
            {query ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" style={{ color: 'var(--theme-text)' }} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                aria-label="Close search"
              >
                <X className="w-4 h-4" style={{ color: 'var(--theme-text)' }} />
              </button>
            )}
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
              style={{
                borderColor: 'var(--theme-text)',
                backgroundColor: 'var(--theme-background)',
              }}
            >
              <div className="p-2">
                <div className="text-xs font-semibold px-3 py-2 opacity-70"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Products
                </div>
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={suggestion.id}
                    href={`/products/${suggestion.slug}`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setIsExpanded(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-opacity-10 transition-colors"
                    style={{
                      backgroundColor: index === selectedIndex ? 'var(--theme-primary)' : 'transparent',
                      opacity: index === selectedIndex ? 0.9 : 1,
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {suggestion.image ? (
                      <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center">
                        <Search className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate"
                        style={{ 
                          color: index === selectedIndex ? '#ffffff' : 'var(--theme-text)' 
                        }}
                      >
                        {suggestion.name}
                      </p>
                      <p className="text-sm font-semibold"
                        style={{ 
                          color: index === selectedIndex ? '#ffffff' : 'var(--theme-primary)' 
                        }}
                      >
                        {formatPrice(suggestion.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              {loading && (
                <div className="px-3 py-2 text-center text-sm"
                  style={{ color: 'var(--theme-text)', opacity: 0.7 }}
                >
                  Loading suggestions...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
