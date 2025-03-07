# Database Schema

This directory contains the database schema definitions using Drizzle ORM.

## Structure

- `index.ts`: Main export file that combines all schema tables
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