import React from 'react';

const AISummaryCard = ({ aiSummary }) => {
    if (!aiSummary) return null;

    return (
        <div className="relative animated-background bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6 rounded-xl shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
                <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                    AI Powered
                </span>
            </div>
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Smart Review Summary</h3>
            <p className="text-lg leading-relaxed font-medium">{aiSummary}</p>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse"></div>
        </div>
    );
};

export default AISummaryCard;