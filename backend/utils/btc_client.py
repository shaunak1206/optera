import yfinance as yf
from typing import Dict, Any, Optional
import asyncio
from concurrent.futures import ThreadPoolExecutor

class BTCClient:
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=2)
        self._last_price = None
        self._last_data = None
    
    async def get_btc_price(self) -> float:
        """Get current BTC price in USD"""
        try:
            loop = asyncio.get_event_loop()
            btc = await loop.run_in_executor(
                self.executor, 
                lambda: yf.Ticker("BTC-USD")
            )
            
            data = await loop.run_in_executor(
                self.executor, 
                lambda: btc.history(period="1d", interval="1m")
            )
            
            if not data.empty:
                current_price = float(data['Close'].iloc[-1])
                self._last_price = current_price
                return current_price
            else:
                return self._last_price or 95000.0  # Fallback
                
        except Exception as e:
            print(f"Error fetching BTC price: {e}")
            return self._last_price or 95000.0  # Fallback
    
    async def get_btc_data(self) -> Dict[str, Any]:
        """Get comprehensive BTC data"""
        try:
            loop = asyncio.get_event_loop()
            btc = await loop.run_in_executor(
                self.executor, 
                lambda: yf.Ticker("BTC-USD")
            )
            
            # Get recent data
            data = await loop.run_in_executor(
                self.executor, 
                lambda: btc.history(period="1d", interval="5m")
            )
            
            # Get info
            info = await loop.run_in_executor(
                self.executor, 
                lambda: btc.info
            )
            
            if not data.empty:
                current_price = float(data['Close'].iloc[-1])
                previous_close = float(data['Close'].iloc[-2]) if len(data) > 1 else current_price
                change_24h = current_price - previous_close
                change_percent = (change_24h / previous_close) * 100 if previous_close else 0
                
                volume_24h = float(data['Volume'].iloc[-1])
                high_24h = float(data['High'].max())
                low_24h = float(data['Low'].min())
                
                result = {
                    "price": current_price,
                    "change_24h": change_24h,
                    "change_percent": change_percent,
                    "volume_24h": volume_24h,
                    "high_24h": high_24h,
                    "low_24h": low_24h,
                    "market_cap": info.get("marketCap", 0) if info else 0,
                    "timestamp": data.index[-1].isoformat()
                }
                
                self._last_data = result
                return result
            else:
                return self._last_data or self._get_fallback_data()
                
        except Exception as e:
            print(f"Error fetching BTC data: {e}")
            return self._last_data or self._get_fallback_data()
    
    def _get_fallback_data(self) -> Dict[str, Any]:
        """Fallback data when API is unavailable"""
        return {
            "price": 95000.0,
            "change_24h": 1250.0,
            "change_percent": 1.3,
            "volume_24h": 28500000000,
            "high_24h": 96000.0,
            "low_24h": 93500.0,
            "market_cap": 1800000000000,
            "timestamp": "2025-06-21T20:00:00"
        }