'use client';

import { useState, useEffect } from 'react';
import { OpportunityCard } from './OpportunityCard';
import { SwapButton } from './SwapButton';
import { InfoTooltip } from './InfoTooltip';
import { Opportunity } from '../types';
import { Target, Zap, ArrowUpDown, TrendingUp } from 'lucide-react';

interface OpportunityScannerProps {
  walletAddress: string;
}

export function OpportunityScanner({ walletAddress }: OpportunityScannerProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Mock opportunities data
  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      opportunityType: 'arbitrage',
      asset: 'USDC',
      sourcePlatform: 'Uniswap V3',
      targetPlatform: 'SushiSwap',
      potentialGain: 45.30,
      potentialGainPercent: 1.2,
      identifiedAt: new Date(),
      riskLevel: 'low',
      estimatedGas: 12.50,
    },
    {
      id: '2',
      opportunityType: 'yield',
      asset: 'ETH',
      sourcePlatform: 'Compound',
      targetPlatform: 'Aave V3',
      potentialGain: 125.80,
      potentialGainPercent: 2.8,
      identifiedAt: new Date(),
      riskLevel: 'medium',
      estimatedGas: 25.70,
    },
    {
      id: '3',
      opportunityType: 'swap',
      asset: 'UNI',
      sourcePlatform: 'Base',
      targetPlatform: 'Optimism',
      potentialGain: 67.20,
      potentialGainPercent: 1.8,
      identifiedAt: new Date(),
      riskLevel: 'low',
      estimatedGas: 18.40,
    },
    {
      id: '4',
      opportunityType: 'bridge',
      asset: 'COMP',
      sourcePlatform: 'Ethereum',
      targetPlatform: 'Base',
      potentialGain: 89.50,
      potentialGainPercent: 3.2,
      identifiedAt: new Date(),
      riskLevel: 'high',
      estimatedGas: 42.30,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOpportunities(mockOpportunities);
      setLoading(false);
    }, 1500);
  }, [walletAddress]);

  const filteredOpportunities = opportunities.filter(opp => 
    selectedFilter === 'all' || opp.opportunityType === selectedFilter
  );

  const totalPotentialGain = filteredOpportunities.reduce((sum, opp) => sum + opp.potentialGain, 0);

  const handleExecuteOpportunity = (opportunity: Opportunity) => {
    console.log('Executing opportunity:', opportunity);
    // Here you would integrate with DEX aggregators or swap protocols
  };

  const filterButtons = [
    { key: 'all', label: 'All', icon: Target },
    { key: 'arbitrage', label: 'Arbitrage', icon: ArrowUpDown },
    { key: 'yield', label: 'Yield', icon: TrendingUp },
    { key: 'swap', label: 'Swap', icon: Zap },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          <span className="ml-3 text-text-secondary">Scanning for opportunities...</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-4 rounded-lg animate-pulse">
            <div className="h-24 bg-surface rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Opportunity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Found Opportunities</span>
            <InfoTooltip content="Cross-platform arbitrage and yield farming opportunities identified" />
          </div>
          <div className="text-2xl font-semibold">{filteredOpportunities.length}</div>
          <div className="text-sm text-text-secondary">Active now</div>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Total Potential</span>
          </div>
          <div className="text-2xl font-semibold text-green-400">+${totalPotentialGain.toFixed(2)}</div>
          <div className="text-sm text-text-secondary">Available gains</div>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Best Opportunity</span>
          </div>
          <div className="text-2xl font-semibold">+3.2%</div>
          <div className="text-sm text-green-400">COMP Bridge</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filterButtons.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedFilter(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedFilter === key
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Available Opportunities</h3>
          <div className="text-sm text-text-secondary">
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="glass-card p-8 rounded-lg text-center">
            <Target className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="font-medium mb-2">No opportunities found</h3>
            <p className="text-sm text-text-secondary">
              We're constantly scanning for new cross-platform opportunities. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                variant="actionable"
                onExecute={() => handleExecuteOpportunity(opportunity)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
