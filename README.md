# E-Commerce Platform

A modern, WordPress-like e-commerce platform built with Next.js 15 that deploys on any VPS in 5 minutes.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ea-commerce
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Setup Database

Choose one option:

**Using Docker (Recommended):**
```bash
docker run --name ecommerce-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ecommerce \
  -p 5432:5432 -d postgres:15
```

**Or use a managed service:** [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app)

### 4. Push Schema & Verify

```bash
npm run db:push    # Create database tables
npm run verify     # Verify everything works
```

### 5. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup instructions with troubleshooting
- **[PROJECT.md](PROJECT.md)** - Development phases and progress tracker

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Cache:** Redis (optional)
- **UI:** Tailwind CSS + shadcn/ui
- **Auth:** NextAuth v5
- **Deploy:** PM2, Nginx, Docker

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build

# Quality Checks
npm run quality         # Run all checks
npm run type-check      # TypeScript
npm run lint            # ESLint
npm run test            # Jest tests

# Database
npm run db:push         # Push schema
npm run db:seed         # Seed data
npm run db:reset        # Reset database

# Verification
npm run verify          # Test DB & Redis connectivity
```

## 🎯 Project Status

- ✅ Phase 1: Foundation Setup
- ✅ Phase 2: Database & Config
- ⬜ Phase 3: Setup Wizard
- ⬜ Phase 4: Content Management
- ⬜ Phase 5: Product Management
- ⬜ Phase 6: Performance
- ⬜ Phase 7: Customer Features
- ⬜ Phase 8: Orders & Payments
- ⬜ Phase 9: Advanced Features
- ⬜ Phase 10: Deployment

See [PROJECT.md](PROJECT.md) for detailed progress and next steps.

## 🤝 Contributing

1. Check [PROJECT.md](PROJECT.md) for current phase
2. All code must pass quality checks: `npm run quality`
3. Follow the established patterns and conventions

## 📄 License

[Your License Here]
