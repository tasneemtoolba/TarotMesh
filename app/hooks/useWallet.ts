import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import { getUserProfile, UserProfile } from '../contracts/contracts';

export interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: string | null;
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

export const useWallet = () => {
    const [walletState, setWalletState] = useState<WalletState>({
        isConnected: false,
        address: null,
        balance: null,
        profile: null,
        isLoading: false,
        error: null,
    });

    // Initialize Flow client
    useEffect(() => {
        fcl.config({
            'accessNode.api': 'https://testnet.onflow.org',
            'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
            'app.detail.title': 'Mystical Tarot Reader',
            'app.detail.icon': 'https://placekitten.com/g/200/200',
        });

        // Listen for account changes
        fcl.currentUser.subscribe((user: any) => {
            if (user.loggedIn) {
                setWalletState(prev => ({
                    ...prev,
                    isConnected: true,
                    address: user.addr,
                    isLoading: true,
                }));

                // Load user profile
                loadUserProfile(user.addr);
                loadBalance(user.addr);
            } else {
                setWalletState({
                    isConnected: false,
                    address: null,
                    balance: null,
                    profile: null,
                    isLoading: false,
                    error: null,
                });
            }
        });
    }, []);

    const loadUserProfile = async (address: string) => {
        try {
            const profile = await getUserProfile(address);
            setWalletState(prev => ({
                ...prev,
                profile,
                isLoading: false,
            }));
        } catch (error) {
            console.error('Error loading user profile:', error);
            setWalletState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Failed to load user profile',
            }));
        }
    };

    const loadBalance = async (address: string) => {
        try {
            const balance = await fcl.account(address);
            setWalletState(prev => ({
                ...prev,
                balance: balance.balance?.toString() || '0',
            }));
        } catch (error) {
            console.error('Error loading balance:', error);
        }
    };

    const connectWallet = async () => {
        try {
            setWalletState(prev => ({ ...prev, isLoading: true, error: null }));
            await fcl.authenticate();
        } catch (error) {
            console.error('Error connecting wallet:', error);
            setWalletState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Failed to connect wallet',
            }));
        }
    };

    const disconnectWallet = async () => {
        try {
            await fcl.unauthenticate();
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const refreshProfile = async () => {
        if (walletState.address) {
            await loadUserProfile(walletState.address);
        }
    };

    return {
        ...walletState,
        connectWallet,
        disconnectWallet,
        refreshProfile,
    };
}; 