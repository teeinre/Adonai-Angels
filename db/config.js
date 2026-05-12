import dotenv from 'dotenv';
dotenv.config();

const dbConfigs = {
  postgresql: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'adonai_db',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 20,
    },
  },
  mysql: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'adonai_db',
    },
    pool: {
      min: 2,
      max: 20,
    },
  },
  mariadb: {
    client: 'mysql2', // Knex uses mysql2 for MariaDB as well
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'adonai_db',
    },
    pool: {
      min: 2,
      max: 20,
    },
  },
};

export const getDbConfig = () => {
  const dbType = process.env.DB_TYPE || 'postgresql';
  const config = dbConfigs[dbType.toLowerCase()];
  
  if (!config) {
    throw new Error(`Unsupported database type: ${dbType}. Supported types: postgresql, mysql, mariadb`);
  }
  
  return config;
};

export const getFallbackConfig = () => {
  const fallbackType = process.env.DB_FALLBACK_TYPE;
  if (!fallbackType) return null;
  
  return dbConfigs[fallbackType.toLowerCase()] || null;
};
