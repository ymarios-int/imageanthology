import { imageFormSchema, type IImageFormErrors } from '$lib';
import { uploadImages } from '$lib/server/cdn/uploadFiles.js';
import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';
import { faker } from '@faker-js/faker';


export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const result = imageFormSchema.safeParse(Object.fromEntries(formData));

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


    const uploadResult = await uploadImages([result.data.file])

    const record = await prisma.image.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        userId: result.data.userId,
        url: uploadResult[0].url ?? '',
        folder: uploadResult[0].folder ?? '',
        fileName: uploadResult[0].name ?? '',
        uniqueId: uploadResult[0].uniqueId ?? '',
        likes: faker.number.int({
          min: 0,
          max: 100
        }),
        views: faker.number.int({
          min: 0,
          max: 500
        }),
      }
    })


    return { success: true, data: record }
  }
};