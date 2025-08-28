import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const registerSchema = z
  .object({
    email: z.email(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword']
  });
