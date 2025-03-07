/**
 * Supabase Client
 * 
 * Configuration for connecting to Supabase for vector storage and retrieval.
 * Used alongside Prisma for database operations that involve vector embeddings.
 */

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validation
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Check .env.local file.'
  );
}

/**
 * Anonymous Supabase client for client-side and API routes
 * Has limited permissions based on Row Level Security (RLS) policies
 */
export const supabaseClient = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);

/**
 * Admin Supabase client with service role
 * Use only in secure server contexts (e.g., API routes)
 * Never expose this client in browser code
 */
export const supabaseAdmin = createClient(
  supabaseUrl as string,
  supabaseServiceKey as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  }
);

/**
 * Vector table configuration
 */
export const VECTOR_CONFIGS = {
  EMBEDDINGS_TABLE: 'embeddings',
  CONTENT_COLUMN: 'content',
  EMBEDDING_COLUMN: 'embedding',
  METADATA_COLUMN: 'metadata',
  INDEX_NAME: 'embeddings_vector_idx',
  DIMENSIONS: 768, // Default dimensions for embeddings - adjust based on your model
};

/**
 * Helper function to safely handle Supabase vector operations
 * @param fn Async function to execute
 * @returns Result or error response
 */
export async function withSupabaseVector<T>(
  fn: () => Promise<T>
): Promise<T | NextResponse> {
  try {
    return await fn();
  } catch (error) {
    console.error('Supabase vector operation failed:', error);
    return NextResponse.json(
      { error: 'Vector operation failed' },
      { status: 500 }
    );
  }
}

/**
 * Initialize the pgvector extension and create embeddings table if needed
 * Should be called during app initialization
 */
export async function initVectorStore(): Promise<void> {
  try {
    // Enable the pgvector extension
    await supabaseAdmin.rpc('enable_pgvector_extension');
    console.log('pgvector extension enabled');

    // Check if embeddings table exists and create it if needed
    const { data, error } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', VECTOR_CONFIGS.EMBEDDINGS_TABLE);

    if (error) {
      throw error;
    }

    // If table doesn't exist, create it
    if (!data || data.length === 0) {
      await supabaseAdmin.rpc('create_embeddings_table', {
        table_name: VECTOR_CONFIGS.EMBEDDINGS_TABLE,
        embedding_dimension: VECTOR_CONFIGS.DIMENSIONS,
      });
      console.log(`Created embeddings table: ${VECTOR_CONFIGS.EMBEDDINGS_TABLE}`);
    } else {
      console.log(`Embeddings table already exists: ${VECTOR_CONFIGS.EMBEDDINGS_TABLE}`);
    }
  } catch (error) {
    console.error('Failed to initialize vector store:', error);
  }
}

/**
 * Create SQL for vector similarity search
 * @param embeddingColumn Column name containing the embeddings
 * @param queryEmbedding The query embedding to compare against
 * @param matchThreshold Minimum similarity threshold
 * @param matchCount Maximum number of matches to return
 * @returns SQL string for the similarity search
 */
export function generateVectorMatchSQL(
  embeddingColumn: string,
  queryEmbedding: number[],
  matchThreshold = 0.5,
  matchCount = 10
): string {
  return `
    SELECT *, 1 - (${embeddingColumn} <=> '[${queryEmbedding.toString()}]') as similarity
    FROM ${VECTOR_CONFIGS.EMBEDDINGS_TABLE}
    WHERE 1 - (${embeddingColumn} <=> '[${queryEmbedding.toString()}]') > ${matchThreshold}
    ORDER BY similarity DESC
    LIMIT ${matchCount};
  `;
}

/**
 * Execute a vector similarity search
 * @param queryEmbedding The query embedding vector
 * @param options Search options
 * @returns Search results with similarity scores
 */
export async function searchVectorSimilarity(
  queryEmbedding: number[],
  options: {
    matchThreshold?: number;
    matchCount?: number;
    filterMetadata?: Record<string, unknown>;
  } = {}
) {
  const { matchThreshold = 0.5, matchCount = 10, filterMetadata } = options;

  try {
    let query = supabaseAdmin.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount
    });

    // Apply metadata filters if provided
    if (filterMetadata) {
      for (const [key, value] of Object.entries(filterMetadata)) {
        query = query.filter(`metadata->>${key}`, 'eq', value);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Vector similarity search failed:', error);
    throw error;
  }
}

export default supabaseClient; 