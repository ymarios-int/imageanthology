import { infiniteScrollSchema, type InfininteScrollType } from '$lib';
import { validateQueryString } from '$lib/utils/validateQueryString';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {

  const searchFilters = validateQueryString<InfininteScrollType>(
    url.search,
    infiniteScrollSchema
  );

  return {
    session: {
      name: "Yannis Marios",
      email: 'ymarios@example.com',
      username: 'ymarios'
    },
    searchFilters
  };
};