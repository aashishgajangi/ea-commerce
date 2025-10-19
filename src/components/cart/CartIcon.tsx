'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="relative"
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white rounded-full"
            style={{ backgroundColor: 'var(--theme-primary, #0070f3)' }}
          >
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
        <span className="sr-only">Shopping Cart ({cartCount} items)</span>
      </Link>
    </Button>
  );
}
