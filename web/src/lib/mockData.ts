// Realistic staged data for all backend endpoints
// This replaces the Python backend entirely — no more slow API calls

import type { MaraPrice, SiteStatus, BTCData, AllocationResponse, AgentOutput } from './api';

// ─── MARA Price History (50 data points, 5-min intervals) ───────────────────
function generatePriceHistory(): MaraPrice[] {
  const now = new Date();
  const prices: MaraPrice[] = [];
  
  // Base values with realistic ranges
  const baseHash = 7.5;
  const baseToken = 3.2;
  const baseEnergy = 0.65;
  
  for (let i = 49; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000);
    // Create smooth random walks
    const hashNoise = Math.sin(i * 0.3) * 1.5 + Math.cos(i * 0.7) * 0.8 + (Math.random() - 0.5) * 0.5;
    const tokenNoise = Math.sin(i * 0.4 + 1) * 0.5 + Math.cos(i * 0.6) * 0.3 + (Math.random() - 0.5) * 0.2;
    const energyNoise = Math.sin(i * 0.2 + 2) * 0.15 + Math.cos(i * 0.5) * 0.08 + (Math.random() - 0.5) * 0.05;
    
    prices.push({
      hash_price: Math.round((baseHash + hashNoise) * 100) / 100,
      token_price: Math.round((baseToken + tokenNoise) * 100) / 100,
      energy_price: Math.round((baseEnergy + energyNoise) * 1000) / 1000,
      timestamp: timestamp.toISOString(),
    });
  }
  
  return prices;
}

// ─── Site Status (MARA machine allocation) ──────────────────────────────────
export const mockSiteStatus: SiteStatus = {
  air_miners: 120,
  hydro_miners: 85,
  immersion_miners: 45,
  asic_compute: 60,
  gpu_compute: 90,
  total_power_used: 475000, // 475kW
  total_revenue: 661512,    // $661K/day
  total_power_cost: 82440,  // $82K/day
  power: {
    air_miners: 180000,
    hydro_miners: 127500,
    immersion_miners: 54000,
    asic_compute: 48000,
    gpu_compute: 65500,
  },
  revenue: {
    air_miners: 145200,
    hydro_miners: 112500,
    immersion_miners: 68400,
    asic_compute: 156000,
    gpu_compute: 179412,
  },
};

// ─── BTC Data ───────────────────────────────────────────────────────────────
export const mockBtcData: BTCData = {
  price: 104283.50,
  change_24h: 1842.30,
  change_percent: 1.80,
  volume_24h: 42_800_000_000,
  high_24h: 105120.00,
  low_24h: 101890.00,
  market_cap: 2_060_000_000_000,
  timestamp: new Date().toISOString(),
};

// ─── Current Prices (latest + previous for % change calculations) ───────────
let _cachedPrices: MaraPrice[] | null = null;

export function getMockPrices(): MaraPrice[] {
  if (!_cachedPrices) {
    _cachedPrices = generatePriceHistory();
  }
  return _cachedPrices;
}

// Refresh prices periodically to show movement
let _lastRefresh = Date.now();
export function getMockPricesFresh(): MaraPrice[] {
  const now = Date.now();
  if (now - _lastRefresh > 30000) { // Regenerate every 30s
    _cachedPrices = generatePriceHistory();
    _lastRefresh = now;
  }
  return getMockPrices();
}

// ─── Agent Outputs ──────────────────────────────────────────────────────────
export function getMockAgentOutputs(): Record<string, AgentOutput> {
  return {
    SimpleAllocationAgent: {
      timestamp: new Date().toISOString(),
      output: "Allocation optimization complete: Current allocation optimized for 70% inference priority. Revenue maximized at $661K/day.",
      status: "ready",
    },
    ChatbotAgent: {
      timestamp: new Date().toISOString(),
      output: "Chatbot agent ready: System health operational. Standing by for user interactions and Q&A.",
      status: "ready",
    },
    MarketAnalystAgent: {
      timestamp: new Date().toISOString(),
      output: "Market analysis complete: BTC trending upward at $104.2K, energy prices stable. Recommending 70% inference allocation.",
      status: "ready",
    },
    RiskAssessmentAgent: {
      timestamp: new Date().toISOString(),
      output: "Risk assessment complete: Operational risks LOW, market volatility MEDIUM. All systems stable.",
      status: "ready",
    },
    PerformanceOptimizerAgent: {
      timestamp: new Date().toISOString(),
      output: "Performance optimization complete: Efficiency at 87%, revenue per watt optimized. System performing well.",
      status: "ready",
    },
    EnergyManagementAgent: {
      timestamp: new Date().toISOString(),
      output: "Energy analysis complete: Consumption at 475kW, cost efficiency 92%. No immediate optimizations needed.",
      status: "ready",
    },
    MaraClient: {
      timestamp: new Date().toISOString(),
      output: "MARA API connected: Live sync active. Site status: 475kW used, revenue $661K/day. All systems operational.",
      status: "ready",
    },
    BTCClient: {
      timestamp: new Date().toISOString(),
      output: `BTC market data updated: Price $${mockBtcData.price.toLocaleString()} (+${mockBtcData.change_percent}%), volume stable. Market conditions favorable for mining.`,
      status: "ready",
    },
  };
}

// ─── Allocation Results ─────────────────────────────────────────────────────
export function getMockAllocationResult(inferencePriority: number): AllocationResponse {
  // Dynamically adjust allocation based on inference priority
  const miningWeight = 1 - inferencePriority;
  const inferenceWeight = inferencePriority;
  
  const totalMiners = 250;
  const totalCompute = 150;
  
  const airMiners = Math.round(120 * miningWeight / 0.5);
  const hydroMiners = Math.round(85 * miningWeight / 0.5);
  const immersionMiners = Math.round(45 * miningWeight / 0.5);
  const gpuCompute = Math.round(90 * inferenceWeight / 0.5);
  const asicCompute = Math.round(60 * inferenceWeight / 0.5);

  const expectedRevenue = 27563 + Math.round((inferenceWeight - 0.5) * 8000);
  const expectedCost = 3435 + Math.round(Math.abs(inferenceWeight - 0.5) * 500);
  
  const strategies = [
    `Optimized for ${(inferencePriority * 100).toFixed(0)}% inference priority. Allocated ${gpuCompute} GPU and ${asicCompute} ASIC compute units for AI inference workloads, while maintaining ${airMiners + hydroMiners + immersionMiners} miners for BTC mining operations. Expected revenue increase of ${((inferenceWeight - 0.3) * 20).toFixed(1)}% over baseline.`,
    `Analysis indicates ${inferencePriority > 0.6 ? 'strong AI demand' : 'favorable mining conditions'}. Current allocation targets ${(inferencePriority * 100).toFixed(0)}% inference throughput. Hash price at $7.50 supports continued mining at scale while token price of $3.20 drives inference profitability.`,
    `Multi-factor optimization complete. BTC at $104.2K with positive 24h trend supports mining allocation. Energy cost of $0.65/kWh within acceptable range. Inference priority set to ${(inferencePriority * 100).toFixed(0)}% balancing both revenue streams effectively.`,
  ];

  return {
    allocation: {
      air_miners: airMiners,
      hydro_miners: hydroMiners,
      immersion_miners: immersionMiners,
      gpu_compute: gpuCompute,
      asic_compute: asicCompute,
    },
    expected_revenue: expectedRevenue,
    expected_cost: expectedCost,
    efficiency_score: 85 + Math.random() * 10,
    reasoning: strategies[Math.floor(Math.random() * strategies.length)],
  };
}

// ─── Chatbot Responses ──────────────────────────────────────────────────────
const chatResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'sup'],
    response: "Hello! I'm the Optera AI Assistant. I can help you understand the resource allocation system, current market conditions, system performance, or answer questions about our mining and inference operations. What would you like to know?",
  },
  {
    keywords: ['status', 'how', 'system', 'overview'],
    response: `System Status Overview:\n\n• **Power Usage**: 475kW across all operations\n• **Total Revenue**: $661K/day ($27.5K/hr)\n• **Power Cost**: $82.4K/day\n• **Profit Margin**: 87.5%\n• **Active Miners**: 250 units (120 air, 85 hydro, 45 immersion)\n• **Compute Units**: 150 (90 GPU, 60 ASIC)\n• **BTC Price**: $104,283 (+1.8%)\n• **All 8 agents**: Operational\n\nThe system is running optimally with inference priority at 70%.`,
  },
  {
    keywords: ['bitcoin', 'btc', 'price', 'crypto'],
    response: `Bitcoin Market Analysis:\n\n• **Current Price**: $104,283.50\n• **24h Change**: +$1,842.30 (+1.80%)\n• **24h High**: $105,120.00\n• **24h Low**: $101,890.00\n• **Volume**: $42.8B\n• **Market Cap**: $2.06T\n\nBTC is showing a positive trend. Current hash price of $7.50 makes mining profitable at our energy cost of $0.65/kWh. I recommend maintaining current allocation strategy.`,
  },
  {
    keywords: ['allocation', 'resource', 'mining', 'inference', 'optimize'],
    response: `Current Resource Allocation:\n\n**Mining Operations** (250 units):\n• Air Miners: 120 units @ 1.5kW each\n• Hydro Miners: 85 units @ 1.5kW each\n• Immersion Miners: 45 units @ 1.2kW each\n\n**AI Inference** (150 units):\n• GPU Compute: 90 units @ 728W each\n• ASIC Compute: 60 units @ 800W each\n\nInference priority is set to 70%. The auto-optimizer adjusts every 30s. Current efficiency score: 87%.`,
  },
  {
    keywords: ['energy', 'power', 'cost', 'efficiency', 'watt'],
    response: `Energy Management Report:\n\n• **Total Consumption**: 475kW\n• **Energy Cost**: $0.65/kWh\n• **Daily Power Cost**: $82,440\n• **Revenue per Watt**: $1.39/W\n• **Cost Efficiency**: 92%\n\nWe're currently in off-peak pricing. Energy costs are stable and within optimal range. The energy management agent recommends no changes at this time.`,
  },
  {
    keywords: ['risk', 'danger', 'warning', 'concern'],
    response: `Risk Assessment Summary:\n\n• **Price Volatility Risk**: 35% (LOW)\n• **Hardware Failure Probability**: 15% (LOW)\n• **Energy Cost Spike Prediction**: 28% (LOW)\n• **Regulatory Risk**: 32% (MODERATE)\n• **AI Model Drift**: 18% (LOW)\n\n**Overall Risk Level**: LOW\n\nNo immediate risks detected. Market conditions are favorable. Fear & Greed Index shows neutral sentiment.`,
  },
  {
    keywords: ['agent', 'agents', 'claude'],
    response: `All 8 agents are operational:\n\n1. **SimpleAllocationAgent** — Primary optimizer, 70% inference priority\n2. **ChatbotAgent** — That's me! Standing by for your questions\n3. **MarketAnalystAgent** — Monitoring BTC trends and price forecasts\n4. **RiskAssessmentAgent** — All risk levels LOW to MODERATE\n5. **PerformanceOptimizerAgent** — Efficiency at 87%\n6. **EnergyManagementAgent** — 475kW, cost efficiency 92%\n7. **MaraClient** — Live MARA platform sync active\n8. **BTCClient** — Real-time Bitcoin data feed active`,
  },
  {
    keywords: ['help', 'what', 'can'],
    response: "I can help with:\n\n• **System Status** — Current operations overview\n• **Bitcoin** — Live BTC market data and analysis\n• **Allocation** — Resource allocation between mining & inference\n• **Energy** — Power consumption and cost analysis\n• **Risk** — Risk assessment and market risks\n• **Agents** — Status of all 8 AI agents\n• **Performance** — Efficiency metrics and optimization\n\nJust ask me about any of these topics!",
  },
  {
    keywords: ['performance', 'metric', 'profit', 'revenue'],
    response: `Performance Metrics:\n\n• **Daily Revenue**: $661,512\n• **Daily Cost**: $82,440\n• **Net Profit**: $579,072/day\n• **Profit Margin**: 87.5%\n• **Revenue/hr**: $27,563\n• **Revenue/Watt**: $1.39/W\n• **Efficiency Score**: 87%\n• **Uptime**: 99.97%\n\nThe system is performing above target. The auto-optimizer has been maintaining consistent revenue maximization.`,
  },
];

const defaultResponse = "I appreciate your question! As the Optera AI Assistant, I monitor resource allocation between BTC mining and AI inference. Try asking me about system status, Bitcoin price, resource allocation, energy management, risk assessment, agent status, or performance metrics. I'm here to help!";

export function getChatResponse(message: string): string {
  const lower = message.toLowerCase();
  
  for (const entry of chatResponses) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.response;
    }
  }
  
  return defaultResponse;
}

// ─── Market Intelligence ────────────────────────────────────────────────────
export function getMockMarketIntelligence() {
  const prices = getMockPricesFresh();
  return {
    analysis: "Market conditions are favorable. BTC price showing upward momentum with stable energy costs. AI inference demand remains strong with token prices averaging $3.20. Recommended strategy: maintain 70% inference allocation while monitoring hash price trends.",
    current_prices: prices,
    inventory: {
      miners: {
        air: { count: 200, hashrate: 110, power: 1500 },
        hydro: { count: 150, hashrate: 130, power: 1500 },
        immersion: { count: 100, hashrate: 150, power: 1200 },
      },
      inference: {
        gpu: { count: 120, tokens: 5000, power: 728 },
        asic: { count: 80, tokens: 3000, power: 800 },
      },
    },
    timestamp: new Date().toISOString(),
    btc_data: mockBtcData,
  };
}
