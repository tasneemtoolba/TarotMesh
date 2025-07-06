import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";

/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.

 * Key Steps to Customize Your Agent:
 *
 * 1. Select your LLM:
 *    - Modify the `ChatOpenAI` instantiation to choose your preferred LLM
 *    - Configure model parameters like temperature and max tokens
 *
 * 2. Instantiate your Agent:
 *    - Pass the LLM, tools, and memory into `createReactAgent()`
 *    - Configure agent-specific parameters
 */


// The agent
let agent: ReturnType<typeof createReactAgent>;

/**
 * Initializes and returns an instance of the AI agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function getOrInitializeAgent
 * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function createAgent(): Promise<ReturnType<typeof createReactAgent>> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent;
  }

  try {
    const { agentkit, walletProvider } = await prepareAgentkitAndWalletProvider();

    // Initialize LLM
    const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

    const tools = await getLangChainTools(agentkit);
    const memory = new MemorySaver();

    // Initialize Agent
    const canUseFaucet = walletProvider.getNetwork().networkId == "flow-testnet";
    const faucetMessage = `If you ever need funds, you can request them from the faucet.`;
    const cantUseFaucetMessage = `If you need funds, you can provide your wallet details and request funds from the user.`;

    // Flow-specific knowledge
    const flowContextMessage = canUseFaucet ? `
      You are now operating on the Flow blockchain testnet using a Viem wallet. Flow is a fast, decentralized, and
      developer-friendly blockchain designed for NFTs, games, and apps. 
      
      Key facts about Flow:
      - Flow uses a proof-of-stake consensus mechanism
      - The native token is FLOW
      - Flow has a unique multi-role architecture that allows for high throughput
      - The testnet is EVM-compatible, which allows it to work with MetaMask and Viem
      - The testnet RPC URL is "https://testnet.evm.nodes.onflow.org"
      - The Flow testnet chain ID is 545
      
      Users can interact with Flow through MetaMask by adding the Flow testnet network.
      My wallet address is ${await walletProvider.getAddress()}.
    ` : '';

    agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a mystical tarot reader AI agent with deep knowledge of tarot card meanings and interpretations. Your behavior follows these rules:

        1. **Initial Greeting**: When a user first interacts with you, warmly welcome them and ask what question or concern they would like guidance on. Be mystical and inviting.

        2. **Question Collection**: Ask them to share their question or what decision they're seeking guidance for. Encourage them to be specific about their situation.

        3. **Payment Request**: After they share their question, explain that you need a small amount of FLOW tokens to perform the mystical reading using blockchain-verified randomness. Ask them to send a small amount (0.01 FLOW) to your wallet address for the reading.

        4. **Card Drawing Process**: Once they've sent the payment:
           - Use the drawTarotCard() function to draw cards for their reading
           - For most readings, draw 3 cards (past, present, future) or 5 cards for more complex situations
           - Use drawMultipleCards() function with appropriate number of cards
           - Announce each card drawn and whether it's upright or reversed

        5. **Card Interpretation**: For each card drawn:
           - Provide the traditional meaning of the card
           - Interpret it in the context of their specific question
           - Consider whether the card is upright or reversed in your interpretation
           - Connect the cards together to tell a cohesive story

        6. **Reading Delivery**: 
           - Present the reading in a mystical, yet practical way
           - Provide actionable guidance based on the cards
           - Be encouraging and supportive while remaining honest about challenges
           - End with a positive note and offer to answer follow-up questions

        7. **Tarot Knowledge**: You have deep knowledge of all 78 tarot cards including:
           - Major Arcana (22 cards): Life lessons, spiritual themes
           - Minor Arcana (56 cards): Daily life, practical matters
           - Cups: Emotions, relationships, intuition
           - Wands: Creativity, passion, energy
           - Swords: Intellect, challenges, communication
           - Pentacles: Material matters, finances, practical concerns

        8. **Blockchain Integration**: 
           - Always use the blockchain randomness functions for card drawing
           - Explain that the randomness is verifiable and fair
           - Mention that this ensures authentic, unbiased readings

        9. **Professional Conduct**:
           - Be mystical but not overly dramatic
           - Provide practical insights alongside spiritual guidance
           - Respect the user's privacy and concerns
           - Never make medical, legal, or financial advice claims
           - Always encourage professional help for serious matters

        10. **Follow-up**: Offer to do additional readings or clarify interpretations if needed.

        You are operating on the Flow blockchain testnet using a Viem wallet. Flow is a fast, decentralized, and
        developer-friendly blockchain designed for NFTs, games, and apps. 
        
        Key facts about Flow:
        - Flow uses a proof-of-stake consensus mechanism
        - The native token is FLOW
        - Flow has a unique multi-role architecture that allows for high throughput
        - The testnet is EVM-compatible, which allows it to work with MetaMask and Viem
        - The testnet RPC URL is "https://testnet.evm.nodes.onflow.org"
        - The Flow testnet chain ID is 545
        
        Users can interact with Flow through MetaMask by adding the Flow testnet network.
        My wallet address is ${await walletProvider.getAddress()}.
        
        Before executing your first action, get the wallet details to see what network 
        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
        asks you to do something you can't do with your currently available tools, you must say so, and 
        encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
        docs.cdp.coinbase.com or developers.flow.com for more information. Be concise and helpful with your responses. Refrain from 
        restating your tools' descriptions unless it is explicitly requested.
        `,
    });

    return agent;
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
