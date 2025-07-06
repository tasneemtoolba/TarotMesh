import { ethers } from 'ethers';

export const TAROT_CONTRACT_ADDRESS = '0xE1F84B3468c6169b3237Be01ff90023d50E26C95';

export const TAROT_CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "drawTarotCard",
        "outputs": [
            {
                "internalType": "string",
                "name": "cardName",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isReversed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "numCards",
                "type": "uint8"
            }
        ],
        "name": "drawMultipleCards",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "cardNames",
                "type": "string[]"
            },
            {
                "internalType": "bool[]",
                "name": "isReversed",
                "type": "bool[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "question",
                "type": "string"
            }
        ],
        "name": "startReading",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "sessionId",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "sessionId",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "numCards",
                "type": "uint8"
            }
        ],
        "name": "performReading",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "sessionId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "interpretation",
                "type": "string"
            }
        ],
        "name": "completeReading",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "subscribeToDailyReadings",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDailyReading",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "cards",
                "type": "string[]"
            },
            {
                "internalType": "bool[]",
                "name": "reversals",
                "type": "bool[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "spread",
                "type": "string"
            }
        ],
        "name": "setFavoriteSpread",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserProfile",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "favoriteSpread",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalReadings",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastReadingTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "hasSubscribed",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "readingHistory",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct TarotReader.UserProfile",
                "name": "profile",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "sessionId",
                "type": "bytes32"
            }
        ],
        "name": "getReadingSession",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "question",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "cards",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bool[]",
                        "name": "reversals",
                        "type": "bool[]"
                    },
                    {
                        "internalType": "string",
                        "name": "interpretation",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCompleted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TarotReader.ReadingSession",
                "name": "session",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider: ethers.Provider | null = null;
let contract: ethers.Contract | null = null;

const FLOW_TESTNET_RPC = 'https://testnet.evm.nodes.onflow.org';

// Initialize read-only provider for view functions
const initializeReadOnlyProvider = () => {
    if (!provider) {
        provider = new ethers.JsonRpcProvider(FLOW_TESTNET_RPC);
        contract = new ethers.Contract(
            TAROT_CONTRACT_ADDRESS,
            TAROT_CONTRACT_ABI,
            provider
        );
    }
    return { provider, contract };
};

export const getRandomNumber = async (): Promise<number> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.getRandomNumber();
        // Convert the integer (1-100) to a float in [0, 1)
        return (Number(result) - 1) / 100;
    } catch (error: any) {
        console.error('Error in getRandomNumber:', error);
        throw new Error('Failed to generate random number');
    }
};

export interface TarotCard {
    name: string;
    isReversed: boolean;
}

export interface UserProfile {
    favoriteSpread: string;
    totalReadings: number;
    lastReadingTimestamp: number;
    hasSubscribed: boolean;
    readingHistory: string[];
}

export interface ReadingSession {
    question: string;
    cards: string[];
    reversals: boolean[];
    interpretation: string;
    timestamp: number;
    isCompleted: boolean;
}

export const drawTarotCard = async (): Promise<TarotCard> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.drawTarotCard();
        return {
            name: result[0],
            isReversed: result[1]
        };
    } catch (error: any) {
        console.error('Error in drawTarotCard:', error);
        throw new Error('Failed to draw tarot card');
    }
};

export const drawMultipleCards = async (numCards: number): Promise<TarotCard[]> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.drawMultipleCards(numCards);
        const cardNames = result[0];
        const isReversed = result[1];

        const cards: TarotCard[] = [];
        for (let i = 0; i < cardNames.length; i++) {
            cards.push({
                name: cardNames[i],
                isReversed: isReversed[i]
            });
        }

        return cards;
    } catch (error: any) {
        console.error('Error in drawMultipleCards:', error);
        throw new Error('Failed to draw multiple tarot cards');
    }
};

export const startReading = async (question: string): Promise<string> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.startReading(question);
        return result;
    } catch (error: any) {
        console.error('Error in startReading:', error);
        throw new Error('Failed to start reading');
    }
};

export const performReading = async (sessionId: string, numCards: number): Promise<void> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        await contract.performReading(sessionId, numCards);
    } catch (error: any) {
        console.error('Error in performReading:', error);
        throw new Error('Failed to perform reading');
    }
};

export const completeReading = async (sessionId: string, interpretation: string): Promise<void> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        await contract.completeReading(sessionId, interpretation);
    } catch (error: any) {
        console.error('Error in completeReading:', error);
        throw new Error('Failed to complete reading');
    }
};

export const getUserProfile = async (userAddress: string): Promise<UserProfile> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.getUserProfile(userAddress);
        return {
            favoriteSpread: result[0],
            totalReadings: Number(result[1]),
            lastReadingTimestamp: Number(result[2]),
            hasSubscribed: result[3],
            readingHistory: result[4]
        };
    } catch (error: any) {
        console.error('Error in getUserProfile:', error);
        throw new Error('Failed to get user profile');
    }
};

export const getReadingSession = async (sessionId: string): Promise<ReadingSession> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.getReadingSession(sessionId);
        return {
            question: result[0],
            cards: result[1],
            reversals: result[2],
            interpretation: result[3],
            timestamp: Number(result[4]),
            isCompleted: result[5]
        };
    } catch (error: any) {
        console.error('Error in getReadingSession:', error);
        throw new Error('Failed to get reading session');
    }
};

export const getDailyReading = async (): Promise<TarotCard[]> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        const result = await contract.getDailyReading();
        const cardNames = result[0];
        const isReversed = result[1];

        const cards: TarotCard[] = [];
        for (let i = 0; i < cardNames.length; i++) {
            cards.push({
                name: cardNames[i],
                isReversed: isReversed[i]
            });
        }

        return cards;
    } catch (error: any) {
        console.error('Error in getDailyReading:', error);
        throw new Error('Failed to get daily reading');
    }
};

export const setFavoriteSpread = async (spread: string): Promise<void> => {
    if (!contract) {
        initializeReadOnlyProvider();
    }
    if (!contract) throw new Error('Contract not initialized');

    try {
        await contract.setFavoriteSpread(spread);
    } catch (error: any) {
        console.error('Error in setFavoriteSpread:', error);
        throw new Error('Failed to set favorite spread');
    }
};