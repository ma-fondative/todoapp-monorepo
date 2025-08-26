import { FastifyInstance } from 'fastify';
import { oasGetUsers } from '@/schemas/oas/users.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export default async function (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/users',
      { schema: oasGetUsers },
      async () => await app.usersService.handleGetUsers()
    );
}
