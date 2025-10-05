# Environment Setup Guide

## Quick Fix for Setup Wizard

Follow these steps to fix the environment issues:

### 1. Create `.env` file

If you don't have a `.env` file yet, copy from the example:

```bash
cp .env.example .env
```

### 2. Generate NEXTAUTH_SECRET

**What is NEXTAUTH_SECRET?**
- It's a secret key used by NextAuth.js for encrypting session tokens and cookies
- Think of it like a master password for your authentication system
- It must be a random, secure string (minimum 32 characters)

**How to generate it:**

**Option A: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Option B: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option C: Online Generator**
Visit: https://generate-secret.vercel.app/32

**Example output:**
```
XyZ123abc456DEF789ghi012JKL345MNO=
```

### 3. Update Your `.env` File

Open `.env` and add/update these required values:

```env
# Required for the app to work
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Optional: Redis for better performance (recommended but not required)
REDIS_URL=redis://localhost:6379
```

### Complete Example `.env`:

```env
# Application
NODE_ENV=development
APP_NAME=My Store
APP_URL=http://localhost:3000

# Database (REQUIRED)
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce

# Authentication (REQUIRED)
NEXTAUTH_SECRET=XyZ123abc456DEF789ghi012JKL345MNO=
NEXTAUTH_URL=http://localhost:3000

# Redis Cache (OPTIONAL - for better performance)
REDIS_URL=redis://localhost:6379

# Email (OPTIONAL - for later phases)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Storage
STORAGE_TYPE=local

# Payment Gateways (OPTIONAL - for later phases)
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
```

## About Redis (Optional)

**What is Redis?**
- In-memory caching system that makes your app faster
- Stores frequently accessed data for quick retrieval
- Optional but recommended for production

**Should I install Redis now?**
- ❌ **No** - Not required for Phase 3 (Setup Wizard)
- ⚠️ **Warning is OK** - The app works fine without it
- ✅ **Later** - Install before production for better performance

**How to install Redis (when ready):**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

**Then update `.env`:**
```env
REDIS_URL=redis://localhost:6379
```

## Verification

After updating your `.env` file:

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the setup wizard:**
   ```
   http://localhost:3000/setup
   ```

3. **Check System Tests:**
   - ✅ Database Connection - should be PASS
   - ⚠️ Redis Cache - WARNING is OK (optional)
   - ✅ Environment Variables - should be PASS now
   - ✅ Other tests - should be PASS

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to git
- Keep `NEXTAUTH_SECRET` secure and private
- Use different secrets for development and production
- Regenerate secrets if they are ever exposed

## Troubleshooting

**Problem: Database connection fails**
```
Solution: Check DATABASE_URL format and ensure PostgreSQL is running
Command: sudo systemctl status postgresql
```

**Problem: NEXTAUTH_SECRET still showing as missing**
```
Solution: 
1. Make sure .env file is in the project root
2. Restart your dev server (npm run dev)
3. Check for typos in variable name
```

**Problem: Redis warning persists**
```
Solution: This is OK! Redis is optional. The warning just means caching is disabled.
You can:
- Ignore it (app works fine)
- Or install Redis to enable caching
```

## Next Steps

Once your environment is configured:
1. Run `npm run dev`
2. Visit `http://localhost:3000/setup`
3. Complete the 4-step setup wizard
4. Start building your e-commerce platform!

---

For more help, check:
- [PROJECT.md](PROJECT.md) - Project overview and phases
- [SETUP.md](SETUP.md) - Initial project setup
- [README.md](README.md) - General documentation