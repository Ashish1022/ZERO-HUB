import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,

  min: 2,
  max: 20,  
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  
  statement_timeout: 30000,
  query_timeout: 30000,
  
  application_name: 'analytics-api'
});

export const db = drizzle({ client: pool });

export { pool };