from typing import Dict, Any, Optional, List
import json
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

from utils.mara_client import MaraClient

class EnergyManagementAgent:
    def __init__(self, anthropic_api_key: str, mara_client: MaraClient):
        self.mara_client = mara_client
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=anthropic_api_key,
            temperature=0.1
        )
    
    async def analyze_energy_consumption(self) -> Dict[str, Any]:
        """Analyze energy consumption patterns and provide optimization strategies"""
        try:
            # Get current energy and operational data
            site_status = await self.mara_client.get_site_status()
            prices = await self.mara_client.get_current_prices()
            inventory = await self.mara_client.get_inventory()
            
            system_prompt = """You are an energy management specialist for large-scale cryptocurrency mining and AI compute operations.
            Analyze energy consumption patterns, costs, and efficiency to provide strategies for optimizing energy usage,
            reducing costs, and improving overall energy efficiency. Focus on both immediate and long-term energy optimization."""
            
            human_prompt = f"""
            Current Energy Data:
            - Site Status: {json.dumps(site_status, indent=2)}
            - Energy Prices: {json.dumps([p.get('energy_price', 0) for p in prices[:5]], indent=2)}
            - Hardware Inventory: {json.dumps(inventory, indent=2)}
            
            Analyze the following energy management aspects:
            
            1. ENERGY CONSUMPTION ANALYSIS:
               - Current power usage by resource type
               - Power efficiency per revenue unit
               - Peak vs. average power consumption
               - Energy waste identification
            
            2. COST OPTIMIZATION:
               - Energy cost per unit of output
               - Time-of-use optimization opportunities
               - Load balancing strategies
               - Energy procurement optimization
            
            3. EFFICIENCY IMPROVEMENTS:
               - Hardware efficiency ratings
               - Cooling system optimization
               - Power distribution efficiency
               - Renewable energy integration opportunities
            
            4. LOAD MANAGEMENT:
               - Peak demand management
               - Load shifting strategies
               - Demand response opportunities
               - Capacity planning
            
            5. SUSTAINABILITY METRICS:
               - Carbon footprint analysis
               - Energy intensity metrics
               - Renewable energy potential
               - Environmental impact assessment
            
            Provide specific recommendations for:
            - Immediate energy cost reductions
            - Long-term efficiency improvements
            - Load management strategies
            - Sustainability initiatives
            - Energy procurement optimization
            
            Include quantitative estimates for potential savings and implementation timelines.
            """
            
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=human_prompt)
            ]
            
            response = await self.llm.ainvoke(messages)
            
            # Calculate energy metrics
            total_power_used = site_status.get('total_power_used', 0)
            total_power_cost = site_status.get('total_power_cost', 0)
            total_revenue = site_status.get('total_revenue', 0)
            
            energy_metrics = {
                "total_power_consumption": total_power_used,
                "energy_cost_per_hour": round(total_power_cost, 2),
                "revenue_per_kwh": round(total_revenue / (total_power_used / 1000), 2) if total_power_used > 0 else 0,
                "energy_efficiency_rating": "High" if total_power_used < 600000 else "Medium" if total_power_used < 900000 else "Low",
                "cost_per_watt": round(total_power_cost / total_power_used, 4) if total_power_used > 0 else 0
            }
            
            return {
                "energy_analysis": response.content,
                "energy_metrics": energy_metrics,
                "operational_data": {
                    "site_status": site_status,
                    "prices": prices,
                    "inventory": inventory
                },
                "timestamp": prices[0].get("timestamp") if prices else None,
                "agent_type": "Energy Management"
            }
            
        except Exception as e:
            return {
                "energy_analysis": f"Energy analysis unavailable due to error: {str(e)}",
                "energy_metrics": {},
                "operational_data": {},
                "timestamp": None,
                "agent_type": "Energy Management",
                "error": True
            }
    
    async def get_energy_recommendations(self) -> Dict[str, Any]:
        """Get specific energy optimization recommendations"""
        try:
            site_status = await self.mara_client.get_site_status()
            prices = await self.mara_client.get_current_prices()
            
            current_energy_price = prices[0].get('energy_price', 0) if prices else 0
            total_power = site_status.get('total_power_used', 0)
            total_cost = site_status.get('total_power_cost', 0)
            
            # Generate energy recommendations based on current data
            recommendations = []
            
            if total_power > 800000:  # High power usage
                recommendations.append("Consider load balancing to reduce peak demand")
                recommendations.append("Implement power capping for non-critical resources")
            
            if current_energy_price > 0.7:  # High energy prices
                recommendations.append("Shift high-power operations to off-peak hours")
                recommendations.append("Consider demand response programs")
            
            if total_cost / total_power > 0.001:  # High cost per watt
                recommendations.append("Optimize cooling systems for better efficiency")
                recommendations.append("Review power distribution for losses")
            
            return {
                "recommendations": recommendations,
                "current_energy_price": current_energy_price,
                "power_utilization": total_power,
                "energy_cost": total_cost,
                "agent_type": "Energy Management"
            }
            
        except Exception as e:
            return {
                "recommendations": [],
                "error": str(e),
                "agent_type": "Energy Management"
            }
