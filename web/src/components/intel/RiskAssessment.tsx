import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from '@tanstack/react-query';

const RiskAssessment = () => {
    const { data: fearGreedData } = useQuery({
        queryKey: ['fear-greed-index'],
        queryFn: async () => {
            try {
                const response = await fetch('https://api.alternative.me/fng/');
                return response.json();
            } catch (error) {
                console.warn('Fear & Greed API unavailable');
                return null;
            }
        },
        refetchInterval: 3600000,
        retry: false,
    });

    const { data: volatilityData } = useQuery({
        queryKey: ['btc-volatility'],
        queryFn: async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily');
                if (!response.ok) throw new Error('API failed');
                const data = await response.json();
                
                const prices = data.prices.map((p: any) => p[1]);
                const returns = [];
                for (let i = 1; i < prices.length; i++) {
                    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
                }
                const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
                const variance = returns.reduce((acc, ret) => acc + Math.pow(ret - avgReturn, 2), 0) / returns.length;
                const volatility = Math.sqrt(variance * 365) * 100;
                
                return { volatility };
            } catch (error) {
                console.warn('Volatility calculation failed');
                return { volatility: 65 };
            }
        },
        refetchInterval: 3600000,
        retry: false,
    });

    const fearGreedValue = fearGreedData?.data?.[0]?.value || 45;
    const priceVolatility = Math.min(95, Math.max(5, volatilityData?.volatility || 65));
    
    const risks = [
        {
            name: "Price Volatility Risk",
            value: priceVolatility,
            color: priceVolatility > 70 ? 'terminal-error' : priceVolatility > 40 ? 'terminal-warning' : 'terminal-success'
        },
        {
            name: "Hardware Failure Probability", 
            value: 15,
            color: 'terminal-warning'
        },
        {
            name: "Energy Cost Spike Prediction",
            value: Math.min(60, 35 + (100 - fearGreedValue) * 0.3),
            color: 'terminal-warning'
        },
        {
            name: "Regulatory Risk",
            value: Math.max(25, 45 - (fearGreedValue - 50) * 0.5),
            color: 'terminal-warning'
        },
        {
            name: "AI Model Drift",
            value: 18,
            color: 'terminal-success'
        }
    ];

    return (
        <Card className="bg-terminal-surface border-terminal-border h-full">
            <CardHeader>
                <CardTitle className="text-terminal-accent">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {risks.map((risk, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-white text-sm">{risk.name}</h4>
                            <span className={`font-mono text-${risk.color} text-lg`}>
                                {Math.round(risk.value)}%
                            </span>
                        </div>
                        <Progress 
                            value={risk.value} 
                            className={`h-2 [&>div]:bg-${risk.color}`} 
                        />
                    </div>
                ))}
                <div className="mt-4 pt-4 border-t border-terminal-border">
                    <div className="text-xs text-terminal-muted space-y-1">
                        <p>Fear & Greed Index: {fearGreedValue}/100</p>
                        <p>Annualized Volatility: {priceVolatility.toFixed(1)}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RiskAssessment; 