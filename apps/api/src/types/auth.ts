import { z } from 'zod';
import { loginSchema } from '@/schemas/request/auth.js';
import { registerSchema } from '@/schemas/request/auth.js';
import { tokens } from '@/schemas/response/auth.js';

export type LoginReqBody = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof tokens>;

export type RegisterReqBody = z.infer<typeof registerSchema>;
