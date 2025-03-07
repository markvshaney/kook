/**
 * Database Schema Types
 * 
 * This file defines common types and interfaces used across the database schema.
 */

import { InferModel } from 'drizzle-orm';
import { profilesTable, todosTable } from './index';

// Table Inference Types
export type Profile = InferModel<typeof profilesTable>;
export type ProfileInsert = InferModel<typeof profilesTable, 'insert'>;

export type Todo = InferModel<typeof todosTable>;
export type TodoInsert = InferModel<typeof todosTable, 'insert'>;

// Common Types

/**
 * Timestamp fields added to most tables
 */
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Standard ID field for most entities
 */
export interface Identifiable {
    id: number | string;
}

/**
 * Entity with standard fields
 */
export interface BaseEntity extends Identifiable, Timestamps { }

/**
 * Vector embedding type for memory systems
 */
export interface VectorData {
    embedding: number[];
    dimensions: number;
}

/**
 * Metadata for a memory item
 */
export interface MemoryMetadata {
    source: string;
    importance: number;
    contextType: string;
    domain?: string;
    location?: string;
    associations?: string[];
} 