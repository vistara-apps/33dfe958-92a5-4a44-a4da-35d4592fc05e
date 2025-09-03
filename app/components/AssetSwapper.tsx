'use client';

import { useState } from 'react';
import { SwapButton } from './SwapButton';
import { InfoTooltip } from './InfoTooltip';
import { ArrowUpDown, Settings, Zap } from 'lucide-react';

export function AssetSwapper() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [slippage, setSlippage] = useState(0.5);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: 2.45 },
    { symbol: 'USDC', name: 'USD Coin', balance: 5670.23 },
    { symbol: 'UNI', name: 'Uniswap', balance: 145.8 },
    { symbol: 'COMP', name: 'Compound', balance: 23.4 },
  ];

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Mock rate calculation (1 ETH = 1487 USDC)
    if (fromToken === 'ETH' && toToken === 'USDC') {
      setToAmount((parseFloat(value) * 1487).toString() || '');
    } else if (fromToken === 'USDC' && toToken === 'ETH') {
      setToAmount((parseFloat(value) / 1487).toString() || '');
    } else {
      setToAmount((parseFloat(value) * 0.95).toString() || ''); // Mock rate
    }
  };

  const handleSwap = async () => {
    setLoading(true);
    // Simulate swap transaction
    setTimeout(() => {
      setLoading(false);
      alert('Swap completed successfully!');
      setFromAmount('');
      setToAmount('');
    }, 3000);
  };

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Swap Assets</h2>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary" />
            <InfoTooltip content="Best rates automatically sourced from multiple DEXs" />
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">From</span>
              <span className="text-sm text-text-secondary">
                Balance: {fromTokenData?.balance.toFixed(4)} {fromToken}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg p-2 text-text-primary"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-xl font-semibold outline-none text-right"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-surface hover:bg-surface/80 rounded-lg border border-white/10 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* To Token */}
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">To</span>
              <span className="text-sm text-text-secondary">
                Balance: {toTokenData?.balance.toFixed(4)} {toToken}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg p-2 text-text-primary"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="flex-1 bg-transparent text-xl font-semibold outline-none text-right text-text-secondary"
              />
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="glass-card p-4 rounded-lg mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Rate</span>
              <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-text-secondary">Slippage</span>
                <InfoTooltip content="Maximum price movement tolerance" />
              </div>
              <span>{slippage}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Est. Gas</span>
              <span>$12.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-accent" />
                <span className="text-accent">Route</span>
              </div>
              <span className="text-accent">Uniswap V3</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <div className="mt-6">
          <SwapButton
            fromToken={fromToken}
            toToken={toToken}
            onSwap={handleSwap}
            loading={loading}
            variant={!fromAmount || !toAmount ? 'disabled' : 'default'}
          />
        </div>
      </div>

      {/* Recent Swaps */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>ETH → USDC</span>
            </div>
            <div className="text-right">
              <div>1.2 ETH</div>
              <div className="text-xs text-text-secondary">2 min ago</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>USDC → UNI</span>
            </div>
            <div className="text-right">
              <div>500 USDC</div>
              <div className="text-xs text-text-secondary">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
