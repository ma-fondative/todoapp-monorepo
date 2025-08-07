import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { usersTable } from '@/db/users.js';
import { NewUser } from '@/types/users.js';

declare module 'fastify' {
  interface FastifyInstance {
    usersRepository: ReturnType<typeof createUsersRepository>;
  }
}

function createUsersRepository(app: FastifyInstance) {
  const db = app.db;

  return {
    async find(id: string) {
      return await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, id)
      });
    },
    async findByEmail(email: string) {
      return await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.email, email)
      });
    },
    async findAll() {
      return await db.query.usersTable.findMany();
    },
    async create(data: NewUser) {
      return await db.insert(usersTable).values(data).returning();
    }
  };
}

export default fp(async function (app: FastifyInstance) {
  const usersRepository = createUsersRepository(app);
  app.decorate('usersRepository', usersRepository);
});
