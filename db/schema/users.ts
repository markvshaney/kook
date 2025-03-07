/**
 * User Schema
 * 
 * Defines database tables related to users and authentication.
 */

// Import pgTable and uniqueIndex only
import { pgTable, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { columnTypes } from './index';

/**
 * Users table - core user data
 */
export const usersTable = pgTable('users', {
    id: columnTypes.uuid('id').primaryKey().defaultRandom(),

    // Basic user info
    username: columnTypes.text('username').notNull().unique(),
    email: columnTypes.text('email').notNull().unique(),
    name: columnTypes.text('name'),

    // Authentication
    passwordHash: columnTypes.text('password_hash'),
    emailVerified: columnTypes.boolean('email_verified').notNull().default(false),

    // Profile data
    avatarUrl: columnTypes.text('avatar_url'),
    bio: columnTypes.text('bio'),

    // Preferences and settings
    preferences: columnTypes.jsonb('preferences').notNull().default({}),

    // Account status
    lastLoginAt: columnTypes.timestamp('last_login_at'),
    isActive: columnTypes.boolean('is_active').notNull().default(true),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
});

/**
 * User roles table - for permission management
 */
export const rolesTable = pgTable('roles', {
    id: columnTypes.serial('id').primaryKey(),
    name: columnTypes.text('name').notNull().unique(),
    description: columnTypes.text('description'),

    // Permissions as a JSON array of strings
    permissions: columnTypes.jsonb('permissions').notNull().default([]),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
});

/**
 * Junction table for many-to-many relationship between users and roles
 */
export const userRolesTable = pgTable('user_roles', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    roleId: columnTypes.integer('role_id').notNull().references(() => rolesTable.id, { onDelete: 'cascade' }),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        // Create unique constraint on user ID and role ID
        userRoleUniqueIdx: uniqueIndex('user_role_unique_idx').on(table.userId, table.roleId)
    };
});

/**
 * User authentication providers table
 */
export const userAuthProvidersTable = pgTable('user_auth_providers', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    provider: columnTypes.text('provider').notNull(), // e.g., 'google', 'github'
    providerId: columnTypes.text('provider_id').notNull(),

    // Last time user authenticated with this provider
    lastAuthenticatedAt: columnTypes.timestamp('last_authenticated_at'),

    // Provider-specific data
    providerData: columnTypes.jsonb('provider_data').notNull().default({}),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow(),
    updatedAt: columnTypes.timestamp('updated_at').notNull().defaultNow()
}, (table) => {
    return {
        // Create unique constraint on user ID and provider and provider ID
        authProviderUniqueIdx: uniqueIndex('auth_provider_unique_idx').on(table.userId, table.provider, table.providerId)
    };
});

/**
 * User account recovery table
 */
export const userRecoveryTable = pgTable('user_recovery', {
    id: columnTypes.serial('id').primaryKey(),
    userId: columnTypes.uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    token: columnTypes.text('token').notNull(),

    // When this token expires
    expiresAt: columnTypes.timestamp('expires_at').notNull()
        .default(sql`now() + interval '1 day'`),

    // Whether the token has been used
    used: columnTypes.boolean('used').notNull().default(false),

    // Timestamps
    createdAt: columnTypes.timestamp('created_at').notNull().defaultNow()
});

// Define relations
export const usersRelations = relations(usersTable, ({ many }) => ({
    roles: many(userRolesTable),
    authProviders: many(userAuthProvidersTable),
    recoveryTokens: many(userRecoveryTable)
}));

export const rolesRelations = relations(rolesTable, ({ many }) => ({
    users: many(userRolesTable)
}));

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [userRolesTable.userId],
        references: [usersTable.id]
    }),
    role: one(rolesTable, {
        fields: [userRolesTable.roleId],
        references: [rolesTable.id]
    })
})); 