#!/bin/bash

echo "=========================================="
echo "Building React App for Hostinger Deployment"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Copy production environment file
echo "Setting up production environment..."
cp -f .env.production .env
echo ""

# Build the React app
echo "Building React app..."
npm run build
echo ""

# Copy combined .htaccess to dist folder
echo "Copying combined .htaccess for React + Laravel routing..."
cp -f ../.htaccess.production dist/.htaccess
echo ""

echo "=========================================="
echo "Build Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Go to the 'dist' folder"
echo "2. Upload ALL contents to your Hostinger public_html folder"
echo "3. Make sure to upload the .htaccess file as well"
echo ""
echo "Location: react-frontend/dist/"
echo ""
