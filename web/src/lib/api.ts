const API_BASE_URL = 'http://localhost:8000';

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
  SimpleAllocationAgent: AgentOutput;
  ChatbotAgent: AgentOutput;
  MaraClient: AgentOutput;
  BTCClient: AgentOutput;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getStatus(): Promise<{ site_status: SiteStatus; current_prices: MaraPrice[]; btc_data: BTCData }> {
    return this.request('/status');
  }

  async optimizeAllocation(request: AllocationRequest): Promise<AllocationResponse> {
    return this.request('/allocate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async deployAllocation(allocation: { [key: string]: number }): Promise<any> {
    return this.request('/deploy', {
      method: 'POST',
      body: JSON.stringify(allocation),
    });
  }

  async getMarketIntelligence(): Promise<MarketIntelligence> {
    return this.request('/market-intelligence');
  }

  async getBTCData(): Promise<BTCData> {
    return this.request('/btc');
  }

  async sendChatMessage(message: string, context?: any): Promise<ChatResponse> {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async getSystemSummary(): Promise<SystemSummary> {
    return this.request('/chat/summary');
  }

  async getChatHistory(limit: number = 10): Promise<{ history: ChatHistoryItem[] }> {
    return this.request(`/chat/history?limit=${limit}`);
  }

  async clearChatHistory(): Promise<{ status: string }> {
    return this.request('/chat/history', {
      method: 'DELETE',
    });
  }

  async getAgentOutputs(): Promise<AgentOutputs> {
    return this.request('/agents/outputs');
  }
}

export const apiClient = new ApiClient();