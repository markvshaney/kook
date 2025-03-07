/**
 * Database Schema Index
 * 
 * This file exports all database table schemas defined in the application.
 * It serves as the central point for schema definitions to be imported by the database connection.
 */

import { pgTable } from 'drizzle-orm/pg-core';

// Define re-usable column types and helpers
import {
    timestamp,
    text,
    integer,
    boolean,
    serial,
    uuid,
    jsonb,
    numeric,
    bigint,
    real as float
} from 'drizzle-orm/pg-core';

// Export column types for use in other schema files
export const columnTypes = {
    timestamp,
    text,
    integer,
    boolean,
    serial,
    uuid,
    jsonb,
    numeric,
    bigint,
    float // real type in PostgreSQL
};

// Helper function to create a timestamped table (with created_at and updated_at)
export function createTimestampedTable(name: string) {
    return pgTable(name, {
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow()
    });
}

// Export all schema tables from their respective files
export * from './users';
export * from './sessions';
export * from './content';

// Temporary placeholder exports to satisfy imports in db.ts
// These will be replaced with actual table definitions in subsequent steps
// NOTE: These can be removed once the database connection is updated to use the actual tables
export const profilesTable = pgTable('profiles', {
    id: serial('id').primaryKey(),
    name: text('name')
});

export const todosTable = pgTable('todos', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    completed: boolean('completed').notNull().default(false)
});

// Future table exports will go here as they are created:
// export * from './users';
// export * from './sessions';
// export * from './content';
// export * from './memory';
// export * from './specializations'; 