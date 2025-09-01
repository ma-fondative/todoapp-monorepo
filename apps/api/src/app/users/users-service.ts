import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { GetUsersQuery } from '@/schemas/request/users.js'; // Importation du type de requête

declare module 'fastify' {
  interface FastifyInstance {
    usersService: ReturnType<typeof createUsersService>;
  }
}

function createUsersService(app: FastifyInstance) {
  return {
    async handleGetUsers(query: GetUsersQuery) {
      const { page, limit, filter, orderBy } = query;
      return await app.usersRepository.findPaginatedUsers(page, limit, filter, orderBy);
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const usersService = createUsersService(app);
  app.decorate('usersService', usersService);
});
