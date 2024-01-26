import { idSchema } from '$lib';
import { deleteImageById, findImageById } from '$lib/server/repos/images.js';
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {

  const validationResult = idSchema.safeParse({ id: params.id })
  const input = validationResult.success ? validationResult.data : { id: '' };

  const images = await findImageById(input)

  return json(images)
}

export const DELETE = async ({ params }) => {
  const id = params.id

  if (id) {
    await deleteImageById({ id })
  }
  return json({ id })
}