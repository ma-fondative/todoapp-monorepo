import { defineConfig } from 'drizzle-kit';

// https://github.com/drizzle-team/drizzle-orm/issues/819
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/*',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'localhost'
  }
});
