import { initRedis } from './redis';

/**
 * Initialize application services
 * Called once when the app starts
 */
export async function initializeApp(): Promise<void> {
  console.log('🚀 Initializing application services...');
  
  try {
    // Initialize Redis connection
    await initRedis();
    
    console.log('✅ Application services initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize application services:', error);
    // Don't throw - app should still work without Redis
  }
}

// Auto-initialize on import (server-side only)
if (typeof window === 'undefined') {
  initializeApp();
}
