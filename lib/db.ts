import { neon } from "@neondatabase/serverless"

// This is a placeholder function that will be used if the database is not configured.
// It throws an error only when a query is actually attempted.
const mockSql = () => {
  throw new Error("Database is not connected. Please set the NEON_DATABASE_URL environment variable.")
}

// Check if the environment variable is set.
// If it is, create a real database connection.
// Otherwise, use the mock object. This prevents the app from crashing on startup.
const sql = process.env.NEON_DATABASE_URL ? neon(process.env.NEON_DATABASE_URL) : mockSql

export { sql }
