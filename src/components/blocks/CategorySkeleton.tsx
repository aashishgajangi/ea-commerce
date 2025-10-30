export default function CategorySkeleton({ columns = 3 }: { columns?: number }) {
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
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square mb-4 animate-in zoom-in-95 duration-300"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-in slide-in-from-left-2 duration-200"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-in slide-in-from-left-2 duration-200" style={{ animationDelay: '100ms' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}