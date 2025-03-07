# TypeScript Typing Guidelines

This document outlines our TypeScript standards and best practices for maintaining a type-safe codebase, with special considerations for AI model interactions.

## Core Typing Principles

1. **Strict Type Safety**
   - Enable `strict: true` in tsconfig.json
   - Avoid using `any` type - use `unknown` when type is truly indeterminate
   - Never use type assertions without verification (no `as` without checks)
   - Avoid non-null assertions (`!`) in favor of proper null checking

2. **Type Explicitness**
   - Always specify return types for functions
   - Use explicit generic types rather than relying on inference
   - Document complex types with explanatory comments
   - Use descriptive type names that indicate purpose, not just structure

3. **Type Organization**
   - Group related types in dedicated type files
   - Export types that are used across multiple files
   - Define component prop types adjacent to the component
   - Use namespaces to organize domain-specific types

## AI and ML-Specific Types

1. **Model Parameters**
   - Define strict interfaces for model configurations
   - Use discriminated unions for different model types
   - Include documentation comments for parameter ranges and impact

```typescript
interface ModelConfig {
  /** 
   * Unique identifier for the model 
   */
  modelId: string;
  
  /**
   * Maximum sequence length (32-4096)
   * Longer sequences require more memory
   */
  maxSequenceLength: number;
  
  /**
   * Temperature (0.0-1.0)
   * Higher values increase randomness
   */
  temperature: number;
  
  /**
   * Whether to use quantization
   */
  useQuantization: boolean;
}
```

2. **Tensor and Vector Types**
   - Define specific types for different tensor shapes and dimensions
   - Use TypedArrays (Float32Array, etc.) for numeric data
   - Include dimensionality information in type names

```typescript
/** Vector embedding with 768 dimensions */
type Embedding768 = Float32Array;

/** 3D Tensor with shape [batchSize, seqLength, hiddenSize] */
interface Tensor3D {
  shape: [number, number, number];
  data: Float32Array;
}
```

3. **Memory Types**
   - Define clear interfaces for different memory types
   - Use generic types for flexible memory content
   - Include metadata types for memory context

```typescript
interface MemoryItem<T> {
  content: T;
  embedding: Float32Array;
  importance: number;
  timestamp: Date;
  metadata: MemoryMetadata;
}

interface MemoryMetadata {
  source: string;
  context: string;
  domain?: string;
  isVerified: boolean;
}
```

## Advanced Type Patterns

1. **Discriminated Unions**
   - Use discriminated unions for API responses and state management
   - Include status field for loading states
   - Tag different variations with explicit type fields

```typescript
type ModelStatus = 
  | { status: 'not_loaded' }
  | { status: 'loading', progress: number }
  | { status: 'ready', model: LoadedModel }
  | { status: 'error', error: Error };
```

2. **Utility Types**
   - Use built-in utility types appropriately (Partial, Required, Pick, etc.)
   - Create custom utility types for project-specific needs
   - Document utility types with examples

```typescript
/** Make all properties of T readonly except for those in K */
type ReadonlyExcept<T, K extends keyof T> = Readonly<Omit<T, K>> & Pick<T, K>;

/** Configuration that can be updated after initialization */
type MutableModelConfig = ReadonlyExcept<ModelConfig, 'temperature' | 'topP'>;
```

3. **Type Guards**
   - Implement type guards for runtime type checking
   - Use consistent naming patterns for guard functions
   - Return type predicates for better type narrowing

```typescript
function isLoadedModel(value: unknown): value is LoadedModel {
  return (
    typeof value === 'object' && 
    value !== null &&
    'config' in value &&
    'loadedAt' in value &&
    'isReady' in value
  );
}
```

## Async Types

1. **Promise Types**
   - Always specify the resolved type for Promises
   - Use async/await instead of Promise chains
   - Create utility types for common async patterns

```typescript
/** Result of an async operation that might fail */
type AsyncResult<T> = Promise<{
  success: true;
  data: T;
} | {
  success: false;
  error: Error;
}>;

/** Retry policy for async operations */
interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor: number;
}
```

2. **API Types**
   - Define request and response types for all API endpoints
   - Use consistent naming patterns (e.g., `EndpointNameRequest`, `EndpointNameResponse`)
   - Include validation types to match backend constraints

```typescript
interface ModelInferenceRequest {
  prompt: string;
  modelId: string;
  parameters?: ModelInferenceParameters;
}

interface ModelInferenceParameters {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
}

interface ModelInferenceResponse {
  completion: string;
  tokenCount: number;
  timingMs: number;
}
```

## Type Testing

1. **Type Testing with TypeScript**
   - Use conditional types to test type relationships
   - Create test files specifically for type checking
   - Verify complex type interactions with compile-time tests

```typescript
// Type test to ensure model configurations are compatible
type AssertCompatible<T, U extends T> = true;
type ModelConfigTest = AssertCompatible<BaseModelConfig, QuantizedModelConfig>;
```

2. **Integration with JSDoc**
   - Use JSDoc annotations to enhance type documentation
   - Include examples in documentation
   - Document edge cases and potential pitfalls

```typescript
/**
 * Calculates memory requirement for a model
 * 
 * @param config - Model configuration
 * @returns Memory estimate in bytes
 * 
 * @example
 * ```ts
 * const memoryNeeded = estimateMemoryUsage({
 *   modelId: "mistral-7b",
 *   maxSequenceLength: 2048,
 *   useQuantization: true
 * });
 * ```
 */
function estimateMemoryUsage(config: ModelConfig): number {
  // Implementation...
}
```

## Best Practices

1. **Avoid Type Hacks**
   - Never use `@ts-ignore` comments
   - Avoid using `any` to bypass type checking
   - Fix type errors properly rather than working around them

2. **Type Evolution**
   - Design types to be extensible for future requirements
   - Use interface merging for extensible definitions
   - Document breaking type changes clearly

3. **Performance Considerations**
   - Be mindful of TypeScript compilation performance
   - Avoid excessively complex conditional types
   - Split large type files when they grow unwieldy 