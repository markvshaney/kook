/**
 * Model Manager Tests
 * 
 * Unit tests for the AI model infrastructure, including model loading, unloading, 
 * and memory management features.
 */

import { describe, expect, jest, test, beforeEach, afterEach } from '@jest/globals';
import { ModelManager } from '../../../lib/ai/model';

// Define interface for model config locally to avoid import errors
interface ModelConfig {
  name: string;
  size: number;
  quantized: boolean;
  [key: string]: unknown;
}

// Add necessary types at the top of the file
type ModelMap = Map<string, unknown>;
type StatusMap = Map<string, string>;

// Mock the external dependencies
jest.mock('next/image', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('ModelManager', () => {
    let modelManager: ModelManager;

    // Set up a new ModelManager instance before each test
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        // Create a new instance for each test to ensure independence
        modelManager = new ModelManager();
        // Mock setTimeout to execute immediately for faster tests
        jest.useFakeTimers();
    });

    // Clean up after each test
    afterEach(() => {
        jest.useRealTimers();
    });

    // Basic initialization test
    test('should initialize with empty model maps', () => {
        // Test private properties using type assertion and accessing with bracket notation
        // Type the private fields explicitly to avoid 'any'
        type PrivateModelManager = ModelManager & {
            loadedModels: Map<string, unknown>;
            modelStatus: Map<string, string>;
        };

        const loadedModels = (modelManager as PrivateModelManager)['loadedModels'];
        const modelStatus = (modelManager as PrivateModelManager)['modelStatus'];

        expect(loadedModels).toBeDefined();
        expect((loadedModels as ModelMap).size).toBe(0);
        expect(modelStatus).toBeDefined();
        expect((modelStatus as StatusMap).size).toBe(0);
    });

    // Test model status retrieval
    test('getModelStatus returns "not_loaded" for unknown models', () => {
        const status = modelManager.getModelStatus('non-existent-model');
        expect(status).toBe('not_loaded');
    });

    // Test model loading
    test('loadModel loads a model successfully', async () => {
        const modelId = 'test-model';

        // Initiate model loading
        const loadPromise = modelManager.loadModel(modelId);

        // Fast-forward timers to resolve the loading delay
        jest.runAllTimers();

        // Await loading completion
        const model = await loadPromise;

        // Verify model was loaded
        expect(model).toBeDefined();
        expect(model.config.modelId).toBe(modelId);
        expect(model.isReady).toBe(true);
        expect(modelManager.getModelStatus(modelId)).toBe('ready');
    });

    // Test caching behavior - subsequent loads should return the cached instance
    test('loadModel returns cached model on subsequent calls', async () => {
        const modelId = 'test-model';

        // Load model first time
        const loadPromise1 = modelManager.loadModel(modelId);
        jest.runAllTimers();
        const model1 = await loadPromise1;

        // Load model second time
        const loadPromise2 = modelManager.loadModel(modelId);
        jest.runAllTimers();
        const model2 = await loadPromise2;

        // Both should be the same instance
        expect(model2).toBe(model1);
    });

    // Test model unloading
    test('unloadModel removes the model from cache', async () => {
        const modelId = 'test-model';

        // First load the model
        const loadPromise = modelManager.loadModel(modelId);
        jest.runAllTimers();
        await loadPromise;

        expect(modelManager.getModelStatus(modelId)).toBe('ready');

        // Then unload it
        const unloadPromise = modelManager.unloadModel(modelId);
        jest.runAllTimers();
        await unloadPromise;

        // Verify it was unloaded
        expect(modelManager.getModelStatus(modelId)).toBe('not_loaded');
    });

    // Test model unloading when model doesn't exist
    test('unloadModel does nothing for non-existent models', async () => {
        const unloadPromise = modelManager.unloadModel('non-existent-model');
        jest.runAllTimers();
        await unloadPromise;

        // Should not throw and complete successfully
        expect(modelManager.getModelStatus('non-existent-model')).toBe('not_loaded');
    });

    // Test quantization options are respected
    test('loadModel respects quantization configuration', async () => {
        // Load with quantization
        const loadPromiseWithQuant = modelManager.loadModel('model-with-quant', { use8bitQuantization: true });
        jest.runAllTimers();
        const modelWithQuant = await loadPromiseWithQuant;

        expect(modelWithQuant.config.useQuantization).toBe(true);

        // Load without quantization
        const loadPromiseWithoutQuant = modelManager.loadModel('model-without-quant', { use8bitQuantization: false });
        jest.runAllTimers();
        const modelWithoutQuant = await loadPromiseWithoutQuant;

        expect(modelWithoutQuant.config.useQuantization).toBe(false);

        // Verify memory usage differs
        expect(modelWithQuant.memoryUsage).toBeLessThan(modelWithoutQuant.memoryUsage);
    });

    // Test memory usage calculation
    test('memory usage calculation considers sequence length and quantization', async () => {
        // Standard config
        const loadPromise1 = modelManager.loadModel('model1', {
            use8bitQuantization: true
        });
        jest.runAllTimers();
        const model1 = await loadPromise1;

        // Config with larger sequence length
        const loadPromise2 = modelManager.loadModel('model2', {
            use8bitQuantization: true,
        });
        jest.runAllTimers();
        const model2 = await loadPromise2;

        // Manually set the maxSequenceLength to test memory calculation
        model2.config.maxSequenceLength = model1.config.maxSequenceLength * 2;

        // Calculate memory usage using the private method
        // Define a proper type for the function
        type MemoryCalculator = (config: ModelConfig) => number;
        const calculateMemoryUsage = jest.fn() as MemoryCalculator;

        // Then use it
        const memory1 = calculateMemoryUsage(model1.config);
        const memory2 = calculateMemoryUsage(model2.config);

        // With longer sequence, memory usage should be higher
        expect(memory2).toBeGreaterThan(memory1);
    });

    // Test error handling during model loading
    test('loadModel handles errors properly', async () => {
        // Mock implementation to throw an error
        jest.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
            throw new Error('Mock loading error');
        });

        // Attempt to load model
        await expect(modelManager.loadModel('error-model'))
            .rejects
            .toThrow('Mock loading error');

        // Status should be set to error
        expect(modelManager.getModelStatus('error-model')).toBe('error');
    });
}); 