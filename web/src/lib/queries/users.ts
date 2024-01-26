import { PUBLIC_DOMAIN } from "$env/static/public";
import type { TermType } from "$lib";
import http from "$lib/utils/http";
import queryString from "query-string";

export const fetchUsersByTerm = async (input: TermType, client: typeof fetch = fetch) => {
  const queryParams = queryString.stringify(input, {
    skipEmptyString: true,
    skipNull: true,
    arrayFormat: 'comma'
  });

  const response = await http(client)(`${PUBLIC_DOMAIN}/api/users?${queryParams}`);

  return await response.json();
};
