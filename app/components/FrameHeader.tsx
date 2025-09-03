'use client';

import { Search, Bell, Settings } from 'lucide-react';

export function FrameHeader() {
  return (
    <header className="glass-card rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AF</span>
          </div>
          <h1 className="text-xl font-semibold gradient-text">AssetFlow</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
          </div>
          <Settings className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}
