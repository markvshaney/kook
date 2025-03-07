/**
 * Specializations Schema
 * 
 * Defines database tables for specialty domains and LoRA adapters.
 */

import { pgTable, index } from 'drizzle-orm/pg-core';
import { columnTypes } from './index';
import { relations } from 'drizzle-orm';
import { metadataColumn } from './utils';
import { usersTable } from './users';

/**
 * Specialty domains table - defines areas of expertise
 */
export const specialtyDomainsTable = pgTable('specialty_domains', {
    id: columnTypes.serial('id').primaryKey(),

    // Domain identification
    name: columnTypes.text('name').notNull().unique(),
    slug: columnTypes.text('slug').notNull().unique(),

    // Domain description
    description: columnTypes.text('description').notNull(),
    icon: columnTypes.text('icon'),
    color: columnTypes.text('color'),

    // Domain classification
    category: columnTypes.text('category').notNull(),
    tags: columnTypes.jsonb('tags').default([]),

    // Domain status
    isActive: columnTypes.boolean('is_active').notNull().default(true),
    priority: columnTypes.integer('priority').notNull().default(0),

    // Metadata
    metadata: metadataColumn(),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        categoryIdx: index('specialty_domain_category_idx').on(table.category),
        priorityIdx: index('specialty_domain_priority_idx').on(table.priority)
    };
});

/**
 * LoRA adapters table - stores information about fine-tuned adapters
 */
export const loraAdaptersTable = pgTable('lora_adapters', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),

    // Adapter identification
    name: columnTypes.text('name').notNull().unique(),
    version: columnTypes.text('version').notNull(),

    // Domain association
    domainId: columnTypes.integer('domain_id').references(() => specialtyDomainsTable.id),

    // Technical specifications
    rank: columnTypes.integer('rank').notNull(),
    alpha: columnTypes.numeric('alpha').notNull(),
    baseModel: columnTypes.text('base_model').notNull(),

    // File and size information
    filePath: columnTypes.text('file_path').notNull(),
    sizeBytes: columnTypes.bigint('size_bytes').notNull(),

    // Training metadata
    trainingSteps: columnTypes.integer('training_steps').notNull(),
    trainingLoss: columnTypes.numeric('training_loss'),
    trainingDataDesc: columnTypes.text('training_data_desc'),

    // Adapter status
    isActive: columnTypes.boolean('is_active').notNull().default(true),
    isDefault: columnTypes.boolean('is_default').notNull().default(false),

    // Evaluation metrics
    evaluationScore: columnTypes.numeric('evaluation_score'),
    evaluationMetrics: columnTypes.jsonb('evaluation_metrics').default({}),

    // Metadata
    metadata: metadataColumn(),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        domainIdx: index('lora_adapter_domain_idx').on(table.domainId),
        baseModelIdx: index('lora_adapter_base_model_idx').on(table.baseModel)
    };
});

/**
 * Specialty activations table - tracks when and how specialty domains are activated
 */
export const specialtyActivationsTable = pgTable('specialty_activations', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),

    // Domain and adapter reference
    domainId: columnTypes.integer('domain_id').notNull().references(() => specialtyDomainsTable.id),
    adapterId: columnTypes.uuid('adapter_id').references(() => loraAdaptersTable.id),

    // Activation details
    inputQuery: columnTypes.text('input_query'),
    confidenceScore: columnTypes.numeric('confidence_score').notNull(),

    // Performance metrics
    activationLatencyMs: columnTypes.integer('activation_latency_ms'),
    loadTimeMs: columnTypes.integer('load_time_ms'),
    totalProcessingTimeMs: columnTypes.integer('total_processing_time_ms'),

    // Context information
    sessionId: columnTypes.text('session_id'),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow()
}, (table) => {
    return {
        userIdIdx: index('specialty_activation_user_id_idx').on(table.userId),
        domainIdIdx: index('specialty_activation_domain_id_idx').on(table.domainId),
        timestampIdx: index('specialty_activation_timestamp_idx').on(table.createdAt)
    };
});

/**
 * Domain detection rules table - defines rules for identifying when to activate a specialty domain
 */
export const domainDetectionRulesTable = pgTable('domain_detection_rules', {
    id: columnTypes.serial('id').primaryKey(),
    domainId: columnTypes.integer('domain_id').notNull().references(() => specialtyDomainsTable.id, { onDelete: 'cascade' }),

    // Rule definition
    name: columnTypes.text('name').notNull(),
    description: columnTypes.text('description'),

    // Rule type and configuration
    ruleType: columnTypes.text('rule_type').notNull(), // 'keyword', 'semantic', 'regex', 'composite'
    priority: columnTypes.integer('priority').notNull().default(0),

    // Rule parameters (depends on type)
    parameters: columnTypes.jsonb('parameters').notNull(),

    // Rule status
    isActive: columnTypes.boolean('is_active').notNull().default(true),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        domainIdIdx: index('domain_detection_rule_domain_id_idx').on(table.domainId),
        ruleTypeIdx: index('domain_detection_rule_type_idx').on(table.ruleType),
        priorityIdx: index('domain_detection_rule_priority_idx').on(table.priority)
    };
});

// Define relations
export const specialtyDomainsRelations = relations(specialtyDomainsTable, ({ many }) => ({
    loraAdapters: many(loraAdaptersTable),
    detectionRules: many(domainDetectionRulesTable)
}));

export const loraAdaptersRelations = relations(loraAdaptersTable, ({ one }) => ({
    domain: one(specialtyDomainsTable, {
        fields: [loraAdaptersTable.domainId],
        references: [specialtyDomainsTable.id]
    })
}));

export const specialtyActivationsRelations = relations(specialtyActivationsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [specialtyActivationsTable.userId],
        references: [usersTable.id]
    }),
    domain: one(specialtyDomainsTable, {
        fields: [specialtyActivationsTable.domainId],
        references: [specialtyDomainsTable.id]
    }),
    adapter: one(loraAdaptersTable, {
        fields: [specialtyActivationsTable.adapterId],
        references: [loraAdaptersTable.id]
    })
}));

export const domainDetectionRulesRelations = relations(domainDetectionRulesTable, ({ one }) => ({
    domain: one(specialtyDomainsTable, {
        fields: [domainDetectionRulesTable.domainId],
        references: [specialtyDomainsTable.id]
    })
})); 