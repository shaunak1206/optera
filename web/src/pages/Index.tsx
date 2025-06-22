import { useState } from "react";
import Navigation from "@/components/Navigation";
import TickerTape from "@/components/TickerTape";
import ProfitabilityChart from "@/components/ProfitabilityChart";
import ResourceAllocation from "@/components/ResourceAllocation";
import StatusIndicators from "@/components/StatusIndicators";
import UpdatesFeed from "@/components/UpdatesFeed";
import Chatbot from "@/components/Chatbot";
import AutoOptimizerStatus from "@/components/AutoOptimizerStatus";
import Intel from "@/pages/Intel";
import Analytics from "@/pages/Analytics";
import Agents from "@/pages/Agents";

const Dashboard = () => (
  <div className="p-6 space-y-4">
    {/* Main Dashboard Grid */}
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Resource Allocation and Updates */}
      <div className="col-span-3 space-y-6">
        <ResourceAllocation />
        <UpdatesFeed />
      </div>
      
      {/* Center Column - Main Chart (expanded) */}
      <div className="col-span-6">
        <ProfitabilityChart />
      </div>
      
      {/* Right Column - Chatbot and Auto Optimizer */}
      <div className="col-span-3 space-y-6">
        <AutoOptimizerStatus />
        <Chatbot />
      </div>
    </div>
    
    {/* Bottom Row - Status Indicators */}
    <div className="grid grid-cols-1">
      <StatusIndicators />
    </div>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Intel":
        return <Intel />;
      case "Analytics":
        return <Analytics />;
      case "Agents":
        return <Agents />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg terminal-grid">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <TickerTape />
      {renderContent()}
    </div>
  );
};

export default Index;
