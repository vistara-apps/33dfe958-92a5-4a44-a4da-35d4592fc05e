'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { FrameHeader } from './components/FrameHeader';
import { WalletConnectButton } from './components/WalletConnectButton';
import { Navigation } from './components/Navigation';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { OpportunityScanner } from './components/OpportunityScanner';
import { AssetSwapper } from './components/AssetSwapper';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('portfolio');

  const renderContent = () => {
    if (!isConnected) {
      return <WalletConnectButton />;
    }

    switch (activeTab) {
      case 'portfolio':
        return <PortfolioDashboard walletAddress={address!} />;
      case 'opportunities':
        return <OpportunityScanner walletAddress={address!} />;
      case 'swap':
        return <AssetSwapper />;
      case 'settings':
        return (
          <div className="glass-card p-8 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-text-secondary">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <PortfolioDashboard walletAddress={address!} />;
    }
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FrameHeader />
        
        {isConnected && (
          <Navigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        )}
        
        <div className={isConnected ? 'pb-20 md:pb-0' : ''}>
          {renderContent()}
        </div>
      </div>
    </main>
  );
}
