// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CadenceRandomConsumer} from "@onflow/flow-sol-utils/src/random/CadenceRandomConsumer.sol";

contract TarotReader is CadenceRandomConsumer {
    // Tarot card structure
    struct TarotCard {
        string name;
        string meaning;
        bool isReversed;
    }

    // User preferences and reading history
    struct UserProfile {
        string favoriteSpread;
        uint256 totalReadings;
        uint256 lastReadingTimestamp;
        bool hasSubscribed;
        string[] readingHistory;
    }

    // Reading session
    struct ReadingSession {
        string question;
        string[] cards;
        bool[] reversals;
        string interpretation;
        uint256 timestamp;
        bool isCompleted;
    }

    // Mapping user addresses to their profiles
    mapping(address => UserProfile) public userProfiles;

    // Mapping session IDs to reading sessions
    mapping(bytes32 => ReadingSession) public readingSessions;

    // Events
    event ReadingStarted(
        bytes32 indexed sessionId,
        address indexed user,
        string question
    );
    event CardsDrawn(
        bytes32 indexed sessionId,
        string[] cards,
        bool[] reversals
    );
    event ReadingCompleted(bytes32 indexed sessionId, string interpretation);
    event UserSubscribed(address indexed user);
    event DailyReading(address indexed user, string[] cards);

    // Major Arcana cards
    string[] public majorArcana = [
        "The Fool",
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Strength",
        "The Hermit",
        "Wheel of Fortune",
        "Justice",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgement",
        "The World"
    ];

    // Minor Arcana - Cups (emotions, relationships)
    string[] public cups = [
        "Ace of Cups",
        "Two of Cups",
        "Three of Cups",
        "Four of Cups",
        "Five of Cups",
        "Six of Cups",
        "Seven of Cups",
        "Eight of Cups",
        "Nine of Cups",
        "Ten of Cups",
        "Page of Cups",
        "Knight of Cups",
        "Queen of Cups",
        "King of Cups"
    ];

    // Minor Arcana - Wands (creativity, passion)
    string[] public wands = [
        "Ace of Wands",
        "Two of Wands",
        "Three of Wands",
        "Four of Wands",
        "Five of Wands",
        "Six of Wands",
        "Seven of Wands",
        "Eight of Wands",
        "Nine of Wands",
        "Ten of Wands",
        "Page of Wands",
        "Knight of Wands",
        "Queen of Wands",
        "King of Wands"
    ];

    // Minor Arcana - Swords (intellect, challenges)
    string[] public swords = [
        "Ace of Swords",
        "Two of Swords",
        "Three of Swords",
        "Four of Swords",
        "Five of Swords",
        "Six of Swords",
        "Seven of Swords",
        "Eight of Swords",
        "Nine of Swords",
        "Ten of Swords",
        "Page of Swords",
        "Knight of Swords",
        "Queen of Swords",
        "King of Swords"
    ];

    // Minor Arcana - Pentacles (material, practical)
    string[] public pentacles = [
        "Ace of Pentacles",
        "Two of Pentacles",
        "Three of Pentacles",
        "Four of Pentacles",
        "Five of Pentacles",
        "Six of Pentacles",
        "Seven of Pentacles",
        "Eight of Pentacles",
        "Nine of Pentacles",
        "Ten of Pentacles",
        "Page of Pentacles",
        "Knight of Pentacles",
        "Queen of Pentacles",
        "King of Pentacles"
    ];

    /**
     * Starts a new tarot reading session
     * @param question The user's question
     * @return sessionId Unique identifier for the reading session
     */
    function startReading(
        string memory question
    ) public returns (bytes32 sessionId) {
        sessionId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, question)
        );

        readingSessions[sessionId] = ReadingSession({
            question: question,
            cards: new string[](0),
            reversals: new bool[](0),
            interpretation: "",
            timestamp: block.timestamp,
            isCompleted: false
        });

        // Update user profile
        userProfiles[msg.sender].totalReadings++;
        userProfiles[msg.sender].lastReadingTimestamp = block.timestamp;

        emit ReadingStarted(sessionId, msg.sender, question);
        return sessionId;
    }

    /**
     * Draws a random tarot card
     * @return cardName The name of the drawn card
     * @return isReversed Whether the card is reversed
     */
    function drawTarotCard()
        public
        view
        returns (string memory cardName, bool isReversed)
    {
        // Generate random number for card selection (0-77 for all 78 tarot cards)
        uint64 cardIndex = _getRevertibleRandomInRange(0, 77);

        // Generate random number for reversal (0-1)
        uint64 reversalRoll = _getRevertibleRandomInRange(0, 1);
        isReversed = reversalRoll == 1;

        // Determine which deck the card belongs to
        if (cardIndex < 22) {
            // Major Arcana (0-21)
            cardName = majorArcana[cardIndex];
        } else if (cardIndex < 36) {
            // Cups (22-35)
            cardName = cups[cardIndex - 22];
        } else if (cardIndex < 50) {
            // Wands (36-49)
            cardName = wands[cardIndex - 36];
        } else if (cardIndex < 64) {
            // Swords (50-63)
            cardName = swords[cardIndex - 50];
        } else {
            // Pentacles (64-77)
            cardName = pentacles[cardIndex - 64];
        }

        return (cardName, isReversed);
    }

    /**
     * Draws multiple cards for a reading
     * @param numCards Number of cards to draw (1-10)
     * @return cardNames Array of card names
     * @return isReversed Array of reversal status
     */
    function drawMultipleCards(
        uint8 numCards
    )
        public
        view
        returns (string[] memory cardNames, bool[] memory isReversed)
    {
        require(numCards > 0 && numCards <= 10, "Can only draw 1-10 cards");

        cardNames = new string[](numCards);
        isReversed = new bool[](numCards);

        for (uint8 i = 0; i < numCards; i++) {
            (cardNames[i], isReversed[i]) = drawTarotCard();
        }

        return (cardNames, isReversed);
    }

    /**
     * Performs a complete reading with cards and stores the result
     * @param sessionId The reading session ID
     * @param numCards Number of cards to draw
     */
    function performReading(bytes32 sessionId, uint8 numCards) public {
        require(
            readingSessions[sessionId].timestamp > 0,
            "Session does not exist"
        );
        require(
            !readingSessions[sessionId].isCompleted,
            "Reading already completed"
        );

        (string[] memory cards, bool[] memory reversals) = drawMultipleCards(
            numCards
        );

        readingSessions[sessionId].cards = cards;
        readingSessions[sessionId].reversals = reversals;

        emit CardsDrawn(sessionId, cards, reversals);
    }

    /**
     * Completes a reading with interpretation
     * @param sessionId The reading session ID
     * @param interpretation The AI-generated interpretation
     */
    function completeReading(
        bytes32 sessionId,
        string memory interpretation
    ) public {
        require(
            readingSessions[sessionId].timestamp > 0,
            "Session does not exist"
        );
        require(
            !readingSessions[sessionId].isCompleted,
            "Reading already completed"
        );

        readingSessions[sessionId].interpretation = interpretation;
        readingSessions[sessionId].isCompleted = true;

        // Store in user's reading history
        userProfiles[msg.sender].readingHistory.push(interpretation);

        emit ReadingCompleted(sessionId, interpretation);
    }

    /**
     * Subscribes user to daily readings
     */
    function subscribeToDailyReadings() public {
        userProfiles[msg.sender].hasSubscribed = true;
        emit UserSubscribed(msg.sender);
    }

    /**
     * Gets daily reading for subscribed users
     * @return cards Array of daily cards
     * @return reversals Array of reversal status
     */
    function getDailyReading()
        public
        view
        returns (string[] memory cards, bool[] memory reversals)
    {
        require(userProfiles[msg.sender].hasSubscribed, "User not subscribed");

        // Draw 3 cards for daily reading
        (cards, reversals) = drawMultipleCards(3);

        return (cards, reversals);
    }

    /**
     * Sets user's favorite spread
     * @param spread The preferred spread type
     */
    function setFavoriteSpread(string memory spread) public {
        userProfiles[msg.sender].favoriteSpread = spread;
    }

    /**
     * Gets user profile
     * @param user The user address
     * @return profile The user's profile
     */
    function getUserProfile(
        address user
    ) public view returns (UserProfile memory profile) {
        return userProfiles[user];
    }

    /**
     * Gets reading session
     * @param sessionId The session ID
     * @return session The reading session
     */
    function getReadingSession(
        bytes32 sessionId
    ) public view returns (ReadingSession memory session) {
        return readingSessions[sessionId];
    }

    /**
     * Gets a random number for general use
     * @return randomNumber A random number between 1 and 100
     */
    function getRandomNumber() public view returns (uint64) {
        return _getRevertibleRandomInRange(1, 100);
    }
}
