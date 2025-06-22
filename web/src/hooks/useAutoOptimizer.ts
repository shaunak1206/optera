import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

export const useAutoOptimizer = () => {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const optimizeMutation = useMutation({
    mutationFn: () => apiClient.optimizeAllocation({
      inference_priority: 0.7, // Fixed at 70%
      // No target_revenue = maximize revenue
    }),
  });

  const deployMutation = useMutation({
    mutationFn: (allocation: { [key: string]: number }) => apiClient.deployAllocation(allocation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status'] });
    },
  });

  const runOptimization = async () => {
    try {
      console.log('🤖 Running auto-optimization...');
      const result = await optimizeMutation.mutateAsync();
      
      if (result.allocation) {
        console.log('📊 Deploying optimized allocation:', result.allocation);
        await deployMutation.mutateAsync(result.allocation);
        console.log('✅ Auto-optimization completed successfully');
      }
    } catch (error) {
      console.error('❌ Auto-optimization failed:', error);
    }
  };

  useEffect(() => {
    // Run initial optimization after 5 seconds
    const initialTimeout = setTimeout(() => {
      runOptimization();
    }, 5000);

    // Then run every 30 seconds
    intervalRef.current = setInterval(() => {
      runOptimization();
    }, 30000);

    return () => {
      if (initialTimeout) clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    isOptimizing: optimizeMutation.isPending,
    isDeploying: deployMutation.isPending,
    lastOptimization: optimizeMutation.data,
    error: optimizeMutation.error || deployMutation.error,
  };
};