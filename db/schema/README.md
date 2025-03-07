# Database Schema

This directory contains the database schema definitions using Drizzle ORM.

## Structure

- `index.ts`: Main export file that combines all schema tables
- `types.ts`: Common types and interfaces used across schemas
- `utils.ts`: Helper functions for schema creation and manipulation
- `users.ts`: User account related tables (to be implemented)
- `sessions.ts`: Session tracking tables (to be implemented)
- `content.ts`: Content and memory storage tables (to be implemented)
- `memory.ts`: Vector memory storage tables (to be implemented)
- `specializations.ts`: Specialty domains and LoRA adapters tables (to be implemented)

## Usage

Import database tables from the schema index:

```typescript
import { db } from '@/db/db'
import { usersTable, sessionsTable } from '@/db/schema'

// Query example
const users = await db.select().from(usersTable)
```

Use utility functions for consistent schema creation:

```typescript
import { createBaseTable, vectorColumn } from '@/db/schema/utils';
import { columnTypes } from '@/db/schema';

// Create a new table with standard fields
const memoriesTable = createBaseTable('memories');

// Add custom fields
const memoryTable = memoriesTable.extend({
  content: columnTypes.text('content').notNull(),
  embedding: vectorColumn('embedding'),
  importance: columnTypes.integer('importance').notNull().default(0)
});
```

## Schema Design Principles

1. **Naming Conventions**
   - Table names: singular, camelCase for the variable, snake_case for the actual table name
   - Column names: camelCase for the variable, snake_case in the database
   - Primary keys: always named `id`
   - Foreign keys: `entityId` (e.g., `userId`, `contentId`)

2. **Indexing**
   - Always index foreign keys
   - Index columns frequently used in WHERE clauses
   - Use unique indexes for uniqueness constraints

3. **Relations**
   - Define relations using Drizzle's relation methods
   - Use cascading deletes when appropriate
   - Document relation cardinality in comments 