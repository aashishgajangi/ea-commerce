import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'image';
}

export function LoadingSkeleton({ className, variant = 'default' }: LoadingSkeletonProps) {
  const baseClasses = 'loading-shimmer';

  const variantClasses = {
    default: 'h-4 bg-gray-200 dark:bg-gray-700 rounded',
    card: 'h-32 bg-gray-200 dark:bg-gray-700 rounded-lg',
    text: 'h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4',
    image: 'aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
    />
  );
}

interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <LoadingSkeleton variant="image" className="mb-4" />
          <div className="space-y-3">
            <LoadingSkeleton variant="text" />
            <LoadingSkeleton variant="text" className="w-1/2" />
            <LoadingSkeleton variant="text" className="w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface CategorySkeletonProps {
  columns?: number;
}

export function CategorySkeleton({ columns = 3 }: CategorySkeletonProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 animate-in fade-in-0 duration-500`}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse animate-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <LoadingSkeleton variant="image" className="mb-4" />
          <div className="space-y-3">
            <LoadingSkeleton variant="text" className="w-3/4" />
            <LoadingSkeleton variant="text" className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}