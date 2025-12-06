import { useState, useEffect, useRef } from 'react';

export const useCamera = () => {
    const videoRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            setError(null);
            try {
                // 1. Try Back Camera (Environment)
                let stream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { 
                            facingMode: { ideal: 'environment' },
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        },
                        audio: false
                    });
                } catch (firstErr) {
                    console.warn("Back camera failed, trying front camera...", firstErr);
                    // 2. Fallback to Front Camera (User) or Any
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: true, // simplified constraint
                        audio: false
                    });
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    // Important for iOS/Mobile: explicit play call
                    videoRef.current.setAttribute('autoplay', '');
                    videoRef.current.setAttribute('muted', '');
                    videoRef.current.setAttribute('playsinline', '');
                    
                    await videoRef.current.play().catch(e => console.error("Play error:", e));
                    setCameraReady(true);
                }
            } catch (err) {
                console.error("All camera attempts failed:", err);
                setError(err);
                setCameraReady(false);
            }
        };

        startCamera();

        return () => {
            // Cleanup stream
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return { videoRef, cameraReady, error };
};
