import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  AreaChart, Area
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

const SystemVisualizations = () => {
  const { data: statusData } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  // Derived mock data for the radar chart (Agent Health / System Metrics)
  const radarData = [
    { subject: 'Reliability', A: 98, fullMark: 100 },
    { subject: 'Compute', A: 85, fullMark: 100 },
    { subject: 'AI Inference', A: 92, fullMark: 100 },
    { subject: 'Market Alpha', A: 88, fullMark: 100 },
    { subject: 'Energy Eff.', A: 95, fullMark: 100 },
    { subject: 'Risk Mgmt', A: 90, fullMark: 100 },
  ];

  // Derived mock data for the composed chart (Energy vs Revenue)
  // Generating a 7-day trailing lookback to make the chart rich
  const composedData = Array.from({ length: 7 }).map((_, i) => ({
    name: `Day ${7 - i}`,
    revenue: 500000 + Math.random() * 200000, // $500k - $700k
    energyCost: 70000 + Math.random() * 30000, // $70k - $100k
    efficiency: 80 + Math.random() * 15, // 80 - 95%
  }));

  // Generating some fast moving telemetry stream 
  const telemetryData = Array.from({ length: 24 }).map((_, i) => {
    return {
      time: `${i}:00`,
      workload: Math.floor(60 + Math.random() * 40),
      network: Math.floor(40 + Math.random() * 60)
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      
      {/* 1. Radar Chart: System Capability Profile */}
      <Card className="bg-terminal-surface border-terminal-border col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-terminal-accent text-sm uppercase tracking-wider">System Capabilities</CardTitle>
          <CardDescription className="text-terminal-muted text-xs">Multi-agent functional index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="System" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', fontSize: '12px' }} 
                  itemStyle={{ color: '#22c55e' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2. Composed Chart: Revenue vs Cost Trajectory */}
      <Card className="bg-terminal-surface border-terminal-border col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-terminal-accent text-sm uppercase tracking-wider">Financial Output Trajectory (7-Day)</CardTitle>
          <CardDescription className="text-terminal-muted text-xs">Revenue vs Power Expenditure & Efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={composedData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={10} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#1a1a1a'}}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', fontSize: '12px' }} 
                  formatter={(value: number, name: string) => {
                    if (name === 'Efficiency') return [`${value.toFixed(1)}%`, name];
                    return [`$${value.toLocaleString()}`, name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#888' }} />
                
                <Bar yAxisId="left" name="Energy Cost" dataKey="energyCost" fill="#ef4444" radius={[2, 2, 0, 0]} maxBarSize={30} />
                <Area yAxisId="left" name="Revenue" type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRev)" strokeWidth={2} />
                <Line yAxisId="right" name="Efficiency" type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: '#22c55e' }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 3. Spline Area Chart: Micro-Telemetry Stream */}
      <Card className="bg-terminal-surface border-terminal-border col-span-1 md:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-terminal-accent text-sm uppercase tracking-wider">Network & Workload Telemetry (24H)</CardTitle>
          <CardDescription className="text-terminal-muted text-xs">High-frequency agent monitoring streams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#555" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', fontSize: '11px' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="workload" name="Compute Workload (PetaFLOPS)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorWorkload)" strokeWidth={2} />
                <Area type="monotone" dataKey="network" name="Network Bandwidth (Tbps)" stroke="#10b981" fillOpacity={1} fill="url(#colorNetwork)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default SystemVisualizations;
