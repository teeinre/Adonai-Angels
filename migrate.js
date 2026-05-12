import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, getDb } from './db/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    await initDb();
    const db = getDb();
    const client = db.client.config.client;

    console.log(`Running migrations for ${client}...`);

    if (client === 'pg') {
      // PostgreSQL specific setup
      await db.raw('CREATE SCHEMA IF NOT EXISTS auth;');
      await db.raw('CREATE SCHEMA IF NOT EXISTS extensions;');
      await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
      await db.raw('CREATE TABLE IF NOT EXISTS auth.users (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email TEXT UNIQUE, password_hash TEXT, raw_user_meta_data JSONB, created_at TIMESTAMPTZ DEFAULT NOW());');
      await db.raw('ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS password_hash TEXT;');
    } else {
      // MySQL/MariaDB specific setup
      await db.raw('CREATE TABLE IF NOT EXISTS users (id CHAR(36) PRIMARY KEY, email VARCHAR(255) UNIQUE, password_hash TEXT, raw_user_meta_data JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);');
    }

    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    let schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    if (client === 'mysql2') {
      // Basic transformation for MySQL compatibility
      schemaSql = schemaSql
        .replace(/UUID PRIMARY KEY DEFAULT uuid_generate_v4\(\)/g, 'CHAR(36) PRIMARY KEY')
        .replace(/UUID REFERENCES/g, 'CHAR(36) REFERENCES')
        .replace(/TIMESTAMPTZ DEFAULT NOW\(\)/g, 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
        .replace(/JSONB/g, 'JSON')
        .replace(/public\./g, '')
        .replace(/auth\./g, '');
    }
    
    // Warning: Running raw schema SQL across different DBs is complex.
    // In a production app, use Knex migrations (knex migrate:make).
    console.log('Executing schema SQL...');
    await db.raw(schemaSql);

    console.log('Migrations completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();
