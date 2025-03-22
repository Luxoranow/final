#!/usr/bin/env bash
# This is a build script specifically for Render deployment

# Exit on error
set -e

# Print Node and NPM versions for debugging
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

# Install dependencies with specific flags for Render
echo "Installing dependencies..."
npm install

# Clean .next directory for fresh build
echo "Cleaning previous builds..."
rm -rf .next

# Build the app with combined render-build command and increased memory
echo "Building the application..."
NODE_OPTIONS="--max-old-space-size=4096" npm run render-build

echo "Build completed successfully!" 