import { registerSchema } from '@/schemas/request/users.js';
import { error } from '@/schemas/response/errors.js';
import { user, users } from '@/schemas/response/users.js';

export const oasRegister = {
  summary: 'Register a new user',
  tags: ['Users'],
  body: registerSchema,
  response: {
    200: user,
    400: error
  }
};

export const oasGetUsers = {
  summary: 'Get all users',
  tags: ['Users'],
  response: {
    200: users,
    401: error
  }
};
