# Quick Start Guide - Setup Wizard

## 🚀 Get Started in 3 Steps

### Step 1: Configure Environment

Generate your secret key:
```bash
openssl rand -base64 32
```

Create `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your values:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce
NEXTAUTH_SECRET=<paste-your-generated-secret-here>
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Setup Database

```bash
npm run db:push
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000/setup**

---

## 🎯 Setup Wizard Steps

### Step 1: System Tests ✓
- Database connection
- Redis cache (optional)
- Environment variables
- Node.js version
- File system access

**Note:** Warnings (⚠️) are OK! Only failures (❌) need to be fixed.

### Step 2: Admin Account
- Full name
- Email address
- Password (min 8 characters)

### Step 3: Basic Settings
- Store name
- Store description
- Currency (USD, EUR, GBP, INR)
- Timezone

### Step 4: Complete Setup
- Review and confirm
- Launch admin dashboard

---

## ⚠️ Common Issues

### Issue: Missing NEXTAUTH_SECRET
```bash
# Generate it:
openssl rand -base64 32

# Add to .env:
NEXTAUTH_SECRET=your-generated-secret
```

### Issue: Redis Warning
```
This is OK! Redis is optional.
App works fine without it.
```

### Issue: Database Connection Failed
```bash
# Check PostgreSQL is running:
sudo systemctl status postgresql

# Verify DATABASE_URL in .env
```

---

## 📚 Full Documentation

- [`ENVIRONMENT_SETUP.md`](ENVIRONMENT_SETUP.md) - Detailed environment configuration
- [`PROJECT.md`](PROJECT.md) - Complete project roadmap
- [`SETUP.md`](SETUP.md) - Initial project setup

---

## ✅ What's Next After Setup?

1. **Phase 4**: Content Management (media, pages, SEO)
2. **Phase 5**: Product Management (catalog, inventory)
3. **Phase 6**: Performance (caching, optimization)
4. **Phase 7**: Customer Features (auth, cart, wishlist)
5. **Phase 8**: Orders & Payments
6. **Phase 9**: Advanced Features
7. **Phase 10**: Deployment

Each phase builds on the previous one, progressively creating a complete e-commerce platform!