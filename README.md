# Enterprise E-Commerce Platform

A scalable, production-ready e-commerce platform built with Next.js 14, TypeScript, and modern web technologies. This monorepo project includes a customer-facing storefront, admin panel, and shared packages for database, API, and UI components.

## 🚀 Project Status

**Current Phase**: Phase 2.2 Complete - Phase 3.1 Ready to Begin  
**Completion**: 16/22 major tasks completed (73%)

See [enterprise-ecommerce-documentation.md](enterprise-ecommerce-documentation.md) for detailed progress tracking.

## 🏗️ Architecture

This project uses a Turborepo monorepo structure:

```
/ea-commerce
  /apps
    /storefront     # Customer-facing Next.js app with Auth.js
    /admin          # Admin panel for product/order management
    /cms            # Payload CMS (planned Phase 3)
  /packages
    /database       # Prisma schemas + Redis integration
    /api            # tRPC API layer with type-safe procedures
    /ui             # Shared React components
    /eslint-config  # Shared ESLint configurations
    /typescript-config # Shared TypeScript configurations
```

## 🛠️ Technology Stack

### Core Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, tRPC
- **Backend**: PostgreSQL, Prisma ORM, Redis
- **Authentication**: Auth.js (Google OAuth + Email/Password)
- **Payments**: Razorpay (integration ready)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

### Key Features Implemented

- ✅ Product catalog with variants & categories
- ✅ Hierarchical category management
- ✅ Image upload with Sharp optimization
- ✅ Shopping cart with Redis persistence
- ✅ Complete checkout & order management
- ✅ Admin dashboard with CRUD operations
- ✅ Search & filtering system
- ✅ Type-safe API layer with tRPC

## 📦 Getting Started

### Prerequisites

- Node.js 20+ (specified in package.json)
- PostgreSQL database
- Redis server
- npm 10.9.3+

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ea-commerce
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your database credentials, Redis URL, and OAuth keys
```

4. **Set up the database**

```bash
cd packages/database
npm run db:generate
npm run db:push
npm run db:seed  # Optional: seed with sample data
```

5. **Start development servers**

```bash
npm run dev
```

This will start:

- Storefront: http://localhost:3000
- Admin: http://localhost:3001

## 🧪 Testing & Quality Gates

### Run All Quality Gates

```bash
npm run quality-gates
```

### Individual Commands

```bash
npm run type-check       # TypeScript validation
npm run lint            # ESLint
npm run format-check    # Prettier formatting
npm run test:unit       # Unit tests
npm run test:integration # Integration tests
npm run test:e2e        # E2E tests with Playwright
npm run security:scan   # Security vulnerability scan
npm run build          # Production build
```

## 📝 Scripts

```bash
npm run dev              # Start all apps in development
npm run build           # Build all apps for production
npm run lint            # Lint all workspaces
npm run format          # Format code with Prettier
npm run type-check      # Check TypeScript types
```

## 🗄️ Database Management

```bash
cd packages/database
npm run db:generate     # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:migrate     # Create migration
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database with sample data
npm run db:reset       # Reset database
```

## 🎯 Project Phases

### ✅ Phase 1: Foundation (Complete)

- Turborepo monorepo setup
- TypeScript strict mode + ESLint + Prettier
- PostgreSQL + Prisma + Redis
- Auth.js with Google OAuth + email/password

### ✅ Phase 2: Core E-commerce (Complete)

- Product catalog with variants & categories
- Image upload & optimization
- Shopping cart with Redis persistence
- Complete checkout & order management
- Admin CRUD operations

### 🚧 Phase 3: Content Management (In Progress)

- Payload CMS integration
- Admin authentication & permissions
- Content management interface

### 📋 Phase 4: Advanced Features (Planned)

- Referral system with commissions
- Multi-language support (i18n)
- Analytics dashboard
- SEO optimization

### 🚀 Phase 5: Production (Planned)

- Production deployment
- Load testing
- Security audit
- Monitoring & error tracking

## 🤝 Contributing

This is an enterprise project. Please follow these guidelines:

1. **Code Quality**: All PRs must pass quality gates
2. **Testing**: Write tests for new features
3. **Documentation**: Update documentation for significant changes
4. **TypeScript**: Maintain 100% TypeScript strict mode compliance

## 📄 License

Private project - All rights reserved

## 🔗 Useful Links

- [Full Documentation](enterprise-ecommerce-documentation.md)
- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
