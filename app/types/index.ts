export interface User {
  walletAddress: string;
  connectedProtocols: string[];
  notificationPreferences: {
    opportunities: boolean;
    priceAlerts: boolean;
    transactions: boolean;
  };
}

export interface Wallet {
  ownerAddress: string;
  chainId: number;
  isPrimary: boolean;
}

export interface PortfolioEntry {
  assetSymbol: string;
  assetName: string;
  quantity: number;
  currentValueUSD: number;
  platform: string;
  lastUpdated: Date;
  priceChange24h: number;
  logoUrl?: string;
}

export interface Opportunity {
  id: string;
  opportunityType: 'arbitrage' | 'yield' | 'swap' | 'bridge';
  asset: string;
  sourcePlatform: string;
  targetPlatform: string;
  potentialGain: number;
  potentialGainPercent: number;
  identifiedAt: Date;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedGas: number;
}

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  estimatedGas: string;
  priceImpact: number;
  route: string[];
}
