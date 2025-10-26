from typing import Dict, Any, Optional, List
import json
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage

from utils.mara_client import MaraClient
from utils.btc_client import BTCClient

class MarketAnalystAgent:
    def __init__(self, anthropic_api_key: str, mara_client: MaraClient, btc_client: BTCClient):
        self.mara_client = mara_client
        self.btc_client = btc_client
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=anthropic_api_key,
            temperature=0.2
        )
    
    async def analyze_market_trends(self) -> Dict[str, Any]:
        """Analyze current market trends and provide insights"""
        try:
            # Get market data
            prices = await self.mara_client.get_current_prices()
            btc_data = await self.btc_client.get_btc_data()
            site_status = await self.mara_client.get_site_status()
            
            system_prompt = """You are a senior market analyst specializing in cryptocurrency mining and AI inference markets. 
            Analyze market trends, price movements, and provide actionable insights for resource allocation decisions.
            Focus on identifying opportunities and risks in the current market conditions."""
            
            human_prompt = f"""
            Current Market Data:
            - MARA Prices: {json.dumps(prices[:3], indent=2)}
            - Bitcoin Data: {json.dumps(btc_data, indent=2)}
            - Site Status: {json.dumps(site_status, indent=2)}
            
            Analyze these market conditions and provide:
            1. Key market trends and patterns
            2. Price movement predictions for next 24-48 hours
            3. Risk assessment and opportunities
            4. Recommended allocation strategy based on market analysis
            5. Market volatility indicators
            
            Provide a comprehensive analysis in 3-4 paragraphs with specific recommendations.
            """
            
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=human_prompt)
            ]
            
            response = await self.llm.ainvoke(messages)
            
            return {
                "analysis": response.content,
                "market_data": {
                    "mara_prices": prices,
                    "btc_data": btc_data,
                    "site_status": site_status
                },
                "timestamp": prices[0].get("timestamp") if prices else None,
                "agent_type": "Market Analyst"
            }
            
        except Exception as e:
            return {
                "analysis": f"Market analysis unavailable due to error: {str(e)}",
                "market_data": {},
                "timestamp": None,
                "agent_type": "Market Analyst",
                "error": True
            }
    
    async def get_price_forecast(self, timeframe: str = "24h") -> Dict[str, Any]:
        """Generate price forecasts for different timeframes"""
        try:
            prices = await self.mara_client.get_current_prices()
            btc_data = await self.btc_client.get_btc_data()
            
            system_prompt = """You are a quantitative analyst specializing in price forecasting for cryptocurrency and compute markets.
            Analyze historical price data and market conditions to generate accurate price forecasts."""
            
            human_prompt = f"""
            Historical Price Data:
            {json.dumps(prices[:10], indent=2)}
            
            Current Bitcoin Data:
            {json.dumps(btc_data, indent=2)}
            
            Generate price forecasts for the next {timeframe}:
            1. Energy price forecast
            2. Hash price forecast  
            3. Token price forecast
            4. Bitcoin price forecast
            5. Confidence levels for each forecast
            
            Return as structured analysis with specific price targets and reasoning.
            """
            
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=human_prompt)
            ]
            
            response = await self.llm.ainvoke(messages)
            
            return {
                "forecast": response.content,
                "timeframe": timeframe,
                "current_prices": prices[0] if prices else {},
                "btc_data": btc_data,
                "agent_type": "Market Analyst"
            }
            
        except Exception as e:
            return {
                "forecast": f"Forecast unavailable due to error: {str(e)}",
                "timeframe": timeframe,
                "agent_type": "Market Analyst",
                "error": True
            }
