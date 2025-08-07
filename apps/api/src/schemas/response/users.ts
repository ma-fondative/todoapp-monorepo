import { createSelectSchema } from 'drizzle-zod';
import { usersTable } from '@/db/users.js';
import { z } from 'zod';

export const user = createSelectSchema(usersTable).omit({ password: true });

export const users = z.array(user);
