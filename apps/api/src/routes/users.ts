import { FastifyInstance } from 'fastify';
import { oasGetUsers, oasRegister } from '@/schemas/oas/users.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export default async function (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/register',
      { schema: oasRegister },
      async (request) => await app.usersService.handleRegister(request.body)
    )
    .get(
      '/users',
      { schema: oasGetUsers },
      async () => await app.usersService.handleGetUsers()
    );
}
