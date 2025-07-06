// Comprehensive tarot knowledge base for enhanced AI interpretations

export interface CardMeaning {
    name: string;
    upright: {
        keywords: string[];
        description: string;
        love: string;
        career: string;
        health: string;
        spirituality: string;
    };
    reversed: {
        keywords: string[];
        description: string;
        love: string;
        career: string;
        health: string;
        spirituality: string;
    };
    element?: 'fire' | 'water' | 'air' | 'earth';
    planet?: string;
    zodiac?: string;
}

export interface SpreadPattern {
    name: string;
    description: string;
    positions: {
        position: number;
        meaning: string;
        timeFrame?: string;
    }[];
    totalCards: number;
}

export const MAJOR_ARCANA: Record<string, CardMeaning> = {
    "The Fool": {
        name: "The Fool",
        upright: {
            keywords: ["new beginnings", "innocence", "spontaneity", "adventure", "free spirit"],
            description: "The Fool represents new beginnings, innocence, and the start of a journey. It suggests taking a leap of faith and embracing the unknown with optimism.",
            love: "New love, taking chances in relationships, fresh start",
            career: "New job opportunities, starting a business, taking risks",
            health: "New health routines, fresh energy, vitality",
            spirituality: "Spiritual awakening, trusting intuition, divine guidance"
        },
        reversed: {
            keywords: ["recklessness", "naivety", "foolishness", "carelessness"],
            description: "The Fool reversed warns against being too reckless or naive. It suggests the need for more careful planning and consideration.",
            love: "Being too trusting, ignoring red flags, immature behavior",
            career: "Poor planning, unrealistic expectations, lack of preparation",
            health: "Ignoring health warnings, reckless behavior",
            spirituality: "Spiritual confusion, lack of direction"
        },
        element: "air",
        planet: "Uranus"
    },
    "The Magician": {
        name: "The Magician",
        upright: {
            keywords: ["manifestation", "power", "skill", "concentration", "action"],
            description: "The Magician represents your ability to manifest your desires through focused willpower and action. You have all the tools you need.",
            love: "Taking action in love, using your charm and skills",
            career: "Using your talents effectively, seizing opportunities",
            health: "Taking control of your health, using available resources",
            spirituality: "Connecting with your spiritual power, manifestation"
        },
        reversed: {
            keywords: ["manipulation", "poor planning", "untapped talents"],
            description: "The Magician reversed suggests untapped potential or misuse of power. You may need to develop your skills or use them more wisely.",
            love: "Manipulation, not using your full potential in relationships",
            career: "Wasted opportunities, lack of focus, poor planning",
            health: "Not using available health resources, lack of discipline",
            spirituality: "Disconnection from spiritual power, lack of focus"
        },
        element: "air",
        planet: "Mercury"
    },
    "The High Priestess": {
        name: "The High Priestess",
        upright: {
            keywords: ["intuition", "mystery", "spirituality", "inner knowledge", "divine feminine"],
            description: "The High Priestess represents intuition, inner wisdom, and spiritual knowledge. Trust your gut feelings and listen to your inner voice.",
            love: "Intuitive feelings about relationships, spiritual connection",
            career: "Following your intuition in decisions, hidden opportunities",
            health: "Listening to your body's wisdom, spiritual healing",
            spirituality: "Deep spiritual connection, psychic abilities, meditation"
        },
        reversed: {
            keywords: ["secrets", "disconnection", "lack of center", "withdrawal"],
            description: "The High Priestess reversed suggests disconnection from intuition or keeping secrets. You may need to reconnect with your inner wisdom.",
            love: "Keeping secrets, not listening to intuition about love",
            career: "Ignoring gut feelings, missing hidden opportunities",
            health: "Ignoring body signals, disconnection from self",
            spirituality: "Spiritual disconnection, ignoring inner guidance"
        },
        element: "water",
        planet: "Moon"
    }
    // Add more Major Arcana cards here...
};

export const MINOR_ARCANA: Record<string, CardMeaning> = {
    "Ace of Cups": {
        name: "Ace of Cups",
        upright: {
            keywords: ["new love", "compassion", "creativity", "intuition", "spiritual awakening"],
            description: "The Ace of Cups represents new emotional beginnings, love, and spiritual awakening. It's a sign of emotional fulfillment and divine love.",
            love: "New love, emotional fulfillment, deep connection",
            career: "Creative inspiration, emotional satisfaction at work",
            health: "Emotional healing, spiritual wellness",
            spirituality: "Spiritual awakening, divine love, compassion"
        },
        reversed: {
            keywords: ["emotional loss", "blocked creativity", "depression"],
            description: "The Ace of Cups reversed suggests emotional blocks or loss. You may need to heal emotional wounds or open your heart again.",
            love: "Emotional blocks, past heartbreak affecting present",
            career: "Lack of inspiration, emotional dissatisfaction",
            health: "Emotional distress, spiritual disconnection",
            spirituality: "Blocked spiritual growth, lack of compassion"
        },
        element: "water",
        suit: "cups"
    },
    "Two of Cups": {
        name: "Two of Cups",
        upright: {
            keywords: ["partnership", "connection", "mutual attraction", "balance", "harmony"],
            description: "The Two of Cups represents partnership, connection, and mutual attraction. It suggests harmonious relationships and emotional balance.",
            love: "Deep partnership, mutual love, emotional harmony",
            career: "Successful partnerships, collaboration, teamwork",
            health: "Emotional balance, supportive relationships",
            spirituality: "Spiritual partnership, soul connections"
        },
        reversed: {
            keywords: ["broken relationships", "disharmony", "miscommunication"],
            description: "The Two of Cups reversed suggests relationship problems or disharmony. Communication and understanding may be needed.",
            love: "Relationship problems, lack of connection, disharmony",
            career: "Partnership conflicts, lack of teamwork",
            health: "Relationship stress affecting health",
            spirituality: "Disconnection from spiritual partners"
        },
        element: "water",
        suit: "cups"
    }
    // Add more Minor Arcana cards here...
};

export const SPREAD_PATTERNS: Record<string, SpreadPattern> = {
    "Past-Present-Future": {
        name: "Past-Present-Future",
        description: "A simple three-card spread showing the progression of your situation",
        positions: [
            { position: 1, meaning: "Past influences affecting your situation", timeFrame: "Past" },
            { position: 2, meaning: "Current circumstances and energy", timeFrame: "Present" },
            { position: 3, meaning: "Potential future outcomes", timeFrame: "Future" }
        ],
        totalCards: 3
    },
    "Celtic Cross": {
        name: "Celtic Cross",
        description: "A comprehensive ten-card spread for detailed readings",
        positions: [
            { position: 1, meaning: "Present situation - what's happening now" },
            { position: 2, meaning: "Challenge - what's blocking you" },
            { position: 3, meaning: "Past foundation - what led to this" },
            { position: 4, meaning: "Recent past - what's just happened" },
            { position: 5, meaning: "Possible future - what could happen" },
            { position: 6, meaning: "Near future - what's coming soon" },
            { position: 7, meaning: "Your approach - how you're handling it" },
            { position: 8, meaning: "External influences - what others are doing" },
            { position: 9, meaning: "Hopes and fears - your inner thoughts" },
            { position: 10, meaning: "Final outcome - the resolution" }
        ],
        totalCards: 10
    },
    "Relationship Spread": {
        name: "Relationship Spread",
        description: "A seven-card spread specifically for relationship questions",
        positions: [
            { position: 1, meaning: "You in the relationship" },
            { position: 2, meaning: "Your partner in the relationship" },
            { position: 3, meaning: "What brings you together" },
            { position: 4, meaning: "What challenges you face" },
            { position: 5, meaning: "What you need to work on" },
            { position: 6, meaning: "What your partner needs to work on" },
            { position: 7, meaning: "The future of your relationship" }
        ],
        totalCards: 7
    }
};

export const ELEMENTAL_MEANINGS = {
    fire: {
        keywords: ["passion", "energy", "creativity", "transformation", "action"],
        description: "Fire represents passion, energy, and transformation. It's about taking action and following your desires."
    },
    water: {
        keywords: ["emotions", "intuition", "relationships", "healing", "flow"],
        description: "Water represents emotions, intuition, and relationships. It's about going with the flow and trusting your feelings."
    },
    air: {
        keywords: ["intellect", "communication", "ideas", "freedom", "clarity"],
        description: "Air represents intellect, communication, and ideas. It's about thinking clearly and expressing yourself."
    },
    earth: {
        keywords: ["stability", "practicality", "material", "grounding", "nurturing"],
        description: "Earth represents stability, practicality, and material matters. It's about being grounded and taking care of practical needs."
    }
};

export const NUMEROLOGY_MEANINGS = {
    1: "New beginnings, independence, leadership",
    2: "Partnership, balance, harmony, choice",
    3: "Creativity, growth, expansion, communication",
    4: "Stability, foundation, structure, security",
    5: "Change, freedom, adventure, conflict",
    6: "Harmony, balance, responsibility, service",
    7: "Spirituality, wisdom, introspection, mystery",
    8: "Power, achievement, material success, karma",
    9: "Completion, fulfillment, wisdom, letting go",
    10: "Completion of a cycle, new beginning, mastery"
};

export function getCardMeaning(cardName: string): CardMeaning | null {
    return MAJOR_ARCANA[cardName] || MINOR_ARCANA[cardName] || null;
}

export function getSpreadPattern(spreadName: string): SpreadPattern | null {
    return SPREAD_PATTERNS[spreadName] || null;
}

export function interpretCardInContext(
    card: CardMeaning,
    isReversed: boolean,
    position: string,
    question: string
): string {
    const meaning = isReversed ? card.reversed : card.upright;

    // Context-specific interpretation
    if (question.toLowerCase().includes('love') || question.toLowerCase().includes('relationship')) {
        return meaning.love;
    } else if (question.toLowerCase().includes('career') || question.toLowerCase().includes('job') || question.toLowerCase().includes('work')) {
        return meaning.career;
    } else if (question.toLowerCase().includes('health')) {
        return meaning.health;
    } else if (question.toLowerCase().includes('spiritual') || question.toLowerCase().includes('spirituality')) {
        return meaning.spirituality;
    }

    return meaning.description;
}

export function getElementalInfluence(cards: string[]): string {
    const elements: Record<string, number> = { fire: 0, water: 0, air: 0, earth: 0 };

    cards.forEach(cardName => {
        const card = getCardMeaning(cardName);
        if (card?.element) {
            elements[card.element]++;
        }
    });

    const dominantElement = Object.entries(elements).reduce((a, b) => elements[a[0]] > elements[b[0]] ? a : b)[0];

    return ELEMENTAL_MEANINGS[dominantElement as keyof typeof ELEMENTAL_MEANINGS].description;
} 