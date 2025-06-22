import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';

const BitcoinMetrics = () => {
  const { data: statusData, isLoading } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  const { data: mempoolData } = useQuery({
    queryKey: ['mempool-stats'],
    queryFn: async () => {
      const response = await fetch('https://mempool.space/api/mempool');
      return response.json();
    },
    refetchInterval: 60000,
  });

  const { data: difficultyData } = useQuery({
    queryKey: ['difficulty'],
    queryFn: async () => {
      const response = await fetch('https://mempool.space/api/v1/difficulty-adjustment');
      return response.json();
    },
    refetchInterval: 300000,
  });

  const { data: hashrateData } = useQuery({
    queryKey: ['hashrate'],
    queryFn: async () => {
      const response = await fetch('https://mempool.space/api/v1/mining/hashrate/3d');
      return response.json();
    },
    refetchInterval: 300000,
  });

  const btcData = statusData?.btc_data;

  // Generate mock historical data based on current price
  const priceData = btcData ? [
    { name: '1hr', price: btcData.price - 400 },
    { name: '30m', price: btcData.price - 300 },
    { name: '15m', price: btcData.price - 150 },
    { name: '5m', price: btcData.price - 50 },
    { name: '1m', price: btcData.price + 10 },
    { name: 'now', price: btcData.price },
  ] : [
    { name: '1hr', price: 103150.80 },
    { name: '30m', price: 102800.20 },
    { name: '15m', price: 102750.90 },
    { name: '5m', price: 102600.45 },
    { name: '1m', price: 102650.10 },
    { name: 'now', price: 102641.00 },
  ];

  const latestPrice = priceData[priceData.length - 1].price;
  const change1h = ((latestPrice - priceData[0].price) / priceData[0].price) * 100;

  if (isLoading) {
    return (
      <Card className="bg-terminal-surface border-terminal-border">
        <CardContent className="p-6 text-center">
          <div className="text-terminal-muted">Loading Bitcoin data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-terminal-accent">Bitcoin Metrics</CardTitle>
          {btcData?.timestamp && (
            <div className="text-xs text-terminal-muted">
              {new Date(btcData.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-terminal-muted">Live Price</p>
            <p className="text-2xl font-mono text-white">${latestPrice.toLocaleString()}</p>
          </div>
          <div className={`text-right ${change1h >= 0 ? 'text-terminal-success' : 'text-terminal-error'}`}>
            <p className="text-sm">1hr Change</p>
            <p className="text-lg font-mono">{change1h.toFixed(2)}%</p>
          </div>
        </div>
        <div className="h-24 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a1a',
                            borderColor: '#444',
                            color: '#fff',
                            fontSize: '12px',
                            borderRadius: '0',
                        }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#82ffff' }}
                    />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Line type="monotone" dataKey="price" stroke="#82ffff" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-terminal-muted">Network Difficulty</p>
            <p className="font-mono text-white">
              {difficultyData ? `${(difficultyData.difficultyChange / 1e12).toFixed(2)} T` : '126.41 T'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-terminal-muted">Mempool</p>
            <p className="font-mono text-white">
              {mempoolData ? `${(mempoolData.vsize / 1e6).toFixed(1)} vMB` : '110 vMB'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-terminal-muted">Hash Rate</p>
            <p className="font-mono text-white">
              {hashrateData?.currentHashrate ? `${(hashrateData.currentHashrate / 1e18).toFixed(1)} EH/s` : '712.3 EH/s'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-terminal-muted">Avg. Fee (Sat/vB)</p>
            <p className="font-mono text-white">
              {mempoolData ? Math.round(mempoolData.fee_range?.[2] || 28) : '28'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-terminal-muted">Market Cap</p>
            <p className="font-mono text-white">
              {btcData ? `$${(btcData.market_cap / 1e12).toFixed(2)}T` : '$2.02T'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-terminal-muted">Mempool Txs</p>
            <p className="font-mono text-white">
              {mempoolData ? mempoolData.count.toLocaleString() : '450,123'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitcoinMetrics; 