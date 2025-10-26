from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime, timedelta
import random

app = FastAPI(title="Optera API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Generate historical price data for the past 6 hours
def generate_historical_prices(hours=6, interval_minutes=5):
    """Generate realistic historical price data"""
    prices = []
    now = datetime.now()
    num_points = (hours * 60) // interval_minutes

    # Base prices with some realistic variation
    base_hash = 1.20
    base_token = 3.56
    base_energy = 1.337

    for i in range(num_points):
        timestamp = now - timedelta(minutes=interval_minutes * (num_points - i - 1))

        # Add realistic price fluctuations with smooth trends
        trend_offset = i / num_points  # Creates gradual trends
        hash_variation = random.uniform(-0.15, 0.15) + (trend_offset * 0.05)
        token_variation = random.uniform(-0.30, 0.30) + (trend_offset * 0.10)
        energy_variation = random.uniform(-0.10, 0.10)

        prices.append({
            "hash_price": round(base_hash + hash_variation, 6),
            "token_price": round(base_token + token_variation, 6),
            "energy_price": round(base_energy + energy_variation, 6),
            "timestamp": timestamp.isoformat() + "Z"
        })

    return prices

# Cache historical prices (regenerate periodically)
_price_history_cache = None
_cache_time = None

def get_price_history():
    """Get or generate price history with caching"""
    global _price_history_cache, _cache_time

    # Regenerate cache every 5 minutes to add new data point
    now = datetime.now()
    if _price_history_cache is None or _cache_time is None or \
       (now - _cache_time).total_seconds() > 300:
        _price_history_cache = generate_historical_prices()
        _cache_time = now

    return _price_history_cache

@app.get("/")
async def root():
    """Root endpoint to confirm the service is running"""
    return {
        "message": "Optera API is running!",
        "status": "active",
        "endpoints": [
            "/api/status",
            "/api/agents/outputs",
            "/api/chat/history",
            "/api/chat/summary",
            "/api/allocate",
            "/api/deploy",
            "/api/chat"
        ]
    }

@app.get("/api/status")
async def get_status():
    """Get system status and market data with historical prices"""
    return {
        "current_prices": get_price_history(),  # Return historical data
        "site_status": {
            "total_power_used": 425000,
            "total_revenue": 582000,
            "total_power_cost": 75000,
            "air_miners": 150,
            "hydro_miners": 200,
            "immersion_miners": 100,
            "gpu_compute": 50,
            "asic_compute": 400
        },
        "btc_data": {
            "price": 111304.023,
            "change_percent": 0.03,
            "high_24h": 112000,
            "low_24h": 110500,
            "volume_24h": 45200000000,
            "market_cap": 2220000000000,
            "change_24h": 3500
        }
    }

@app.get("/api/agents/outputs")
async def get_agent_outputs():
    """Get agent status and outputs"""
    return {
        "SimpleAllocationAgent": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "Allocation optimization complete: Current allocation optimized for 70% inference priority. Revenue maximized at $582K/hr.",
            "status": "ready"
        },
        "ChatbotAgent": {
            "timestamp": "2024-01-15T23:25:00Z", 
            "output": "Chatbot agent ready: System health operational. Standing by for user interactions and Q&A.",
            "status": "ready"
        },
        "MarketAnalystAgent": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "Market analysis complete: BTC trending upward, energy prices stable. Recommending 70% inference allocation.",
            "status": "ready"
        },
        "RiskAssessmentAgent": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "Risk assessment complete: Operational risks LOW, market volatility MEDIUM. All systems stable.",
            "status": "ready"
        },
        "PerformanceOptimizerAgent": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "Performance optimization complete: Efficiency at 87%, revenue per watt optimized. System performing well.",
            "status": "ready"
        },
        "EnergyManagementAgent": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "Energy analysis complete: Consumption at 425kW, cost efficiency 92%. No immediate optimizations needed.",
            "status": "ready"
        },
        "MaraClient": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "MARA API connected: Live sync active. Site status: 425kW used, revenue $582K/hr. All systems operational.",
            "status": "ready"
        },
        "BTCClient": {
            "timestamp": "2024-01-15T23:25:00Z",
            "output": "BTC market data updated: Price $111,283 (+0.01%), volume stable. Market conditions favorable for mining.",
            "status": "ready"
        }
    }

@app.get("/api/chat/history")
async def get_chat_history():
    """Get chat history"""
    return {
        "history": [
            {
                "id": "1",
                "message": "System status check completed",
                "timestamp": "2024-01-15T23:20:00Z",
                "type": "system"
            },
            {
                "id": "2", 
                "message": "All agents operational",
                "timestamp": "2024-01-15T23:19:00Z",
                "type": "system"
            }
        ]
    }

@app.get("/api/chat/summary")
async def get_chat_summary():
    """Get system summary"""
    return {
        "summary": "System operational with all 8 agents ready. Current allocation optimized for 70% inference priority. Revenue at $582K/hr with 92% efficiency.",
        "timestamp": "2024-01-15T23:25:00Z"
    }

@app.post("/api/allocate")
async def allocate_resources():
    """Handle resource allocation optimization"""
    return {
        "allocation": {
            "air_miners": 150,
            "hydro_miners": 200,
            "immersion_miners": 100,
            "gpu_compute": 35,
            "asic_compute": 280
        },
        "expected_revenue": 582000,
        "expected_cost": 75000,
        "efficiency_score": 87.5,
        "reasoning": "Optimized allocation for 70% inference priority, maximizing revenue while maintaining efficient power usage."
    }

@app.post("/api/deploy")
async def deploy_allocation():
    """Deploy resource allocation to production"""
    return {
        "status": "success",
        "message": "Allocation deployed successfully",
        "deployed_at": "2024-01-15T23:25:00Z"
    }

@app.post("/api/chat")
async def send_chat_message():
    """Handle chat messages"""
    return {
        "response": "All systems are operational. Current allocation is optimized for maximum revenue at 70% inference priority.",
        "timestamp": "2024-01-15T23:25:00Z"
    }

@app.delete("/api/chat/history")
async def clear_chat_history():
    """Clear chat history"""
    return {"status": "cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
