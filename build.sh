#!/bin/bash
# exit on error
set -e

# Display versions and environment info
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Check if app directory exists
if [ ! -d "app" ]; then
  echo "ERROR: App directory is missing! This is critical for Next.js app router."
  exit 1
fi

# Install dependencies without development dependencies
echo "Installing dependencies..."
npm install --production=false

# Clean .next directory for fresh build
echo "Cleaning previous builds..."
rm -rf .next

# Build the app with a longer timeout
echo "Building the application..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Run sitemap generation
echo "Generating sitemap..."
npx next-sitemap || echo "Sitemap generation failed but continuing build"

echo "Build completed successfully!" 