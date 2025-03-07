/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import * as schema from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Load environment variables
config({ path: ".env.local" })

// Create PostgreSQL client
const client = postgres(process.env.DATABASE_URL || '')

// Create Drizzle ORM instance with the complete schema
export const db = drizzle(client, { schema })