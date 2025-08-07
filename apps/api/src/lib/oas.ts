import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  jsonSchemaTransformObject
} from 'fastify-type-provider-zod';

export default fp(async function (app) {
  app.get('/favicon.ico', (req, reply) => {
    reply.code(204).send();
  });

  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'TodoApp API',
        description: 'An API rest todoapp',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      }
    },
    transform: jsonSchemaTransform,
    transformObject: jsonSchemaTransformObject
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs'
  });
});
