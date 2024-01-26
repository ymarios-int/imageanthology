import queryString from 'query-string';
import type { AnyZodObject, SafeParseReturnType } from 'zod';
import { getDefaultValues } from './getDefaultValues';

export const validateQueryString = <T>(urlSearch: string, obj: AnyZodObject): T => {
  const initialState = getDefaultValues<T, AnyZodObject>(obj);
  const input = queryString.parse(urlSearch);
  const result = obj.safeParse(input) as SafeParseReturnType<AnyZodObject, T>;
  const state = result.success ? result.data : initialState;

  return state;
};
