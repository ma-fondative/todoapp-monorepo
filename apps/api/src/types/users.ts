import { z } from 'zod';
import { registerSchema } from '@/schemas/request/users.js';
import { usersTable } from "@/db/users.js";

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type RegisterReqBody = z.infer<typeof registerSchema>;
