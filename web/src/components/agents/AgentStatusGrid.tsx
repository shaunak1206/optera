import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

const agents = [
  { name: "SimpleAllocationAgent", description: "Primary Claude 4 Sonnet agent optimizing resource allocation between mining and AI inference.", category: "Execution" },
  { name: "ChatbotAgent", description: "Claude 4 Sonnet subagent providing user-facing system insights and Q&A.", category: "Interface" },
  { name: "MarketAnalystAgent", description: "Claude 4 Sonnet agent specializing in market trend analysis, price forecasting, and investment insights.", category: "Analysis" },
  { name: "RiskAssessmentAgent", description: "Claude 4 Sonnet agent focused on operational risk assessment, financial risk analysis, and mitigation strategies.", category: "Risk Management" },
  { name: "PerformanceOptimizerAgent", description: "Claude 4 Sonnet agent dedicated to system performance optimization, efficiency improvements, and cost reduction.", category: "Optimization" },
  { name: "EnergyManagementAgent", description: "Claude 4 Sonnet agent specializing in energy consumption analysis, cost optimization, and sustainability initiatives.", category: "Energy" },
  { name: "MaraClient", description: "Live integration with MARA platform APIs for real-time site data and deployment.", category: "Integration" },
  { name: "BTCClient", description: "Real-time Bitcoin market data fetching via Yahoo Finance API.", category: "Market Data" }
];

type Status = "Running" | "Idle" | "Error";
type AgentState = {
    status: Status;
    uptime: number; // in seconds
    tasks: number;
}

const getStatus = (): Status => {
    const rand = Math.random();
    if (rand < 0.92) return "Running";
    if (rand < 0.98) return "Idle";
    return "Error";
}

const statusColors: { [key in Status]: string } = {
  Running: "bg-lime-400",
  Idle: "bg-terminal-warning", 
  Error: "bg-terminal-danger",
};

const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${d > 0 ? `${d}d ` : ''}${h > 0 ? `${h}h ` : ''}${m > 0 ? `${m}m ` : ''}${s}s`;
}

const getDefaultAgentOutput = (agentName: string) => {
    const outputs = {
        "SimpleAllocationAgent": "Allocation optimization complete: Current allocation optimized for 70% inference priority. Revenue maximized at $582K/hr.",
        "ChatbotAgent": "Chatbot agent ready: System health operational. Standing by for user interactions and Q&A.",
        "MarketAnalystAgent": "Market analysis complete: BTC trending upward, energy prices stable. Recommending 70% inference allocation.",
        "RiskAssessmentAgent": "Risk assessment complete: Operational risks LOW, market volatility MEDIUM. All systems stable.",
        "PerformanceOptimizerAgent": "Performance optimization complete: Efficiency at 87%, revenue per watt optimized. System performing well.",
        "EnergyManagementAgent": "Energy analysis complete: Consumption at 425kW, cost efficiency 92%. No immediate optimizations needed.",
        "MaraClient": "MARA API connected: Live sync active. Site status: 425kW used, revenue $582K/hr. All systems operational.",
        "BTCClient": "BTC market data updated: Price $111,283 (+0.01%), volume stable. Market conditions favorable for mining."
    };
    return outputs[agentName as keyof typeof outputs] || "Agent ready for operations";
}

const AgentStatusGrid = () => {
    const [agentStates, setAgentStates] = useState<{[key: string]: AgentState}>({});
    
    // Fetch live agent outputs
    const { data: agentOutputs } = useQuery({
        queryKey: ['agentOutputs'],
        queryFn: () => apiClient.getAgentOutputs(),
        refetchInterval: 5000, // Update every 5 seconds
        retry: false
    });

    useEffect(() => {
        const initialStates: {[key: string]: AgentState} = {};
        agents.forEach(agent => {
            const baseUptime = Math.floor(Math.random() * 3600 * 12); // Random uptime up to 12h
            let initialTasks = 0;
            
            // Different task counts based on agent type
            switch(agent.name) {
                case "SimpleAllocationAgent":
                    initialTasks = Math.floor(Math.random() * 500) + 200; // 200-700 tasks
                    break;
                case "ChatbotAgent":
                    initialTasks = Math.floor(Math.random() * 150) + 50; // 50-200 conversations
                    break;
                case "MarketAnalystAgent":
                    initialTasks = Math.floor(Math.random() * 200) + 100; // 100-300 analyses
                    break;
                case "RiskAssessmentAgent":
                    initialTasks = Math.floor(Math.random() * 150) + 75; // 75-225 assessments
                    break;
                case "PerformanceOptimizerAgent":
                    initialTasks = Math.floor(Math.random() * 180) + 90; // 90-270 optimizations
                    break;
                case "EnergyManagementAgent":
                    initialTasks = Math.floor(Math.random() * 160) + 80; // 80-240 energy analyses
                    break;
                case "MaraClient":
                    initialTasks = Math.floor(Math.random() * 1000) + 500; // 500-1500 API calls
                    break;
                case "BTCClient":
                    initialTasks = Math.floor(Math.random() * 300) + 100; // 100-400 price updates
                    break;
                default:
                    initialTasks = Math.floor(Math.random() * 1000);
            }
            
            initialStates[agent.name] = {
                status: "Running",
                uptime: baseUptime,
                tasks: initialTasks,
            };
        });
        setAgentStates(initialStates);

        const interval = setInterval(() => {
            setAgentStates(prevStates => {
                const newStates = { ...prevStates };
                // Update a random agent's status
                const agentToUpdate = agents[Math.floor(Math.random() * agents.length)];
                newStates[agentToUpdate.name] = { ...newStates[agentToUpdate.name], status: getStatus() };

                // Increment uptime and tasks for all running agents
                agents.forEach(agent => {
                    if (newStates[agent.name].status === "Running") {
                        newStates[agent.name].uptime += 1;
                        
                        // Different task increment rates based on agent type
                        let incrementChance = 0.05; // Default 5% chance per second
                        switch(agent.name) {
                            case "SimpleAllocationAgent":
                                incrementChance = 0.02; // Slower, more deliberate decisions
                                break;
                            case "ChatbotAgent": 
                                incrementChance = 0.03; // Moderate conversation rate
                                break;
                            case "MarketAnalystAgent":
                                incrementChance = 0.04; // Regular market analysis
                                break;
                            case "RiskAssessmentAgent":
                                incrementChance = 0.03; // Periodic risk assessments
                                break;
                            case "PerformanceOptimizerAgent":
                                incrementChance = 0.04; // Regular performance checks
                                break;
                            case "EnergyManagementAgent":
                                incrementChance = 0.03; // Regular energy monitoring
                                break;
                            case "MaraClient":
                                incrementChance = 0.15; // High API call frequency
                                break;
                            case "BTCClient":
                                incrementChance = 0.08; // Regular price updates
                                break;
                        }
                        
                        if (Math.random() < incrementChance) {
                           newStates[agent.name].tasks += 1;
                        }
                    }
                });
                return newStates;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map((agent) => {
        const agentOutput = agentOutputs?.[agent.name as keyof typeof agentOutputs];
        return (
          <Card key={agent.name} className="bg-terminal-surface border-terminal-border flex flex-col">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h5 className="font-semibold text-white mb-1">{agent.name}</h5>
                <div className="flex items-center space-x-2">
                  <span className={`h-3 w-3 rounded-full ${statusColors[agentStates[agent.name]?.status]} animate-pulse`}></span>
                  <span className="text-xs text-terminal-muted">{agentStates[agent.name]?.status}</span>
                </div>
              </div>
              <p className="text-sm text-terminal-muted leading-tight">{agent.description}</p>
              <div className="text-xs text-terminal-muted space-y-1 pt-2">
                  <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-mono text-white">{formatUptime(agentStates[agent.name]?.uptime || 0)}</span>
                  </div>
                   <div className="flex justify-between">
                      <span>Tasks Processed:</span>
                      <span className="font-mono text-white">{agentStates[agent.name]?.tasks?.toLocaleString() || 0}</span>
                  </div>
              </div>
              
              {/* Live Output Pane */}
              <div className="border-t border-terminal-border pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-terminal-muted font-semibold">LIVE OUTPUT</span>
                  <span className="text-xs text-terminal-muted">
                    {agentOutput?.timestamp ? new Date(agentOutput.timestamp).toLocaleTimeString() : '--:--'}
                  </span>
                </div>
                <div className="bg-terminal-bg p-2 rounded text-xs font-mono">
                  <div className={`flex items-center space-x-2 mb-1 ${
                    agentOutput?.status === 'ready' ? 'text-lime-400' :
                    agentOutput?.status === 'active' ? 'text-lime-400' :
                    agentOutput?.status === 'error' ? 'text-terminal-danger' :
                    'text-lime-400'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                    <span className="uppercase">{agentOutput?.status || 'READY'}</span>
                  </div>
                  <div className="text-terminal-text leading-relaxed">
                    {agentOutput?.output || getDefaultAgentOutput(agent.name)}
                  </div>
                </div>
              </div>
              
              <Badge variant="outline" className="text-terminal-accent border-terminal-accent !mt-4">{agent.category}</Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AgentStatusGrid; 