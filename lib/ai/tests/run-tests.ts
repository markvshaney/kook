/**
 * Test Runner
 * 
 * This file provides utilities to run all the quantization tests
 * and display the results in a structured format.
 */

import { runRealModelTest } from './tiny-model-runner';
import { createTinyModel, createPatternedWeights } from './tiny-model';
import { Quantizer } from '../quantization';
import { ModelConfig } from '../config';

/**
 * Run memory footprint tests with different patterns
 */
async function runMemoryTests(): Promise<void> {
    console.log("=== Memory Footprint Tests ===");

    const patterns = ['linear', 'random', 'fixed'] as const;
    const sizes = [100, 500, 1000];

    console.log("Testing different weight patterns and quantization effects on memory:");

    // Create a header for our results
    console.log("| Pattern | Size (KB) | Original Size (KB) | After 8-bit (KB) | After 4-bit (KB) | Savings 8-bit (%) | Savings 4-bit (%) |");
    console.log("|---------|-----------|---------------------|------------------|------------------|-------------------|-------------------|");

    for (const pattern of patterns) {
        for (const sizeKB of sizes) {
            // Create weights with the pattern
            const weights = createPatternedWeights(pattern, sizeKB);

            // Apply 8-bit quantization
            const weights8bit = Quantizer.quantizeWeights(
                weights,
                { bits: 8, useKVCacheQuantization: true, method: 'dynamic' }
            );

            // Apply 4-bit quantization
            const weights4bit = Quantizer.quantizeWeights(
                weights,
                { bits: 4, useKVCacheQuantization: true, method: 'symmetric' }
            );

            // Calculate memory savings
            const originalSizeKB = weights.byteLength / 1024;
            const size8bitKB = weights8bit.byteLength / 1024;
            const size4bitKB = weights4bit.byteLength / 1024;
            const savings8bit = ((originalSizeKB - size8bitKB) / originalSizeKB) * 100;
            const savings4bit = ((originalSizeKB - size4bitKB) / originalSizeKB) * 100;

            // Add a row to our table
            console.log(`| ${pattern} | ${sizeKB} | ${originalSizeKB.toFixed(2)} | ${size8bitKB.toFixed(2)} | ${size4bitKB.toFixed(2)} | ${savings8bit.toFixed(2)}% | ${savings4bit.toFixed(2)}% |`);
        }
    }
}

/**
 * Test model loading and unloading
 */
async function testModelLoadUnload(): Promise<void> {
    console.log("\n=== Model Load/Unload Tests ===");

    // Get the model size from a typical tiny model
    const modelSize = createTinyModel().weights.byteLength;
    console.log(`Created a tiny test model with size: ${(modelSize / 1024).toFixed(2)} KB`);

    // Create a mock ModelConfig
    const config: ModelConfig = {
        modelId: "test/tiny-model",
        maxSequenceLength: 128,
        temperature: 0.7,
        topP: 0.9,
        useQuantization: false,
        isLoaded: false
    };

    // Test memory estimation
    console.log("Memory usage estimates:");
    const memoryEstimate = Quantizer.estimateMemoryUsage(config);
    console.log(`- Original memory usage: ${(memoryEstimate.original / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    console.log(`- With 8-bit quantization: ${(memoryEstimate.quantized / (1024 * 1024 * 1024)).toFixed(2)} GB`);

    // Test system memory check
    console.log("\nSystem memory check:");
    const hasEnoughMemory = Quantizer.checkMemoryRequirements(config);
    console.log(`System has ${hasEnoughMemory ? 'enough' : 'not enough'} memory for the model`);
}

/**
 * Run all quantization tests
 */
export async function runAllTests(): Promise<void> {
    console.log("Running Quantization Implementation Tests\n");

    try {
        // Run basic memory tests
        await runMemoryTests();

        // Test model loading/unloading
        await testModelLoadUnload();

        // Run real model test (simulated)
        await runRealModelTest();

        console.log("\n=== All Tests Completed ===");
    } catch (error) {
        console.error("Error running tests:", error);
    }
}

// If this module is run directly, execute all tests
if (require.main === module) {
    runAllTests().catch(console.error);
} 