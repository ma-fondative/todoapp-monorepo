import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string()
});
