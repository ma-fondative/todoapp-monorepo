import { z } from 'zod';

export const tokens = z.object({
  accessToken: z.string(),
  expireIn: z.number(),
});
