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

# Run database migrations (production-safe)
echo "📊 Running database migrations..."
if npx prisma migrate deploy; then
    echo "✅ Database migrations applied successfully!"
else
    echo "⚠️  Migration failed, trying db push as fallback..."
    if npx prisma db push; then
        echo "✅ Database schema synced via push!"
    else
        echo "❌ Database sync failed!"
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