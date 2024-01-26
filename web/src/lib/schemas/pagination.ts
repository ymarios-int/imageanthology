import { z } from 'zod';
import { PUBLIC_DEFAULT_SORT, PUBLIC_INFINITE_SCROLL_PAGE_SIZE, PUBLIC_SORT } from "$env/static/public";

const defaultInfiniteScrollLimit = Number(PUBLIC_INFINITE_SCROLL_PAGE_SIZE);
const sortKeys = String(PUBLIC_SORT).split(',') || ['id', 'title', 'likes', 'createdAt'];

export const infiniteScrollSchema = z.object({
  sort: z
    .unknown()
    .transform((val) => (val ? String(val) : ''))
    .refine((val) => sortKeys.includes(val))
    .catch(sortKeys[0] || 'id')
    .default(PUBLIC_DEFAULT_SORT),
  order: z.enum(['asc', 'desc']).catch('asc').default('desc'),
  limit: z
    .unknown()
    .transform((val) => (val ? Number(val) : defaultInfiniteScrollLimit))
    .catch(defaultInfiniteScrollLimit)
    .default(defaultInfiniteScrollLimit),
  cursor: z.string().cuid().nullish().default(null),
  term: z.string().optional().catch('').default('')
});

export type InfininteScrollType = z.infer<typeof infiniteScrollSchema>;