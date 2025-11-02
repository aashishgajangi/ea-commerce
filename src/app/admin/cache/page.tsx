'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, RefreshCw, Database, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CacheType {
  key: string;
  name: string;
  description: string;
}

interface CacheStatus {
  redis: {
    available: boolean;
    status: string;
    stats?: Record<string, unknown>;
  };
  cacheTypes: CacheType[];
}

export default function CacheManagementPage() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCacheStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/cache');
      if (response.ok) {
        const data = await response.json();
        setCacheStatus(data);
      } else {
        throw new Error('Failed to fetch cache status');
      }
    } catch (error) {
      console.error('Error fetching cache status:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch cache status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const clearCache = async (pattern?: string) => {
    const clearKey = pattern || 'all';
    setClearing(clearKey);

    try {
      const url = pattern 
        ? `/api/admin/cache?pattern=${encodeURIComponent(pattern)}`
        : '/api/admin/cache?pattern=all';
      
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Success',
          description: data.message,
        });
        // Refresh status
        await fetchCacheStatus();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to clear cache');
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to clear cache',
        variant: 'destructive',
      });
    } finally {
      setClearing(null);
    }
  };

  useEffect(() => {
    fetchCacheStatus();
  }, [fetchCacheStatus]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cache Management</h1>
          <p className="text-muted-foreground">
            Manage Redis cache and improve application performance
          </p>
        </div>
        <Button onClick={fetchCacheStatus} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Redis Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Redis Status
          </CardTitle>
          <CardDescription>
            Current Redis connection and cache status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge 
              variant={cacheStatus?.redis.available ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {cacheStatus?.redis.available ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <AlertCircle className="w-3 h-3" />
              )}
              {cacheStatus?.redis.status || 'Unknown'}
            </Badge>
            
            {cacheStatus?.redis.available ? (
              <span className="text-sm text-muted-foreground">
                Redis is connected and ready for caching
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Redis is not available - caching is disabled
              </span>
            )}
          </div>

          {!cacheStatus?.redis.available && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Redis server is not running or not configured. Start Redis with: <code>redis-server</code>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Cache Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Cache Controls
          </CardTitle>
          <CardDescription>
            Clear all cache or specific cache types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Clear All Cache */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium text-red-600">Clear All Cache</h3>
              <p className="text-sm text-muted-foreground">
                Remove all cached data from Redis
              </p>
            </div>
            <Button
              onClick={() => clearCache()}
              disabled={!cacheStatus?.redis.available || clearing === 'all'}
              variant="destructive"
            >
              {clearing === 'all' ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Clear All
            </Button>
          </div>

          {/* Individual Cache Types */}
          <div className="space-y-3">
            <h3 className="font-medium">Clear Specific Cache Types</h3>
            <div className="grid gap-3">
              {cacheStatus?.cacheTypes.map((cacheType) => (
                <div
                  key={cacheType.key}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{cacheType.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cacheType.description}
                    </p>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {cacheType.key}
                    </code>
                  </div>
                  <Button
                    onClick={() => clearCache(cacheType.key)}
                    disabled={!cacheStatus?.redis.available || clearing === cacheType.key}
                    variant="outline"
                    size="sm"
                  >
                    {clearing === cacheType.key ? (
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3 mr-1" />
                    )}
                    Clear
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cache Information */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Information</CardTitle>
          <CardDescription>
            How caching works in your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Cache Benefits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 95-98% faster page loads</li>
                <li>• Reduced database queries</li>
                <li>• Better user experience</li>
                <li>• Lower server resource usage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cache TTL (Time To Live)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Settings: 1 hour</li>
                <li>• Menus: 1 hour</li>
                <li>• Search: 5 minutes</li>
                <li>• Products: 30 minutes</li>
              </ul>
            </div>
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Cache is automatically cleared when you update settings, menus, or products. 
              Manual clearing is only needed for troubleshooting.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
