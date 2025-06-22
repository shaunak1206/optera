import httpx
from typing import Dict, List, Any, Optional
import asyncio

class MaraClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://mara-hackathon-api.onrender.com"
        self.headers = {"X-Api-Key": api_key}
    
    async def get_current_prices(self) -> List[Dict[str, Any]]:
        """Get current pricing data from MARA API"""
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/prices")
            response.raise_for_status()
            return response.json()
    
    async def get_inventory(self) -> Dict[str, Any]:
        """Get available inventory from MARA API"""
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/inventory")
            response.raise_for_status()
            return response.json()
    
    async def get_site_status(self) -> Dict[str, Any]:
        """Get current site status and allocation"""
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/machines", headers=self.headers)
            response.raise_for_status()
            return response.json()
    
    async def update_allocation(self, allocation: Dict[str, int]) -> Dict[str, Any]:
        """Update machine allocation on MARA"""
        # Map our internal names to MARA API names
        mara_allocation = {
            "air_miners": allocation.get("air_miners", 0),
            "hydro_miners": allocation.get("hydro_miners", 0),
            "immersion_miners": allocation.get("immersion_miners", 0),
            "gpu_compute": allocation.get("gpu_compute", 0),
            "asic_compute": allocation.get("asic_compute", 0),
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{self.base_url}/machines",
                headers=self.headers,
                json=mara_allocation
            )
            response.raise_for_status()
            return response.json()
    
    def calculate_power_usage(self, allocation: Dict[str, int], inventory: Dict[str, Any]) -> int:
        """Calculate total power usage for an allocation"""
        power_usage = 0
        
        # Mining power usage
        miners = inventory.get("miners", {})
        power_usage += allocation.get("air_miners", 0) * miners.get("air", {}).get("power", 0)
        power_usage += allocation.get("hydro_miners", 0) * miners.get("hydro", {}).get("power", 0)
        power_usage += allocation.get("immersion_miners", 0) * miners.get("immersion", {}).get("power", 0)
        
        # Inference power usage
        inference = inventory.get("inference", {})
        power_usage += allocation.get("gpu_compute", 0) * inference.get("gpu", {}).get("power", 0)
        power_usage += allocation.get("asic_compute", 0) * inference.get("asic", {}).get("power", 0)
        
        return power_usage
    
    def calculate_expected_revenue(
        self, 
        allocation: Dict[str, int], 
        inventory: Dict[str, Any], 
        prices: List[Dict[str, Any]]
    ) -> Dict[str, float]:
        """Calculate expected revenue for an allocation"""
        if not prices:
            return {"total": 0.0, "mining": 0.0, "inference": 0.0}
        
        # Use latest prices
        latest_prices = prices[0]
        
        mining_revenue = 0.0
        inference_revenue = 0.0
        
        # Mining revenue (hashrate * hash_price)
        miners = inventory.get("miners", {})
        mining_revenue += (
            allocation.get("air_miners", 0) * miners.get("air", {}).get("hashrate", 0) * 
            latest_prices.get("hash_price", 0)
        )
        mining_revenue += (
            allocation.get("hydro_miners", 0) * miners.get("hydro", {}).get("hashrate", 0) * 
            latest_prices.get("hash_price", 0)
        )
        mining_revenue += (
            allocation.get("immersion_miners", 0) * miners.get("immersion", {}).get("hashrate", 0) * 
            latest_prices.get("hash_price", 0)
        )
        
        # Inference revenue (tokens * token_price)
        inference = inventory.get("inference", {})
        inference_revenue += (
            allocation.get("gpu_compute", 0) * inference.get("gpu", {}).get("tokens", 0) * 
            latest_prices.get("token_price", 0)
        )
        inference_revenue += (
            allocation.get("asic_compute", 0) * inference.get("asic", {}).get("tokens", 0) * 
            latest_prices.get("token_price", 0)
        )
        
        return {
            "total": mining_revenue + inference_revenue,
            "mining": mining_revenue,
            "inference": inference_revenue
        }