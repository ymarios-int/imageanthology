import { infiniteScrollSchema, type InfininteScrollType } from '$lib';
import { findImagesInfinite } from '$lib/server/repos/images.js';
import { getDefaultValues } from '$lib/utils/getDefaultValues';
import { json } from '@sveltejs/kit'
import queryString from 'query-string';
import type { AnyZodObject } from 'zod';

export const GET = async ({ url }) => {
  const initialState = getDefaultValues<InfininteScrollType, AnyZodObject>(infiniteScrollSchema);

  const parsedQuery = queryString.parse(url.search)
  const validationResult = infiniteScrollSchema.safeParse(parsedQuery)
  const input = validationResult.success ? validationResult.data : initialState;

  const images = await findImagesInfinite(input)

  return json(images)
}

