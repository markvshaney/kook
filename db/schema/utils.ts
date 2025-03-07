/**
 * Database Schema Utilities
 * 
 * Helper functions for working with the database schema.
 */

import { pgTable } from 'drizzle-orm/pg-core';
import { columnTypes } from './index';

/**
 * Creates a base table with id, created_at, and updated_at columns
 * 
 * @param name The table name (snake_case)
 * @returns A pgTable with standard columns
 */
export function createBaseTable(name: string) {
    return pgTable(name, {
        id: columnTypes.serial('id').primaryKey(),
        createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
        updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
    });
}

/**
 * Creates a table with UUID as primary key and standard timestamps
 * 
 * @param name The table name (snake_case)
 * @returns A pgTable with UUID primary key and timestamps
 */
export function createUuidTable(name: string) {
    return pgTable(name, {
        id: columnTypes.uuid('id').primaryKey().defaultRandom(),
        createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
        updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
    });
}

/**
 * Creates a vector column for storing embeddings
 * 
 * @param name The column name
 * @returns A JSONB column configured for vector data
 */
export function vectorColumn(name: string) {
    // Note: Default dimensions would be enforced at the application level
    return columnTypes.jsonb(name).notNull().$type<number[]>();
}

/**
 * Creates a metadata column for storing entity metadata
 * 
 * @param name The column name (defaults to 'metadata')
 * @returns A JSONB column for metadata
 */
export function metadataColumn(name: string = 'metadata') {
    return columnTypes.jsonb(name).notNull().default({});
} 