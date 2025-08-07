import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/index.js';

declare module 'fastify' {
  export interface FastifyInstance {
    db: ReturnType<typeof createDb>;
  }
}

function getOpts(appEnv: 'dev' | 'prod') {
  const opts = {
    dev: { logger: true },
    prod: {}
  };
  return opts[appEnv];
}

function createDb(app: FastifyInstance) {
  return drizzle(app.config.DATABASE_URL, {
    ...getOpts(app.config.APP_ENV),
    schema
  });
}

export default fp(
  async function (app) {
    const db = createDb(app);
    app.decorate('db', db);
  },
  { name: 'db', dependencies: ['@fastify/env'] }
);
