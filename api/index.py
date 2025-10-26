import sys
import os

# Add the vercel-api directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'vercel-api'))

from main import app

# Export the FastAPI app for Vercel
handler = app
