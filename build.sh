#!/bin/bash

# Hemogrid Frontend Build Script
echo "🚀 Building Hemogrid frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

echo "✅ Frontend build completed successfully!"
echo "📁 Build files are in the 'dist' directory"
echo "🌐 Ready for deployment to Vercel, Netlify, or any static hosting service"
