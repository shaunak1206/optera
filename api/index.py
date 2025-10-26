from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Handle different API routes (Vercel removes /api prefix)
        if self.path == '/agents/outputs':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Mock data for agents
            mock_data = {
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
            
            self.wfile.write(json.dumps(mock_data).encode())
            
        elif self.path == '/status':
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
            
        elif self.path == '/chat/history' or self.path.startswith('/chat/history?'):
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
            
        elif self.path == '/chat/summary':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_summary = {
                "summary": "System operational with all 8 agents ready. Current allocation optimized for 70% inference priority. Revenue at $582K/hr with 92% efficiency.",
                "timestamp": "2024-01-15T23:25:00Z"
            }
            
            self.wfile.write(json.dumps(mock_summary).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found", "path": self.path}).encode())
    
    def do_POST(self):
        # Handle POST requests
        if self.path == '/allocate':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_response = {
                "status": "success",
                "allocation": {
                    "inference": 70,
                    "mining": 30
                },
                "revenue_impact": "+12.5%",
                "timestamp": "2024-01-15T23:25:00Z"
            }
            
            self.wfile.write(json.dumps(mock_response).encode())
            
        elif self.path == '/chat':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_chat_response = {
                "response": "All systems are operational. Current allocation is optimized for maximum revenue at 70% inference priority.",
                "timestamp": "2024-01-15T23:25:00Z"
            }
            
            self.wfile.write(json.dumps(mock_chat_response).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found", "path": self.path}).encode())
    
    def do_DELETE(self):
        # Handle DELETE requests
        if self.path == '/chat/history':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            mock_response = {"status": "cleared"}
            self.wfile.write(json.dumps(mock_response).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found", "path": self.path}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
