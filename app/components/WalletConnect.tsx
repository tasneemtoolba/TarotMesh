"use client";

import { useWallet } from '../hooks/useWallet';

export default function WalletConnect() {
    const {
        isConnected,
        address,
        balance,
        profile,
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
        refreshProfile,
    } = useWallet();

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const formatBalance = (bal: string) => {
        const balanceNum = parseFloat(bal) / 100000000; // Convert from base units
        return balanceNum.toFixed(4);
    };

    if (isLoading) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-theme-primary/20 shadow-2xl">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 bg-theme-accent rounded-full animate-bounce"></div>
                    <span className="text-theme-text">Connecting wallet...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-4 border border-red-400/30 shadow-2xl">
                <div className="text-red-300 text-sm mb-2">⚠️ Connection Error</div>
                <div className="text-red-200 text-xs mb-3">{error}</div>
                <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-theme-primary hover:bg-theme-secondary text-white rounded-lg text-sm transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl">
                <div className="text-center">
                    <div className="text-3xl mb-3">🔐</div>
                    <h3 className="text-lg font-bold text-theme-primary mb-2">Connect Your Wallet</h3>
                    <p className="text-theme-text text-sm mb-4">
                        Connect your Flow wallet to save your tarot readings and preferences
                    </p>
                    <button
                        onClick={connectWallet}
                        className="w-full px-6 py-3 bg-theme-primary hover:bg-theme-secondary text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                        🔗 Connect Wallet
                    </button>
                    <div className="mt-3 text-xs text-theme-text/70">
                        Powered by Flow Blockchain
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-theme-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-theme-primary text-lg">👤</span>
                    </div>
                    <div>
                        <div className="font-semibold text-theme-primary">Connected</div>
                        <div className="text-theme-text text-sm font-mono">
                            {formatAddress(address!)}
                        </div>
                    </div>
                </div>
                <button
                    onClick={disconnectWallet}
                    className="text-theme-text/70 hover:text-theme-primary transition-colors"
                    title="Disconnect"
                >
                    ✕
                </button>
            </div>

            {/* Balance */}
            <div className="mb-4 p-3 bg-theme-primary/10 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-theme-text text-sm">Balance</span>
                    <span className="text-theme-primary font-mono font-semibold">
                        {formatBalance(balance!)} FLOW
                    </span>
                </div>
            </div>

            {/* User Profile */}
            {profile && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-theme-text text-sm">Total Readings</span>
                        <span className="text-theme-primary font-bold">{profile.totalReadings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-theme-text text-sm">Favorite Spread</span>
                        <span className="text-theme-primary text-sm">{profile.favoriteSpread || 'None'}</span>
                    </div>
                    {profile.hasSubscribed && (
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                            <span>✨</span>
                            <span>Daily Readings Active</span>
                        </div>
                    )}
                </div>
            )}

            {/* Refresh Button */}
            <button
                onClick={refreshProfile}
                className="w-full mt-4 px-4 py-2 bg-theme-primary/20 hover:bg-theme-primary/30 text-theme-primary rounded-lg text-sm transition-colors"
            >
                🔄 Refresh Data
            </button>
        </div>
    );
} 