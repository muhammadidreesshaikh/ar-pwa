import React from 'react';

const Overlay = ({ isFilterActive, onToggleFilter, onCapture }) => {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-20">
            {/* Header */}
            <div className="w-full p-6 pt-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
                <div className="flex justify-between items-center premium-glass rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <h1 className="text-sm font-bold tracking-wider text-white">INSTANT CLEAN AR</h1>
                    </div>
                </div>
            </div>

            {/* Interaction Area */}
            <div className="w-full p-8 pb-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-auto flex flex-col items-center gap-6">

                {/* Status Indicator */}
                <div className={`transition-all duration-500 transform ${isFilterActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0 h-0'}`}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-xs font-bold text-cyan-300">CLEAN FILTER ACTIVE</span>
                    </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-8 w-full">
                    {/* Reset Button (only when active) */}
                    {isFilterActive && (
                        <button
                            onClick={() => onToggleFilter(false)}
                            className="w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/70 active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    )}

                    {/* Primary Button */}
                    <button
                        onClick={isFilterActive ? onCapture : () => onToggleFilter(true)}
                        className={`
                            relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]
                            ${isFilterActive
                                ? 'bg-white border-4 border-gray-200 scale-110'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-cyan-300/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]'
                            }
                        `}
                    >
                        {isFilterActive ? (
                            <div className="w-16 h-16 rounded-full border-2 border-black/10"></div>
                        ) : (
                            <span className="text-xs font-black text-white tracking-widest">CLEAN</span>
                        )}
                    </button>

                    {/* Placeholder for symmetry if needed, or Gallery button */}
                    {isFilterActive && (
                        <div className="w-12 h-12"></div>
                    )}
                </div>

                <p className="text-white/60 text-xs font-medium tracking-wide">
                    {isFilterActive ? 'Tap to Capture' : 'Tap CLEAN to Start'}
                </p>
            </div>
        </div>
    );
};

export default Overlay;
