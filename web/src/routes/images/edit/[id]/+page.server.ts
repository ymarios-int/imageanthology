import { type IImageFormErrors, imageFormSchema } from '$lib';
import { uploadImages } from '$lib/server/cdn/uploadFiles.js';
import prisma from '$lib/server/prisma.js';
import { error, fail } from '@sveltejs/kit';


export const actions = {
  update: async ({ request }) => {
    const formData = await request.formData();
    const updateImageFormSchema = imageFormSchema.extend({
      file: imageFormSchema.shape.file.optional()
    })
    const result = updateImageFormSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      const errors = result.error.issues.reduce((acc: IImageFormErrors, issue) => {
        const path = issue.path[0] as keyof IImageFormErrors
        acc[path] = issue.message;
        return acc;
      }, {});

      return fail(
        400, { errors }
      );
    }

    if (!result.data.id) {
      throw error(400, 'Image id must be provided')
    }

    const existingImage = await prisma.image.findFirstOrThrow({
      where: {
        id: result.data.id
      }
    });

    if (!existingImage) {
      throw error(400, 'Image does not exist')
    }

    if (result.data.file) {
      const uploadResult = await uploadImages([result.data.file], existingImage.folder, existingImage.id)
      existingImage.fileName = uploadResult[0]?.name ?? existingImage.fileName;
      existingImage.url = uploadResult[0]?.url ?? existingImage.url;
      existingImage.folder = uploadResult[0]?.folder ?? existingImage.folder;
      existingImage.uniqueId = uploadResult[0]?.uniqueId ?? existingImage.uniqueId;
    }


    const record = await prisma.image.update({
      where: {
        id: result.data.id
      },
      data: {
        ...existingImage,
        title: result.data.title,
        description: result.data.description,
        userId: result.data.userId,
      }
    })


    return { success: true, data: record }
  }
};