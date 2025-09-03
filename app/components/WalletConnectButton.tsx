'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

export function WalletConnectButton() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <div className="flex justify-end mb-4">
        <Wallet>
          <div className="glass-card p-3 rounded-lg">
            <div className="text-sm text-text-secondary">Connected Wallet</div>
          </div>
        </Wallet>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <div className="glass-card p-8 rounded-lg text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">AF</span>
          </div>
          <h2 className="text-xl font-medium mb-2">Welcome to AssetFlow</h2>
          <p className="text-text-secondary text-sm">
            Unify your crypto portfolio and discover cross-platform opportunities
          </p>
        </div>
        
        <ConnectWallet className="w-full">
          <div className="btn-primary w-full">
            Connect Base Wallet
          </div>
        </ConnectWallet>
      </div>
    </div>
  );
}
