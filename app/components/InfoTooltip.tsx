'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

interface InfoTooltipProps {
  content: string;
  variant?: 'default';
}

export function InfoTooltip({ content, variant = 'default' }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <Info 
        className="w-4 h-4 text-text-secondary hover:text-text-primary cursor-help transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-surface border border-white/10 rounded-lg text-sm text-text-primary max-w-xs whitespace-normal z-10 animate-fade-in">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-surface"></div>
        </div>
      )}
    </div>
  );
}
