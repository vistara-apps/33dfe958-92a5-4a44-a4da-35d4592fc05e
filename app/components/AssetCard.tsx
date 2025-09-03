'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { PortfolioEntry } from '../types';

interface AssetCardProps {
  asset: PortfolioEntry;
  variant?: 'default' | 'compact';
}

export function AssetCard({ asset, variant = 'default' }: AssetCardProps) {
  const isPositive = asset.priceChange24h >= 0;
  
  if (variant === 'compact') {
    return (
      <div className="glass-card p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {asset.assetSymbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="font-medium text-sm">{asset.assetSymbol}</div>
              <div className="text-xs text-text-secondary">{asset.quantity.toFixed(4)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-sm">${asset.currentValueUSD.toFixed(2)}</div>
            <div className={`text-xs flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(asset.priceChange24h).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-lg hover:bg-surface/90 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {asset.assetSymbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium">{asset.assetSymbol}</div>
            <div className="text-sm text-text-secondary">{asset.assetName}</div>
          </div>
        </div>
        <div className="text-xs text-text-secondary bg-surface px-2 py-1 rounded">
          {asset.platform}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">${asset.currentValueUSD.toFixed(2)}</div>
          <div className="text-sm text-text-secondary">{asset.quantity.toFixed(4)} {asset.assetSymbol}</div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-sm ${
          isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(asset.priceChange24h).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
