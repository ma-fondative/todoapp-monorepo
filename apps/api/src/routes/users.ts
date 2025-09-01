import { FastifyInstance } from 'fastify';
import { oasGetUsers } from '@/schemas/oas/users.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetUsersQuery } from '@/schemas/request/users.js';

export default async function (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/users',
      { schema: oasGetUsers },
      async (request) => {
        const query: GetUsersQuery = request.query;
        return await app.usersService.handleGetUsers(query);
      }
    );
}
