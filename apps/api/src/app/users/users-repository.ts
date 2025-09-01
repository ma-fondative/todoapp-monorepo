import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { usersTable } from '@/db/users.js';
import { NewUser } from '@/types/users.js';
import {
  count,
  desc,
  asc,
  eq,
  and,
  getTableColumns,
  inArray
} from 'drizzle-orm';
import { GetUsersQuery } from '@/schemas/request/users.js';
import { User } from '@/types/users.js';

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
    async findPaginatedUsers(
      page = 1,
      limit = 10,
      filter?: GetUsersQuery['filter'],
      orderBy?: GetUsersQuery['orderBy']
    ) {
      const offset = (page - 1) * limit;

      const whereConditions = [];
      if (filter) {
        for (const [field, value] of Object.entries(filter)) {
          const column = getTableColumns(usersTable)[field as keyof User];
          if (column) {
            whereConditions.push(eq(column, value));
          } else {
            app.log.warn(`Champ de filtre inconnu: ${field}`);
          }
        }
      }

      const orderByClauses = [];
      if (orderBy) {
        for (const [field, direction] of Object.entries(orderBy)) {
          const column = getTableColumns(usersTable)[field as keyof User];
          if (column) {
            if (direction === 'asc') {
              orderByClauses.push(asc(column));
            } else {
              orderByClauses.push(desc(column));
            }
          } else {
            app.log.warn(`Champ de tri inconnu: ${field}`);
          }
        }
      }

      const commonBaseQuery = db
        .select()
        .from(usersTable)
        .where(and(...whereConditions))
        .orderBy(...orderByClauses);

      const commonBaseAlias = commonBaseQuery.as('commonBase');

      const totalCountResult = await db
        .select({
          count: count()
        })
        .from(commonBaseAlias);

      const totalCount = totalCountResult[0].count;

      const userIdsPaginatedSubquery = db
        .selectDistinct({ id: commonBaseAlias.id })
        .from(commonBaseAlias)
        .offset(offset)
        .limit(limit)
        .as('userIdsPaginatedSubquery');

      const users = await commonBaseQuery
        .$dynamic()
        .where(
          and(
            ...whereConditions,
            inArray(
              usersTable.id,
              db
                .select({ id: userIdsPaginatedSubquery.id })
                .from(userIdsPaginatedSubquery)
            )
          )
        );

      return {
        meta: {
          page: page,
          count: users.length,
          total: totalCount
        },
        data: users
      };
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
