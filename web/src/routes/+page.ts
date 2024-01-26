import type { PageLoad } from './$types';
import { fetchInfiniteImages } from '$lib/queries';
import type { IImageInfiniteResponse } from '$lib';

export const load: PageLoad = async ({ parent, fetch }) => {
  const data = await parent();
  const { queryClient, searchFilters } = data

  await queryClient.prefetchInfiniteQuery<IImageInfiniteResponse>({
    queryKey: ['images', searchFilters],
    queryFn: ({ pageParam }) => fetchInfiniteImages(searchFilters, fetch)({ pageParam }),
    getNextPageParam: (lastGroup: IImageInfiniteResponse) => {
      return lastGroup.nextCursor;
    },
    initialPageParam: null
  })


  return { ...data };
};