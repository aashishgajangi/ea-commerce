import { z } from 'zod';

/**
 * Environment variable schema definition
 * Validates all required and optional environment variables
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_NAME: z.string().default('My Store'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Redis (optional)
  REDIS_URL: z.string().url().optional(),
  
  // Email (optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  
  // Storage (optional)
  STORAGE_TYPE: z.enum(['local', 'cloudinary', 's3']).default('local'),
  CLOUDINARY_URL: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_BUCKET: z.string().optional(),
  
  // Payments (optional)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  
  // Auth (optional)
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

/**
 * Parsed and validated environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 * Throws an error if validation fails
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\nPlease check your .env file.`
      );
    }
    throw error;
  }
}

/**
 * Cached validated environment
 */
let cachedEnv: Env | null = null;

/**
 * Validated environment variables
 * Safe to use throughout the application
 * Validation is lazy to support testing
 */
export const env = new Proxy({} as Env, {
  get(target, prop: string) {
    if (!cachedEnv) {
      cachedEnv = validateEnv();
    }
    return cachedEnv[prop as keyof Env];
  },
});

/**
 * Check if a feature is enabled based on environment
 */
export function isFeatureEnabled(feature: string): boolean {
  switch (feature) {
    case 'redis':
      return !!env.REDIS_URL;
    case 'email':
      return !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
    case 'cloudStorage':
      return env.STORAGE_TYPE !== 'local' && !!env.CLOUDINARY_URL;
    case 'stripe':
      return !!(env.STRIPE_SECRET_KEY && env.STRIPE_PUBLISHABLE_KEY);
    case 'razorpay':
      return !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
    case 'paypal':
      return !!(env.PAYPAL_CLIENT_ID && env.PAYPAL_CLIENT_SECRET);
    default:
      return false;
  }
}