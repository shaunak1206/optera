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
        "RESOURCE ALLOCATION SYSTEM ONLINE | WAITING FOR DATA..."
      ];
    }

    const currentPrice = statusData.current_prices[0];
    const siteStatus = statusData.site_status;
    const btcData = statusData.btc_data;
    
    return [
      `BTC: $${btcData?.price.toLocaleString() || 'N/A'} (${btcData?.change_percent >= 0 ? '+' : ''}${btcData?.change_percent.toFixed(2) || '0.00'}%) | HASH: $${currentPrice?.hash_price.toFixed(2)} | TOKEN: $${currentPrice?.token_price.toFixed(2)}`,
      `TOTAL MINERS: ${(siteStatus?.air_miners || 0) + (siteStatus?.hydro_miners || 0) + (siteStatus?.immersion_miners || 0)} | COMPUTE UNITS: ${(siteStatus?.asic_compute || 0) + (siteStatus?.gpu_compute || 0)}`,
      `POWER USAGE: ${siteStatus?.total_power_used.toLocaleString()}W | REVENUE: $${siteStatus?.total_revenue.toLocaleString()}`,
      `BTC 24H HIGH: $${btcData?.high_24h.toLocaleString() || 'N/A'} | LOW: $${btcData?.low_24h.toLocaleString() || 'N/A'} | VOL: $${(btcData?.volume_24h / 1e9).toFixed(1) || '0'}B`,
      `MARA HACKATHON 2025 | AI-POWERED RESOURCE ALLOCATION | FORT MASON SF`
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
    }, 6000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-terminal-bg border-b border-terminal-border overflow-hidden h-10">
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
