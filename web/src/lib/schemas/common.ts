import { z } from 'zod';

export const idSchema = z.object({
  id: z.string().cuid()
});

export type IdType = z.infer<typeof idSchema>;

export const termSchema = z.object({
  term: z.string().default('')
});

export type TermType = z.infer<typeof termSchema>;

export const UploadResult = z.object({
  message: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  mimeType: z.string().optional(),
  folder: z.string().optional(),
  uniqueId: z.string().optional(),
  thumbnailUrl: z.string().optional()
});

export type IUploadResult = z.infer<typeof UploadResult>;

export const OptionInput = z.object({
  label: z.string(),
  value: z.string()
});

export type Option = z.infer<typeof OptionInput>;