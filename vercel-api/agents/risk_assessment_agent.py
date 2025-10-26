from typing import Dict, Any, Optional, List
import json
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

from utils.mara_client import MaraClient
from utils.btc_client import BTCClient

class RiskAssessmentAgent:
    def __init__(self, anthropic_api_key: str, mara_client: MaraClient, btc_client: BTCClient):
        self.mara_client = mara_client
        self.btc_client = btc_client
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=anthropic_api_key,
            temperature=0.1
        )
    
    async def assess_operational_risks(self) -> Dict[str, Any]:
        """Assess operational risks for the mining and compute operation"""
        try:
            # Get current operational data
            site_status = await self.mara_client.get_site_status()
            prices = await self.mara_client.get_current_prices()
            btc_data = await self.btc_client.get_btc_data()
            
            system_prompt = """You are a risk management specialist for cryptocurrency mining and AI compute operations.
            Assess operational, financial, and market risks to provide actionable risk mitigation strategies.
            Focus on identifying potential threats and vulnerabilities in the current operation."""
            
            human_prompt = f"""
            Current Operational Data:
            - Site Status: {json.dumps(site_status, indent=2)}
            - Market Prices: {json.dumps(prices[:3], indent=2)}
            - Bitcoin Market: {json.dumps(btc_data, indent=2)}
            
            Assess the following risk categories:
            1. OPERATIONAL RISKS:
               - Power consumption and efficiency risks
               - Hardware failure and maintenance risks
               - Capacity utilization risks
            
            2. FINANCIAL RISKS:
               - Revenue volatility risks
               - Cost escalation risks
               - Profit margin compression risks
            
            3. MARKET RISKS:
               - Price volatility risks
               - Demand fluctuation risks
               - Competitive positioning risks
            
            4. TECHNICAL RISKS:
               - System reliability risks
               - Data integrity risks
               - Security vulnerabilities
            
            For each risk category, provide:
            - Risk level (Low/Medium/High/Critical)
            - Impact assessment
            - Probability of occurrence
            - Mitigation strategies
            - Monitoring recommendations
            
            Provide a comprehensive risk assessment with specific actionable recommendations.
            """
            
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=human_prompt)
            ]
            
            response = await self.llm.ainvoke(messages)
            
            return {
                "risk_assessment": response.content,
                "operational_data": {
                    "site_status": site_status,
                    "prices": prices,
                    "btc_data": btc_data
                },
                "timestamp": prices[0].get("timestamp") if prices else None,
                "agent_type": "Risk Assessment"
            }
            
        except Exception as e:
            return {
                "risk_assessment": f"Risk assessment unavailable due to error: {str(e)}",
                "operational_data": {},
                "timestamp": None,
                "agent_type": "Risk Assessment",
                "error": True
            }
    
    async def calculate_risk_metrics(self) -> Dict[str, Any]:
        """Calculate quantitative risk metrics"""
        try:
            site_status = await self.mara_client.get_site_status()
            prices = await self.mara_client.get_current_prices()
            
            # Calculate basic risk metrics
            total_revenue = site_status.get('total_revenue', 0)
            total_cost = site_status.get('total_power_cost', 0)
            profit_margin = (total_revenue - total_cost) / total_revenue if total_revenue > 0 else 0
            
            # Price volatility (simplified)
            if len(prices) >= 2:
                energy_volatility = abs(prices[0].get('energy_price', 0) - prices[1].get('energy_price', 0)) / prices[1].get('energy_price', 1)
                hash_volatility = abs(prices[0].get('hash_price', 0) - prices[1].get('hash_price', 0)) / prices[1].get('hash_price', 1)
                token_volatility = abs(prices[0].get('token_price', 0) - prices[1].get('token_price', 0)) / prices[1].get('token_price', 1)
            else:
                energy_volatility = hash_volatility = token_volatility = 0
            
            # Power utilization risk
            total_power_used = site_status.get('total_power_used', 0)
            power_limit = 1000000  # Assuming 1MW limit
            power_utilization = total_power_used / power_limit if power_limit > 0 else 0
            
            return {
                "risk_metrics": {
                    "profit_margin": round(profit_margin * 100, 2),
                    "energy_price_volatility": round(energy_volatility * 100, 2),
                    "hash_price_volatility": round(hash_volatility * 100, 2),
                    "token_price_volatility": round(token_volatility * 100, 2),
                    "power_utilization": round(power_utilization * 100, 2),
                    "revenue_stability": "High" if profit_margin > 0.3 else "Medium" if profit_margin > 0.1 else "Low"
                },
                "operational_data": site_status,
                "agent_type": "Risk Assessment"
            }
            
        except Exception as e:
            return {
                "risk_metrics": {},
                "error": str(e),
                "agent_type": "Risk Assessment"
            }
