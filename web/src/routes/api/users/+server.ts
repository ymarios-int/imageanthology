import { infiniteScrollSchema, type TermType, termSchema } from '$lib';
import { findUsersByTerm } from '$lib/server';
import { getDefaultValues } from '$lib/utils/getDefaultValues';
import { json } from '@sveltejs/kit'
import queryString from 'query-string';
import type { AnyZodObject } from 'zod';

export const GET = async ({ url }) => {
  const initialState = getDefaultValues<TermType, AnyZodObject>(infiniteScrollSchema);

  const parsedQuery = queryString.parse(url.search)
  const validationResult = termSchema.safeParse(parsedQuery)
  const input = validationResult.success ? validationResult.data : initialState;
  const users = await findUsersByTerm(input)

  return json(users)
}