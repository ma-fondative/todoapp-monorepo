import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { AppError } from '@/errors/index.js';
import { compare } from '@/utils/password-manager.js';
import { LoginReqBody } from '@/types/auth.js';

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
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const authService = createAuthService(app);
  app.decorate('authService', authService);
});
