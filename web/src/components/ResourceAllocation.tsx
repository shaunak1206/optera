import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { apiClient, SiteStatus } from '../lib/api';

const ResourceAllocation = () => {
  const { data: statusData, isLoading } = useQuery({
    queryKey: ['status'],
    queryFn: () => apiClient.getStatus(),
    refetchInterval: 30000,
  });

  // Transform site status data for pie chart
  const transformAllocationData = (siteStatus: SiteStatus) => {
    const totalMiners = siteStatus.air_miners + siteStatus.hydro_miners + siteStatus.immersion_miners;
    const totalCompute = siteStatus.asic_compute + siteStatus.gpu_compute; 
    const total = totalMiners + totalCompute;

    if (total === 0) {
      return [
        { name: 'No Allocation', value: 100, color: '#6b7280' }
      ];
    }

    const data = [];
    
    if (totalMiners > 0) {
      const minersPercent = Math.round((totalMiners / total) * 100);
      data.push({ 
        name: `Miners (${totalMiners} units)`, 
        value: minersPercent, 
        color: '#f59e0b',
        details: {
          air: siteStatus.air_miners,
          hydro: siteStatus.hydro_miners,
          immersion: siteStatus.immersion_miners
        }
      });
    }

    if (siteStatus.asic_compute > 0) {
      const asicPercent = Math.round((siteStatus.asic_compute / total) * 100);
      data.push({ 
        name: `ASIC Compute (${siteStatus.asic_compute} units)`, 
        value: asicPercent, 
        color: '#3b82f6' 
      });
    }

    if (siteStatus.gpu_compute > 0) {
      const gpuPercent = Math.round((siteStatus.gpu_compute / total) * 100);
      data.push({ 
        name: `GPU Compute (${siteStatus.gpu_compute} units)`, 
        value: gpuPercent, 
        color: '#10b981' 
      });
    }

    return data;
  };

  const data = statusData?.site_status ? transformAllocationData(statusData.site_status) : [];
  const COLORS = data.map(item => item.color);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-terminal-surface p-3 border border-gray-600">
          <p className="text-white font-semibold">{`${payload[0].name}`}</p>
          <p className="text-terminal-muted text-sm">{`${payload[0].value}% of total allocation`}</p>
          {data.details && (
            <div className="mt-2 text-xs text-terminal-muted">
              <p>Air: {data.details.air} | Hydro: {data.details.hydro} | Immersion: {data.details.immersion}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-terminal-surface p-4 h-full flex items-center justify-center">
        <div className="text-terminal-muted">Loading allocation data...</div>
      </div>
    );
  }

  const totalPower = statusData?.site_status?.total_power_used || 0;
  const totalRevenue = statusData?.site_status?.total_revenue || 0;

  return (
    <div className="bg-terminal-surface p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-normal text-terminal-text">Resource Allocation</h3>
        <div className="text-xs text-terminal-muted">
          Power: {totalPower.toLocaleString()}W
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(163, 230, 53, 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-terminal-muted">{item.name}</span>
            </div>
            <span className="text-terminal-text font-mono">{item.value}%</span>
          </div>
        ))}
        <div className="mt-4 pt-2 border-t border-gray-700">
          <div className="text-xs text-terminal-muted">
            Total Revenue: ${totalRevenue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
