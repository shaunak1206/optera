from typing import Dict, Any, Optional, List
import json
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

from utils.mara_client import MaraClient

class PerformanceOptimizerAgent:
    def __init__(self, anthropic_api_key: str, mara_client: MaraClient):
        self.mara_client = mara_client
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=anthropic_api_key,
            temperature=0.1
        )
    
    async def optimize_performance(self) -> Dict[str, Any]:
        """Analyze current performance and provide optimization recommendations"""
        try:
            # Get current performance data
            site_status = await self.mara_client.get_site_status()
            prices = await self.mara_client.get_current_prices()
            inventory = await self.mara_client.get_inventory()
            
            system_prompt = """You are a performance optimization specialist for cryptocurrency mining and AI compute operations.
            Analyze system performance metrics and provide specific recommendations to maximize efficiency, 
            reduce costs, and increase revenue. Focus on data-driven optimization strategies."""
            
            human_prompt = f"""
            Current Performance Data:
            - Site Status: {json.dumps(site_status, indent=2)}
            - Market Prices: {json.dumps(prices[:3], indent=2)}
            - Available Inventory: {json.dumps(inventory, indent=2)}
            
            Analyze the following performance aspects:
            
            1. EFFICIENCY ANALYSIS:
               - Power efficiency per revenue unit
               - Resource utilization rates
               - Cost per unit of output
               - Revenue per watt consumed
            
            2. ALLOCATION OPTIMIZATION:
               - Current allocation effectiveness
               - Underutilized resources
               - Over-allocated resources
               - Optimal resource distribution
            
            3. COST OPTIMIZATION:
               - Energy cost optimization opportunities
               - Hardware efficiency improvements
               - Operational cost reductions
               - Maintenance optimization
            
            4. REVENUE OPTIMIZATION:
               - Revenue per resource type
               - Market opportunity identification
               - Pricing strategy optimization
               - Capacity expansion opportunities
            
            5. PERFORMANCE METRICS:
               - Calculate key performance indicators
               - Identify performance bottlenecks
               - Benchmark against optimal performance
               - Set performance improvement targets
            
            Provide specific, actionable recommendations with:
            - Priority level for each recommendation
            - Expected impact on performance
            - Implementation difficulty
            - Timeline for implementation
            - Success metrics to track
            
            Focus on the most impactful optimizations that can be implemented immediately.
            """
            
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=human_prompt)
            ]
            
            response = await self.llm.ainvoke(messages)
            
            # Calculate key performance metrics
            total_revenue = site_status.get('total_revenue', 0)
            total_cost = site_status.get('total_power_cost', 0)
            total_power = site_status.get('total_power_used', 0)
            
            efficiency_metrics = {
                "revenue_per_watt": round(total_revenue / total_power, 2) if total_power > 0 else 0,
                "profit_margin": round((total_revenue - total_cost) / total_revenue * 100, 2) if total_revenue > 0 else 0,
                "cost_per_watt": round(total_cost / total_power, 2) if total_power > 0 else 0,
                "power_efficiency": "High" if total_power < 500000 else "Medium" if total_power < 800000 else "Low"
            }
            
            return {
                "optimization_analysis": response.content,
                "performance_metrics": efficiency_metrics,
                "operational_data": {
                    "site_status": site_status,
                    "prices": prices,
                    "inventory": inventory
                },
                "timestamp": prices[0].get("timestamp") if prices else None,
                "agent_type": "Performance Optimizer"
            }
            
        except Exception as e:
            return {
                "optimization_analysis": f"Performance analysis unavailable due to error: {str(e)}",
                "performance_metrics": {},
                "operational_data": {},
                "timestamp": None,
                "agent_type": "Performance Optimizer",
                "error": True
            }
    
    async def get_efficiency_recommendations(self) -> Dict[str, Any]:
        """Get specific efficiency improvement recommendations"""
        try:
            site_status = await self.mara_client.get_site_status()
            
            # Analyze current allocation efficiency
            revenue_breakdown = site_status.get('revenue', {})
            power_breakdown = site_status.get('power', {})
            
            efficiency_analysis = {}
            for resource_type in revenue_breakdown:
                if power_breakdown.get(resource_type, 0) > 0:
                    efficiency = revenue_breakdown[resource_type] / power_breakdown[resource_type]
                    efficiency_analysis[resource_type] = {
                        "revenue_per_watt": round(efficiency, 2),
                        "efficiency_rating": "High" if efficiency > 1.0 else "Medium" if efficiency > 0.5 else "Low"
                    }
            
            return {
                "efficiency_analysis": efficiency_analysis,
                "recommendations": [
                    "Focus on high-efficiency resources",
                    "Consider reallocating low-efficiency resources",
                    "Monitor power consumption patterns",
                    "Optimize resource utilization rates"
                ],
                "agent_type": "Performance Optimizer"
            }
            
        except Exception as e:
            return {
                "efficiency_analysis": {},
                "recommendations": [],
                "error": str(e),
                "agent_type": "Performance Optimizer"
            }
