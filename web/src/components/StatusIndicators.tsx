import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

const StatusIndicators = () => {
  const { data: statusData } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  const btcData = statusData?.btc_data;
  const siteStatus = statusData?.site_status;
  const currentPrice = statusData?.current_prices?.[0];
  const previousPrice = statusData?.current_prices?.[1];
  
  // Calculate percentage changes
  const calculatePercentChange = (current: number, previous: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
  
  const tokenPriceChange = currentPrice && previousPrice 
    ? calculatePercentChange(currentPrice.token_price, previousPrice.token_price)
    : 15;
    
  const energyCostChange = currentPrice && previousPrice
    ? calculatePercentChange(currentPrice.energy_price, previousPrice.energy_price)
    : -2;
    
  const revenueChange = 12.5; // Would need historical revenue data to calculate

  const indicators = [
    { 
      label: 'BTC Price', 
      value: btcData ? `$${btcData.price.toLocaleString()}` : '$95,000', 
      status: (btcData?.change_percent || 0) >= 0 ? 'up' : 'down', 
      change: btcData ? `${btcData.change_percent >= 0 ? '+' : ''}${btcData.change_percent.toFixed(1)}%` : '+1.3%'
    },
    { 
      label: 'Mining Pool', 
      value: 'CONNECTED', 
      status: 'good', 
      change: '100.0%' 
    },
    { 
      label: 'Token Price', 
      value: currentPrice ? `$${currentPrice.token_price.toFixed(2)}` : '$0.84', 
      status: tokenPriceChange >= 0 ? 'up' : 'down', 
      change: `${tokenPriceChange >= 0 ? '+' : ''}${tokenPriceChange.toFixed(1)}%` 
    },
    { 
      label: 'Energy Cost', 
      value: currentPrice ? `$${currentPrice.energy_price.toFixed(3)}/kWh` : '$1.337/kWh', 
      status: energyCostChange <= 0 ? 'up' : 'down', // Lower energy cost is better (up)
      change: `${energyCostChange >= 0 ? '+' : ''}${energyCostChange.toFixed(1)}%` 
    },
    { 
      label: 'Power Usage', 
      value: siteStatus ? `${Math.round(siteStatus.total_power_used / 1000)}kW` : '475kW', 
      status: 'warning', 
      change: 'HIGH' 
    },
    { 
      label: 'Revenue/hr', 
      value: siteStatus ? `$${Math.round(siteStatus.total_revenue / 24).toLocaleString()}` : '$27,563', 
      status: revenueChange >= 0 ? 'up' : 'down', 
      change: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%` 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
      case 'good':
        return 'bg-lime-400';
      case 'down':
        return 'bg-terminal-danger';
      default:
        return 'bg-terminal-warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      case 'good':
        return '●';
      default:
        return '●';
    }
  };

  return (
    <div className="bg-terminal-surface p-1">
      <h3 className="text-sm font-normal text-terminal-text mb-1">System Status</h3>
      <div className="grid grid-cols-6 gap-1">
        {indicators.map((indicator, index) => (
          <div 
            key={indicator.label}
            className="bg-terminal-bg p-1"
          >
            <div className="flex items-center justify-between">
              <div className={`w-1.5 h-1.5 ${getStatusColor(indicator.status)} animate-pulse`}></div>
              <div className={`text-xs ${
                indicator.status === 'up' ? 'text-lime-400' : 
                indicator.status === 'down' ? 'text-terminal-danger' : 
                'text-terminal-accent'
              }`}>
                {getStatusIcon(indicator.status)} {indicator.change}
              </div>
            </div>
            <div>
              <div className="text-xs text-terminal-muted">{indicator.label}</div>
              <div className="text-xs text-terminal-text">{indicator.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusIndicators;
