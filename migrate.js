import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set.');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Railway PostgreSQL
    }
  });

  try {
    console.log('Connecting to Railway PostgreSQL...');
    await client.connect();
    console.log('Connected successfully.');

    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running migrations from supabase-schema.sql...');
    
    // Split the SQL by semicolons to run each statement
    // This is a simple way to handle multiple statements
    // Note: This might fail for complex SQL with nested semicolons (e.g., in functions)
    // For more robust migrations, use a dedicated tool like Knex or Prisma.
    
    // Instead of splitting, we can try running the whole block if the driver supports it
    await client.query(schemaSql);

    console.log('Migrations completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
