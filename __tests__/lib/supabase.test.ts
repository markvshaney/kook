/**
 * Supabase Vector Tests
 * 
 * Tests for the Supabase integration and vector operations functions.
 */

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { supabaseAdmin, VECTOR_CONFIGS, withSupabaseVector, searchVectorSimilarity, generateVectorMatchSQL } from '../../lib/supabase';

// Define an interface for the mock response shape
interface MockResponse {
    data: Record<string, unknown>;
    options: {
        status: number;
    };
}

// Mock the Supabase clients
jest.mock('@supabase/supabase-js', () => {
    const mockFrom = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        filter: jest.fn().mockReturnThis(),
        single: jest.fn(),
    });

    const mockRpc = jest.fn().mockReturnValue({
        data: null,
        error: null,
    });

    const mockClient = {
        from: mockFrom,
        rpc: mockRpc,
    };

    return {
        createClient: jest.fn(() => mockClient),
    };
});

// Mock the NextResponse
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn().mockImplementation(
            (data: Record<string, unknown>, options: { status: number }): MockResponse => ({
                data,
                options
            })
        ),
    },
}));

describe('Supabase Vector Operations', () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test vector match SQL generation
    test('generateVectorMatchSQL creates valid SQL query', () => {
        const testEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];
        const embeddingColumn = 'embedding';
        const threshold = 0.75;
        const limit = 5;

        const sql = generateVectorMatchSQL(embeddingColumn, testEmbedding, threshold, limit);

        // Verify SQL structure
        expect(sql).toContain(`SELECT *, 1 - (${embeddingColumn} <=> '[${testEmbedding.toString()}]') as similarity`);
        expect(sql).toContain(`FROM ${VECTOR_CONFIGS.EMBEDDINGS_TABLE}`);
        expect(sql).toContain(`WHERE 1 - (${embeddingColumn} <=> '[${testEmbedding.toString()}]') > ${threshold}`);
        expect(sql).toContain(`ORDER BY similarity DESC`);
        expect(sql).toContain(`LIMIT ${limit}`);
    });

    // Test searching for similar vectors
    test('searchVectorSimilarity calls the right RPC function', async () => {
        const testEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];

        // Mock successful response
        const mockRpcResponse = {
            data: [
                { id: 'vec1', similarity: 0.95 },
                { id: 'vec2', similarity: 0.85 },
            ],
            error: null,
        };

        // Set up mock implementation
        supabaseAdmin.rpc = jest.fn().mockResolvedValue(mockRpcResponse);

        // Call the function
        const result = await searchVectorSimilarity(testEmbedding, { matchThreshold: 0.8, matchCount: 10 });

        // Verify RPC was called with right parameters
        expect(supabaseAdmin.rpc).toHaveBeenCalledWith('match_embeddings', {
            query_embedding: testEmbedding,
            match_threshold: 0.8,
            match_count: 10
        });

        // Verify result matches mock data
        expect(result).toEqual(mockRpcResponse.data);
    });

    // Test vector search with metadata filtering
    test('searchVectorSimilarity applies metadata filters', async () => {
        const testEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];
        const filter = { userId: 'user123', contentType: 'memory' };

        // Mock query builder
        const mockQuery = {
            filter: jest.fn().mockReturnThis(),
            data: [{ id: 'vec1' }],
            error: null,
        };
        supabaseAdmin.rpc = jest.fn().mockReturnValue(mockQuery);

        // Call with filters
        await searchVectorSimilarity(testEmbedding, { filterMetadata: filter });

        // Verify filter was called for each metadata property
        expect(mockQuery.filter).toHaveBeenCalledWith('metadata->>userId', 'eq', 'user123');
        expect(mockQuery.filter).toHaveBeenCalledWith('metadata->>contentType', 'eq', 'memory');
    });

    // Test error handling wrapper
    test('withSupabaseVector handles errors gracefully', async () => {
        // Function that succeeds
        const successFn = async () => 'success';
        const successResult = await withSupabaseVector(successFn);
        expect(successResult).toBe('success');

        // Function that throws
        const errorFn = async () => { throw new Error('Test error'); };
        const errorResult = await withSupabaseVector(errorFn) as MockResponse;

        // Should be a NextResponse with error status
        expect(errorResult).toHaveProperty('data');
        expect(errorResult.data).toHaveProperty('error');
        expect(errorResult.options.status).toBe(500);
    });

    // Test vector configuration constants
    test('VECTOR_CONFIGS has the right properties', () => {
        expect(VECTOR_CONFIGS).toHaveProperty('EMBEDDINGS_TABLE');
        expect(VECTOR_CONFIGS).toHaveProperty('EMBEDDING_COLUMN');
        expect(VECTOR_CONFIGS).toHaveProperty('CONTENT_COLUMN');
        expect(VECTOR_CONFIGS).toHaveProperty('METADATA_COLUMN');
        expect(VECTOR_CONFIGS).toHaveProperty('DIMENSIONS');
    });
}); 