import { AppError } from '@/errors/index.js';
import { STATUS_CODES } from '@/errors/status-code.js';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    if (error.validation) {
      reply
        .code(STATUS_CODES.bad_request)
        .send(new AppError('invalid_request_data', {}, error).toJson());
    } else if (error instanceof AppError) {
      reply.code(error.statusCode).send(error.toJson());
    } else {
      reply
        .code(STATUS_CODES.internal_error)
        .send(new AppError('internal_error', {}, error).toJson());
    }
  });
});
