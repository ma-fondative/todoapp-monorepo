import { loginSchema } from '@/schemas/request/auth.js';
import { tokens } from '@/schemas/response/auth.js';
import { error } from '@/schemas/response/errors.js';

export const oasLogin = {
  summary: 'Authenticate a user and generate an authentication token',
  tags: ['Authentication'],
  body: loginSchema,
  response: {
    200: tokens,
    401: error
  }
};
