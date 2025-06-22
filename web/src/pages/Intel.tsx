import BitcoinMetrics from "@/components/intel/BitcoinMetrics";
import AiMarketIndicators from "@/components/intel/AiMarketIndicators";
import EnergyMarketData from "@/components/intel/EnergyMarketData";
import ForecastingModels from "@/components/intel/ForecastingModels";
import RiskAssessment from "@/components/intel/RiskAssessment";

const Intel = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-normal text-white">Market Intelligence Console</h2>
      
      {/* Price Discovery Engine Section */}
      <div>
        <h3 className="text-xl font-normal text-terminal-accent mb-4">Price Discovery Engine</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BitcoinMetrics />
          <AiMarketIndicators />
          <EnergyMarketData />
        </div>
      </div>

      {/* Predictive Analytics Section */}
      <div>
        <h3 className="text-xl font-normal text-terminal-accent mb-4">Predictive Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ForecastingModels />
          </div>
          <div className="lg:col-span-2">
            <RiskAssessment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intel; 