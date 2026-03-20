import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Zap, Server, ShieldCheck, Activity, BarChart3, LineChart, Cpu, ArrowRight, TrendingUp, Lock, RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigateTo = (tabName: string) => {
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach((btn) => {
      if (btn.textContent === tabName) {
        (btn as HTMLButtonElement).click();
      }
    });
  };

  return (
    <div className="p-6 h-[calc(100vh-140px)] flex flex-col space-y-4">
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Optera Intelligence Platform</h2>
          <p className="text-terminal-accent text-sm font-mono">Autonomous Resource Allocation System</p>
        </div>
      </div>

      {/* Main Horizontal Grid - Fill the screen */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        
        {/* Left Column: Explanations (Span 4) */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
          <Card className="bg-terminal-surface border-terminal-border shadow-lg flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-accent flex items-center gap-2 text-xl">
                <BrainCircuit className="w-5 h-5" />
                What is Optera?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3 text-sm leading-relaxed">
              <p>
                Think of Optera like a super-smart factory manager. The factory is filled with thousands of powerful computers. 
              </p>
              <p>
                Sometimes, the most profitable thing to do is use those computers to mine <strong>Bitcoin</strong>. Other times, companies will pay massive premiums to rent those same computers to run their <strong>Artificial Intelligence</strong> models.
              </p>
              <p>
                Optera is an AI brain that constantly watches the global markets. The moment it becomes more profitable to run AI instead of mining Bitcoin, Optera automatically pulls the switches and moves the computers to the new job. No human needs to click a button.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-terminal-surface border-terminal-border shadow-lg flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-accent flex items-center gap-2 text-xl">
                <Server className="w-5 h-5" />
                How it Works
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3 text-sm leading-relaxed">
              <p>
                Behind the scenes, Optera isn't just one program—it's a team of eight different AI "Agents" working together.
              </p>
              <p>
                One agent watches the price of electricity. Another watches the Bitcoin market. Another calculates the risk of breaking the machines.
              </p>
              <p>
                Every 30 seconds, the "Boss" agent looks at all their reports and makes a final decision on how to split up the computers to ensure maximum profit.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Center Column: Core Capabilities & Stats (Span 5) */}
        <div className="col-span-5 flex flex-col gap-4">
          <Card className="bg-terminal-surface border-terminal-border flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Core Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
              <div className="grid grid-cols-2 gap-3 pb-2">
                {[
                  { icon: Zap, title: "Energy Forecasting", desc: "Predicts grid demand and pricing anomalies." },
                  { icon: BarChart3, title: "Market Alpha", desc: "Monitors BTC mempool and token liquidity." },
                  { icon: ShieldCheck, title: "Risk Mitigation", desc: "Quantifies multi-vector operational risk." },
                  { icon: Activity, title: "Live Telemetry", desc: "Tracks thousands of operational metrics." },
                  { icon: RefreshCw, title: "Automated Resourcing", desc: "Executes physical hardware transitions autonomously." },
                  { icon: TrendingUp, title: "Yield Optimization", desc: "Continuously rebalances workloads for peak return." },
                  { icon: Globe, title: "Sentiment Analysis", desc: "Analyzes social and news feeds to predict swings." },
                  { icon: Lock, title: "Security Posture", desc: "Monitors network integrity across data centers." }
                ].map((feature, i) => (
                  <div key={i} className="bg-terminal-bg border border-terminal-border rounded-lg p-3 flex flex-col gap-1.5 h-auto">
                    <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-terminal-border">
                      <feature.icon className="w-3.5 h-3.5 text-terminal-accent" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-xs text-terminal-muted leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Scale Statistics */}
          <Card className="bg-black border-terminal-border flex-shrink-0">
            <CardContent className="p-4">
              <h3 className="text-terminal-muted uppercase tracking-widest text-[10px] font-bold mb-3">System Operating Scale</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-xl font-mono text-white">475<span className="text-terminal-accent text-sm">MW</span></div>
                  <div className="text-[10px] text-terminal-muted leading-tight mt-1">Total Power Managed</div>
                </div>
                <div>
                  <div className="text-xl font-mono text-white">28<span className="text-terminal-accent text-sm">.4</span></div>
                  <div className="text-[10px] text-terminal-muted leading-tight mt-1">Total EH/s</div>
                </div>
                <div>
                  <div className="text-xl font-mono text-white">3<span className="text-terminal-accent text-sm">.2M</span></div>
                  <div className="text-[10px] text-terminal-muted leading-tight mt-1">Decisions / Day</div>
                </div>
                <div>
                  <div className="text-xl font-mono text-white">99<span className="text-terminal-accent text-sm">.9%</span></div>
                  <div className="text-[10px] text-terminal-muted leading-tight mt-1">Uptime SLA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Explore Platform (Span 3) */}
        <div className="col-span-3">
          <Card className="bg-terminal-surface border-terminal-border h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Explore Platform</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4 hover:border-terminal-accent transition-colors cursor-pointer group flex-1 flex flex-col" onClick={() => navigateTo('Dashboard')}>
                <Activity className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm text-white mb-1">Live Dashboard</h4>
                <p className="text-xs text-terminal-muted flex-1">Watch the system actively moving resources in real-time.</p>
                <div className="text-blue-400 text-xs flex items-center gap-1 mt-2 font-semibold">View <ArrowRight className="w-3 h-3" /></div>
              </div>

              <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4 hover:border-terminal-accent transition-colors cursor-pointer group flex-1 flex flex-col" onClick={() => navigateTo('Agents')}>
                <Cpu className="w-6 h-6 text-lime-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm text-white mb-1">Agent Console</h4>
                <p className="text-xs text-terminal-muted flex-1">Read the live thought-process of all 8 AI agents.</p>
                <div className="text-lime-400 text-xs flex items-center gap-1 mt-2 font-semibold">View <ArrowRight className="w-3 h-3" /></div>
              </div>

              <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4 hover:border-terminal-accent transition-colors cursor-pointer group flex-1 flex flex-col" onClick={() => navigateTo('Analytics')}>
                <LineChart className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm text-white mb-1">Simulation Sandbox</h4>
                <p className="text-xs text-terminal-muted flex-1">Run "what-if" scenarios across varying market conditions.</p>
                <div className="text-purple-400 text-xs flex items-center gap-1 mt-2 font-semibold">View <ArrowRight className="w-3 h-3" /></div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default About;
