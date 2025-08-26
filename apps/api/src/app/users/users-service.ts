import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    usersService: ReturnType<typeof createUsersService>;
  }
}

function createUsersService(app: FastifyInstance) {
  return {
    async handleGetUsers() {
      return await app.usersRepository.findAll();
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const usersService = createUsersService(app);
  app.decorate('usersService', usersService);
});
