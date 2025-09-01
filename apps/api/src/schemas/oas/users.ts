import { error } from '@/schemas/response/errors.js';
import { paginatedUsers } from '@/schemas/response/users.js';
import { getUsersQuerySchema } from '@/schemas/request/users.js';

export const oasGetUsers = {
  summary: 'Get all users',
  tags: ['Users'],
  querystring: getUsersQuerySchema,
  response: {
    200: paginatedUsers,
    401: error
  }
};
