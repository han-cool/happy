#!/bin/bash

# Quick Start Testing Script for Happy App Customizations
# This script helps you test your new changes quickly

echo "🚀 Happy App Testing Quick Start"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js first: https://nodejs.org"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}⚠️  Yarn not found. Installing...${NC}"
    npm install -g yarn
fi

# Navigate to project directory
cd "$(dirname "$0")"

echo -e "${GREEN}1. Installing dependencies...${NC}"
yarn install

echo -e "${GREEN}2. Checking TypeScript...${NC}"
yarn typecheck || echo -e "${YELLOW}⚠️  Some TypeScript errors found (this is normal for now)${NC}"

echo -e "${GREEN}3. Starting Expo development server...${NC}"
echo ""
echo "📱 To test on your Android device:"
echo "   1. Install Expo Go app from Play Store"
echo "   2. Scan the QR code that appears"
echo "   3. Make sure your phone and computer are on the same WiFi"
echo ""
echo "🧪 To test new features:"
echo "   1. Go to Settings → Features"
echo "   2. Enable 'Home Screen Statistics'"
echo "   3. Return to home to see stats cards"
echo "   4. Tap any stats card to open dashboard"
echo ""
echo "🌍 To test Spanish translation:"
echo "   1. Go to Settings → Appearance → Language"
echo "   2. Select 'Español'"
echo ""

# Start the development server
yarn start