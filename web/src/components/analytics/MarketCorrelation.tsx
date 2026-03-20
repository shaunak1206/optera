import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ZAxis } from 'recharts';
import { btcData, inferenceData } from '../../lib/analyticsData';

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

  useEffect(() => {
    const data = btcData.map((btcPoint, index) => {
      const inferencePoint = inferenceData[index];
      
      if (inferencePoint) {
        return {
          btcPrice: btcPoint.Close,
          aiDemand: (inferencePoint.token_price / 4) * 100,
          energyCost: inferencePoint.energy_price,
          profit: inferencePoint.gpu_profit,
          switches: Math.floor(Math.random() * 15) + 5,
        };
      }
      return {
        btcPrice: btcPoint.Close,
        aiDemand: 50,
        energyCost: 0.05,
        profit: 100,
        switches: 10,
      };
    });
    
    setCorrelationData(data);
  }, []);

  if (!btcData || !inferenceData || btcData.length === 0 || inferenceData.length === 0) {
    return null;
  }

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