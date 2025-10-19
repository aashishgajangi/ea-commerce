#!/bin/bash

# Baseline Production Database
# Run this once on production to mark existing migrations as applied

set -e

echo "🔧 Baselining Production Database..."
echo "This will mark all existing migrations as already applied."
echo ""

# Check if we're in the project directory
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Error: prisma/schema.prisma not found. Are you in the project root?"
    exit 1
fi

# List all migrations
echo "📋 Found migrations:"
for migration in prisma/migrations/*/; do
    migration_name=$(basename "$migration")
    echo "  - $migration_name"
done

echo ""
echo "🔍 Checking migration status..."
npx prisma migrate status || true

echo ""
echo "📝 Marking migrations as applied..."

# Resolve each migration
for migration in prisma/migrations/*/; do
    migration_name=$(basename "$migration")
    echo "  ✅ Resolving: $migration_name"
    npx prisma migrate resolve --applied "$migration_name" || {
        echo "  ⚠️  Already resolved or error: $migration_name"
    }
done

echo ""
echo "🔍 Checking migration status again..."
npx prisma migrate status

echo ""
echo "✅ Baseline complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npx prisma migrate deploy"
echo "  2. Or run: ./scripts/deploy.sh"
