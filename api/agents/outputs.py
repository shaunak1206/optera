from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
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
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
