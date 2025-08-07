import { FastifyInstance } from 'fastify';
import { oasLogin } from '@/schemas/oas/auth.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export default async function (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/login',
      { schema: oasLogin },
      async (request) => await app.authService.handleLogin(request.body)
    );
}
