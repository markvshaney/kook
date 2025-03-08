/**
 * Supabase Vector Tests
 * 
 * Tests for the Supabase integration and vector operations functions.
 */

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { VECTOR_CONFIGS, withSupabaseVector, searchVectorSimilarity, generateVectorMatchSQL } from '../../lib/supabase';

// Remove unused interfaces and replace with specific ones used in tests
interface SupabaseClient {
    rpc: jest.Mock;
    from: jest.Mock;
}

interface MockResponse {
    data: unknown;
    options: { status: number };
}

// Mock console.error to avoid polluting test output
console.error = jest.fn();

describe('Supabase Vector Operations', () => {
    // Setup mocks
    let supabaseClient: SupabaseClient;
    
    beforeEach(() => {
        supabaseClient = {
            rpc: jest.fn(),
            from: jest.fn()
        };
    });

    test('generateVectorMatchSQL creates valid SQL query', () => {
        const embeddings = [0.1, 0.2, 0.3];
        const tableName = 'test_table';
        const sql = generateVectorMatchSQL(embeddings, tableName);
        
        expect(sql).toContain(tableName);
        expect(sql).toContain('[0.1,0.2,0.3]');
        expect(sql).toContain('ORDER BY');
    });

    test('searchVectorSimilarity calls the right RPC function', async () => {
        // Setup
        const mockRpcResponse = {
            data: [{ id: '123', similarity: 0.95 }],
            error: null
        };
        
        // Cast to handle type issues
        (supabaseClient.rpc as jest.Mock).mockResolvedValue(mockRpcResponse);
        
        // Test
        const result = await searchVectorSimilarity(
            supabaseClient as unknown,
            [0.1, 0.2, 0.3],
            'test_namespace',
            5
        );
        
        // Assertions
        expect(supabaseClient.rpc).toHaveBeenCalledWith(
            'match_documents',
            expect.objectContaining({
                query_embedding: [0.1, 0.2, 0.3],
                namespace: 'test_namespace',
                match_count: 5
            })
        );
        expect(result).toEqual(mockRpcResponse.data);
    });

    test('withSupabaseVector handles errors gracefully', async () => {
        // Test function that will throw an error
        const errorFn = async (): Promise<unknown> => {
            throw new Error('Test error');
        };
        
        // Call the function
        const result = await withSupabaseVector(errorFn);
        
        // Cast the result to handle type issues
        const typedResult = result as unknown as MockResponse;
        
        // Verify it returns the expected error response
        expect(typedResult.data).toEqual({ error: 'Vector operation failed' });
        expect(typedResult.options.status).toBe(500);
        expect(console.error).toHaveBeenCalled();
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