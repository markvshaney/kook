/**
 * Content Schema
 * 
 * Defines database tables related to content and memory storage.
 */

import { pgTable, index } from 'drizzle-orm/pg-core';
import { columnTypes } from './index';
import { relations } from 'drizzle-orm';
import { vectorColumn, metadataColumn } from './utils';
import { usersTable } from './users';

/**
 * Content table - stores all content items
 */
export const contentTable = pgTable('content', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    creatorId: columnTypes.uuid('creator_id').references(() => usersTable.id, { onDelete: 'set null' }),

    // Content data
    title: columnTypes.text('title'),
    body: columnTypes.text('body').notNull(),

    // Content type and format
    contentType: columnTypes.text('content_type').notNull(), // e.g., 'text', 'image', 'code'
    format: columnTypes.text('format'), // e.g., 'markdown', 'html', 'json'

    // Vector embedding for semantic search
    embedding: vectorColumn('embedding'),

    // Tags and metadata
    tags: columnTypes.jsonb('tags').default([]),
    metadata: metadataColumn(),

    // Content status
    isPublic: columnTypes.boolean('is_public').notNull().default(false),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        // Create an index on content type for faster filtering
        contentTypeIdx: index('content_type_idx').on(table.contentType),
        // Create an index on creator ID for faster lookups by user
        creatorIdIdx: index('content_creator_id_idx').on(table.creatorId)
    };
});

/**
 * Memory items table - specialized content for AI memory
 */
export const memoryItemsTable = pgTable('memory_items', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    userId: columnTypes.uuid('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),

    // Memory content
    content: columnTypes.text('content').notNull(),

    // Semantic vector for retrieval
    embedding: vectorColumn('embedding'),

    // Memory importance and context
    importance: columnTypes.integer('importance').notNull().default(0),
    contextType: columnTypes.text('context_type').notNull(), // e.g., 'conversation', 'fact', 'preference'

    // References and associations
    sourceContentId: columnTypes.uuid('source_content_id').references(() => contentTable.id, { onDelete: 'set null' }),
    relatedItems: columnTypes.jsonb('related_items').default([]),

    // Additional metadata
    metadata: metadataColumn(),

    // Timestamps and expiration
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow(),
    lastAccessedAt: columnTypes.timestamp('last_accessed_at'),
    expiresAt: columnTypes.timestamp('expires_at')
}, (table) => {
    return {
        // Create an index on user ID for faster lookups
        userIdIdx: index('memory_user_id_idx').on(table.userId),
        // Create an index on context type for filtering
        contextTypeIdx: index('memory_context_type_idx').on(table.contextType),
        // Create an index on importance for priority retrieval
        importanceIdx: index('memory_importance_idx').on(table.importance)
    };
});

/**
 * Content versions table - for tracking content history
 */
export const contentVersionsTable = pgTable('content_versions', {
    id: columnTypes.serial('id').primaryKey(),
    contentId: columnTypes.uuid('content_id').notNull().references(() => contentTable.id, { onDelete: 'cascade' }),

    // Version data
    body: columnTypes.text('body').notNull(),
    versionNumber: columnTypes.integer('version_number').notNull(),

    // Who made this version
    createdBy: columnTypes.uuid('created_by').references(() => usersTable.id, { onDelete: 'set null' }),

    // Change information
    changeDescription: columnTypes.text('change_description'),

    // When this version was created
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow()
}, (table) => {
    return {
        // Create a compound index on content ID and version number
        contentVersionIdx: index('content_version_idx').on(table.contentId, table.versionNumber)
    };
});

// Define relations
export const contentRelations = relations(contentTable, ({ one, many }) => ({
    creator: one(usersTable, {
        fields: [contentTable.creatorId],
        references: [usersTable.id]
    }),
    versions: many(contentVersionsTable),
    memoryItems: many(memoryItemsTable, { relationName: 'content_memory' })
}));

export const memoryItemsRelations = relations(memoryItemsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [memoryItemsTable.userId],
        references: [usersTable.id]
    }),
    sourceContent: one(contentTable, {
        fields: [memoryItemsTable.sourceContentId],
        references: [contentTable.id],
        relationName: 'content_memory'
    })
}));

export const contentVersionsRelations = relations(contentVersionsTable, ({ one }) => ({
    content: one(contentTable, {
        fields: [contentVersionsTable.contentId],
        references: [contentTable.id]
    }),
    createdByUser: one(usersTable, {
        fields: [contentVersionsTable.createdBy],
        references: [usersTable.id]
    })
})); 