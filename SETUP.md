# Setup Guide - E-Commerce Platform

This guide will help you set up the development environment for the e-commerce platform.

## Prerequisites

- Node.js v22 or higher
- PostgreSQL 15 or higher
- Redis (optional, for caching)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure the required variables:

```env
# Required: PostgreSQL connection
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"

# Optional: Application settings
APP_NAME="My Store"
APP_URL="http://localhost:3000"

# Optional: Redis for caching (improves performance)
REDIS_URL="redis://localhost:6379"
```

### 3. Setup PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker run --name ecommerce-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ecommerce \
  -p 5432:5432 \
  -d postgres:15

# Your DATABASE_URL will be:
# postgresql://postgres:postgres@localhost:5432/ecommerce
```

#### Option B: Using Local PostgreSQL

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb ecommerce

# Create user (optional)
sudo -u postgres psql -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce TO myuser;"

# Your DATABASE_URL will be:
# postgresql://myuser:mypassword@localhost:5432/ecommerce
```

#### Option C: Using Managed PostgreSQL (Production)

Use services like:
- **Neon** (Free tier): https://neon.tech
- **Supabase** (Free tier): https://supabase.com
- **Railway**: https://railway.app
- **Render**: https://render.com

They provide a DATABASE_URL that you can copy directly to your `.env` file.

### 4. Setup Redis (Optional)

#### Using Docker:

```bash
# Start Redis with Docker
docker run --name ecommerce-redis \
  -p 6379:6379 \
  -d redis:7

# Your REDIS_URL will be:
# redis://localhost:6379
```

#### Using Local Redis:

```bash
# Install Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Start Redis
sudo systemctl start redis

# Your REDIS_URL will be:
# redis://localhost:6379
```

### 5. Push Database Schema

```bash
npm run db:push
```

This will create all the necessary tables in your PostgreSQL database.

### 6. Verify Setup

```bash
npm run verify
```

This will check:
- ✅ Environment variables are configured
- ✅ PostgreSQL connection works
- ✅ Redis connection works (if configured)
- ✅ Database tables are created

Expected output:
```
═══════════════════════════════════════════════════
  E-Commerce Platform - Setup Verification
═══════════════════════════════════════════════════

🔍 Verifying Environment Variables...

✅ Required variables:
   DATABASE_URL: ✓ Set
   APP_NAME: My Store
   APP_URL: http://localhost:3000
   NODE_ENV: development

📦 Optional features:
   Redis: ✓ Enabled
   Email: ✗ Disabled
   Stripe: ✗ Disabled
   Razorpay: ✗ Disabled

🔍 Verifying PostgreSQL Connection...

✅ PostgreSQL: Connected successfully
   Tables in database: 3

   Available tables:
   - configurations
   - users
   - audit_logs

🔍 Verifying Redis Connection...

✅ Redis: Connected successfully
✅ Redis: Cache operations working

═══════════════════════════════════════════════════
✅ All verifications passed!

📝 Next steps:
   1. Run migrations: npm run db:push
   2. Start development: npm run dev
═══════════════════════════════════════════════════
```

### 7. Run Setup Wizard

After starting the dev server, complete the setup wizard:

```bash
npm run dev
```

Visit **http://localhost:3000/setup**

The setup wizard will guide you through:
1. **System Tests** - Verifies database, Redis, environment
2. **Admin Account** - Create your first admin user
3. **Basic Settings** - Configure store name, currency, timezone
4. **Complete** - Finish setup and access admin dashboard

**Note:** Setup runs only once. After completion, `/setup` redirects to `/admin`.

### 8. Managing Setup Wizard

**Check what's in database:**
```bash
npm run verify:setup
```

**Soft Reset (deletes admin, keeps settings):**
```bash
npm run setup:reset
npm run dev
# Visit: http://localhost:3000/setup
```
Deletes: Admin users, setup flag
Keeps: Site settings, audit logs
Use when: Want to create new admin but keep site configuration

**Full Reset (clean slate):**
```bash
npm run setup:reset:full
npm run dev
# Visit: http://localhost:3000/setup
```
Deletes: Everything (admin, settings, logs)
Use when: Complete fresh start

## Common Issues

### "Environment variable not found: DATABASE_URL"

**Solution:** Create a `.env` file in the root directory with your DATABASE_URL.

### "Connection refused" when connecting to PostgreSQL

**Solution:** 
1. Check if PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify connection details in `.env`
3. Try connecting manually: `psql "postgresql://username:password@localhost:5432/ecommerce"`

### "Connection refused" when connecting to Redis

**Solution:** 
1. Check if Redis is running: `redis-cli ping` (should return PONG)
2. If Redis is optional for you, simply remove `REDIS_URL` from `.env`

### Database tables not created

**Solution:**
```bash
# Reset and recreate tables
npm run db:reset

# Or just push the schema
npm run db:push
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Quality Checks
npm run quality         # Run all checks (type-check + lint + test)
npm run type-check      # TypeScript validation
npm run lint            # ESLint
npm run test            # Run tests

# Database
npm run db:push         # Push schema to database
npm run db:seed         # Seed initial data
npm run db:reset        # Reset database

# Verification
npm run verify          # Verify database & Redis connectivity
npm run verify:setup    # Check setup wizard data (admin, settings)

# Setup Wizard Management
npm run setup:reset     # Soft reset (deletes admin, keeps settings)
npm run setup:reset:full # Full reset (deletes everything)
```

## Environment Variables Reference

See [`.env.example`](.env.example) for a complete list of all available environment variables.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REDIS_URL` | Redis connection for caching | `redis://localhost:6379` |
| `APP_NAME` | Application name | `My Store` |
| `APP_URL` | Application URL | `http://localhost:3000` |
| `SMTP_*` | Email configuration | See `.env.example` |
| `STRIPE_*` | Stripe payment gateway | See `.env.example` |
| `RAZORPAY_*` | Razorpay payment gateway | See `.env.example` |

## Need Help?

If you encounter any issues:

1. Check this setup guide
2. Review the error messages from `npm run verify`
3. Check the [PROJECT.md](PROJECT.md) for phase details
4. Open an issue on GitHub

## Next Steps

Once your setup is verified:
1. Review the [PROJECT.md](PROJECT.md) to understand the project structure
2. Check Phase 3 tasks for the Setup Wizard
3. Start developing!