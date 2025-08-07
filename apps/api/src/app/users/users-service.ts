import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { RegisterReqBody } from '@/types/users.js';
import { hashPassword } from '@/utils/password-manager.js';
import { AppError } from '@/errors/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    usersService: ReturnType<typeof createUsersService>;
  }
}

function createUsersService(app: FastifyInstance) {
  return {
    async handleRegister(data: RegisterReqBody) {
      if (await app.usersRepository.findByEmail(data.email)) {
        throw new AppError('user_already_exists');
      }
      const password = await hashPassword(data.password);
      const user = await app.usersRepository.create({ ...data, password });
      return user[0];
    },
    async handleGetUsers() {
      return await app.usersRepository.findAll();
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const usersService = createUsersService(app);
  app.decorate('usersService', usersService);
});
