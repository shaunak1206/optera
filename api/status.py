from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
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
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
