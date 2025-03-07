/*
<ai_context>
Configures Drizzle for the app.
</ai_context>
*/

import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

export default defineConfig({
    schema: "./db/schema/index.ts",
    out: "./db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || ''
    }
})