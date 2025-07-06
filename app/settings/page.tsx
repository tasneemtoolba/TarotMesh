"use client";

import { useState, useEffect } from "react";
import { configManager, DecentralizedConfig, TarotTheme } from "../lib/decentralized-config";
import { useWallet } from "../hooks/useWallet";
import { userDataService } from "../lib/user-data-service";
import WalletConnect from "../components/WalletConnect";

export default function SettingsPage() {
    const [config, setConfig] = useState<DecentralizedConfig>(configManager.getConfig());
    const [ensDomain, setEnsDomain] = useState(config.ensDomain || "");
    const [ipfsGateway, setIpfsGateway] = useState(config.ipfsGateway);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const wallet = useWallet();

    useEffect(() => {
        setConfig(configManager.getConfig());
        // Set up user data service with wallet hook
        userDataService.setWalletHook(wallet);
    }, [wallet]);

    const handleThemeChange = async (themeId: string) => {
        configManager.setTheme(themeId);
        setConfig(configManager.getConfig());

        // Save preferences to blockchain if wallet is connected
        if (wallet.isConnected) {
            try {
                const preferences = {
                    favoriteSpread: 'Past-Present-Future', // Default spread
                    theme: themeId,
                    notifications: true,
                    autoSave: true,
                };

                const saved = await userDataService.savePreferences(preferences);
                setMessage(saved ? "Theme updated and saved to blockchain!" : "Theme updated locally");
            } catch (error) {
                setMessage("Theme updated locally (blockchain save failed)");
            }
        } else {
            setMessage("Theme updated successfully! Connect wallet to save to blockchain.");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    const handleRpcUpdate = (chain: keyof DecentralizedConfig['rpcEndpoints'], endpoint: string) => {
        configManager.updateRpcEndpoint(chain, endpoint);
        setConfig(configManager.getConfig());
        setMessage(`${chain.toUpperCase()} RPC endpoint updated!`);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleEnsDomainSave = () => {
        configManager.setEnsDomain(ensDomain);
        setMessage("ENS domain saved!");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleIpfsGatewaySave = () => {
        configManager.setIpfsGateway(ipfsGateway);
        setMessage("IPFS gateway updated!");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleSaveToIpfs = async () => {
        setIsLoading(true);
        try {
            const cid = await configManager.saveConfigToIpfs();
            setMessage(`Configuration saved to IPFS with CID: ${cid}`);
        } catch (error) {
            setMessage("Error saving to IPFS");
        }
        setIsLoading(false);
        setTimeout(() => setMessage(""), 5000);
    };

    const handleLoadFromIpfs = async () => {
        const cid = prompt("Enter IPFS CID:");
        if (cid) {
            setIsLoading(true);
            try {
                await configManager.loadConfigFromIpfs(cid);
                setConfig(configManager.getConfig());
                setMessage("Configuration loaded from IPFS!");
            } catch (error) {
                setMessage("Error loading from IPFS");
            }
            setIsLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-theme-primary mb-2">🔧 Settings</h1>
                    <p className="text-theme-text">Configure your mystical tarot experience</p>
                </div>

                {/* Wallet Connection */}
                <div className="mb-6">
                    <WalletConnect />
                </div>

                {message && (
                    <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4 mb-6 text-center">
                        {message}
                    </div>
                )}

                {/* Theme Selection */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-theme-primary/20">
                    <h2 className="text-2xl font-semibold text-theme-primary mb-4">🎨 Tarot Themes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {config.tarotThemes.map((theme) => (
                            <div
                                key={theme.id}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${config.currentTheme === theme.id
                                    ? "border-theme-accent bg-theme-primary/20"
                                    : "border-theme-primary/30 bg-white/5 hover:border-theme-accent/50"
                                    }`}
                                onClick={() => handleThemeChange(theme.id)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-theme-text">{theme.name}</h3>
                                    {config.currentTheme === theme.id && (
                                        <span className="text-theme-accent">✓</span>
                                    )}
                                </div>
                                <p className="text-sm text-theme-text/80 mb-3">{theme.description}</p>
                                <div className="flex space-x-2">
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: theme.colors.primary }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: theme.colors.secondary }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: theme.colors.accent }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RPC Endpoints */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-theme-primary/20">
                    <h2 className="text-2xl font-semibold text-theme-primary mb-4">🔗 RPC Endpoints</h2>
                    <div className="space-y-4">
                        {Object.entries(config.rpcEndpoints).map(([chain, endpoint]) => (
                            <div key={chain} className="flex flex-col md:flex-row gap-4">
                                <label className="text-theme-text font-medium min-w-[100px]">
                                    {chain.toUpperCase()}:
                                </label>
                                <input
                                    type="text"
                                    value={endpoint}
                                    onChange={(e) => handleRpcUpdate(chain as keyof DecentralizedConfig['rpcEndpoints'], e.target.value)}
                                    className="flex-1 p-2 rounded border border-theme-primary/30 bg-white/10 text-white placeholder-theme-text/50 focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                                    placeholder={`Enter ${chain} RPC endpoint`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ENS Configuration */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-theme-primary/20">
                    <h2 className="text-2xl font-semibold text-theme-primary mb-4">🌐 ENS Configuration</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={ensDomain}
                            onChange={(e) => setEnsDomain(e.target.value)}
                            className="flex-1 p-2 rounded border border-theme-primary/30 bg-white/10 text-white placeholder-theme-text/50 focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                            placeholder="Enter ENS domain (e.g., tarotreader.eth)"
                        />
                        <button
                            onClick={handleEnsDomainSave}
                            className="px-6 py-2 bg-theme-primary hover:bg-theme-secondary text-white rounded font-semibold transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* IPFS Configuration */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-theme-primary/20">
                    <h2 className="text-2xl font-semibold text-theme-primary mb-4">📁 IPFS Configuration</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                value={ipfsGateway}
                                onChange={(e) => setIpfsGateway(e.target.value)}
                                className="flex-1 p-2 rounded border border-theme-primary/30 bg-white/10 text-white placeholder-theme-text/50 focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                                placeholder="Enter IPFS gateway URL"
                            />
                            <button
                                onClick={handleIpfsGatewaySave}
                                className="px-6 py-2 bg-theme-primary hover:bg-theme-secondary text-white rounded font-semibold transition-colors"
                            >
                                Save
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleSaveToIpfs}
                                disabled={isLoading}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded font-semibold transition-colors"
                            >
                                {isLoading ? "Saving..." : "Save Config to IPFS"}
                            </button>
                            <button
                                onClick={handleLoadFromIpfs}
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded font-semibold transition-colors"
                            >
                                {isLoading ? "Loading..." : "Load Config from IPFS"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Current Configuration */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-theme-primary/20">
                    <h2 className="text-2xl font-semibold text-theme-primary mb-4">📋 Current Configuration</h2>
                    <div className="bg-black/20 rounded p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-theme-text">
                            {JSON.stringify(config, null, 2)}
                        </pre>
                    </div>
                </div>

                {/* Back to Main */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-block px-8 py-3 bg-theme-primary hover:bg-theme-secondary text-white rounded-lg font-semibold transition-colors"
                    >
                        🔮 Back to Tarot Reader
                    </a>
                </div>
            </div>
        </div>
    );
} 