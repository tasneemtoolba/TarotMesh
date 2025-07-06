import { useWallet } from '../hooks/useWallet';
import { startReading, performReading, completeReading, setFavoriteSpread, getUserProfile } from '../contracts/contracts';

export interface ReadingData {
    question: string;
    cards: string[];
    reversals: boolean[];
    interpretation: string;
    timestamp: number;
    sessionId: string;
}

export interface UserPreferences {
    favoriteSpread: string;
    theme: string;
    notifications: boolean;
    autoSave: boolean;
}

export class UserDataService {
    private static instance: UserDataService;
    private walletHook: ReturnType<typeof useWallet> | null = null;

    static getInstance(): UserDataService {
        if (!UserDataService.instance) {
            UserDataService.instance = new UserDataService();
        }
        return UserDataService.instance;
    }

    setWalletHook(walletHook: ReturnType<typeof useWallet>) {
        this.walletHook = walletHook;
    }

    async saveReading(readingData: ReadingData): Promise<boolean> {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            console.warn('Wallet not connected, cannot save reading');
            return false;
        }

        try {
            // Start a reading session on the blockchain
            const sessionId = await startReading(readingData.question);

            // Perform the reading with the drawn cards
            await performReading(sessionId, readingData.cards.length);

            // Complete the reading with interpretation
            await completeReading(sessionId, readingData.interpretation);

            // Refresh user profile to get updated data
            await this.walletHook.refreshProfile();

            return true;
        } catch (error) {
            console.error('Error saving reading to blockchain:', error);
            return false;
        }
    }

    async savePreferences(preferences: UserPreferences): Promise<boolean> {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            console.warn('Wallet not connected, cannot save preferences');
            return false;
        }

        try {
            // Save favorite spread to blockchain
            await setFavoriteSpread(preferences.favoriteSpread);

            // Save other preferences to localStorage (since they're not on-chain)
            localStorage.setItem(`user-preferences-${this.walletHook.address}`, JSON.stringify(preferences));

            // Refresh user profile
            await this.walletHook.refreshProfile();

            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    }

    async loadPreferences(): Promise<UserPreferences | null> {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            return null;
        }

        try {
            const saved = localStorage.getItem(`user-preferences-${this.walletHook.address}`);
            if (saved) {
                return JSON.parse(saved);
            }

            // Return default preferences
            return {
                favoriteSpread: 'Past-Present-Future',
                theme: 'mystical-purple',
                notifications: true,
                autoSave: true,
            };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return null;
        }
    }

    async getUserProfile() {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            return null;
        }

        try {
            return await getUserProfile(this.walletHook.address);
        } catch (error) {
            console.error('Error loading user profile:', error);
            return null;
        }
    }

    async saveToLocalStorage(key: string, data: any): Promise<boolean> {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            return false;
        }

        try {
            const storageKey = `user-${key}-${this.walletHook.address}`;
            localStorage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    async loadFromLocalStorage(key: string): Promise<any | null> {
        if (!this.walletHook?.isConnected || !this.walletHook?.address) {
            return null;
        }

        try {
            const storageKey = `user-${key}-${this.walletHook.address}`;
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    isWalletConnected(): boolean {
        return this.walletHook?.isConnected || false;
    }

    getWalletAddress(): string | null {
        return this.walletHook?.address || null;
    }
}

// Export singleton instance
export const userDataService = UserDataService.getInstance(); 