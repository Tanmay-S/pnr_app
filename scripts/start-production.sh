#!/bin/bash

# This script builds and runs the PNR Status Tracker app in production mode

echo "🚀 Building PNR Status Tracker app in production mode..."

# Check if Expo is installed
if ! command -v expo &> /dev/null
then
    echo "❌ Expo CLI is not installed. Installing..."
    npm install -g expo-cli
fi

# Clean node_modules and install dependencies
echo "🧹 Cleaning installation and reinstalling dependencies..."
rm -rf node_modules
npm install

# Start the app in production mode
echo "🚆 Starting PNR Status Tracker app in production mode..."
expo start --no-dev

echo "✅ App is running in production mode!"
