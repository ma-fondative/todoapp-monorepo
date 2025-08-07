import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { createSigner, createVerifier, TokenError } from 'fast-jwt';
import fastifyAuth, { FastifyAuthFunction } from '@fastify/auth';
import { parse } from '@lukeed/ms';
import { publicRoutes } from '@/configs/security.js';
import { AppError } from '@/errors/index.js';
import { User } from '@/types/users.js';

declare module 'fastify' {
  interface FastifyInstance {
    verifyJwt: FastifyAuthFunction;
    generateAccessToken: ReturnType<typeof createGenerateAccessToken>;
  }

  interface FastifyRequest {
    user: User | null;
  }
}

function extractAccessToken(request: FastifyRequest): string {
  const authorizationHeader = request.raw.headers?.authorization;
  if (typeof authorizationHeader !== 'string') {
    throw new AppError('missing_authorization');
  }
  const parts = authorizationHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer' && parts[1]) {
    return parts[1];
  }
  throw new AppError('missing_bearer_prefix');
}

function createGenerateAccessToken(app: FastifyInstance) {
  return function (sub: string) {
    const signSync = createSigner({
      key: app.config.ACCESS_TOKEN_SECRET,
      expiresIn: app.config.ACCESS_TOKEN_TTL
    });

    return {
      accessToken: signSync({ sub }),
      expireIn: (parse(app.config.ACCESS_TOKEN_TTL) ?? 0) / 1000
    };
  };
}

function createVerifyJwt(app: FastifyInstance) {
  return async function (request: FastifyRequest) {
    const regexString =
      '^/(' + publicRoutes.map((route) => route.substring(1)).join('|') + ')';
    const regex = new RegExp(regexString);
    if (regex.test(request.url)) {
      return;
    }

    const verifySync = createVerifier({ key: app.config.ACCESS_TOKEN_SECRET });
    const token = extractAccessToken(request);

    let payload;
    try {
      payload = verifySync(token);
    } catch (err) {
      if (err instanceof TokenError && err.code === TokenError.codes.expired) {
        throw new AppError('token_expired', {}, err);
      }
      throw err;
    }

    const user = await app.usersRepository.find(payload.sub);
    if (!user) throw new AppError('not_found');

    request['user'] = user;
  };
}

export default fp(async function (app) {
  await app.register(fastifyAuth);
  app.decorateRequest('user', null);
  app.decorate('verifyJwt', createVerifyJwt(app));
  app.decorate('generateAccessToken', createGenerateAccessToken(app));
  app.addHook('onRequest', app.auth([app.verifyJwt]));
});
