import { z } from 'zod';

const metaSchema = z.object({
  page: z.number(),
  count: z.number(),
  total: z.number()
});

export function createPaginationResult<T extends z.ZodType>(
  dataObjectSchema: T
) {
  return z.object({
    meta: metaSchema,
    data: z.array(dataObjectSchema)
  });
}
