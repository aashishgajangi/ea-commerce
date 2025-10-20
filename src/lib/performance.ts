/**
 * Performance Monitoring Utility
 * Tracks query execution times and identifies slow operations
 */

type PerformanceMetric = {
  operation: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
};

const metrics: PerformanceMetric[] = [];
const MAX_METRICS = 100; // Keep last 100 metrics

/**
 * Track the performance of an async operation
 */
export async function trackPerformance<T>(
  operation: string,
  fn: () => Promise<T>,
  metadata?: Record<string, unknown>
): Promise<T> {
  const start = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - start;
    
    recordMetric({
      operation,
      duration,
      timestamp: new Date(),
      metadata,
    });
    
    // Log slow operations (> 500ms)
    if (duration > 500) {
      console.warn(`⚠️  SLOW OPERATION: ${operation} took ${duration.toFixed(2)}ms`, metadata);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    recordMetric({
      operation: `${operation} (ERROR)`,
      duration,
      timestamp: new Date(),
      metadata: { ...metadata, error: String(error) },
    });
    throw error;
  }
}

/**
 * Track sync operation performance
 */
export function trackSync<T>(
  operation: string,
  fn: () => T,
  metadata?: Record<string, unknown>
): T {
  const start = performance.now();
  
  try {
    const result = fn();
    const duration = performance.now() - start;
    
    recordMetric({
      operation,
      duration,
      timestamp: new Date(),
      metadata,
    });
    
    if (duration > 100) {
      console.warn(`⚠️  SLOW SYNC OPERATION: ${operation} took ${duration.toFixed(2)}ms`, metadata);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    recordMetric({
      operation: `${operation} (ERROR)`,
      duration,
      timestamp: new Date(),
      metadata: { ...metadata, error: String(error) },
    });
    throw error;
  }
}

/**
 * Record a performance metric
 */
function recordMetric(metric: PerformanceMetric) {
  metrics.push(metric);
  
  // Keep only the last MAX_METRICS
  if (metrics.length > MAX_METRICS) {
    metrics.shift();
  }
}

/**
 * Get all recorded metrics
 */
export function getMetrics(): PerformanceMetric[] {
  return [...metrics];
}

/**
 * Get slow operations (>threshold ms)
 */
export function getSlowOperations(thresholdMs: number = 500): PerformanceMetric[] {
  return metrics.filter(m => m.duration > thresholdMs);
}

/**
 * Get average duration for an operation
 */
export function getAverageDuration(operation: string): number | null {
  const operationMetrics = metrics.filter(m => m.operation === operation);
  if (operationMetrics.length === 0) return null;
  
  const total = operationMetrics.reduce((sum, m) => sum + m.duration, 0);
  return total / operationMetrics.length;
}

/**
 * Get performance summary
 */
export function getPerformanceSummary() {
  const slowOps = getSlowOperations(500);
  const operations = new Map<string, { count: number; totalDuration: number; maxDuration: number }>();
  
  metrics.forEach(m => {
    const existing = operations.get(m.operation) || { count: 0, totalDuration: 0, maxDuration: 0 };
    operations.set(m.operation, {
      count: existing.count + 1,
      totalDuration: existing.totalDuration + m.duration,
      maxDuration: Math.max(existing.maxDuration, m.duration),
    });
  });
  
  const summary = Array.from(operations.entries()).map(([operation, stats]) => ({
    operation,
    count: stats.count,
    avgDuration: stats.totalDuration / stats.count,
    maxDuration: stats.maxDuration,
  })).sort((a, b) => b.avgDuration - a.avgDuration);
  
  return {
    totalOperations: metrics.length,
    slowOperations: slowOps.length,
    summary,
  };
}

/**
 * Clear all metrics
 */
export function clearMetrics() {
  metrics.length = 0;
}

/**
 * Log performance summary to console
 */
export function logPerformanceSummary() {
  const summary = getPerformanceSummary();
  
  console.log('\n📊 Performance Summary');
  console.log('======================');
  console.log(`Total Operations: ${summary.totalOperations}`);
  console.log(`Slow Operations (>500ms): ${summary.slowOperations}`);
  console.log('\nTop 10 Operations by Avg Duration:');
  console.table(summary.summary.slice(0, 10));
}
