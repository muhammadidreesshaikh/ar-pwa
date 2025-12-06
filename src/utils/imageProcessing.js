export function drawVideoToCanvas(ctx, video, width, height) {
    if (!ctx || !video) return;
    
    // Simulate object-fit: cover
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = width / height;
    
    let drawWidth, drawHeight, startX, startY;
    
    if (videoRatio > canvasRatio) {
        // Video is wider than canvas
        drawHeight = height;
        drawWidth = height * videoRatio;
        startY = 0;
        startX = (width - drawWidth) / 2;
    } else {
        // Video is taller than canvas
        drawWidth = width;
        drawHeight = width / videoRatio;
        startX = 0;
        startY = (height - drawHeight) / 2;
    }
    
    // Draw the main video frame
    ctx.drawImage(video, startX, startY, drawWidth, drawHeight);
    
    return { startX, startY, drawWidth, drawHeight };
}

export async function applyCleanFilter(ctx, video, mask, layout) {
    if (!mask || !layout) return;
    
    const { startX, startY, drawWidth, drawHeight } = layout; // Dimensions where video was drawn
    
    // 1. Create a temp offscreen canvas for the mask if needed, 
    // but body-segmentation actually enables direct GPU texture usage in some configs.
    // However, the `mask` object from toBinaryMask() is ImageData-like or ImageBitmap.
    
    // We want to apply a "Clean" filter (Bright/White) ONLY where mask is white (1).
    
    // Strategy:
    // User Context: GlobalCompositeOperation 'destination-in' or 'source-in'
    
    // Save current context state
    ctx.save();
    
    // -- Step A: Generate the effect layer --
    // We need an intermediate canvas/layer for the effect to avoid messing up the background.
    // Since we are drawing ON the main canvas which already has the video background:
    
    // 1. Draw the Mask on top of the generic video? No.
    // We need to:
    // 1. Draw "Brightened" Video.
    // 2. Mask it with the person mask.
    // 3. Draw on top of "Original" Video.
    
    // But we are in a single generic context.
    // Efficient way without creating new canvas every frame:
    // Use an offscreen canvas created ONCE and passed in, or attached to the hook.
    // For this utility, we'll assume we can use a small offscreen canvas or just the main ctx if we are clever.
    
    // Let's rely on standard Composite Operations.
    // We have Background (Original) on 'ctx'.
    
    // 1. Draw Mask into 'ctx' but we need to use it as a stencil.
    // If we draw Mask (B&W) on top, we just see the mask.
    
    // Better approach:
    // 1. Offscreen: Draw Video. Apply Filter (ctx.filter).
    // 2. Offscreen: Draw Mask using 'destination-in'. Now Offscreen has "Filtered Person".
    // 3. Main: Draw Offscreen on top of Original.
    
    // We need a persistent offscreen canvas for performance. 
    // For now, I'll return a function or accept a scratch canvas.
    
    // SIMPLE HACK for "Clean" filter:
    // Just draw a semi-transparent white overlay with "overlay" or "soft-light" blend mode masked by the segmentation?
    // That simulates "clean/bright" quickly!
    // 1. Draw Mask.
    // 2. Set `globalCompositeOperation = 'source-in'` (keeps only the mask part of next drawing)
    // 3. Fill Rect with white/blue tint (rgba(200, 230, 255, 0.3)).
    // 4. THIS DESTROYS BACKGROUND if done on main canvas directly without layering.
    
    // Correct Single-Canvas implementation:
    // It's hard without layers.
    // I will modify the `ARView` to manage layers or an offscreen canvas.
    
    // Providing a helper that assumes an offscreen canvas is passed is best.
}
