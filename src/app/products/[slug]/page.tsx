import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import PublicLayout from '@/components/layout/PublicLayout';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.images.find((img: any) => img.isPrimary) || product.images[0];

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription || product.description?.substring(0, 160),
    keywords: product.metaKeywords,
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || '',
      images: primaryImage ? [primaryImage.url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || '',
      images: primaryImage ? [primaryImage.url] : [],
    },
  };
}

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product || product.status !== 'published' || !product.isActive) {
    notFound();
  }

  const primaryImage = product.images.find((img: any) => img.isPrimary) || product.images[0];
  const otherImages = product.images.filter((img: any) => !img.isPrimary);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAt: number | null) => {
    if (!compareAt || compareAt <= price) return null;
    return Math.round(((compareAt - price) / compareAt) * 100);
  };

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = product.lowStockThreshold && product.stockQuantity <= product.lowStockThreshold;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-24 w-24 text-gray-300" />
              </div>
            )}
            {discount && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded">
                Save {discount}%
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {otherImages.map((image: any) => (
                <div key={image.id} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-75">
                  <Image
                    src={image.url}
                    alt={image.alt || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.category && (
            <div>
              <Link href={`/products?category=${product.category.id}`} className="text-sm text-blue-600 hover:underline">
                {product.category.name}
              </Link>
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.sku && (
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-lg text-gray-700">{product.shortDescription}</p>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-yellow-600 font-semibold">
                Only {product.stockQuantity} left in stock!
              </span>
            ) : (
              <span className="text-green-600 font-semibold">In Stock</span>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Available Options:</h3>
              <div className="space-y-2">
                {product.variants.map((variant: any) => (
                  <div
                    key={variant.id}
                    className={`border rounded-lg p-3 ${
                      variant.stockQuantity === 0 ? 'opacity-50' : 'hover:border-blue-600 cursor-pointer'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variant.name}</span>
                      <div className="text-right">
                        {variant.price && (
                          <span className="font-semibold">{formatPrice(variant.price)}</span>
                        )}
                        <p className="text-xs text-gray-600">
                          {variant.stockQuantity === 0 ? 'Out of Stock' : `${variant.stockQuantity} available`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-gray-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-gray-600" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </CardContent>
        </Card>
      )}

      {/* Specifications */}
      <Card className="mb-12">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.weight && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{product.weight} kg</span>
              </div>
            )}
            {product.length && product.width && product.height && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">
                  {product.length} × {product.width} × {product.height} cm
                </span>
              </div>
            )}
            {product.sku && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
            )}
            {product.category && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Category:</span>
                <Link href={`/products?category=${product.category.id}`} className="font-medium text-blue-600 hover:underline">
                  {product.category.name}
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps) {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading product...</p>
            </div>
          </div>
        }
      >
        <ProductContent slug={params.slug} />
      </Suspense>
    </PublicLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds