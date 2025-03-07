# Memory Systems Guidelines

This document outlines the guidelines for implementing and integrating the dual memory systems (neocortical and hippocampal) in our AI infrastructure.

## Core Principles

1. **Dual Memory Architecture**
   - Maintain clear separation between slow-learning neocortical system (base model) and fast-learning hippocampal system (RAG)
   - Ensure appropriate communication channels between the systems
   - Design for gradual consolidation from hippocampal to neocortical memory

2. **Memory Persistence**
   - All episodic memories must be stored with appropriate metadata
   - Implement vector embeddings for semantic search capabilities
   - Store importance scores to prioritize memory consolidation

3. **Memory Retrieval**
   - Use hybrid retrieval combining:
     - Vector similarity search for semantic relationships
     - Keyword extraction for precise factual recall
     - Temporal context for sequential reasoning
   - Implement caching strategies to avoid redundant retrievals

## Neocortical System (Slow Learning)

1. **Base Model Parameters**
   - Use Mistral 7B as the foundation
   - Apply 8-bit quantization to reduce memory footprint
   - Tune sequence length based on available resources

2. **Fine-tuning Approach**
   - Implement parameter importance tracking (Synaptic Intelligence)
   - Use selective regularization based on importance scores
   - Apply elastic weight consolidation for catastrophic forgetting prevention

3. **Domain Adaptation**
   - Integrate LoRA adapters for specific domains
   - Implement adapter switching based on input classification
   - Support dynamic loading/unloading of adapters

## Hippocampal System (Fast Learning)

1. **RAG Integration**
   - Implement context-aware retrieval
   - Maintain balance between diversity and relevance
   - Support dynamic retrieval count based on query complexity

2. **Vector Storage**
   - Use Supabase for vector storage
   - Implement appropriate vector dimensions (768 or 1024)
   - Create indices for efficient similarity search

3. **Memory Importance**
   - Calculate importance based on surprise (prediction error)
   - Implement priority queue for replay based on importance
   - Track forgetting curves for each memory

## Memory Integration

1. **Decision Making**
   - Define clear rules for when to use which memory system
   - Implement fallback strategies when primary system fails
   - Support confidence scoring for retrieved memories

2. **Conflict Resolution**
   - Develop strategies for resolving contradictory information
   - Implement versioning for evolving knowledge
   - Prioritize recency for factual information

3. **Consolidation Process**
   - Schedule regular memory consolidation during idle periods
   - Implement gradual transfer from hippocampal to neocortical system
   - Use spaced repetition principles for consolidation timing

## Testing & Evaluation

1. **Memory Benchmarks**
   - Define specific benchmarks for retrieval accuracy
   - Test for catastrophic forgetting mitigation
   - Measure memory efficiency and optimization

2. **Integration Tests**
   - Verify correct interaction between memory systems
   - Test recovery from system failures
   - Validate persistence across system restarts

## Implementation Patterns

```typescript
// Example: Memory Storage Interface
interface MemoryItem {
  content: string;
  embedding: Float32Array;
  createdAt: Date;
  importance: number;
  metadata: {
    source: string;
    context: string;
    domain: string;
  };
}

// Example: Memory Retrieval
async function retrieveRelevantMemories(
  query: string,
  options: {
    limit: number;
    minSimilarity: number;
    includeMetadata: boolean;
  }
): Promise<MemoryItem[]> {
  // Implementation details...
}

// Example: Memory Consolidation
async function consolidateMemories(
  highImportanceOnly: boolean = false
): Promise<ConsolidationResult> {
  // Implementation details...
}
```

Always refer to these patterns when implementing memory-related functionality to ensure consistency across the codebase. 