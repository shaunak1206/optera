import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const demandData = [
    { name: '00:00', demand: 120 },
    { name: '04:00', demand: 110 },
    { name: '08:00', demand: 150 },
    { name: '12:00', demand: 180 },
    { name: '16:00', demand: 190 },
    { name: '20:00', demand: 160 },
];

const EnergyMarketData = () => {
  const { data: gridData } = useQuery({
    queryKey: ['grid-status'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.gridstatus.io/v1/datasets/pjm/load_forecast/latest?format=json', {
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Grid API failed');
        return response.json();
      } catch (error) {
        console.warn('Grid API unavailable, using mock data');
        return null;
      }
    },
    refetchInterval: 300000,
    retry: false,
  });

  const { data: carbonData } = useQuery({
    queryKey: ['carbon-intensity'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.carbonintensity.org.uk/intensity');
        if (!response.ok) throw new Error('Carbon API failed');
        return response.json();
      } catch (error) {
        console.warn('Carbon API unavailable, using mock data');
        return null;
      }
    },
    refetchInterval: 600000,
    retry: false,
  });

  const currentDemand = gridData?.data?.[0]?.load_mw || 16800;
  const currentIntensity = carbonData?.data?.[0]?.intensity?.actual || 150;
  const renewablePercent = Math.max(0, 100 - (currentIntensity / 500) * 100).toFixed(0);

  const realTimeData = gridData?.data?.slice(0, 6).map((item: any, index: number) => ({
    name: new Date(item.interval_start_utc).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    demand: Math.round(item.load_mw / 1000)
  })) || demandData;

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader>
        <CardTitle className="text-terminal-accent">Energy Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="space-y-1">
                <p className="text-terminal-muted">Regional Price</p>
                <p className="font-mono text-white">$0.038/kWh</p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Grid Demand</p>
                <p className="font-mono text-white">{(currentDemand / 1000).toFixed(1)} GW</p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Renewable Availability</p>
                <p className="font-mono text-terminal-success">{renewablePercent}%</p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Schedule</p>
                <p className="font-mono text-terminal-warning">
                  {new Date().getHours() >= 16 && new Date().getHours() <= 20 ? 'Peak' : 'Off-Peak'}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Carbon Intensity</p>
                <p className="font-mono text-white">{(currentIntensity / 1000).toFixed(3)} kgCO₂/kWh</p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Price Volatility</p>
                <p className="font-mono text-terminal-success">
                  {currentIntensity > 200 ? 'High' : 'Low'}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Grid Frequency</p>
                <p className="font-mono text-white">59.98 Hz</p>
            </div>
            <div className="space-y-1">
                <p className="text-terminal-muted">Total Generation</p>
                <p className="font-mono text-white">{((currentDemand + 400) / 1000).toFixed(1)} GW</p>
            </div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realTimeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1a1a1a',
                        borderColor: '#444',
                        color: '#fff',
                        fontSize: '12px',
                        borderRadius: '0',
                    }}
                />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Area type="monotone" dataKey="demand" stroke="#ffc658" fillOpacity={1} fill="url(#colorDemand)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyMarketData; 