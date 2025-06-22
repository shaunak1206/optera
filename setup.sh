#!/bin/bash

echo "🛠️ Setting up MARA Hackathon Project"

# Check if we're in the right directory
if [ ! -f "maraapi.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create one with your API keys."
    exit 1
fi

echo "✅ Found .env file"

# Setup backend
echo "📦 Setting up backend..."
cd backend

# Check for uv
if ! command -v uv &> /dev/null; then
    echo "❌ uv not found. Please install uv: curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

echo "Using uv for Python package management"

# Install dependencies
echo "Installing backend dependencies..."
uv pip install -r requirements.txt

# Test the API connection
echo "Testing MARA API connection..."
uv run python test_api.py

cd ..

# Setup frontend
echo "🌐 Setting up frontend..."
cd web

# Check for Node.js
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi

# Install dependencies
echo "Installing frontend dependencies..."
npm install

cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the development environment:"
echo "  ./start-dev.sh"
echo ""
echo "To start backend only:"
echo "  cd backend && ./start.sh"
echo ""
echo "To start frontend only:"
echo "  cd web && npm run dev"