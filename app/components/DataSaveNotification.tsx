"use client";

import { useState, useEffect } from 'react';

interface DataSaveNotificationProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

export default function DataSaveNotification({
    isVisible,
    message,
    type,
    onClose
}: DataSaveNotificationProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-green-500/20 border-green-400/30';
            case 'error': return 'bg-red-500/20 border-red-400/30';
            case 'info': return 'bg-blue-500/20 border-blue-400/30';
            default: return 'bg-blue-500/20 border-blue-400/30';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'success': return 'text-green-300';
            case 'error': return 'text-red-300';
            case 'info': return 'text-blue-300';
            default: return 'text-blue-300';
        }
    };

    return (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
            <div className={`${getBgColor()} backdrop-blur-md rounded-xl p-4 border shadow-2xl max-w-sm`}>
                <div className="flex items-center space-x-3">
                    <span className="text-xl">{getIcon()}</span>
                    <div className="flex-1">
                        <div className={`font-semibold ${getTextColor()}`}>
                            {type === 'success' ? 'Data Saved' : type === 'error' ? 'Save Failed' : 'Saving Data'}
                        </div>
                        <div className="text-white/80 text-sm">{message}</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
} 