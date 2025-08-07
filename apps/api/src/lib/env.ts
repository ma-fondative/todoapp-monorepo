import env from '@fastify/env';
import z from 'zod';

const configSchema = z.object({
  APP_ENV: z.enum(['dev', 'prod']).default('dev'),
  API_PORT: z.number().default(8000),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_TTL: z.string().default('30m')
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { $schema, ...schema } = z.toJSONSchema(configSchema);

declare module 'fastify' {
  export interface FastifyInstance {
    config: z.infer<typeof configSchema>;
  }
}

export const autoConfig = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: 'config',

  // Schema to validate
  schema,

  // Needed to read .env in root folder
  dotenv: true,

  // Source for the configuration data
  // Optional, default: process.env
  data: process.env
};

export default env;
