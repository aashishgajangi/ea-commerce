# E-Commerce Project Setup Guide

---

## Development Environment

```
OS: Debian 12
Node.js: v22.19.0 (LTS - Stable until 2027)
npm: 10.9.3
PostgreSQL: Installed
```

---

## Technology Stack

**Frontend:** Next.js 15 + TypeScript (Strict) + Tailwind CSS v3  
**Backend:** PostgreSQL + Prisma + Next-Auth v5  
**Architecture:** Single app with src/ directory

---

## Quality Gates (Required Before Each Phase)

Every phase must pass these checks:

```bash
npm run type-check    # TypeScript validation
npm run lint          # Code quality
npm run format-check  # Code formatting
npm run build         # Production build
npm run test          # Unit tests
npm run test:e2e      # E2E tests (Playwright)
```

**GitHub CI/CD:** Automated checks on every commit  
**All tests must pass** before proceeding to next phase.

---

## Phase 1: Project Foundation

**What we're doing:**

- Initialize Next.js 15 project with TypeScript
- Enable TypeScript strict mode for type safety
- Setup Tailwind CSS v3 for styling
- Configure ESLint for code quality
- Setup Prettier for code formatting
- Create src/ directory structure
- Configure quality gate scripts

**Key Command:**

```bash
npx create-next-app@latest my-ecommerce
# Select: TypeScript, ESLint, Tailwind, src/, App Router
```

**Install Tools:**

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

**Important Files to Configure:**

- `tsconfig.json` - Add strict mode settings
- `.prettierrc` - Code formatting rules
- `package.json` - Add quality gate scripts

**Deliverables:**

- Working Next.js app at localhost:3000
- All quality gates passing
- Clean TypeScript with no errors
- Code formatted consistently

---

## Phase 2: Database & ORM (Coming Next)

**What we'll do:**

- Connect PostgreSQL database
- Setup Prisma ORM
- Create initial schema
- Configure database client

---

## Phase 3: Authentication (Coming Next)

**What we'll do:**

- Next-Auth setup
- Email/Password login
- Protected routes
- Session management

---

## Phase 4: Product Management (Coming Next)

**What we'll do:**

- Product models
- Admin CRUD interface
- Image upload
- Search & filters

---

## Phase 5: Shopping & Orders (Coming Next)

**What we'll do:**

- Shopping cart
- Checkout flow
- Order management
- Payment integration

---

**Current Status:** Phase 1 Documentation  
**Next Action:** Execute Phase 1 setup
