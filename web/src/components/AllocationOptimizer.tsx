import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, AllocationRequest } from '../lib/api';

const AllocationOptimizer = () => {
  const [inferencePriority, setInferencePriority] = useState([0.8]);
  const [targetRevenue, setTargetRevenue] = useState('');
  const queryClient = useQueryClient();

  const optimizeMutation = useMutation({
    mutationFn: (request: AllocationRequest) => apiClient.optimizeAllocation(request),
  });

  const deployMutation = useMutation({
    mutationFn: (allocation: { [key: string]: number }) => apiClient.deployAllocation(allocation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status'] });
    },
  });

  const handleOptimize = () => {
    const request: AllocationRequest = {
      inference_priority: inferencePriority[0],
      target_revenue: targetRevenue ? parseFloat(targetRevenue) : undefined,
    };
    optimizeMutation.mutate(request);
  };

  const handleDeploy = () => {
    if (optimizeMutation.data?.allocation) {
      deployMutation.mutate(optimizeMutation.data.allocation);
    }
  };

  return (
    <Card className="bg-terminal-surface border-gray-700">
      <CardHeader>
        <CardTitle className="text-terminal-text">AI Allocation Optimizer</CardTitle>
        <CardDescription className="text-terminal-muted">
          Use AI to optimize resource allocation for maximum efficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inference Priority Slider */}
        <div className="space-y-2">
          <label className="text-sm text-terminal-text">
            Inference Priority: {(inferencePriority[0] * 100).toFixed(0)}%
          </label>
          <Slider
            value={inferencePriority}
            onValueChange={setInferencePriority}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-terminal-muted">
            <span>Mining Focus</span>
            <span>Inference Focus</span>
          </div>
        </div>

        {/* Target Revenue */}
        <div className="space-y-2">
          <label className="text-sm text-terminal-text">Target Revenue (Optional)</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={targetRevenue}
            onChange={(e) => setTargetRevenue(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
          />
        </div>

        {/* Optimize Button */}
        <Button
          onClick={handleOptimize}
          disabled={optimizeMutation.isPending}
          className="w-full"
        >
          {optimizeMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            'Optimize Allocation'
          )}
        </Button>

        {/* Results */}
        {optimizeMutation.data && (
          <div className="space-y-4 p-4 bg-gray-800 rounded border border-gray-600">
            <h4 className="text-terminal-text font-semibold">Optimization Results</h4>
            
            {/* Allocation Details */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(optimizeMutation.data.allocation).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-terminal-muted capitalize">
                    {key.replace('_', ' ')}:
                  </span>
                  <span className="text-terminal-text">{value}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                Revenue: ${optimizeMutation.data.expected_revenue.toFixed(0)}
              </Badge>
              <Badge variant="secondary">
                Cost: ${optimizeMutation.data.expected_cost.toFixed(0)}
              </Badge>
              <Badge variant="secondary">
                Efficiency: {optimizeMutation.data.efficiency_score.toFixed(1)}%
              </Badge>
            </div>

            {/* AI Reasoning */}
            <div className="space-y-2">
              <h5 className="text-sm text-terminal-text font-medium">AI Analysis:</h5>
              <p className="text-xs text-terminal-muted leading-relaxed">
                {optimizeMutation.data.reasoning}
              </p>
            </div>

            {/* Deploy Button */}
            <Button
              onClick={handleDeploy}
              disabled={deployMutation.isPending}
              variant="outline"
              className="w-full"
            >
              {deployMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                'Deploy to MARA'
              )}
            </Button>

            {deployMutation.isSuccess && (
              <div className="text-green-400 text-sm text-center">
                ✓ Allocation deployed successfully!
              </div>
            )}
          </div>
        )}

        {optimizeMutation.isError && (
          <div className="text-red-400 text-sm p-3 bg-red-900/20 rounded border border-red-700">
            Error: {optimizeMutation.error.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllocationOptimizer;