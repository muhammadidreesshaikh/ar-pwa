import { useState, useCallback, useEffect } from 'react'
import ARView from './components/ARView'
import Overlay from './components/Overlay'
import HomeScreen from './components/HomeScreen'
import PreviewScreen from './components/PreviewScreen'
import { logAnalyticsEvent } from './utils/analytics'

function App() {
    const [screen, setScreen] = useState('home'); // 'home', 'camera', 'preview'
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        logAnalyticsEvent('app_opened');
    }, []);

    const startCamera = () => {
        setScreen('camera');
        logAnalyticsEvent('camera_started');
    }

    const handleCapture = useCallback(() => {
        const sourceCanvas = document.querySelector('canvas');
        if (sourceCanvas) {
            // Create a temporary canvas for composition
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = sourceCanvas.width;
            tempCanvas.height = sourceCanvas.height;
            const ctx = tempCanvas.getContext('2d');

            // 1. Draw the AR Scene
            ctx.drawImage(sourceCanvas, 0, 0);

            // 2. Draw Branding / Watermark (Burn-in for sharing)
            const padding = tempCanvas.width * 0.05;
            const fontSize = Math.max(16, tempCanvas.width * 0.04);

            // Text Shadow for visibility
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Text
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'right';
            ctx.fillText('INSTANT CLEAN AR', tempCanvas.width - padding, tempCanvas.height - padding);

            // Dot Logo
            ctx.shadowColor = 'transparent'; // Reset shadow for shape
            ctx.beginPath();
            const textWidth = ctx.measureText('INSTANT CLEAN AR').width;
            const dotX = tempCanvas.width - padding - textWidth - (fontSize * 0.6);
            const dotY = tempCanvas.height - padding - (fontSize * 0.3);
            ctx.arc(dotX, dotY, fontSize * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#22d3ee'; // Cyan
            ctx.fill();

            const dataUrl = tempCanvas.toDataURL('image/png');
            setCapturedImage(dataUrl);
            setScreen('preview');
            logAnalyticsEvent('photo_captured');
        }
    }, []);

    const handleRetake = () => {
        setCapturedImage(null);
        setScreen('camera');
        logAnalyticsEvent('retake_pressed');
    }

    const handleSave = () => {
        if (capturedImage) {
            logAnalyticsEvent('image_saved');
            const link = document.createElement('a');
            link.download = `ar-clean-${Date.now()}.png`;
            link.href = capturedImage;
            link.click();
        }
    }

    const handleShare = async () => {
        if (capturedImage) {
            logAnalyticsEvent('share_initiated');
            const blob = await (await fetch(capturedImage)).blob();
            const file = new File([blob], `instant-clean-${Date.now()}.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'My Instant Clean Look',
                        text: 'Check out my instant clean look! #InstantClean #AR',
                        files: [file]
                    });
                    logAnalyticsEvent('share_completed');
                } catch (err) {
                    console.log('Share failed', err);
                    logAnalyticsEvent('share_failed', { error: err.message });
                }
            } else {
                alert("Sharing not supported on this device/browser.");
            }
        }
    }

    return (
        <div className="relative w-full h-full bg-black">
            {/* Home Screen */}
            {screen === 'home' && <HomeScreen onStart={startCamera} />}

            {/* AR Camera Flow */}
            {(screen === 'camera' || screen === 'preview') && (
                // Keep AR View mounted to avoid re-initializing camera when retaking?
                <div className={screen === 'preview' ? 'hidden' : 'block h-full w-full'}>
                    <ARView isFilterActive={isFilterActive} />
                    <Overlay
                        isFilterActive={isFilterActive}
                        onToggleFilter={setIsFilterActive}
                        onCapture={handleCapture}
                    />
                </div>
            )}

            {/* Preview Screen */}
            {screen === 'preview' && capturedImage && (
                <PreviewScreen
                    imageSrc={capturedImage}
                    onRetake={handleRetake}
                    onSave={handleSave}
                    onShare={handleShare}
                />
            )}
        </div>
    )
}

export default App
