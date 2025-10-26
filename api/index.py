from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_status = {
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
            
            self.wfile.write(json.dumps(mock_status).encode())
            
        elif self.path == '/api/agents/outputs':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_data = {
                "SimpleAllocationAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Allocation optimization complete: Current allocation optimized for 70% inference priority. Revenue maximized at $582K/hr.",
                    "status": "ready"
                },
                "ChatbotAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Chatbot agent ready: System health operational. Standing by for user interactions and Q&A.",
                    "status": "ready"
                },
                "MarketAnalystAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Market analysis complete: BTC trending upward, energy prices stable. Recommending 70% inference allocation.",
                    "status": "ready"
                },
                "RiskAssessmentAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Risk assessment complete: Operational risks LOW, market volatility MEDIUM. All systems stable.",
                    "status": "ready"
                },
                "PerformanceOptimizerAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Performance optimization complete: Efficiency at 87%, revenue per watt optimized. System performing well.",
                    "status": "ready"
                },
                "EnergyManagementAgent": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "Energy analysis complete: Consumption at 425kW, cost efficiency 92%. No immediate optimizations needed.",
                    "status": "ready"
                },
                "MaraClient": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "MARA API connected: Live sync active. Site status: 425kW used, revenue $582K/hr. All systems operational.",
                    "status": "ready"
                },
                "BTCClient": {
                    "timestamp": datetime.now().isoformat(),
                    "output": "BTC market data updated: Price $111,283 (+0.01%), volume stable. Market conditions favorable for mining.",
                    "status": "ready"
                }
            }
            
            self.wfile.write(json.dumps(mock_data).encode())
            
        elif self.path.startswith('/api/chat/history'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_history = {
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
            
            self.wfile.write(json.dumps(mock_history).encode())
            
        elif self.path == '/api/chat/summary':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_summary = {
                "summary": {
                    "total_revenue": 582000,
                    "total_cost": 75000,
                    "net_profit": 507000,
                    "efficiency": 87.1,
                    "status": "optimal"
                },
                "raw_response": "System operating at optimal efficiency with 87.1% performance score. Revenue generation stable at $582K/hr with minimal operational costs."
            }
            
            self.wfile.write(json.dumps(mock_summary).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        if self.path == '/api/allocate':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_allocation_response = {
                "allocation": {
                    "air_miners": 120,
                    "hydro_miners": 180,
                    "immersion_miners": 80,
                    "gpu_compute": 45,
                    "asic_compute": 350
                },
                "expected_revenue": 582000,
                "expected_cost": 75000,
                "efficiency_score": 87.1,
                "reasoning": "Optimized allocation based on current market conditions and energy efficiency metrics."
            }
            
            self.wfile.write(json.dumps(mock_allocation_response).encode())
            
        elif self.path == '/api/chat':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_chat_response = {
                "response": "System is operating optimally with all agents ready. Current revenue: $582K/hr, efficiency: 87.1%. All systems green.",
                "timestamp": datetime.now().isoformat(),
                "context_used": {"status": "operational", "revenue": 582000},
                "error": False
            }
            
            self.wfile.write(json.dumps(mock_chat_response).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_DELETE(self):
        if self.path == '/api/chat/history':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "cleared"}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
