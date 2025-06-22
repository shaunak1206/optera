import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AgentBehaviorSettings = () => {
  return (
    <Card className="bg-terminal-surface border-terminal-border h-full">
      <CardHeader>
        <CardTitle className="text-terminal-accent">Agent Behavior Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Decision Parameters */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Decision Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profit-threshold" className="text-sm text-terminal-muted">Min. Profit Threshold (%)</Label>
              <Input id="profit-threshold" type="number" defaultValue="15" className="bg-black border-terminal-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hysteresis-band" className="text-sm text-terminal-muted">Hysteresis Band (%)</Label>
              <Input id="hysteresis-band" type="number" defaultValue="2" className="bg-black border-terminal-border" />
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Risk Management</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-alloc" className="text-sm text-terminal-muted">Max. Allocation per Task (%)</Label>
              <Input id="max-alloc" type="number" defaultValue="70" className="bg-black border-terminal-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stop-loss" className="text-sm text-terminal-muted">Stop-Loss Trigger (%)</Label>
              <Input id="stop-loss" type="number" defaultValue="10" className="bg-black border-terminal-border" />
            </div>
          </div>
        </div>

        {/* Operational Constraints */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Operational Constraints</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="switch-delay" className="text-sm text-terminal-muted">Hardware Switch Delay (s)</Label>
              <Input id="switch-delay" type="number" defaultValue="30" className="bg-black border-terminal-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cooldown-period" className="text-sm text-terminal-muted">Cooldown Period (min)</Label>
              <Input id="cooldown-period" type="number" defaultValue="5" className="bg-black border-terminal-border" />
            </div>
          </div>
        </div>

        <Button className="w-full bg-terminal-accent text-black hover:bg-terminal-accent/90">Apply Settings</Button>
      </CardContent>
    </Card>
  );
};

export default AgentBehaviorSettings; 