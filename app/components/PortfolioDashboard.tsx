'use client';

import { useState, useEffect } from 'react';
import { AssetCard } from './AssetCard';
import { PortfolioEntry } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Wallet, DollarSign } from 'lucide-react';

interface PortfolioDashboardProps {
  walletAddress: string;
}

export function PortfolioDashboard({ walletAddress }: PortfolioDashboardProps) {
  const [assets, setAssets] = useState<PortfolioEntry[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockAssets: PortfolioEntry[] = [
    {
      assetSymbol: 'ETH',
      assetName: 'Ethereum',
      quantity: 2.45,
      currentValueUSD: 3643.50,
      platform: 'Base',
      lastUpdated: new Date(),
      priceChange24h: 2.5,
    },
    {
      assetSymbol: 'USDC',
      assetName: 'USD Coin',
      quantity: 5670.23,
      currentValueUSD: 5670.23,
      platform: 'Base',
      lastUpdated: new Date(),
      priceChange24h: 0.1,
    },
    {
      assetSymbol: 'UNI',
      assetName: 'Uniswap',
      quantity: 145.8,
      currentValueUSD: 1458.50,
      platform: 'Uniswap V3',
      lastUpdated: new Date(),
      priceChange24h: -1.2,
    },
    {
      assetSymbol: 'COMP',
      assetName: 'Compound',
      quantity: 23.4,
      currentValueUSD: 1255.80,
      platform: 'Compound',
      lastUpdated: new Date(),
      priceChange24h: 4.7,
    },
  ];

  const mockHistoricalData = [
    { day: 'Mon', value: 11500 },
    { day: 'Tue', value: 12200 },
    { day: 'Wed', value: 11800 },
    { day: 'Thu', value: 12400 },
    { day: 'Fri', value: 12028 },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssets(mockAssets);
      const total = mockAssets.reduce((sum, asset) => sum + asset.currentValueUSD, 0);
      setTotalValue(total);
      setLoading(false);
    }, 1000);
  }, [walletAddress]);

  const pieData = assets.map((asset, index) => ({
    name: asset.assetSymbol,
    value: asset.currentValueUSD,
    color: `hsl(${(index * 90) % 360}, 70%, 50%)`,
  }));

  const colors = ['#00D4AA', '#0052FF', '#8B5CF6', '#F59E0B'];

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-4 rounded-lg animate-pulse">
            <div className="h-16 bg-surface rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Total Value</span>
          </div>
          <div className="text-2xl font-semibold">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-green-400 flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>+2.5% (24h)</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Wallet className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Assets</span>
          </div>
          <div className="text-2xl font-semibold">{assets.length}</div>
          <div className="text-sm text-text-secondary">Across 3 platforms</div>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Best Performer</span>
          </div>
          <div className="text-2xl font-semibold">COMP</div>
          <div className="text-sm text-green-400">+4.7% (24h)</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-lg">
          <h3 className="font-medium mb-4">Portfolio Performance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHistoricalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00D4AA" 
                  strokeWidth={2}
                  dot={{ fill: '#00D4AA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <h3 className="font-medium mb-4">Asset Allocation</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assets List */}
      <div>
        <h3 className="text-xl font-medium mb-4">Your Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset, index) => (
            <AssetCard key={`${asset.assetSymbol}-${index}`} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
