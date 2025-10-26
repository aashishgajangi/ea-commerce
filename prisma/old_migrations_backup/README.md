# Old Migrations Backup

This folder contains migrations that were **replaced** or **invalid** and should not be used.

## Contents

### 1. `_INVALID_add_performance_indexes_DO_NOT_USE/`
**Why moved:** 
- Had no timestamp prefix
- Not recognized by Prisma as valid migration
- Never applied in proper migration order

**Replaced by:** 
- `20251027000001_restore_performance_indexes/`

---

### 2. `_OLD_20251026_add_cart_unique_constraint_REPLACED/`
**Why moved:**
- Created an INDEX instead of a CONSTRAINT
- Caused "data loss" warnings
- Conflicted with Prisma schema definition

**Replaced by:**
- `20251027000002_fix_cart_unique_constraint/`

---

## ⚠️ Important

**DO NOT** move these back to `prisma/migrations/` folder!

These migrations are kept here for:
1. Historical reference
2. Understanding what went wrong
3. Backup in case we need to review

The new migrations in `prisma/migrations/` are the correct ones to use.

---

## History

- **2025-10-27:** Moved invalid migrations to backup folder
- **Reason:** Fixing migration conflicts and GitHub Actions deployment failures
- **Fixed by:** Creating proper timestamped migrations with correct SQL syntax
