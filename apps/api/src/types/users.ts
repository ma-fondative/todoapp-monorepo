import { z } from 'zod';
import { usersTable } from '@/db/users.js';
import { user } from '@/schemas/response/users.js';

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type UserResponse = z.infer<typeof user>;
