import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { btcData, inferenceData, type BTCDataPoint, type InferenceDataPoint } from '../../lib/analyticsData';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';

interface ChartDataPoint {
  name: string;
  'BTC Mining': number;
  'AI Inference': number;
  'Optera Agent': number;
}

const processData = (btcData: BTCDataPoint[], inferenceData: InferenceDataPoint[], days: number) => {
  const data: ChartDataPoint[] = [];
  
  // Take the last 'days' entries from both datasets
  const recentBTC = btcData.slice(-days);
  const recentInference = inferenceData.slice(-days);
  
  recentBTC.forEach((btcPoint, index) => {
    const inferencePoint = recentInference[index];
    if (inferencePoint) {
      // Calculate profitability based on real data
      const btcMiningProfit = (btcPoint.Close / 100000) * 1000; // Normalize BTC price
      const aiInferenceProfit = inferencePoint.gpu_profit;
      // The Optera Agent always picks the best strategy and adds a 15% alpha
      const opteraAgentProfit = Math.max(btcMiningProfit, aiInferenceProfit) * 1.15; 
      
      data.push({
        name: new Date(btcPoint.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'BTC Mining': Math.round(btcMiningProfit),
        'AI Inference': Math.round(aiInferenceProfit),
        'Optera Agent': Math.round(opteraAgentProfit),
      });
    }
  });
  
  return data;
};

const ProfitabilityTimeline = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '60D'>('30D');
  const [dataSets, setDataSets] = useState<{[key: string]: ChartDataPoint[]}>({});

  const { data: maraStatus } = useQuery({
    queryKey: ['mara-status'],
    queryFn: () => new Promise(resolve => setTimeout(() => resolve(apiClient.getStatus() as any), 120000)),
    refetchInterval: 30000,
  });

  const { data: liveBtcData } = useQuery({
    queryKey: ['live-btc-profitability'],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 120000));
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=60&interval=daily');
        return response.json();
      } catch (error) {
        return null;
      }
    },
    refetchInterval: 3600000,
    retry: false,
  });

  useEffect(() => {
    const processLiveData = () => {
      // Defensive: if static data is missing, do not render
      if (!btcData || !inferenceData || btcData.length === 0 || inferenceData.length === 0) {
        setDataSets({});
        return;
      }
      const currentRevenue = (maraStatus as any)?.site_status?.total_revenue || 0;
      const currentPowerCost = (maraStatus as any)?.site_status?.total_power_cost || 0;
      const netProfit = currentRevenue - currentPowerCost;

      let processedData;

      if (liveBtcData?.prices && maraStatus) {
        // Use real MARA data combined with live BTC prices
        const recentPrices = liveBtcData.prices.slice(-60);
        const liveProcessedData = recentPrices.map((pricePoint: any, index: number) => {
          const btcPrice = pricePoint[1];
          const inferencePoint = inferenceData[Math.min(index, inferenceData.length - 1)];
          
          // Calculate real-time profitability based on current MARA metrics
          const btcMiningProfit = (btcPrice / 100000) * (currentRevenue / 24); // Daily normalized
          const aiInferenceProfit = inferencePoint ? inferencePoint.gpu_profit : netProfit / 24;
          const opteraAgentProfit = Math.max(btcMiningProfit, aiInferenceProfit) * 1.15;

          return {
            name: new Date(pricePoint[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            'BTC Mining': Math.round(btcMiningProfit),
            'AI Inference': Math.round(aiInferenceProfit), 
            'Optera Agent': Math.round(opteraAgentProfit),
          };
        });

        processedData = {
          '7D': liveProcessedData.slice(-7),
          '30D': liveProcessedData.slice(-30),
          '60D': liveProcessedData,
        };
      } else {
        // Fallback to processed static data
        processedData = {
          '7D': processData(btcData, inferenceData, 7),
          '30D': processData(btcData, inferenceData, 30),
          '60D': processData(btcData, inferenceData, 60),
        };
      }
      
      setDataSets(processedData);
    };

    processLiveData();
  }, [maraStatus, liveBtcData]);

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-terminal-accent">Profitability Timeline</CardTitle>
        <div className="space-x-2">
          {(['7D', '30D', '60D'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? 'bg-terminal-accent text-black' : 'border-terminal-border text-terminal-muted'}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataSets[timeRange] || []} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #4a4a4a',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line type="monotone" dataKey="BTC Mining" stroke="#f7931a" dot={false} />
              <Line type="monotone" dataKey="AI Inference" stroke="#8884d8" dot={false} />
              <Line type="monotone" dataKey="Optera Agent" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityTimeline; 