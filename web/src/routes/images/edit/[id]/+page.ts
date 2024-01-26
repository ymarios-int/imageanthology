
import { fetchImageById } from '$lib/queries';
import type { User, Image } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
  const { queryClient } = await parent();
  const id = params.id;

  await queryClient.prefetchQuery<Image & { user: User }>({
    queryKey: ['edit-image', id],
    queryFn: () => fetchImageById({ id }, fetch)
  });

  return { id }
};
