import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';
import cors from '@fastify/cors';
import fastifyAutoload from '@fastify/autoload';
import path from 'path';
import { fastifyOpts } from '@/configs/fastify.js';

async function bootstrap() {
  const app = fastify(fastifyOpts);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.register(cors);
  await app.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'lib')
  });

  await app.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'app')
  });

  app.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'routes'),
    dirNameRoutePrefix: false
  });

  await app.listen({ port: app.config.API_PORT });
}

bootstrap().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
