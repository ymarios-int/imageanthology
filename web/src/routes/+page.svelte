<script lang="ts">
	import { type IImageInfiniteResponse, debounce, getGeneralState } from '$lib';
	import Loader from '$lib/components/atoms/Loader.svelte';
	import SearchInput from '$lib/components/molecules/SearchInput.svelte';
	import ImagePage from '$lib/components/organisms/ImageScroll.svelte';
	import { fetchInfiniteImages } from '$lib/queries';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { onDestroy } from 'svelte';
	import { inview } from 'svelte-inview/dist/index';

	export let data;

	let term = '';
	const generalState = getGeneralState();

	const query = createInfiniteQuery<IImageInfiniteResponse>({
		queryKey: ['images', { ...data.searchFilters, term }],
		queryFn: ({ pageParam }) => fetchInfiniteImages({ ...data.searchFilters, term })({ pageParam }),
		getNextPageParam: (lastGroup: IImageInfiniteResponse) => {
			return lastGroup.nextCursor;
		},
		initialPageParam: null
	});

	$: ({ data: images, hasNextPage, isLoading, fetchNextPage, refetch } = $query);

	const updateSearch = debounce(() => {
		refetch();
	}, 500);

	$: term, updateSearch();

	const unsubscribe = generalState.subscribe((state) => {
		if (state.refetchImages) {
			refetch().then(() => {
				generalState.update((state) => ({
					...state,
					refetchImages: false
				}));
			});
		}
	});

	onDestroy(unsubscribe);
</script>

<section class="container mx-auto p-2 mt-12">
	{#if isLoading}
		<Loader />
	{:else}
		<div class="grid grid-cols-1 justify-items-center mb-8">
			<SearchInput bind:value={term} />
		</div>
		{#if images && images.pages[0].items.length > 0}
			{#each images.pages as page}
				<ImagePage images={page.items} loading={isLoading} />
			{/each}
			<div
				use:inview={{}}
				on:inview_change={(e) => {
					if (e.detail.inView && hasNextPage) {
						fetchNextPage();
					}
				}}
			/>
		{:else}
			<div class="text-center text-2xl text-neutral">No Results</div>
		{/if}
	{/if}
</section>
