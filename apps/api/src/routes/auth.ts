import { FastifyInstance } from 'fastify';
import { oasLogin, oasMe } from '@/schemas/oas/auth.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { oasRegister } from '@/schemas/oas/auth.js';
import { User } from '@/types/users.js';

export default async function (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/login',
      { schema: oasLogin },
      async (request) => await app.authService.handleLogin(request.body)
    )
    .post(
      '/register',
      { schema: oasRegister },
      async (request) => await app.authService.handleRegister(request.body)
    )
    .get(
      '/me',
      { schema: oasMe },
      async (request) => (await request.user) as User
    );
}
