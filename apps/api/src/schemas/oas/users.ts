import { error } from '@/schemas/response/errors.js';
import { users } from '@/schemas/response/users.js';



export const oasGetUsers = {
  summary: 'Get all users',
  tags: ['Users'],
  response: {
    200: users,
    401: error
  }
};
