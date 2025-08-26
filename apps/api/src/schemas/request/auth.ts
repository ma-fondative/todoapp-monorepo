import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const registerSchema = z.object({
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string()
});
