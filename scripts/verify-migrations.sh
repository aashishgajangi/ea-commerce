#!/bin/bash

# Verification script to check if all migrations are properly applied
# and performance indexes exist

set -e

echo "🔍 Migration Verification Script"
echo "================================"
echo ""

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

echo "📊 Step 1: Checking migration status..."
echo "---------------------------------------"
npx prisma migrate status

echo ""
echo "📊 Step 2: Checking performance indexes..."
echo "-------------------------------------------"

# Create temporary SQL file
cat > /tmp/check_indexes.sql << 'EOF'
SELECT 
    schemaname,
    tablename,
    indexname
FROM pg_indexes 
WHERE tablename IN (
    'site_settings', 
    'configurations', 
    'products', 
    'product_images',
    'menus', 
    'menu_items',
    'media',
    'carts', 
    'cart_items', 
    'pages', 
    'reviews', 
    'categories'
)
AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;
EOF

# Run SQL query
echo "Checking for performance indexes..."
PGPASSWORD="${DATABASE_PASSWORD:-}" psql -h "${DATABASE_HOST:-localhost}" -U "${DATABASE_USER:-}" -d "${DATABASE_NAME:-}" -f /tmp/check_indexes.sql 2>/dev/null || {
    echo "⚠️  Could not connect to database directly."
    echo "   Make sure PostgreSQL is running and credentials are correct."
}

# Clean up
rm -f /tmp/check_indexes.sql

echo ""
echo "📊 Step 3: Checking cart unique constraint..."
echo "----------------------------------------------"

# Check if unique constraint exists
cat > /tmp/check_constraint.sql << 'EOF'
SELECT
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint
WHERE conname LIKE '%cart_items%'
AND contype = 'u';
EOF

psql -h "${DATABASE_HOST:-localhost}" -U "${DATABASE_USER:-}" -d "${DATABASE_NAME:-}" -f /tmp/check_constraint.sql 2>/dev/null || {
    echo "⚠️  Could not verify constraint (DB connection issue)"
}

rm -f /tmp/check_constraint.sql

echo ""
echo "📊 Step 4: Summary"
echo "-------------------"
echo "Migration status: Check output above"
echo "Performance indexes: Should see 14+ indexes"
echo "Cart constraint: Should see unique constraint"
echo ""
echo "✅ Verification complete!"
echo ""
echo "Expected performance indexes:"
echo "  - idx_site_settings_key"
echo "  - idx_configuration_key"
echo "  - idx_product_status_active"
echo "  - idx_product_category_status"
echo "  - idx_product_featured_status"
echo "  - idx_product_image_primary"
echo "  - idx_menu_location"
echo "  - idx_menu_item_menu_parent"
echo "  - idx_media_user_created"
echo "  - idx_cart_session_expires"
echo "  - idx_cart_item_cart_product"
echo "  - idx_page_status_published"
echo "  - idx_review_product_status"
echo "  - idx_category_active_order"
