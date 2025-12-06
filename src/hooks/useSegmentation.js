import { useState, useEffect } from 'react';
import { createSegmenter, SupportedModels } from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-backend-webgl';

export const useSegmentation = () => {
    const [segmenter, setSegmenter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const model = SupportedModels.MediaPipeSelfieSegmentation;
                const segmenterConfig = {
                    runtime: 'mediapipe', // or 'tfjs'
                    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
                    modelType: 'general' // or 'landscape'
                };
                
               const segmenter = await createSegmenter(model, {
                   runtime: 'tfjs', 
                   modelType: 'general'
               });

               setSegmenter(segmenter);
               setIsLoading(false);
            } catch (err) {
                console.error("Failed to load segmentation model", err);
                setIsLoading(false);
            }
        };

        loadModel();
    }, []);

    return { segmenter, isLoading };
};
