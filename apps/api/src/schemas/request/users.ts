import { z } from 'zod';

export const userFilterSchema = z.record(z.string(), z.string()).optional();

export const userOrderBySchema = z.record(z.string(), z.enum(['asc', 'desc'])).optional();

export const getUsersQuerySchema = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().default(1)
  ).optional(),
  limit: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().default(10)
  ).optional(),
  filter: userFilterSchema,
  orderBy: userOrderBySchema
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
