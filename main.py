from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="Optera API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status")
async def get_status():
    """Get system status and market data"""
    return {
        "current_prices": [{
            "hash_price": 1.20,
            "token_price": 3.56,
            "energy_price": 1.337
        }],
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
    """Handle resource allocation"""
    return {
        "status": "success",
        "allocation": {
            "inference": 70,
            "mining": 30
        },
        "revenue_impact": "+12.5%",
        "timestamp": "2024-01-15T23:25:00Z"
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
