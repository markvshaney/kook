/**
 * AI Model Configuration
 * 
 * Defines configuration types and defaults for AI model loading and inference.
 */

/**
 * Configuration options for AI model loading and usage
 */
export interface ModelConfig {
    /**
     * Unique identifier for the model
     */
    modelId: string;

    /**
     * Maximum sequence length for input processing
     */
    maxSequenceLength: number;

    /**
     * Temperature for controlling randomness in generation (0.0-1.0)
     */
    temperature: number;

    /**
     * Top-p (nucleus) sampling parameter (0.0-1.0)
     */
    topP: number;

    /**
     * Whether to use quantization for memory efficiency
     */
    useQuantization: boolean;

    /**
     * Whether the model is currently loaded in memory
     */
    isLoaded: boolean;
}

/**
 * Default configuration settings
 */
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
    modelId: "mistral/mistral-7b-v0.1",
    maxSequenceLength: 2048,
    temperature: 0.7,
    topP: 0.9,
    useQuantization: true,
    isLoaded: false
};

/**
 * Model loading options
 */
export interface ModelLoadOptions {
    /**
     * Whether to use 8-bit quantization
     */
    use8bitQuantization: boolean;

    /**
     * Whether to optimize for inference speed
     */
    optimizeForInference: boolean;

    /**
     * Whether to use GPU acceleration if available
     */
    useGPU: boolean;

    /**
     * Optional LoRA adapter ID to apply
     */
    loraAdapterId?: string;
}

/**
 * Default model loading options
 */
export const DEFAULT_LOAD_OPTIONS: ModelLoadOptions = {
    use8bitQuantization: true,
    optimizeForInference: true,
    useGPU: true
}; 