import React from 'react';

const PreviewScreen = ({ imageSrc, onRetake, onShare, onSave }) => {
    return (
        <div className="absolute inset-0 z-50 bg-black flex flex-col">
            {/* Main Preview */}
            <div className="relative flex-1 bg-zinc-900 rounded-b-[2rem] overflow-hidden shadow-2xl">
                <img src={imageSrc} alt="Captured" className="w-full h-full object-cover" />

                {/* Top Actions */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
                    <button
                        onClick={onRetake}
                        className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 active:scale-95 transition-transform"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="h-32 bg-black flex items-center justify-around px-8 pb-4">
                <button
                    onClick={onSave}
                    className="flex flex-col items-center gap-2 text-white/80 active:opacity-60 transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </div>
                    <span className="text-xs font-medium">Save</span>
                </button>

                <button
                    onClick={onShare}
                    className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-surf-blue shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <svg className="w-7 h-7 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    </div>
                    <span className="text-xs font-bold text-white">Share</span>
                </button>

                <button
                    onClick={() => { }} // Placeholder or other action
                    className="flex flex-col items-center gap-2 text-white/80 active:opacity-60 transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
                    <span className="text-xs font-medium">More</span>
                </button>
            </div>
        </div>
    );
};

export default PreviewScreen;
