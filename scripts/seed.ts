// To run this script:
// 1. Make sure your .env.local file has the NEON_DATABASE_URL
// 2. Run `pnpm install` to get dependencies
// 3. Run `pnpm ts-node scripts/seed.ts`
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

// Load environment variables from .env.local
config({ path: ".env.local" })

const sql = neon(process.env.NEON_DATABASE_URL!)

async function main() {
  console.log("Seeding database...")

  // Using a simple password for seeding. In a real app, use a secure password hashing library like bcrypt.
  await sql`
    INSERT INTO users (email, name, role, password) 
    VALUES ('admin@example.com', 'Admin User', 'ADMIN', 'password123') 
    ON CONFLICT (email) DO NOTHING;
  `

  await sql`
    INSERT INTO users (email, name, role, password) 
    VALUES ('editor@example.com', 'Editor User', 'EDITOR', 'password123') 
    ON CONFLICT (email) DO NOTHING;
  `

  console.log("Seed complete.")
  process.exit(0)
}

main().catch((err) => {
  console.error("Error during seeding:", err)
  process.exit(1)
})
