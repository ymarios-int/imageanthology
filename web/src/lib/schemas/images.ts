import { PUBLIC_ACCEPTED_IMAGE_TYPES, PUBLIC_MAX_FILE_SIZE } from '$env/static/public';
import { z } from 'zod';

export const imageFormSchema = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file: z.any()
    .refine((file) =>
      file?.size <= Number(PUBLIC_MAX_FILE_SIZE)
      , 'Max file size is 4MB.')
    .refine(
      (file) =>
        PUBLIC_ACCEPTED_IMAGE_TYPES.split(',').includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) =>
      file?.size > 0, "Image is required."),
  url: z.string().optional(),
  fileName: z.string().optional(),
  userName: z.string().optional()
});

export type ImageFormType = z.infer<typeof imageFormSchema>

