import { useAutoOptimizer } from '../hooks/useAutoOptimizer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Brain, TrendingUp } from 'lucide-react';

const AutoOptimizerStatus = () => {
  const { isOptimizing, isDeploying, lastOptimization, error } = useAutoOptimizer();

  const isActive = isOptimizing || isDeploying;

  return (
    <Card className="bg-terminal-surface border-gray-700 h-64">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-terminal-text flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Auto Optimizer
          </CardTitle>
          <Badge variant={isActive ? "default" : "secondary"} className="flex items-center gap-1">
            {isActive ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                {isOptimizing ? 'Optimizing' : 'Deploying'}
              </>
            ) : (
              <>
                <TrendingUp className="h-3 w-3" />
                Active
              </>
            )}
          </Badge>
        </div>
        <CardDescription className="text-terminal-muted">
          Auto-optimizing for maximum revenue every 30s
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 h-[calc(100%-120px)] flex flex-col">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-terminal-muted">Inference Priority:</span>
            <div className="text-terminal-text font-mono">70%</div>
          </div>
          <div>
            <span className="text-terminal-muted">Strategy:</span>
            <div className="text-terminal-text font-mono">Max Revenue</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
          {lastOptimization && (
            <div className="space-y-2 p-3 bg-gray-800 rounded border border-gray-600">
              <h5 className="text-sm text-terminal-text font-medium">Last Optimization:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-terminal-muted">Expected Revenue:</span>
                  <div className="text-green-400 font-mono">
                    ${lastOptimization.expected_revenue.toFixed(0)}
                  </div>
                </div>
                <div>
                  <span className="text-terminal-muted">Efficiency:</span>
                  <div className="text-blue-400 font-mono">
                    {lastOptimization.efficiency_score.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="text-xs text-terminal-muted break-words">
                Current allocation: {Object.entries(lastOptimization.allocation)
                  .filter(([_, value]) => value > 0)
                  .map(([key, value]) => `${key.replace('_', ' ')}: ${value}`)
                  .join(', ')}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-xs p-2 bg-red-900/20 rounded border border-red-700 break-words">
              Error: {error.message}
            </div>
          )}

          {!lastOptimization && !error && (
            <div className="text-center text-terminal-muted text-sm py-8">
              Waiting for first optimization...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoOptimizerStatus;