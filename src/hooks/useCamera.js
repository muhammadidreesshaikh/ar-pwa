import { useState, useEffect, useRef } from 'react';

export const useCamera = () => {
    const videoRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment', // Use back camera by default for AR context mostly, but for selfie filters 'user' is better. 
                        // The user said "Instant Clean Filter on clothing", usually implies selfie or back camera? 
                        // Snapchat filters are usually selfie, but "clothing" might imply looking at someone else?
                        // "Selfie" implies 'user'. "Clothing" implies 'environment' or 'user'.
                        // Let's default to 'user' (selfie) as "filters" usually imply selfie, but provide a switch.
                        // Actually, looking at the request "Instant Clean Filter on clothing similar to Snapchat/Instagram filters", 
                        // it's usually applied to the user themselves (selfie).
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: false
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        setCameraReady(true);
                    };
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                setError(err);
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
