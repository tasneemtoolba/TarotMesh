export interface TarotCard {
    name: string;
    suit?: string;
    number?: number;
    isReversed: boolean;
    description: string;
    keywords: string[];
}

export const TAROT_DECK: TarotCard[] = [
    // Major Arcana (22 cards)
    { name: "The Fool", suit: "Major Arcana", number: 0, isReversed: false, description: "New beginnings, innocence, spontaneity", keywords: ["beginnings", "innocence", "adventure", "spontaneity"] },
    { name: "The Magician", suit: "Major Arcana", number: 1, isReversed: false, description: "Manifestation, resourcefulness, power", keywords: ["manifestation", "power", "skill", "concentration"] },
    { name: "The High Priestess", suit: "Major Arcana", number: 2, isReversed: false, description: "Intuition, sacred knowledge, divine feminine", keywords: ["intuition", "mystery", "spirituality", "inner knowledge"] },
    { name: "The Empress", suit: "Major Arcana", number: 3, isReversed: false, description: "Femininity, beauty, nature, abundance", keywords: ["femininity", "beauty", "nature", "abundance"] },
    { name: "The Emperor", suit: "Major Arcana", number: 4, isReversed: false, description: "Authority, structure, control, fatherhood", keywords: ["authority", "structure", "control", "fatherhood"] },
    { name: "The Hierophant", suit: "Major Arcana", number: 5, isReversed: false, description: "Spiritual wisdom, religious beliefs, conformity", keywords: ["tradition", "conformity", "morality", "ethics"] },
    { name: "The Lovers", suit: "Major Arcana", number: 6, isReversed: false, description: "Love, harmony, relationships, choices", keywords: ["love", "harmony", "relationships", "choices"] },
    { name: "The Chariot", suit: "Major Arcana", number: 7, isReversed: false, description: "Control, willpower, determination, success", keywords: ["control", "willpower", "determination", "success"] },
    { name: "Strength", suit: "Major Arcana", number: 8, isReversed: false, description: "Inner strength, courage, persuasion, influence", keywords: ["strength", "courage", "persuasion", "influence"] },
    { name: "The Hermit", suit: "Major Arcana", number: 9, isReversed: false, description: "Soul-searching, introspection, solitude", keywords: ["soul-searching", "introspection", "solitude", "guidance"] },
    { name: "Wheel of Fortune", suit: "Major Arcana", number: 10, isReversed: false, description: "Good luck, karma, life cycles, destiny", keywords: ["luck", "karma", "destiny", "turning point"] },
    { name: "Justice", suit: "Major Arcana", number: 11, isReversed: false, description: "Justice, fairness, truth, cause and effect", keywords: ["justice", "fairness", "truth", "cause and effect"] },
    { name: "The Hanged Man", suit: "Major Arcana", number: 12, isReversed: false, description: "Surrender, letting go, new perspectives", keywords: ["surrender", "letting go", "new perspectives", "sacrifice"] },
    { name: "Death", suit: "Major Arcana", number: 13, isReversed: false, description: "Endings, change, transformation, transition", keywords: ["endings", "change", "transformation", "transition"] },
    { name: "Temperance", suit: "Major Arcana", number: 14, isReversed: false, description: "Balance, moderation, patience, purpose", keywords: ["balance", "moderation", "patience", "purpose"] },
    { name: "The Devil", suit: "Major Arcana", number: 15, isReversed: false, description: "Shadow self, attachment, addiction, materialism", keywords: ["shadow self", "attachment", "addiction", "materialism"] },
    { name: "The Tower", suit: "Major Arcana", number: 16, isReversed: false, description: "Sudden change, upheaval, chaos, revelation", keywords: ["sudden change", "upheaval", "chaos", "revelation"] },
    { name: "The Star", suit: "Major Arcana", number: 17, isReversed: false, description: "Hope, faith, purpose, renewal, spirituality", keywords: ["hope", "faith", "purpose", "renewal"] },
    { name: "The Moon", suit: "Major Arcana", number: 18, isReversed: false, description: "Illusion, fear, anxiety, subconscious", keywords: ["illusion", "fear", "anxiety", "subconscious"] },
    { name: "The Sun", suit: "Major Arcana", number: 19, isReversed: false, description: "Positivity, fun, warmth, success, vitality", keywords: ["positivity", "fun", "warmth", "success"] },
    { name: "Judgement", suit: "Major Arcana", number: 20, isReversed: false, description: "Judgement, rebirth, inner calling, absolution", keywords: ["judgement", "rebirth", "inner calling", "absolution"] },
    { name: "The World", suit: "Major Arcana", number: 21, isReversed: false, description: "Completion, integration, accomplishment, travel", keywords: ["completion", "integration", "accomplishment", "travel"] },

    // Wands (14 cards)
    { name: "Ace of Wands", suit: "Wands", number: 1, isReversed: false, description: "Creation, willpower, inspiration, desire", keywords: ["creation", "willpower", "inspiration", "desire"] },
    { name: "Two of Wands", suit: "Wands", number: 2, isReversed: false, description: "Planning, making decisions, leaving comfort zone", keywords: ["planning", "decisions", "comfort zone", "future"] },
    { name: "Three of Wands", suit: "Wands", number: 3, isReversed: false, description: "Looking ahead, expansion, rapid growth", keywords: ["expansion", "growth", "adventure", "exploration"] },
    { name: "Four of Wands", suit: "Wands", number: 4, isReversed: false, description: "Celebration, joy, harmony, relaxation, homecoming", keywords: ["celebration", "joy", "harmony", "homecoming"] },
    { name: "Five of Wands", suit: "Wands", number: 5, isReversed: false, description: "Conflict, disagreements, competition, tension", keywords: ["conflict", "disagreements", "competition", "tension"] },
    { name: "Six of Wands", suit: "Wands", number: 6, isReversed: false, description: "Success, public recognition, progress, self-confidence", keywords: ["success", "recognition", "progress", "confidence"] },
    { name: "Seven of Wands", suit: "Wands", number: 7, isReversed: false, description: "Perseverance, defensive position, maintaining control", keywords: ["perseverance", "defense", "control", "challenge"] },
    { name: "Eight of Wands", suit: "Wands", number: 8, isReversed: false, description: "Rapid action, movement, quick decisions, air travel", keywords: ["rapid action", "movement", "decisions", "travel"] },
    { name: "Nine of Wands", suit: "Wands", number: 9, isReversed: false, description: "Resilience, courage, persistence, test of faith", keywords: ["resilience", "courage", "persistence", "faith"] },
    { name: "Ten of Wands", suit: "Wands", number: 10, isReversed: false, description: "Burden, extra responsibility, hard work, completion", keywords: ["burden", "responsibility", "hard work", "completion"] },
    { name: "Page of Wands", suit: "Wands", number: 11, isReversed: false, description: "Exploration, excitement, freedom, adventure", keywords: ["exploration", "excitement", "freedom", "adventure"] },
    { name: "Knight of Wands", suit: "Wands", number: 12, isReversed: false, description: "Energy, passion, lust, action, adventure, impulsiveness", keywords: ["energy", "passion", "action", "adventure"] },
    { name: "Queen of Wands", suit: "Wands", number: 13, isReversed: false, description: "Courageous, determined, independent, vivacious, sassy", keywords: ["courage", "determination", "independence", "vivacious"] },
    { name: "King of Wands", suit: "Wands", number: 14, isReversed: false, description: "Natural-born leader, vision, entrepreneur, honour", keywords: ["leadership", "vision", "entrepreneur", "honor"] },

    // Cups (14 cards)
    { name: "Ace of Cups", suit: "Cups", number: 1, isReversed: false, description: "New feelings, spirituality, intuition, love", keywords: ["new feelings", "spirituality", "intuition", "love"] },
    { name: "Two of Cups", suit: "Cups", number: 2, isReversed: false, description: "Unity, partnership, connection, attraction", keywords: ["unity", "partnership", "connection", "attraction"] },
    { name: "Three of Cups", suit: "Cups", number: 3, isReversed: false, description: "Friendship, creativity, collaborations, joy", keywords: ["friendship", "creativity", "collaboration", "joy"] },
    { name: "Four of Cups", suit: "Cups", number: 4, isReversed: false, description: "Meditation, contemplation, apathy, reevaluation", keywords: ["meditation", "contemplation", "apathy", "reevaluation"] },
    { name: "Five of Cups", suit: "Cups", number: 5, isReversed: false, description: "Regret, failure, disappointment, pessimism", keywords: ["regret", "failure", "disappointment", "pessimism"] },
    { name: "Six of Cups", suit: "Cups", number: 6, isReversed: false, description: "Revisiting the past, childhood memories, innocence", keywords: ["past", "memories", "innocence", "nostalgia"] },
    { name: "Seven of Cups", suit: "Cups", number: 7, isReversed: false, description: "Opportunities, choices, wishful thinking, illusion", keywords: ["opportunities", "choices", "illusion", "fantasy"] },
    { name: "Eight of Cups", suit: "Cups", number: 8, isReversed: false, description: "Disappointment, abandonment, withdrawal, escapism", keywords: ["disappointment", "abandonment", "withdrawal", "escapism"] },
    { name: "Nine of Cups", suit: "Cups", number: 9, isReversed: false, description: "Contentment, satisfaction, gratitude, wish come true", keywords: ["contentment", "satisfaction", "gratitude", "wishes"] },
    { name: "Ten of Cups", suit: "Cups", number: 10, isReversed: false, description: "Divine love, blissful relationships, harmony, alignment", keywords: ["divine love", "bliss", "harmony", "alignment"] },
    { name: "Page of Cups", suit: "Cups", number: 11, isReversed: false, description: "Creative opportunities, intuitive messages, curiosity", keywords: ["creativity", "intuition", "curiosity", "messages"] },
    { name: "Knight of Cups", suit: "Cups", number: 12, isReversed: false, description: "Creativity, romance, charm, imagination, beauty", keywords: ["creativity", "romance", "charm", "imagination"] },
    { name: "Queen of Cups", suit: "Cups", number: 13, isReversed: false, description: "Compassionate, caring, emotionally stable, intuitive", keywords: ["compassion", "caring", "emotional", "intuitive"] },
    { name: "King of Cups", suit: "Cups", number: 14, isReversed: false, description: "Emotional balance and control, generosity", keywords: ["emotional balance", "control", "generosity", "wisdom"] },

    // Swords (14 cards)
    { name: "Ace of Swords", suit: "Swords", number: 1, isReversed: false, description: "Breakthrough, clarity, sharp mind, new ideas", keywords: ["breakthrough", "clarity", "sharp mind", "new ideas"] },
    { name: "Two of Swords", suit: "Swords", number: 2, isReversed: false, description: "Difficult decisions, weighing up options, an impasse", keywords: ["decisions", "options", "impasse", "balance"] },
    { name: "Three of Swords", suit: "Swords", number: 3, isReversed: false, description: "Heartbreak, emotional pain, sorrow, grief", keywords: ["heartbreak", "pain", "sorrow", "grief"] },
    { name: "Four of Swords", suit: "Swords", number: 4, isReversed: false, description: "Rest, relaxation, meditation, contemplation", keywords: ["rest", "relaxation", "meditation", "contemplation"] },
    { name: "Five of Swords", suit: "Swords", number: 5, isReversed: false, description: "Conflict, disagreements, competition, defeat", keywords: ["conflict", "disagreements", "competition", "defeat"] },
    { name: "Six of Swords", suit: "Swords", number: 6, isReversed: false, description: "Transition, change, rite of passage, releasing baggage", keywords: ["transition", "change", "passage", "baggage"] },
    { name: "Seven of Swords", suit: "Swords", number: 7, isReversed: false, description: "Betrayal, deception, getting away with something", keywords: ["betrayal", "deception", "secrets", "stealth"] },
    { name: "Eight of Swords", suit: "Swords", number: 8, isReversed: false, description: "Negative thoughts, self-imposed restriction, imprisonment", keywords: ["negative thoughts", "restriction", "imprisonment", "limitation"] },
    { name: "Nine of Swords", suit: "Swords", number: 9, isReversed: false, description: "Anxiety, worry, fear, depression, nightmares", keywords: ["anxiety", "worry", "fear", "depression"] },
    { name: "Ten of Swords", suit: "Swords", number: 10, isReversed: false, description: "Painful endings, deep wounds, betrayal, loss", keywords: ["painful endings", "wounds", "betrayal", "loss"] },
    { name: "Page of Swords", suit: "Swords", number: 11, isReversed: false, description: "New ideas, curiosity, thirst for knowledge, new ways", keywords: ["new ideas", "curiosity", "knowledge", "communication"] },
    { name: "Knight of Swords", suit: "Swords", number: 12, isReversed: false, description: "Ambitious, action-oriented, driven to succeed, fast-thinking", keywords: ["ambition", "action", "success", "fast-thinking"] },
    { name: "Queen of Swords", suit: "Swords", number: 13, isReversed: false, description: "Independent, unbiased judgement, clear boundaries", keywords: ["independent", "judgement", "boundaries", "clarity"] },
    { name: "King of Swords", suit: "Swords", number: 14, isReversed: false, description: "Mental clarity, intellectual power, authority, truth", keywords: ["mental clarity", "intellectual power", "authority", "truth"] },

    // Pentacles (14 cards)
    { name: "Ace of Pentacles", suit: "Pentacles", number: 1, isReversed: false, description: "New financial opportunity, abundance, prosperity", keywords: ["financial opportunity", "abundance", "prosperity", "new beginnings"] },
    { name: "Two of Pentacles", suit: "Pentacles", number: 2, isReversed: false, description: "Multiple priorities, time management, prioritisation", keywords: ["priorities", "time management", "balance", "adaptability"] },
    { name: "Three of Pentacles", suit: "Pentacles", number: 3, isReversed: false, description: "Teamwork, collaboration, building, learning", keywords: ["teamwork", "collaboration", "building", "learning"] },
    { name: "Four of Pentacles", suit: "Pentacles", number: 4, isReversed: false, description: "Saving money, security, conservatism, scarcity", keywords: ["saving", "security", "conservatism", "scarcity"] },
    { name: "Five of Pentacles", suit: "Pentacles", number: 5, isReversed: false, description: "Financial loss, poverty, lack mindset, isolation", keywords: ["financial loss", "poverty", "lack", "isolation"] },
    { name: "Six of Pentacles", suit: "Pentacles", number: 6, isReversed: false, description: "Giving, receiving, sharing wealth, generosity", keywords: ["giving", "receiving", "sharing", "generosity"] },
    { name: "Seven of Pentacles", suit: "Pentacles", number: 7, isReversed: false, description: "Long-term view, sustainable results, perseverance", keywords: ["long-term", "sustainable", "perseverance", "patience"] },
    { name: "Eight of Pentacles", suit: "Pentacles", number: 8, isReversed: false, description: "Apprenticeship, repetitive tasks, skill development", keywords: ["apprenticeship", "skill development", "dedication", "craftsmanship"] },
    { name: "Nine of Pentacles", suit: "Pentacles", number: 9, isReversed: false, description: "Abundance, luxury, self-sufficiency, financial independence", keywords: ["abundance", "luxury", "self-sufficiency", "independence"] },
    { name: "Ten of Pentacles", suit: "Pentacles", number: 10, isReversed: false, description: "Wealth, financial security, family, long-term success", keywords: ["wealth", "security", "family", "success"] },
    { name: "Page of Pentacles", suit: "Pentacles", number: 11, isReversed: false, description: "Manifestation, financial opportunity, new job", keywords: ["manifestation", "opportunity", "new job", "learning"] },
    { name: "Knight of Pentacles", suit: "Pentacles", number: 12, isReversed: false, description: "Hard work, productivity, routine, conservatism", keywords: ["hard work", "productivity", "routine", "conservatism"] },
    { name: "Queen of Pentacles", suit: "Pentacles", number: 13, isReversed: false, description: "Nurturing, practical, providing financially, a working parent", keywords: ["nurturing", "practical", "providing", "working parent"] },
    { name: "King of Pentacles", suit: "Pentacles", number: 14, isReversed: false, description: "Wealth, business, leadership, security, discipline", keywords: ["wealth", "business", "leadership", "security"] }
];

export function shuffleDeck(): TarotCard[] {
    const shuffled = [...TAROT_DECK];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function drawCards(numCards: number): TarotCard[] {
    const shuffled = shuffleDeck();
    const drawn = shuffled.slice(0, numCards);

    // Randomly reverse some cards (about 30% chance)
    return drawn.map(card => ({
        ...card,
        isReversed: Math.random() < 0.3
    }));
}

export function getCardEmoji(card: TarotCard): string {
    if (card.suit === "Major Arcana") {
        return "🎴";
    }
    switch (card.suit) {
        case "Wands": return "🔥";
        case "Cups": return "💧";
        case "Swords": return "⚔️";
        case "Pentacles": return "💰";
        default: return "🎴";
    }
} 