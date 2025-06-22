import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const forecastData = [
    { name: 'T+0', '1hr': 320, '4hr': 320, '24hr': 320 },
    { name: 'T+1', '1hr': 330 },
    { name: 'T+4', '4hr': 350 },
    { name: 'T+8' },
    { name: 'T+12', '24hr': 400 },
    { name: 'T+16' },
    { name: 'T+24', '24hr': 380 },
];

const ForecastingModels = () => {
    const { data: btcData } = useQuery({
        queryKey: ['btc-market-data'],
        queryFn: async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly');
                return response.json();
            } catch (error) {
                console.warn('Bitcoin API unavailable');
                return null;
            }
        },
        refetchInterval: 600000,
        retry: false,
    });

    const { data: energyData } = useQuery({
        queryKey: ['energy-forecast'],
        queryFn: async () => {
            try {
                const response = await fetch('https://api.gridstatus.io/v1/datasets/pjm/load_forecast/latest?format=json&limit=24');
                return response.json();
            } catch (error) {
                console.warn('Energy forecast API unavailable');
                return null;
            }
        },
        refetchInterval: 1800000,
        retry: false,
    });

    const currentPrice = btcData?.prices?.[btcData.prices.length - 1]?.[1] || 102641;
    const baseRevenue = 320;
    
    const dynamicForecastData = energyData?.data ? 
        energyData.data.slice(0, 7).map((item: any, index: number) => {
            const timeLabel = `T+${index === 0 ? '0' : index * 4}`;
            const energyMultiplier = (item.load_mw || 16800) / 16800;
            const btcVolatility = Math.sin(index * 0.5) * 0.1 + 1;
            
            return {
                name: timeLabel,
                '1hr': index === 0 || index === 1 ? Math.round(baseRevenue * energyMultiplier * btcVolatility) : undefined,
                '4hr': index === 0 || index === 2 ? Math.round(baseRevenue * energyMultiplier * btcVolatility * 1.1) : undefined,
                '24hr': index === 0 || index === 3 || index === 6 ? Math.round(baseRevenue * energyMultiplier * btcVolatility * 1.2) : undefined,
            };
        }) : forecastData;

    return (
        <Card className="bg-terminal-surface border-terminal-border h-full">
            <CardHeader>
                <CardTitle className="text-terminal-accent">Forecasting Models</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-terminal-muted mb-4">Revenue Projections ($/hr)</p>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dynamicForecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    borderColor: '#444',
                                    borderRadius: '0',
                                }}
                            />
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                            <Line type="monotone" dataKey="1hr" name="1-hour Forecast" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                            <Line type="monotone" dataKey="4hr" name="4-hour Forecast" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                            <Line type="monotone" dataKey="24hr" name="24-hour Forecast" stroke="#ffc658" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-terminal-muted">Seasonal Pattern:</p>
                        <p className="font-mono text-white">Weekend AI demand dip</p>
                    </div>
                    <div>
                        <p className="text-terminal-muted">Market Volatility:</p>
                        <p className="font-mono text-terminal-warning">High</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ForecastingModels; 