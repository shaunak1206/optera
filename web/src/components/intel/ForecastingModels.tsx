import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';

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
    return (
        <Card className="bg-terminal-surface border-terminal-border h-full">
            <CardHeader>
                <CardTitle className="text-terminal-accent">Forecasting Models</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-terminal-muted mb-4">Revenue Projections ($/hr)</p>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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