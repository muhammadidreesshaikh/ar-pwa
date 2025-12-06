import React from 'react';

const HomeScreen = ({ onStart }) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden bg-black text-white">
            {/* Background Ambience (Dark Mode with Brand Glows) */}
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surf-pink/20 via-transparent to-transparent animate-pulse delay-700"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surf-blue/30 via-transparent to-transparent animate-pulse"></div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>

            <div className="relative z-10 flex flex-col items-center gap-12 text-center w-full max-w-md">

                {/* Logo / Brand */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-40 h-40 flex items-center justify-center transform hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_25px_rgba(236,0,140,0.5)]">
                        <img src="/logo.png" alt="Surf Excel Logo" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="space-y-6 w-full">
                    {/* Instructions Card */}
                    {/* <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left space-y-4 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-surf-pink/20 flex items-center justify-center text-surf-pink font-bold border border-surf-pink/30">1</div>
                            <p className="text-sm text-gray-200">Point camera at clothing</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-surf-orange/20 flex items-center justify-center text-surf-orange font-bold border border-surf-orange/30">2</div>
                            <p className="text-sm text-gray-200">Watch stains disappear instantly!</p>
                        </div>
                    </div> */}

                    <h1 className='uppercase font-black text-white text-[50px] tracking-tight leading-tight my-10'>Instant Clean Filter</h1>

                    <button
                        onClick={onStart}
                        className="group relative w-full py-5 bg-gradient-to-r from-surf-pink to-surf-orange rounded-2xl shadow-[0_0_40px_rgba(236,0,140,0.4)] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative text-xl font-black text-white tracking-widest uppercase">Start Cleaning</span>
                    </button>

                    <p className='text-white mt-8'>Tab the button to start the camera</p>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
