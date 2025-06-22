import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const HardwareConfig = () => {
  return (
    <Card className="bg-terminal-surface border-terminal-border h-full">
      <CardHeader>
        <CardTitle className="text-terminal-accent">Hardware Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* GPU/ASIC Ratio */}
        <div className="space-y-4">
          <Label className="text-sm text-terminal-muted">GPU / ASIC Ratio</Label>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-white">GPU</span>
            <Slider defaultValue={[60]} max={100} step={1} />
            <span className="text-xs font-mono text-white">ASIC</span>
          </div>
        </div>

        {/* Power Constraint */}
        <div className="space-y-2">
            <Label htmlFor="power-limit" className="text-sm text-terminal-muted">Power Constraint (kW)</Label>
            <Input id="power-limit" type="number" defaultValue="1500" className="bg-black border-terminal-border" />
        </div>
        
        {/* Cooling Capacity */}
        <div className="space-y-2">
            <Label htmlFor="cooling-capacity" className="text-sm text-terminal-muted">Cooling Capacity (BTU/hr)</Label>
            <Input id="cooling-capacity" type="number" defaultValue="50000" className="bg-black border-terminal-border" />
        </div>

        <Button className="w-full bg-terminal-accent text-black hover:bg-terminal-accent/90">Apply Hardware Profile</Button>

      </CardContent>
    </Card>
  );
};

export default HardwareConfig; 