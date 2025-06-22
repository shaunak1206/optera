import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfitabilityTimeline from "@/components/analytics/ProfitabilityTimeline";
import MarketPerformanceMetrics from "@/components/analytics/MarketPerformanceMetrics";
import MarketCorrelation from "@/components/analytics/MarketCorrelation";
import SimulationSandbox from "@/components/analytics/SimulationSandbox";

const Analytics = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-normal text-white mb-4">Historical Analysis Dashboard</h2>
        <div className="space-y-6">
          <ProfitabilityTimeline />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketPerformanceMetrics />
            <MarketCorrelation />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-normal text-white mb-4">Advanced Simulation Engine</h2>
        <SimulationSandbox />
      </div>
    </div>
  );
};

export default Analytics; 