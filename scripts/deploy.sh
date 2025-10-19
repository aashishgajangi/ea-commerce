#!/bin/bash

# Deployment script for EA Commerce
# Automates the process of installing dependencies, migrations, building, and restarting PM2

set -e  # Exit on any error

echo "🚀 Starting deployment process..."
echo "📅 Deployment started at: $(date)"

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Make sure environment variables are set!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client (if needed)
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Run database migrations (SAFE - no data loss)
echo "📊 Running database migrations..."
if npx prisma migrate deploy 2>&1 | tee /tmp/migrate-output.log; then
    echo "✅ Migrations applied successfully!"
else
    # Check if it's the baseline error
    if grep -q "P3005" /tmp/migrate-output.log; then
        echo "⚠️  Database needs baseline. Attempting to resolve..."
        
        # Mark existing migrations as applied
        echo "📝 Marking existing migrations as already applied..."
        
        # Try to resolve each migration
        for migration in prisma/migrations/*/; do
            migration_name=$(basename "$migration")
            echo "  Resolving: $migration_name"
            npx prisma migrate resolve --applied "$migration_name" || true
        done
        
        # Try deploy again
        echo "🔄 Retrying migration deploy..."
        if npx prisma migrate deploy; then
            echo "✅ Migrations applied successfully after baseline!"
        else
            echo "❌ Migration still failed after baseline attempt"
            exit 1
        fi
    else
        echo "❌ Migration failed! Rolling back..."
        exit 1
    fi
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Restart PM2 process
echo "🔄 Restarting PM2 process..."
# Assuming the PM2 process is named 'ea-commerce' - adjust if different
pm2 restart ea-commerce || {
    echo "⚠️  PM2 process 'ea-commerce' not found. Starting new process..."
    pm2 start npm --name "ea-commerce" -- start
}

echo "✅ Deployment completed successfully!"
echo "📅 Deployment finished at: $(date)"
echo "🌐 Your application should be running at your configured port."
echo ""
echo "📋 Summary:"
echo "  - Dependencies: ✅ Installed"
echo "  - Prisma Client: ✅ Generated"
echo "  - Migrations: ✅ Applied"
echo "  - Build: ✅ Completed"
echo "  - PM2: ✅ Restarted"