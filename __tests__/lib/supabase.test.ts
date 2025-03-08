/**
 * Supabase Vector Tests
 *
 * Tests for the Supabase integration and vector operations functions.
 */

import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { VECTOR_CONFIGS, generateVectorMatchSQL } from "../../lib/supabase";

// Mock the necessary modules
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(() => ({
      status: 500,
      body: { error: "Vector operation failed" },
    })),
  },
}));

// Mock console.error to avoid polluting test output
console.error = jest.fn();

describe("Supabase Vector Operations", () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  test("generateVectorMatchSQL creates valid SQL query", () => {
    const embeddingColumn = "embedding";
    const queryEmbedding = [0.1, 0.2, 0.3];
    const sql = generateVectorMatchSQL(embeddingColumn, queryEmbedding);

    expect(sql).toContain(VECTOR_CONFIGS.EMBEDDINGS_TABLE);
    expect(sql).toContain("0.1,0.2,0.3");
    expect(sql).toContain("ORDER BY");
  });

  // Test vector configuration constants
  test("VECTOR_CONFIGS has the right properties", () => {
    expect(VECTOR_CONFIGS).toHaveProperty("EMBEDDINGS_TABLE");
    expect(VECTOR_CONFIGS).toHaveProperty("EMBEDDING_COLUMN");
    expect(VECTOR_CONFIGS).toHaveProperty("CONTENT_COLUMN");
    expect(VECTOR_CONFIGS).toHaveProperty("METADATA_COLUMN");
    expect(VECTOR_CONFIGS).toHaveProperty("DIMENSIONS");
  });
});
