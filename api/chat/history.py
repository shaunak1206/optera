from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
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
    
    def do_DELETE(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        mock_response = {"status": "cleared"}
        self.wfile.write(json.dumps(mock_response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
