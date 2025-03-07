/**
 * Tiny Model Utilities
 * 
 * This file provides utilities for creating simplified model representations
 * for quantization testing without requiring loading actual AI models.
 */

/**
 * Pattern types for weight generation
 */
export type WeightPattern = 'linear' | 'random' | 'fixed';

/**
 * A simplified model structure for testing
 */
export interface TinyModel {
    /**
     * Model weights as ArrayBuffer
     */
    weights: ArrayBuffer;

    /**
     * Dimensions of the model
     */
    dimensions: {
        layers: number;
        hidden: number;
    };
}

/**
 * Creates a tiny model with the specified size for testing purposes
 * @param sizeKB Optional size in KB (default: 100)
 * @returns A tiny model with randomized weights
 */
export function createTinyModel(sizeKB: number = 100): TinyModel {
    // Create weights of specified size filled with random data
    const weights = createPatternedWeights('random', sizeKB);

    // Calculate reasonable dimensions based on size
    const totalBytes = weights.byteLength;
    const bytesPerWeight = 4; // 4 bytes per float32
    const totalWeights = totalBytes / bytesPerWeight;

    // Create a simple 2-layer model
    const layers = 2;
    const hidden = Math.sqrt(totalWeights / layers);

    return {
        weights,
        dimensions: {
            layers,
            hidden: Math.floor(hidden)
        }
    };
}

/**
 * Creates weights with specific patterns for testing quantization
 * @param pattern The pattern type to generate
 * @param sizeKB Size in KB
 * @returns ArrayBuffer containing the generated weights
 */
export function createPatternedWeights(
    pattern: WeightPattern,
    sizeKB: number
): ArrayBuffer {
    // Calculate size in bytes
    const sizeBytes = sizeKB * 1024;
    const numFloats = sizeBytes / 4; // 4 bytes per float32

    // Create a float32 array with the calculated size
    const floatArray = new Float32Array(numFloats);

    // Fill the array based on the specified pattern
    switch (pattern) {
        case 'linear':
            // Linear increasing values
            for (let i = 0; i < numFloats; i++) {
                floatArray[i] = i / numFloats;
            }
            break;

        case 'random':
            // Random values between -1 and 1
            for (let i = 0; i < numFloats; i++) {
                floatArray[i] = Math.random() * 2 - 1;
            }
            break;

        case 'fixed':
            // Fixed repeating pattern
            for (let i = 0; i < numFloats; i++) {
                floatArray[i] = i % 2 === 0 ? 0.5 : -0.5;
            }
            break;
    }

    return floatArray.buffer;
} 