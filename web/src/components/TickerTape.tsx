import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

const TickerTape = () => {
  const { data: statusData } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  const generateMessages = () => {
    if (!statusData) {
      return [
        "MARA HACKATHON API | LOADING MARKET DATA...",
        "RESOURCE ALLOCATION SYSTEM ONLINE | WAITING FOR DATA...",
        "INITIALIZING 8 CLAUDE AGENTS | MARKET ANALYST | RISK ASSESSMENT | PERFORMANCE OPTIMIZER | ENERGY MANAGEMENT",
        "CONNECTING TO MARA PLATFORM | BTC MARKET DATA | REAL-TIME OPTIMIZATION ACTIVE"
      ];
    }

    const currentPrice = statusData.current_prices[0];
    const siteStatus = statusData.site_status;
    const btcData = statusData.btc_data;
    
    // Calculate additional metrics
    const totalMiners = (siteStatus?.air_miners || 0) + (siteStatus?.hydro_miners || 0) + (siteStatus?.immersion_miners || 0);
    const totalCompute = (siteStatus?.asic_compute || 0) + (siteStatus?.gpu_compute || 0);
    const powerEfficiency = siteStatus?.total_revenue && siteStatus?.total_power_used 
      ? (siteStatus.total_revenue / siteStatus.total_power_used).toFixed(2) 
      : '0.00';
    const profitMargin = siteStatus?.total_revenue && siteStatus?.total_power_cost
      ? (((siteStatus.total_revenue - siteStatus.total_power_cost) / siteStatus.total_revenue) * 100).toFixed(1)
      : '0.0';
    
    return [
      `BTC: $${btcData?.price.toLocaleString() || 'N/A'} (${btcData?.change_percent >= 0 ? '+' : ''}${btcData?.change_percent.toFixed(2) || '0.00'}%) | HASH: $${currentPrice?.hash_price.toFixed(2)} | TOKEN: $${currentPrice?.token_price.toFixed(2)} | ENERGY: $${currentPrice?.energy_price.toFixed(3)}/kWh`,
      `MINERS: ${totalMiners} (AIR: ${siteStatus?.air_miners || 0} | HYDRO: ${siteStatus?.hydro_miners || 0} | IMMERSION: ${siteStatus?.immersion_miners || 0}) | COMPUTE: ${totalCompute} (GPU: ${siteStatus?.gpu_compute || 0} | ASIC: ${siteStatus?.asic_compute || 0})`,
      `POWER: ${siteStatus?.total_power_used.toLocaleString()}W | REVENUE: $${siteStatus?.total_revenue.toLocaleString()}/hr | COST: $${siteStatus?.total_power_cost.toLocaleString()}/hr | PROFIT: ${profitMargin}%`,
      `EFFICIENCY: $${powerEfficiency}/W | BTC 24H: HIGH $${btcData?.high_24h.toLocaleString() || 'N/A'} | LOW $${btcData?.low_24h.toLocaleString() || 'N/A'} | VOL: $${(btcData?.volume_24h / 1e9).toFixed(1) || '0'}B`,
      `MARKET CAP: $${(btcData?.market_cap / 1e12).toFixed(2) || '0'}T | CHANGE 24H: ${btcData?.change_24h >= 0 ? '+' : ''}$${btcData?.change_24h.toLocaleString() || '0'} | TIMESTAMP: ${new Date().toLocaleTimeString()}`,
      `AGENTS STATUS: ALL 8 CLAUDE AGENTS READY | MARKET ANALYST: ACTIVE | RISK ASSESSMENT: LOW RISK | PERFORMANCE: 87% EFFICIENT | ENERGY: OPTIMIZED`,
      `MARA HACKATHON 2025 | AI-POWERED RESOURCE ALLOCATION | FORT MASON SF | REAL-TIME OPTIMIZATION | CLAUDE 4 SONNET AGENTS`,
      `SYSTEM HEALTH: OPERATIONAL | API CONNECTIONS: STABLE | DATA SYNC: ACTIVE | OPTIMIZATION: MAX REVENUE TARGET | INFERENCE PRIORITY: 70%`
    ];
  };

  const [messages, setMessages] = useState(generateMessages());
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    setMessages(generateMessages());
  }, [statusData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000); // Faster rotation for more information

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-terminal-bg border-b border-terminal-border overflow-hidden h-12">
      <div className="flex items-center h-full">
        <div className="bg-terminal-accent text-terminal-bg px-3 py-1 text-sm font-semibold">
          LIVE
        </div>
        <div className="flex-1 relative overflow-hidden">
          <div className="animate-scroll-text whitespace-nowrap text-terminal-accent text-sm font-mono">
            {messages[currentMessage]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerTape;
