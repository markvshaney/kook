/**
 * Memory Schema
 * 
 * Defines database tables for the AI memory system, including neocortical and hippocampal components.
 */

import { pgTable, index } from 'drizzle-orm/pg-core';
import { columnTypes } from './index';
import { relations } from 'drizzle-orm';
import { vectorColumn, metadataColumn } from './utils';
import { usersTable } from './users';
import { contentTable } from './content';

/**
 * Episodic memory table - stores specific temporal experiences
 */
export const episodicMemoryTable = pgTable('episodic_memories', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Memory content
    content: columnTypes.text('content').notNull(),
    summary: columnTypes.text('summary'),

    // Vector embedding for semantic search
    embedding: vectorColumn('embedding'),

    // Temporal context
    timestamp: columnTypes.timestamp('timestamp').notNull().defaultNow(),
    sequencePosition: columnTypes.integer('sequence_position'),
    conversationId: columnTypes.text('conversation_id'),

    // Importance metrics
    importance: columnTypes.integer('importance').notNull().default(0),
    surpriseScore: columnTypes.float('surprise_score'),
    emotionalValence: columnTypes.float('emotional_valence'),

    // Retrieval metrics
    retrievalCount: columnTypes.integer('retrieval_count').notNull().default(0),
    lastRetrievedAt: columnTypes.timestamp('last_retrieved_at'),

    // Metadata
    metadata: metadataColumn(),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        userIdIdx: index('episodic_memory_user_id_idx').on(table.userId),
        importanceIdx: index('episodic_memory_importance_idx').on(table.importance),
        timestampIdx: index('episodic_memory_timestamp_idx').on(table.timestamp),
        conversationIdx: index('episodic_memory_conversation_idx').on(table.conversationId)
    };
});

/**
 * Semantic memory table - stores factual knowledge
 */
export const semanticMemoryTable = pgTable('semantic_memories', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Memory content
    fact: columnTypes.text('fact').notNull(),

    // Vector embedding for semantic search
    embedding: vectorColumn('embedding'),

    // Classification
    domain: columnTypes.text('domain').notNull(),
    confidence: columnTypes.float('confidence').notNull().default(1.0),

    // Importance and verification
    importance: columnTypes.integer('importance').notNull().default(0),
    isVerified: columnTypes.boolean('is_verified').notNull().default(false),

    // Source tracking
    source: columnTypes.text('source'),
    sourceType: columnTypes.text('source_type'),
    sourceContentId: columnTypes.uuid('source_content_id').references(() => contentTable.id, { onDelete: 'set null' }),

    // Retrieval metrics
    retrievalCount: columnTypes.integer('retrieval_count').notNull().default(0),
    lastRetrievedAt: columnTypes.timestamp('last_retrieved_at'),

    // Metadata
    metadata: metadataColumn(),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow(),
    expiresAt: columnTypes.timestamp('expires_at')
}, (table) => {
    return {
        userIdIdx: index('semantic_memory_user_id_idx').on(table.userId),
        domainIdx: index('semantic_memory_domain_idx').on(table.domain),
        importanceIdx: index('semantic_memory_importance_idx').on(table.importance)
    };
});

/**
 * Procedural memory table - stores skills and processes
 */
export const proceduralMemoryTable = pgTable('procedural_memories', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Skill description
    name: columnTypes.text('name').notNull(),
    description: columnTypes.text('description').notNull(),
    steps: columnTypes.jsonb('steps').notNull().default([]),

    // Vector embedding for semantic search
    embedding: vectorColumn('embedding'),

    // Classification
    domain: columnTypes.text('domain').notNull(),
    skillLevel: columnTypes.integer('skill_level').notNull().default(1),

    // Usage metrics
    usageCount: columnTypes.integer('usage_count').notNull().default(0),
    successRate: columnTypes.float('success_rate'),
    lastUsedAt: columnTypes.timestamp('last_used_at'),

    // Metadata
    metadata: metadataColumn(),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        userIdIdx: index('procedural_memory_user_id_idx').on(table.userId),
        domainIdx: index('procedural_memory_domain_idx').on(table.domain),
        skillLevelIdx: index('procedural_memory_skill_level_idx').on(table.skillLevel)
    };
});

/**
 * Memory consolidation table - tracks memory transfers between hippocampal and neocortical systems
 */
export const memoryConsolidationTable = pgTable('memory_consolidations', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Source memory reference (can be episodic, semantic, or procedural)
    sourceType: columnTypes.text('source_type').notNull(),
    sourceId: columnTypes.uuid('source_id').notNull(),

    // Consolidation state
    status: columnTypes.text('status').notNull(), // 'pending', 'processing', 'completed', 'failed'
    progress: columnTypes.float('progress').notNull().default(0),
    errorMessage: columnTypes.text('error_message'),

    // Importance metrics used for prioritization
    importance: columnTypes.integer('importance').notNull().default(0),
    repetitionCount: columnTypes.integer('repetition_count').notNull().default(0),

    // Scheduling
    scheduledFor: columnTypes.timestamp('scheduled_for'),
    processingStartedAt: columnTypes.timestamp('processing_started_at'),
    completedAt: columnTypes.timestamp('completed_at'),

    // Result reference (if any)
    resultType: columnTypes.text('result_type'),
    resultId: columnTypes.uuid('result_id'),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        userIdIdx: index('memory_consolidation_user_id_idx').on(table.userId),
        sourceIdx: index('memory_consolidation_source_idx').on(table.sourceType, table.sourceId),
        statusIdx: index('memory_consolidation_status_idx').on(table.status),
        scheduleIdx: index('memory_consolidation_schedule_idx').on(table.scheduledFor)
    };
});

/**
 * Memory retrieval log - tracks memory retrievals for analytics and optimization
 */
export const memoryRetrievalLogTable = pgTable('memory_retrieval_logs', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Query information
    query: columnTypes.text('query').notNull(),
    queryEmbedding: vectorColumn('query_embedding'),

    // Retrieval parameters
    retrievalStrategy: columnTypes.text('retrieval_strategy').notNull(), // 'vector', 'keyword', 'hybrid'
    limit: columnTypes.integer('limit').notNull(),
    threshold: columnTypes.float('threshold'),

    // Results
    resultCount: columnTypes.integer('result_count').notNull(),

    // Performance metrics
    latencyMs: columnTypes.integer('latency_ms'),
    relevanceScore: columnTypes.float('relevance_score'),

    // Context
    contextId: columnTypes.text('context_id'),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow()
}, (table) => {
    return {
        userIdIdx: index('memory_retrieval_log_user_id_idx').on(table.userId),
        strategyIdx: index('memory_retrieval_log_strategy_idx').on(table.retrievalStrategy),
        timestampIdx: index('memory_retrieval_log_timestamp_idx').on(table.createdAt)
    };
});

// Define relations
export const episodicMemoryRelations = relations(episodicMemoryTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [episodicMemoryTable.userId],
        references: [usersTable.id]
    })
}));

export const semanticMemoryRelations = relations(semanticMemoryTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [semanticMemoryTable.userId],
        references: [usersTable.id]
    }),
    sourceContent: one(contentTable, {
        fields: [semanticMemoryTable.sourceContentId],
        references: [contentTable.id]
    })
}));

export const proceduralMemoryRelations = relations(proceduralMemoryTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [proceduralMemoryTable.userId],
        references: [usersTable.id]
    })
})); 