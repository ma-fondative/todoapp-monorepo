import { timestamp } from 'drizzle-orm/pg-core';
import { uuid, varchar, pgTable } from 'drizzle-orm/pg-core';
import { v7 } from 'uuid';

export const usersTable = pgTable('users', {
  id: uuid('id')
    .$defaultFn(() => v7())
    .primaryKey(),
  firstname: varchar('firstname').notNull(),
  lastname: varchar('lastname').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password')
    .notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date())
});
