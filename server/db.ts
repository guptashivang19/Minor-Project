import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in environment variables');
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

let pool: Pool;
let db: ReturnType<typeof drizzle>;

try {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: true // Enable SSL for secure connection
  });
  
  // Test the connection
  pool.connect().then(() => {
    console.log('Successfully connected to the database');
  }).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
  
  db = drizzle({ client: pool, schema });
} catch (err) {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}

export { pool, db };