import knex from 'knex';
import { getDbConfig, getFallbackConfig } from './config.js';

let dbInstance = null;
let isUsingFallback = false;

const createInstance = (config) => {
  const instance = knex(config);
  
  // Add basic error handling to the pool
  instance.on('query-error', (error, obj) => {
    console.error('Database query error:', error);
  });

  return instance;
};

const initDb = async () => {
  const primaryConfig = getDbConfig();
  console.log(`Initializing database connection for ${primaryConfig.client}...`);
  
  try {
    dbInstance = createInstance(primaryConfig);
    // Test connection
    await dbInstance.raw('SELECT 1');
    console.log(`Successfully connected to primary database (${primaryConfig.client})`);
  } catch (err) {
    console.error(`Failed to connect to primary database: ${err.message}`);
    
    const fallbackConfig = getFallbackConfig();
    if (fallbackConfig) {
      console.log(`Attempting to switch to fallback database (${fallbackConfig.client})...`);
      try {
        dbInstance = createInstance(fallbackConfig);
        await dbInstance.raw('SELECT 1');
        isUsingFallback = true;
        console.log(`Successfully connected to fallback database (${fallbackConfig.client})`);
      } catch (fallbackErr) {
        console.error(`Failed to connect to fallback database: ${fallbackErr.message}`);
        throw new Error('All database connections failed');
      }
    } else {
      throw err;
    }
  }
};

export const getDb = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return dbInstance;
};

export const getStatus = () => ({
  connected: !!dbInstance,
  isUsingFallback,
  dbType: dbInstance ? dbInstance.client.config.client : null
});

export { initDb };
