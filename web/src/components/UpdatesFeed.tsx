import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

const UpdatesFeed = () => {
  const [updates, setUpdates] = useState([
    { type: 'success', message: 'Auto-optimizer started - targeting max revenue', time: 'now' },
    { type: 'info', message: 'Inference priority locked at 70%', time: '1s ago' },
    { type: 'success', message: 'Connected to MARA API', time: '2s ago' },
    { type: 'info', message: 'All 8 agents initialized and ready', time: '3s ago' },
    { type: 'success', message: 'Market data sync active', time: '4s ago' },
    { type: 'info', message: 'Energy efficiency at 92%', time: '5s ago' },
  ]);

  const { data: statusData } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  // Add auto-optimization updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newUpdate = {
        type: 'success' as const,
        message: `Auto-optimization completed - allocation updated for max revenue`,
        time: 'now'
      };

      setUpdates(prev => {
        // Update times
        const updatedPrev = prev.map(update => {
          if (update.time === 'now') return { ...update, time: '30s ago' };
          if (update.time === '30s ago') return { ...update, time: '1m ago' };
          if (update.time === '1m ago') return { ...update, time: '90s ago' };
          return update;
        }).slice(0, 4); // Keep only 4 most recent

        return [newUpdate, ...updatedPrev];
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Add market updates when prices change
  useEffect(() => {
    if (statusData?.current_prices?.[0]) {
      const currentPrice = statusData.current_prices[0];
      
      const marketUpdate = {
        type: 'info' as const,
        message: `Market: Hash $${currentPrice.hash_price.toFixed(2)}, Token $${currentPrice.token_price.toFixed(2)}`,
        time: 'now'
      };

      setUpdates(prev => {
        const filtered = prev.filter(update => !update.message.startsWith('Market:'));
        const updatedPrev = filtered.map(update => {
          if (update.time === 'now') return { ...update, time: '30s ago' };
          return update;
        }).slice(0, 3);

        return [marketUpdate, ...updatedPrev];
      });
    }
  }, [statusData?.current_prices]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-terminal-success';
      case 'warning':
        return 'text-terminal-warning';
      case 'info':
        return 'text-terminal-accent';
      default:
        return 'text-terminal-text';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-terminal-text mb-4">System Updates</h3>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {updates.map((update, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 p-2 rounded hover:bg-terminal-border transition-colors animate-data-flow"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className={`mt-1 ${getTypeColor(update.type)}`}>
              {getTypeIcon(update.type)}
            </div>
            <div className="flex-1">
              <div className="text-sm text-terminal-text">{update.message}</div>
              <div className="text-xs text-terminal-muted font-mono">{update.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesFeed;
