"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import ReactMarkdown from "react-markdown";
import { configManager } from "./lib/decentralized-config";
import { TarotCard, drawCards, getCardEmoji } from "./lib/tarot-deck";

/**
 * Home page for the Tarot Reader AI Agent
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();
  const [currentTheme, setCurrentTheme] = useState(configManager.getCurrentTheme());
  const [showCards, setShowCards] = useState(false);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isCardFlipping, setIsCardFlipping] = useState(false);

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Apply theme on mount
  useEffect(() => {
    const theme = configManager.getCurrentTheme();
    setCurrentTheme(theme);
    configManager.applyCurrentTheme();
  }, []);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");

    // Simulate card drawing animation
    if (message.toLowerCase().includes('reading') || message.toLowerCase().includes('cards')) {
      setShowCards(true);
      setIsCardFlipping(true);

      // Simulate drawing cards
      setTimeout(() => {
        // Draw 3 random cards from the full tarot deck
        const drawnCards = drawCards(3);
        setDrawnCards(drawnCards);
        setIsCardFlipping(false);
      }, 2000);
    }

    await sendMessage(message);
  };

  const CardComponent = ({ card, index }: { card: TarotCard; index: number }) => (
    <div
      className={`card-container relative transform transition-all duration-1000 ${isCardFlipping ? 'animate-card-draw' : ''
        }`}
      style={{
        animationDelay: `${index * 0.3}s`,
        transform: isCardFlipping ? 'translateY(-100px) rotate(-10deg)' : 'translateY(0) rotate(0deg)'
      }}
    >
      <div className="card bg-gradient-to-br from-theme-primary to-theme-secondary rounded-xl p-4 shadow-2xl border-2 border-theme-accent/30 hover:border-theme-accent/60 transition-all duration-300 hover:scale-105 mystical-glow min-w-[220px]">
        <div className="card-inner relative">
          <div className="card-front">
            <div className="text-center">
              <div className="text-3xl mb-2">{getCardEmoji(card)}</div>
              <h3 className="font-bold text-white text-lg mb-1">{card.name}</h3>
              {card.suit && (
                <div className="text-theme-text/80 text-sm mb-2">{card.suit}</div>
              )}
              <div className={`text-sm px-2 py-1 rounded-full inline-block ${card.isReversed
                ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                : 'bg-green-500/20 text-green-300 border border-green-400/30'
                }`}>
                {card.isReversed ? 'Reversed' : 'Upright'}
              </div>
              <div className="text-theme-text/90 text-xs mt-2 px-2">
                {card.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{ background: currentTheme.colors.background }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h2 className="text-lg font-semibold text-theme-primary">✨ Mystical Tarot</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-2 mystical-glow">
              🔮 Tarot Reader
            </h1>
            <a
              href="/settings"
              className="text-theme-primary hover:text-theme-secondary text-lg p-3 rounded-full hover:bg-theme-primary/20 transition-all duration-300 mystical-glow"
              title="Settings"
            >
              ⚙️
            </a>
          </div>
          <p className="text-theme-text text-lg max-w-2xl mx-auto">
            Ask your question and receive guidance from the mystical cards, powered by blockchain randomness
          </p>
        </div>

        {/* Cards Display */}
        {showCards && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-theme-primary mb-2">🎴 Your Cards</h3>
              <p className="text-theme-text">The universe has revealed these cards for you...</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {drawnCards.map((card, index) => (
                <CardComponent key={index} card={card} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl h-[600px] flex flex-col">
              <div className="flex-grow overflow-y-auto space-y-4 p-2" ref={chatContainerRef}>
                {messages.length === 0 ? (
                  <div className="text-center text-theme-primary h-full flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4 animate-bounce">🔮</div>
                    <h2 className="text-2xl font-bold mb-2">Welcome to Your Mystical Journey</h2>
                    <p className="text-theme-text mb-4 max-w-md">
                      Ask me about your future, decisions, or anything you seek guidance on.
                      The cards will reveal the wisdom you need.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-theme-primary/20 p-3 rounded-lg border border-theme-accent/30">
                        <div className="font-semibold text-theme-primary">💕 Love & Relationships</div>
                        <div className="text-theme-text">Romance, partnerships, connections</div>
                      </div>
                      <div className="bg-theme-primary/20 p-3 rounded-lg border border-theme-accent/30">
                        <div className="font-semibold text-theme-primary">💼 Career & Work</div>
                        <div className="text-theme-text">Jobs, business, professional growth</div>
                      </div>
                      <div className="bg-theme-primary/20 p-3 rounded-lg border border-theme-accent/30">
                        <div className="font-semibold text-theme-primary">🌱 Personal Growth</div>
                        <div className="text-theme-text">Self-discovery, transformation</div>
                      </div>
                      <div className="bg-theme-primary/20 p-3 rounded-lg border border-theme-accent/30">
                        <div className="font-semibold text-theme-primary">✨ Spirituality</div>
                        <div className="text-theme-text">Inner wisdom, divine guidance</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${msg.sender === "user"
                          ? "bg-gradient-to-br from-theme-primary to-theme-secondary text-white border border-theme-accent/30"
                          : "bg-white/20 backdrop-blur-sm border border-theme-primary/20"
                          }`}
                      >
                        <ReactMarkdown
                          components={{
                            a: props => (
                              <a
                                {...props}
                                className="text-theme-accent underline hover:text-theme-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}

                {/* Thinking Indicator */}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/20 backdrop-blur-sm border border-theme-primary/20 rounded-2xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-theme-accent rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-theme-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-theme-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-white font-medium italic">🔮 Consulting the mystical cards...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invisible div to track the bottom */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="mt-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    className="flex-grow p-4 rounded-xl border border-theme-primary/30 bg-white/10 backdrop-blur-sm text-white placeholder-theme-text/70 focus:outline-none focus:ring-2 focus:ring-theme-accent/50 focus:border-theme-accent/50 transition-all duration-300"
                    placeholder="Ask your question or share your concern..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && onSendMessage()}
                    disabled={isThinking}
                  />
                  <button
                    onClick={onSendMessage}
                    className={`p-4 rounded-xl font-semibold transition-all duration-300 ${isThinking
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "btn-mystical"
                      }`}
                    disabled={isThinking}
                  >
                    🔮
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl">
              <h3 className="text-xl font-bold text-theme-primary mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setInput("Should I change jobs?")}
                  className="w-full p-3 text-left bg-theme-primary/20 hover:bg-theme-primary/30 rounded-lg border border-theme-accent/30 transition-all duration-300"
                >
                  <div className="font-semibold text-theme-primary">💼 Career Change</div>
                  <div className="text-sm text-theme-text">Get guidance on job decisions</div>
                </button>
                <button
                  onClick={() => setInput("What does my love life hold?")}
                  className="w-full p-3 text-left bg-theme-primary/20 hover:bg-theme-primary/30 rounded-lg border border-theme-accent/30 transition-all duration-300"
                >
                  <div className="font-semibold text-theme-primary">💕 Love Reading</div>
                  <div className="text-sm text-theme-text">Discover romantic insights</div>
                </button>
                <button
                  onClick={() => setInput("What should I focus on for personal growth?")}
                  className="w-full p-3 text-left bg-theme-primary/20 hover:bg-theme-primary/30 rounded-lg border border-theme-accent/30 transition-all duration-300"
                >
                  <div className="font-semibold text-theme-primary">🌱 Personal Growth</div>
                  <div className="text-sm text-theme-text">Find your path forward</div>
                </button>
                <button
                  onClick={() => setInput("Give me a daily reading")}
                  className="w-full p-3 text-left bg-theme-primary/20 hover:bg-theme-primary/30 rounded-lg border border-theme-accent/30 transition-all duration-300"
                >
                  <div className="font-semibold text-theme-primary">📅 Daily Reading</div>
                  <div className="text-sm text-theme-text">Today's guidance</div>
                </button>
                <button
                  onClick={() => {
                    setInput("Test random cards");
                    setShowCards(true);
                    setIsCardFlipping(true);
                    setTimeout(() => {
                      // Draw 5 random cards to show variety
                      const testCards = drawCards(5);
                      setDrawnCards(testCards);
                      setIsCardFlipping(false);
                    }, 1000);
                  }}
                  className="w-full p-3 text-left bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-400/30 transition-all duration-300"
                >
                  <div className="font-semibold text-purple-400">🎲 Random Cards</div>
                  <div className="text-sm text-theme-text">Draw 5 random cards</div>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl">
              <h3 className="text-xl font-bold text-theme-primary mb-4">📊 Your Journey</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-theme-text">Total Readings</span>
                  <span className="text-theme-primary font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-text">Favorite Spread</span>
                  <span className="text-theme-primary font-bold">Past-Present-Future</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-text">Last Reading</span>
                  <span className="text-theme-primary font-bold">Never</span>
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-theme-primary/20 shadow-2xl">
              <h3 className="text-xl font-bold text-theme-primary mb-4">🎨 Current Theme</h3>
              <div className="text-center">
                <div className="text-3xl mb-2">{currentTheme.name === "Mystical Purple" ? "🔮" : "✨"}</div>
                <div className="font-semibold text-theme-primary mb-1">{currentTheme.name}</div>
                <div className="text-sm text-theme-text">{currentTheme.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
