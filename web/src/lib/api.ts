import {
  mockSiteStatus,
  mockBtcData,
  getMockPricesFresh,
  getMockAgentOutputs,
  getMockAllocationResult,
  getChatResponse,
  getMockMarketIntelligence,
} from './mockData';

export interface MaraPrice {
  energy_price: number;
  hash_price: number;
  token_price: number;
  timestamp: string;
}

export interface SiteStatus {
  air_miners: number;
  asic_compute: number;
  gpu_compute: number;
  hydro_miners: number;
  immersion_miners: number;
  total_power_used: number;
  total_revenue: number;
  total_power_cost: number;
  power: {
    [key: string]: number;
  };
  revenue: {
    [key: string]: number;
  };
}

export interface AllocationRequest {
  target_revenue?: number;
  inference_priority: number;
  power_limit?: number;
}

export interface AllocationResponse {
  allocation: {
    [key: string]: number;
  };
  expected_revenue: number;
  expected_cost: number;
  efficiency_score: number;
  reasoning: string;
}

export interface BTCData {
  price: number;
  change_24h: number;
  change_percent: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  timestamp: string;
}

export interface MarketIntelligence {
  analysis: string;
  current_prices: MaraPrice[];
  inventory: any;
  timestamp: string;
  btc_data?: BTCData;
}

export interface ChatMessage {
  message: string;
  context?: any;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  context_used?: any;
  error?: boolean;
}

export interface ChatHistoryItem {
  timestamp: string;
  user_message: string;
  ai_response: string;
  system_context: any;
}

export interface SystemSummary {
  summary: any;
  raw_response: string;
}

export interface AgentOutput {
  timestamp: string;
  output: string;
  status: string;
}

export interface AgentOutputs {
  [key: string]: AgentOutput;
}

// Small delay to simulate network latency (feels realistic without being slow)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(50 + Math.random() * 150);

class ApiClient {
  async getStatus(): Promise<{ site_status: SiteStatus; current_prices: MaraPrice[]; btc_data: BTCData }> {
    await randomDelay();
    return {
      site_status: mockSiteStatus,
      current_prices: getMockPricesFresh(),
      btc_data: { ...mockBtcData, timestamp: new Date().toISOString() },
    };
  }

  async optimizeAllocation(request: AllocationRequest): Promise<AllocationResponse> {
    await delay(300 + Math.random() * 700); // Simulate AI "thinking"
    return getMockAllocationResult(request.inference_priority);
  }

  async deployAllocation(_allocation: { [key: string]: number }): Promise<any> {
    await delay(200 + Math.random() * 300);
    return { status: "deployed", message: "Allocation updated successfully" };
  }

  async getMarketIntelligence(): Promise<MarketIntelligence> {
    await randomDelay();
    return getMockMarketIntelligence();
  }

  async getBTCData(): Promise<BTCData> {
    await randomDelay();
    return { ...mockBtcData, timestamp: new Date().toISOString() };
  }

  async sendChatMessage(message: string, _context?: any): Promise<ChatResponse> {
    await delay(400 + Math.random() * 800); // Simulate AI "thinking"
    return {
      response: getChatResponse(message),
      timestamp: new Date().toISOString(),
      context_used: null,
      error: false,
    };
  }

  async getSystemSummary(): Promise<SystemSummary> {
    await randomDelay();
    return {
      summary: {
        status: "operational",
        revenue: "$661K/day",
        efficiency: "87%",
        risk_level: "LOW",
      },
      raw_response: "All systems operational. Revenue at $661K/day with 87% efficiency. Risk levels are LOW across all categories.",
    };
  }

  async getChatHistory(_limit: number = 10): Promise<{ history: ChatHistoryItem[] }> {
    await randomDelay();
    return { history: [] }; // Start with empty history
  }

  async clearChatHistory(): Promise<{ status: string }> {
    await randomDelay();
    return { status: "cleared" };
  }

  async getAgentOutputs(): Promise<AgentOutputs> {
    await randomDelay();
    return getMockAgentOutputs();
  }
}

export const apiClient = new ApiClient();