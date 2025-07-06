"use client";

import { useState, useEffect } from 'react';
import { TarotCard as TarotCardType } from '../contracts/contracts';

interface TarotCardProps {
    card: TarotCardType;
    index: number;
    isFlipping: boolean;
    isRevealed: boolean;
    onClick?: () => void;
}

export default function TarotCard({ card, index, isFlipping, isRevealed, onClick }: TarotCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (isRevealed) {
            const timer = setTimeout(() => {
                setIsFlipped(true);
            }, index * 500 + 1000);
            return () => clearTimeout(timer);
        }
    }, [isRevealed, index]);

    const getCardSymbol = (cardName: string) => {
        if (cardName.includes('Cups')) return '💧';
        if (cardName.includes('Wands')) return '🔥';
        if (cardName.includes('Swords')) return '⚔️';
        if (cardName.includes('Pentacles')) return '💰';
        if (cardName.includes('The Fool')) return '🤡';
        if (cardName.includes('The Magician')) return '🎩';
        if (cardName.includes('The High Priestess')) return '🌙';
        if (cardName.includes('The Empress')) return '👑';
        if (cardName.includes('The Emperor')) return '⚜️';
        if (cardName.includes('The Hierophant')) return '⛪';
        if (cardName.includes('The Lovers')) return '💕';
        if (cardName.includes('The Chariot')) return '🏛️';
        if (cardName.includes('Strength')) return '🦁';
        if (cardName.includes('The Hermit')) return '🕯️';
        if (cardName.includes('Wheel of Fortune')) return '🎡';
        if (cardName.includes('Justice')) return '⚖️';
        if (cardName.includes('The Hanged Man')) return '🙃';
        if (cardName.includes('Death')) return '💀';
        if (cardName.includes('Temperance')) return '🕊️';
        if (cardName.includes('The Devil')) return '😈';
        if (cardName.includes('The Tower')) return '🗼';
        if (cardName.includes('The Star')) return '⭐';
        if (cardName.includes('The Moon')) return '🌙';
        if (cardName.includes('The Sun')) return '☀️';
        if (cardName.includes('Judgement')) return '👼';
        if (cardName.includes('The World')) return '🌍';
        return '🎴';
    };

    const getCardColor = (cardName: string) => {
        if (cardName.includes('Cups')) return 'from-blue-500 to-cyan-500';
        if (cardName.includes('Wands')) return 'from-orange-500 to-red-500';
        if (cardName.includes('Swords')) return 'from-gray-500 to-slate-500';
        if (cardName.includes('Pentacles')) return 'from-green-500 to-emerald-500';
        return 'from-theme-primary to-theme-secondary';
    };

    return (
        <div
            className={`card-container relative transform transition-all duration-1000 ${isFlipping ? 'animate-card-draw' : ''
                }`}
            style={{
                animationDelay: `${index * 0.3}s`,
                transform: isFlipping ? 'translateY(-100px) rotate(-10deg)' : 'translateY(0) rotate(0deg)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div
                className={`card relative w-48 h-64 rounded-xl shadow-2xl border-2 transition-all duration-500 cursor-pointer ${isHovered ? 'scale-105' : 'scale-100'
                    } ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Card Back */}
                <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getCardColor(card.name)} border-2 border-theme-accent/30 ${isFlipped ? 'opacity-0' : 'opacity-100'
                        } transition-opacity duration-500`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2 animate-float">🔮</div>
                            <div className="text-theme-text font-semibold text-sm">Mystical Tarot</div>
                            <div className="text-theme-primary/60 text-xs mt-1">Tap to reveal</div>
                        </div>
                    </div>
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-xs text-theme-text">🎴</span>
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-xs text-theme-text">🎴</span>
                    </div>
                </div>

                {/* Card Front */}
                <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getCardColor(card.name)} border-2 border-theme-accent/30 ${isFlipped ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-500`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="absolute inset-0 bg-black/10 rounded-xl"></div>

                    {/* Card Header */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                        <div className="text-2xl">{getCardSymbol(card.name)}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${card.isReversed
                            ? 'bg-red-500/30 text-red-200 border border-red-400/50'
                            : 'bg-green-500/30 text-green-200 border border-green-400/50'
                            }`}>
                            {card.isReversed ? 'Reversed' : 'Upright'}
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="text-center">
                            <div className="text-3xl mb-3">{getCardSymbol(card.name)}</div>
                            <h3 className="font-bold text-white text-lg mb-2 leading-tight">
                                {card.name}
                            </h3>
                            <div className="text-white/80 text-xs leading-relaxed">
                                {card.isReversed ? 'Inner reflection needed' : 'Clear path forward'}
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <div className="text-2xl rotate-180">{getCardSymbol(card.name)}</div>
                        <div className="text-xs text-white/60">
                            {card.name.includes('Major') ? 'Major Arcana' : 'Minor Arcana'}
                        </div>
                    </div>

                    {/* Mystical Effects */}
                    <div className={`absolute inset-0 rounded-xl ${isHovered ? 'mystical-glow' : ''
                        }`}></div>
                </div>
            </div>

            {/* Card Shadow */}
            <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-black/20 rounded-full blur-sm transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                    }`}
            ></div>

            {/* Card Name Tooltip */}
            {isHovered && isFlipped && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-10">
                    {card.name}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
                </div>
            )}
        </div>
    );
} 