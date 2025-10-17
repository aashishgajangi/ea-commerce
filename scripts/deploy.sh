#!/bin/bash

# Deployment script for EA Commerce
# Automates the process of installing dependencies, building, and restarting PM2

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client (if needed)
echo "🗄️ Generating Prisma client..."
npx prisma generate

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
echo "🌐 Your application should be running at your configured port."