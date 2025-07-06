// Decentralized configuration for ENS/IPFS integration

export interface DecentralizedConfig {
    rpcEndpoints: {
        flow: string;
        filecoin: string;
        ipfs: string;
    };
    tarotThemes: TarotTheme[];
    currentTheme: string;
    ensDomain?: string;
    ipfsGateway: string;
}

export interface TarotTheme {
    id: string;
    name: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    cardBackImage?: string;
    fontFamily?: string;
    animations?: {
        cardFlip: string;
        cardDraw: string;
        glow: string;
    };
}

export const DEFAULT_CONFIG: DecentralizedConfig = {
    rpcEndpoints: {
        flow: "https://testnet.evm.nodes.onflow.org",
        filecoin: "https://api.filecoin.io",
        ipfs: "https://ipfs.io"
    },
    tarotThemes: [
        {
            id: "mystical-purple",
            name: "Mystical Purple",
            description: "Deep purple and indigo theme with mystical energy",
            colors: {
                primary: "#8B5CF6",
                secondary: "#6366F1",
                accent: "#A855F7",
                background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #000000 100%)",
                text: "#F3F4F6"
            },
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
            animations: {
                cardFlip: "flip 0.6s ease-in-out",
                cardDraw: "draw 0.8s ease-out",
                glow: "glow 2s ease-in-out infinite alternate"
            }
        },
        {
            id: "golden-dawn",
            name: "Golden Dawn",
            description: "Classic golden theme inspired by the Hermetic Order",
            colors: {
                primary: "#D97706",
                secondary: "#F59E0B",
                accent: "#FCD34D",
                background: "linear-gradient(135deg, #1F2937 0%, #374151 50%, #111827 100%)",
                text: "#F9FAFB"
            },
            fontFamily: "Georgia, serif",
            animations: {
                cardFlip: "flip 0.6s ease-in-out",
                cardDraw: "draw 0.8s ease-out",
                glow: "golden-glow 2s ease-in-out infinite alternate"
            }
        },
        {
            id: "moonlight",
            name: "Moonlight",
            description: "Silver and blue theme representing lunar energy",
            colors: {
                primary: "#6B7280",
                secondary: "#9CA3AF",
                accent: "#E5E7EB",
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
                text: "#F8FAFC"
            },
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
            animations: {
                cardFlip: "flip 0.6s ease-in-out",
                cardDraw: "draw 0.8s ease-out",
                glow: "moonlight-glow 3s ease-in-out infinite alternate"
            }
        },
        {
            id: "earth-mother",
            name: "Earth Mother",
            description: "Green and brown theme representing grounding energy",
            colors: {
                primary: "#059669",
                secondary: "#10B981",
                accent: "#34D399",
                background: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)",
                text: "#F0FDF4"
            },
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
            animations: {
                cardFlip: "flip 0.6s ease-in-out",
                cardDraw: "draw 0.8s ease-out",
                glow: "earth-glow 2s ease-in-out infinite alternate"
            }
        }
    ],
    currentTheme: "mystical-purple",
    ipfsGateway: "https://ipfs.io"
};

export class DecentralizedConfigManager {
    private config: DecentralizedConfig;
    private storageKey = "tarot-reader-config";

    constructor() {
        this.config = this.loadConfig();
        // Apply the current theme on initialization
        this.applyCurrentTheme();
    }

    private loadConfig(): DecentralizedConfig {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                try {
                    return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
                } catch (error) {
                    console.error('Error loading config:', error);
                }
            }
        }
        return DEFAULT_CONFIG;
    }

    private saveConfig(): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.storageKey, JSON.stringify(this.config));
        }
    }

    getConfig(): DecentralizedConfig {
        return this.config;
    }

    updateRpcEndpoint(chain: keyof DecentralizedConfig['rpcEndpoints'], endpoint: string): void {
        this.config.rpcEndpoints[chain] = endpoint;
        this.saveConfig();
    }

    setTheme(themeId: string): void {
        const theme = this.config.tarotThemes.find(t => t.id === themeId);
        if (theme) {
            this.config.currentTheme = themeId;
            this.saveConfig();
            this.applyTheme(theme);
        }
    }

    getCurrentTheme(): TarotTheme {
        return this.config.tarotThemes.find(t => t.id === this.config.currentTheme) || this.config.tarotThemes[0];
    }

    applyCurrentTheme(): void {
        const theme = this.getCurrentTheme();
        this.applyTheme(theme);
    }

    private applyTheme(theme: TarotTheme): void {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;

            // Apply CSS custom properties
            root.style.setProperty('--color-primary', theme.colors.primary);
            root.style.setProperty('--color-secondary', theme.colors.secondary);
            root.style.setProperty('--color-accent', theme.colors.accent);
            root.style.setProperty('--color-background', theme.colors.background);
            root.style.setProperty('--color-text', theme.colors.text);
            root.style.setProperty('--font-family', theme.fontFamily || 'system-ui');
        }
    }

    setEnsDomain(domain: string): void {
        this.config.ensDomain = domain;
        this.saveConfig();
    }

    setIpfsGateway(gateway: string): void {
        this.config.ipfsGateway = gateway;
        this.saveConfig();
    }

    // Load configuration from IPFS
    async loadConfigFromIpfs(cid: string): Promise<void> {
        try {
            const response = await fetch(`${this.config.ipfsGateway}/ipfs/${cid}`);
            const config = await response.json();
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.saveConfig();
            // Apply the new theme after loading
            this.applyCurrentTheme();
        } catch (error) {
            console.error('Error loading config from IPFS:', error);
        }
    }

    // Save configuration to IPFS
    async saveConfigToIpfs(): Promise<string> {
        try {
            const configJson = JSON.stringify(this.config);
            const response = await fetch(`${this.config.ipfsGateway}/api/v0/add`, {
                method: 'POST',
                body: new Blob([configJson], { type: 'application/json' })
            });
            const result = await response.json();
            return result.Hash;
        } catch (error) {
            console.error('Error saving config to IPFS:', error);
            throw error;
        }
    }

    // Load configuration from ENS
    async loadConfigFromEns(domain: string): Promise<void> {
        try {
            // This would require ENS resolution
            // For now, we'll simulate it
            console.log(`Loading config from ENS domain: ${domain}`);
            // In a real implementation, you would:
            // 1. Resolve the ENS domain to get the IPFS hash
            // 2. Load the config from IPFS using that hash
        } catch (error) {
            console.error('Error loading config from ENS:', error);
        }
    }
}

// Export singleton instance
export const configManager = new DecentralizedConfigManager();

// CSS animations for themes
export const themeAnimations = `
  @keyframes flip {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(180deg); }
  }

  @keyframes draw {
    0% { transform: translateY(-100px) rotate(-10deg); opacity: 0; }
    100% { transform: translateY(0) rotate(0deg); opacity: 1; }
  }

  @keyframes glow {
    0% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
    100% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
  }

  @keyframes golden-glow {
    0% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
    100% { box-shadow: 0 0 30px rgba(217, 119, 6, 0.6); }
  }

  @keyframes moonlight-glow {
    0% { box-shadow: 0 0 20px rgba(107, 114, 128, 0.3); }
    100% { box-shadow: 0 0 30px rgba(107, 114, 128, 0.6); }
  }

  @keyframes earth-glow {
    0% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.3); }
    100% { box-shadow: 0 0 30px rgba(5, 150, 105, 0.6); }
  }
`; 