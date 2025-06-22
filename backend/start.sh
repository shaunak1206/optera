#!/bin/bash

echo "🔧 Setting up backend environment with uv..."

# Install dependencies with uv
echo "Installing dependencies..."
uv pip install -r requirements.txt

echo "🚀 Starting FastAPI server..."
# Start the FastAPI server
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload