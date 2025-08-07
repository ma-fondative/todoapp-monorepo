import { z } from 'zod';
import { loginSchema } from '@/schemas/request/auth.js';

export type LoginReqBody = z.infer<typeof loginSchema>;
