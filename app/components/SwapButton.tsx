'use client';

import { ArrowUpDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface SwapButtonProps {
  variant?: 'default' | 'disabled';
  fromToken?: string;
  toToken?: string;
  onSwap?: () => void;
  loading?: boolean;
}

export function SwapButton({ 
  variant = 'default', 
  fromToken = 'ETH',
  toToken = 'USDC',
  onSwap,
  loading = false
}: SwapButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = variant === 'disabled' || loading;

  return (
    <button
      className={`
        w-full p-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
        ${isDisabled 
          ? 'bg-surface/50 text-text-secondary cursor-not-allowed' 
          : 'btn-primary hover:scale-105 active:scale-95'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSwap}
      disabled={isDisabled}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <ArrowUpDown className={`w-5 h-5 transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
          <span>Swap {fromToken} → {toToken}</span>
        </>
      )}
    </button>
  );
}
