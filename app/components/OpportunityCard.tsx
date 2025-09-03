'use client';

import { ArrowRight, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'default' | 'actionable';
  onExecute?: () => void;
}

export function OpportunityCard({ 
  opportunity, 
  variant = 'default',
  onExecute 
}: OpportunityCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-text-secondary bg-surface';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'arbitrage': return <ArrowRight className="w-4 h-4" />;
      case 'yield': return <TrendingUp className="w-4 h-4" />;
      case 'swap': return <Target className="w-4 h-4" />;
      case 'bridge': return <ArrowRight className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card p-4 rounded-lg hover:bg-surface/90 transition-all duration-200 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
            {getTypeIcon(opportunity.opportunityType)}
          </div>
          <div>
            <div className="font-medium capitalize">{opportunity.opportunityType}</div>
            <div className="text-sm text-text-secondary">{opportunity.asset}</div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${getRiskColor(opportunity.riskLevel)}`}>
          <div className="flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>{opportunity.riskLevel} risk</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Route</span>
          <span className="text-sm">{opportunity.sourcePlatform} → {opportunity.targetPlatform}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Potential Gain</span>
          <div className="text-right">
            <div className="font-semibold text-green-400">+${opportunity.potentialGain.toFixed(2)}</div>
            <div className="text-xs text-green-400">({opportunity.potentialGainPercent.toFixed(2)}%)</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Est. Gas</span>
          <span className="text-sm">${opportunity.estimatedGas.toFixed(2)}</span>
        </div>
      </div>

      {variant === 'actionable' && (
        <button 
          onClick={onExecute}
          className="w-full btn-primary text-sm"
        >
          Execute Trade
        </button>
      )}
    </div>
  );
}
