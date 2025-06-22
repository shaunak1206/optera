#!/bin/bash

echo "🚀 Starting MARA Hackathon Development Environment"

# Start backend in background
echo "📊 Starting Backend API..."
cd backend

# Install dependencies and start with uv
echo "Installing backend dependencies with uv..."
uv pip install -r requirements.txt
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🌐 Starting Frontend..."
cd web

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Development environment started!"
echo "   Backend API: http://localhost:8000"
echo "   Frontend: http://localhost:5173"
echo "   Press Ctrl+C to stop both services"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on exit
trap cleanup INT TERM

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID
