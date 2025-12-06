import { useRef, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useSegmentation } from '../hooks/useSegmentation';
import { toBinaryMask } from '@tensorflow-models/body-segmentation';

const ARView = ({ isFilterActive }) => {
    const { videoRef, cameraReady } = useCamera();
    const { segmenter, isLoading } = useSegmentation();
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const scratchCanvasRef = useRef(document.createElement('canvas')); // Offscreen buffer

    useEffect(() => {
        const animate = async () => {
            if (cameraReady && segmenter && canvasRef.current && videoRef.current) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const scratchCanvas = scratchCanvasRef.current;
                const scratchCtx = scratchCanvas.getContext('2d');

                // Match canvas size to display size
                if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientHeight;
                    scratchCanvas.width = canvas.width;
                    scratchCanvas.height = canvas.height;
                }

                // Initialize bubbles object on the requestRef (hacky but persists across frames without state re-render)
                if (!requestRef.current.bubbles) {
                    requestRef.current.bubbles = [];
                }

                // Spawn bubbles logic (only when filter is active)
                if (isFilterActive && Math.random() < 0.2) { // 20% chance per frame
                    requestRef.current.bubbles.push({
                        x: Math.random() * canvas.width,
                        y: canvas.height + 20,
                        size: Math.random() * 10 + 5,
                        speed: Math.random() * 2 + 1,
                        wobble: Math.random() * Math.PI * 2,
                        opacity: 1
                    });
                }

                // 1. Draw Original Video to Main Canvas
                // Simulate object-fit: cover logic
                const videoRatio = video.videoWidth / video.videoHeight;
                const canvasRatio = canvas.width / canvas.height;
                let dw, dh, dx, dy;

                if (videoRatio > canvasRatio) {
                    dh = canvas.height;
                    dw = dh * videoRatio;
                    dy = 0;
                    dx = (canvas.width - dw) / 2;
                } else {
                    dw = canvas.width;
                    dh = dw / videoRatio;
                    dx = 0;
                    dy = (canvas.height - dh) / 2;
                }

                ctx.drawImage(video, dx, dy, dw, dh);

                // 2. Segmentation & Filter
                try {
                    // Only run heavy segmentation if filter is active
                    if (isFilterActive && segmenter) {
                        const segmentation = await segmenter.segmentPeople(video);

                        if (segmentation.length > 0) {
                            // Clear scratch
                            scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

                            // Draw the mask onto scratch canvas
                            const coloredPartImage = await toBinaryMask(segmentation, { r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 0, b: 0, a: 0 });

                            // Create a bitmap from the mask data
                            const maskBitmap = await createImageBitmap(coloredPartImage);

                            // Draw Mask to scratch (Stencil)
                            scratchCtx.globalCompositeOperation = 'source-over';
                            scratchCtx.drawImage(maskBitmap, dx, dy, dw, dh);

                            // Applying "Instant Clean" = Brightness + Whitening + Smoothing

                            scratchCtx.globalCompositeOperation = 'source-in'; // Keep only where mask is
                            // Filter Logic: Brighten + Desaturate (Whitening) + Blur (Smooth)
                            scratchCtx.filter = 'brightness(1.3) contrast(1.1) saturate(0.5) blur(0.5px)';
                            scratchCtx.drawImage(video, dx, dy, dw, dh);
                            scratchCtx.filter = 'none'; // Reset

                            // Add "Ultra White" blue tint overlay
                            scratchCtx.globalCompositeOperation = 'source-atop';
                            scratchCtx.fillStyle = 'rgba(210, 240, 255, 0.2)';
                            scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

                            // Composite Effect on Main Canvas
                            ctx.globalCompositeOperation = 'source-over';
                            ctx.drawImage(scratchCanvas, 0, 0);
                        }
                    }
                } catch (e) {
                    // console.error("Segmentation loop error", e); // Suppress log spam
                }

                // 3. Draw Bubbles
                if (requestRef.current.bubbles.length > 0) {
                    // Draw bubbles
                    ctx.globalCompositeOperation = 'screen';
                    ctx.lineWidth = 1;

                    for (let i = requestRef.current.bubbles.length - 1; i >= 0; i--) {
                        const b = requestRef.current.bubbles[i];
                        b.y -= b.speed;
                        b.wobble += 0.05;
                        const x = b.x + Math.sin(b.wobble) * 2;

                        // Draw Bubble body
                        ctx.beginPath();
                        ctx.arc(x, b.y, b.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * b.opacity})`;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * b.opacity})`;
                        ctx.fill();
                        ctx.stroke();

                        // Shine
                        ctx.beginPath();
                        ctx.arc(x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * b.opacity})`;
                        ctx.fill();

                        // Fade out if logic (or removal)
                        if (b.y < -50 || (isFilterActive === false && b.y < canvas.height / 2)) {
                            // cleanup
                            requestRef.current.bubbles.splice(i, 1);
                        }
                    }
                    ctx.globalCompositeOperation = 'source-over';
                }
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [cameraReady, segmenter, isFilterActive]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Hidden Video Feed */}
            <video
                ref={videoRef}
                className="absolute inset-0 opacity-0 pointer-events-none"
                playsInline
                muted
                autoPlay
            />
            {/* Main AR Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />

            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white z-50">
                    <div className="text-center">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>Loading AI Model...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ARView;
