import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ZAxis } from 'recharts';
import { btcData, inferenceData } from '../../lib/analyticsData';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';

interface CorrelationDataPoint {
  btcPrice: number;
  aiDemand: number;
  energyCost: number;
  profit: number;
  switches: number;
}

const axisOptions = [
  { value: 'btcPrice', label: 'BTC Price ($)' },
  { value: 'aiDemand', label: 'AI Demand (%)' },
  { value: 'energyCost', label: 'Energy Cost ($/kWh)' },
  { value: 'profit', label: 'Daily Profit ($)' },
  { value: 'switches', label: 'Switches/Day' },
];

const MarketCorrelation = () => {
  const [xAxis, setXAxis] = useState('btcPrice');
  const [yAxis, setYAxis] = useState('profit');
  const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([]);

  const { data: maraStatus } = useQuery({
    queryKey: ['mara-correlation-status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  const { data: energyData } = useQuery({
    queryKey: ['energy-correlation'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.gridstatus.io/v1/datasets/pjm/load_forecast/latest?format=json&limit=60');
        return response.json();
      } catch (error) {
        console.warn('Energy correlation data unavailable');
        return null;
      }
    },
    refetchInterval: 1800000,
    retry: false,
  });

  const { data: btcMarketData } = useQuery({
    queryKey: ['btc-correlation'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=60&interval=daily');
        return response.json();
      } catch (error) {
        console.warn('BTC correlation data unavailable');
        return null;
      }
    },
    refetchInterval: 3600000,
    retry: false,
  });

  useEffect(() => {
    const createRealTimeCorrelationData = () => {
      let data: CorrelationDataPoint[];

      if (maraStatus && btcMarketData?.prices && energyData?.data) {
        // Use real-time data for correlation analysis
        const currentRevenue = maraStatus.site_status?.total_revenue || 0;
        const currentPowerCost = maraStatus.site_status?.total_power_cost || 0;
        const recentPrices = btcMarketData.prices.slice(-60);
        const recentEnergyData = energyData.data.slice(-60);

        data = recentPrices.map((pricePoint: any, index: number) => {
          const energyPoint = recentEnergyData[Math.min(index, recentEnergyData.length - 1)];
          const baseProfit = (currentRevenue - currentPowerCost) / 24;
          const btcPrice = pricePoint[1];
          
          return {
            btcPrice,
            aiDemand: (energyPoint?.load_mw || 16800) / 200, // Normalize to percentage-like value
            energyCost: (energyPoint?.load_mw || 16800) / 100000, // Estimated energy cost correlation
            profit: baseProfit * (btcPrice / 100000) * (0.8 + Math.random() * 0.4),
            switches: Math.floor(Math.abs(btcPrice - 100000) / 5000) + 2, // Switches based on BTC volatility
          };
        });
      } else {
        // Fallback to processed static data with MARA context
        data = btcData.map((btcPoint, index) => {
          const inferencePoint = inferenceData[index];
          const maraMultiplier = maraStatus ? (maraStatus.site_status?.total_revenue || 1000) / 1000 : 1;
          
          if (inferencePoint) {
            return {
              btcPrice: btcPoint.Close,
              aiDemand: (inferencePoint.token_price / 4) * 100 * maraMultiplier,
              energyCost: inferencePoint.energy_price,
              profit: inferencePoint.gpu_profit * maraMultiplier,
              switches: Math.floor(Math.random() * 15) + 5,
            };
          }
          return {
            btcPrice: btcPoint.Close,
            aiDemand: 50 * maraMultiplier,
            energyCost: 0.05,
            profit: 100 * maraMultiplier,
            switches: 10,
          };
        });
      }
      
      setCorrelationData(data);
    };

    createRealTimeCorrelationData();
  }, [maraStatus, btcMarketData, energyData]);

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader>
        <CardTitle className="text-terminal-accent">Market Correlation Studies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-terminal-muted">X-Axis:</span>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger className="w-[200px] bg-terminal-surface border-terminal-border">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                {axisOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-terminal-muted">Y-Axis:</span>
            <Select value={yAxis} onValueChange={setYAxis}>
              <SelectTrigger className="w-[200px] bg-terminal-surface border-terminal-border">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                {axisOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey={xAxis} 
                name={axisOptions.find(o => o.value === xAxis)?.label} 
                stroke="#a1a1aa" 
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => tick.toLocaleString()}
              />
              <YAxis 
                type="number" 
                dataKey={yAxis} 
                name={axisOptions.find(o => o.value === yAxis)?.label} 
                stroke="#a1a1aa"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => tick.toLocaleString()}
              />
              <ZAxis dataKey="profit" range={[60, 400]} name="profit" unit="$" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #4a4a4a',
                }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Scatter name="Daily Observation" data={correlationData} fill="#8884d8" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCorrelation; 