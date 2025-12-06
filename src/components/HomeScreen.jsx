import React from 'react';

const HomeScreen = ({ onStart }) => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900 text-white p-6 overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8 animate-fade-in">

                {/* Logo Area */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-2xl shadow-cyan-500/30">
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">AR</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight">
                        INSTANT <span className="text-cyan-400">CLEAN</span>
                    </h1>
                    {/* <p className="text-white/60 text-lg max-w-xs mx-auto">
                        Experience the power of AI cleaning in real-time.
                    </p> */}
                </div>

                {/* Instructions */}
                {/* <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full max-w-sm text-left space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">1</div>
                        <p className="text-sm text-white/80">Point camera at clothing</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">2</div>
                        <p className="text-sm text-white/80">Tap "Clean Now" to apply AI</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">3</div>
                        <p className="text-sm text-white/80">Capture & Share your look</p>
                    </div>
                </div> */}

                <button
                    onClick={onStart}
                    className="w-full max-w-xs py-4 bg-white text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 transition-transform hover:bg-gray-100"
                >
                    START CAMERA
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
