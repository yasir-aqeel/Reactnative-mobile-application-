#!/bin/bash

set -e

echo "🔧 Xcode Cloud Pre-Build Setup..."

# Ensure Node and Yarn are installed
brew install node@20
brew install yarn

# Install JS deps
yarn install --frozen-lockfile

# Clean pods
cd ios
rm -rf Pods
rm -rf ~/Library/Caches/CocoaPods
pod cache clean --all
pod install --repo-update

echo "✅ Ready to build"