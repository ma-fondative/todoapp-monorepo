import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { AppError } from '@/errors/index.js';
import { compare, hashPassword } from '@/utils/password-manager.js';
import { LoginReqBody, RegisterReqBody } from '@/types/auth.js';

declare module 'fastify' {
  interface FastifyInstance {
    authService: ReturnType<typeof createAuthService>;
  }
}

function createAuthService(app: FastifyInstance) {
  return {
    async handleLogin({ email, password }: LoginReqBody) {
      const user = await app.usersRepository.findByEmail(email);
      if (!user || !(await compare(user.password, password))) {
        throw new AppError('invalid_credentials');
      }

      return app.generateAccessToken(user.id);
    },
    async handleRegister(data: RegisterReqBody) {
      if (await app.usersRepository.findByEmail(data.email)) {
        throw new AppError('user_already_exists');
      }
      const password = await hashPassword(data.password);
      const user = await app.usersRepository.create({ ...data, password });
      return user[0];
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const authService = createAuthService(app);
  app.decorate('authService', authService);
});
