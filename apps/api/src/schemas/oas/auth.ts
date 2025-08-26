import { loginSchema, registerSchema } from '@/schemas/request/auth.js';
import { tokens } from '@/schemas/response/auth.js';
import { error } from '@/schemas/response/errors.js';
import { user } from '@/schemas/response/users.js';

export const oasLogin = {
  summary: 'Authenticate a user and generate an authentication token',
  tags: ['Authentication'],
  body: loginSchema,
  response: {
    200: tokens,
    401: error
  }
};

export const oasRegister = {
  summary: 'Register a new user',
  tags: ['Authentication'],
  body: registerSchema,
  response: {
    200: user,
    400: error
  }
};

export const oasMe = {
  summary: 'Get the current user',
  tags: ['Authentication'],
  response: {
    200: user,
    401: error
  }
};
