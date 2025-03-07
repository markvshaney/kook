/**
 * Sessions Schema
 * 
 * Defines database tables related to user sessions and activity tracking.
 */

import { pgTable, index } from 'drizzle-orm/pg-core';
import { columnTypes } from './index';
import { relations, sql } from 'drizzle-orm';
import { usersTable } from './users';

/**
 * Sessions table - user authentication sessions
 */
export const sessionsTable = pgTable('sessions', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

    // Session token used for authentication
    token: columnTypes.text('token').notNull().unique(),

    // User agent and IP data
    userAgent: columnTypes.text('user_agent'),
    ip: columnTypes.text('ip'),

    // Expiration and activity timestamps
    expiresAt: columnTypes.timestamp('expires_at').notNull()
        .default(sql`now() + interval '30 days'`),
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    lastActiveAt: columnTypes.timestamp('last_active_at').notNull().defaultNow(),

    // Whether this session has been revoked
    isRevoked: columnTypes.boolean('is_revoked').notNull().default(false)
});

/**
 * User activity log - tracks significant user actions
 */
export const activityLogsTable = pgTable('activity_logs', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    sessionId: columnTypes.uuid('session_id').references(() => sessionsTable.id, { onDelete: 'set null' }),

    // Activity details
    actionType: columnTypes.text('action_type').notNull(), // e.g., 'login', 'logout', 'content_create'
    actionData: columnTypes.jsonb('action_data').default({}),

    // Contextual information
    ip: columnTypes.text('ip'),
    userAgent: columnTypes.text('user_agent'),

    // When this activity occurred
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow()
});

/**
 * Rate limiting table - for API and authentication rate limiting
 */
export const rateLimitsTable = pgTable('rate_limits', {
    id: columnTypes.serial('id').primaryKey(),

    // Scope of the rate limit (can be IP, user ID, or other identifier)
    scope: columnTypes.text('scope').notNull(),
    identifier: columnTypes.text('identifier').notNull(),

    // Rate limit data
    points: columnTypes.integer('points').notNull().default(0),

    // When this rate limit resets
    resetsAt: columnTypes.timestamp('resets_at').notNull(),
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        // Create an index to optimize rate limit lookups
        scopeIdentifierIdx: index('rate_limit_scope_identifier_idx').on(table.scope, table.identifier)
    };
});

// Define relations
export const sessionsRelations = relations(sessionsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.userId],
        references: [usersTable.id]
    }),
    activityLogs: many(activityLogsTable)
}));

export const activityLogsRelations = relations(activityLogsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [activityLogsTable.userId],
        references: [usersTable.id]
    }),
    session: one(sessionsTable, {
        fields: [activityLogsTable.sessionId],
        references: [sessionsTable.id]
    })
})); 