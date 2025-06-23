import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfitabilityTimeline from "@/components/analytics/ProfitabilityTimeline";
import MarketPerformanceMetrics from "@/components/analytics/MarketPerformanceMetrics";
import MarketCorrelation from "@/components/analytics/MarketCorrelation";
import SimulationSandbox from "@/components/analytics/SimulationSandbox";

const Analytics = () => {
  const [showProfit, setShowProfit] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showCorrelation, setShowCorrelation] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    setShowProfit(true);
  }, []);

  useEffect(() => {
    if (showProfit) {
      const t = setTimeout(() => setShowMetrics(true), 300);
      return () => clearTimeout(t);
    }
  }, [showProfit]);

  useEffect(() => {
    if (showMetrics) {
      const t = setTimeout(() => setShowCorrelation(true), 300);
      return () => clearTimeout(t);
    }
  }, [showMetrics]);

  useEffect(() => {
    if (showCorrelation) {
      const t = setTimeout(() => setShowSimulation(true), 300);
      return () => clearTimeout(t);
    }
  }, [showCorrelation]);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-normal text-white mb-4">Historical Analysis Dashboard</h2>
        <div className="space-y-6">
          {showProfit && <ProfitabilityTimeline />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {showMetrics && <MarketPerformanceMetrics />}
            {showCorrelation && <MarketCorrelation />}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-normal text-white mb-4">Advanced Simulation Engine</h2>
        {showSimulation && <SimulationSandbox />}
      </div>
    </div>
  );
};

export default Analytics; 