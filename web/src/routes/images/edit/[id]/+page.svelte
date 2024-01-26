<script lang="ts">
	import ImageForm from '$lib/components/organisms/ImageForm.svelte';
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { getGeneralState, type IImageFormErrors } from '$lib';
	import { fetchImageById } from '$lib/queries';
	import type { Image, User } from '@prisma/client';
	import { createQuery } from '@tanstack/svelte-query';
	import Loader from '$lib/components/atoms/Loader.svelte';

	export let data: { id: string };

	let errors: IImageFormErrors = {};
	const generalState = getGeneralState();

	const query = createQuery<Image & { user: User }>({
		queryKey: ['edit-image', data.id],
		queryFn: () => fetchImageById({ id: data.id }),
		refetchOnMount: true
	});

	async function handleSubmit(event: SubmitEvent) {
		generalState.update((state) => ({ ...state, isLoading: true }));
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);

		const response = await fetch(target.action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());
		if (result.type === 'failure') {
			errors = result.data?.errors as IImageFormErrors;
			generalState.update((state) => ({ ...state, isLoading: false }));
		} else if (result.type === 'success') {
			generalState.update((state) => ({ ...state, isLoading: false }));
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Edit {$query.data?.title}</title>
</svelte:head>

<section class="container mx-auto p-2 mt-12">
	<div class="grid grid-cols-1 justify-items-center">
		{#if $generalState?.isLoading}
			<Loader />
		{:else}
			<ImageForm
				action="?/update"
				{handleSubmit}
				{errors}
				image={{ ...$query.data, userName: $query.data?.user.name }}
			/>
		{/if}
	</div>
</section>
