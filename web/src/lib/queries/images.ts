import { PUBLIC_DOMAIN } from "$env/static/public";
import type { IdType, InfininteScrollType } from "$lib";
import http from "$lib/utils/http";
import queryString from 'query-string';

export const fetchInfiniteImages =
  (input: InfininteScrollType, client: typeof fetch = fetch) =>
    async ({ pageParam }: { pageParam: unknown }) => {
      const queryParams = queryString.stringify(
        { ...input, cursor: pageParam as string },
        {
          skipEmptyString: true,
          skipNull: true,
          arrayFormat: 'comma'
        }
      );
      const response = await http(client)(`${PUBLIC_DOMAIN}/api/images?${queryParams}`);

      return await response.json();
    };


export const fetchImageById = async ({ id }: IdType, client: typeof fetch = fetch) => {
  const response = await http(client)(`${PUBLIC_DOMAIN}/api/images/${id}`);

  return await response.json();
};

export const deleteImageById = async (
  { id }: IdType,
  client: typeof fetch = fetch
): Promise<{ id: string }> => {
  const response = await http(client)(`${PUBLIC_DOMAIN}/api/images/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};