import { z } from 'zod';
import { usersTable } from '@/db/users.js';
import { paginatedUsers, user } from '@/schemas/response/users.js';

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type UserResponse = z.infer<typeof user>;
export type PaginatedUserResponse = z.infer<typeof paginatedUsers>;
