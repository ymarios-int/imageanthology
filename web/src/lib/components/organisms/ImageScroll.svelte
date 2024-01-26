<script lang="ts">
	import ImageSkeleton from './ImageSkeleton.svelte';
	import ImageCard from './ImageCard.svelte';
	import type { Image, User } from '@prisma/client';
	import DeleteModal from './DeleteModal.svelte';
	import { deleteImageById, getGeneralState } from '$lib';

	export let images: (Image & { user: User })[];
	export let loading: boolean = true;

	let modal: HTMLDialogElement;
	const generalState = getGeneralState();

	function handleOpen(id: string) {
		generalState.update((state) => ({
			...state,
			deleteId: id
		}));
		modal.showModal();
	}

	function handleClose() {
		modal.close();
	}

	function handleDelete() {
		const id = $generalState.deleteId;
		id &&
			deleteImageById({ id })
				.then(() =>
					generalState.update((data) => ({ ...data, deleteId: null, refetchImages: true }))
				)
				.then(() => handleClose());
	}
</script>

<section id="images-page" class="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-8 mb-8">
	{#each images as image, i}
		{#if loading}
			<ImageSkeleton />
		{:else}
			<ImageCard {image} {handleOpen} />
		{/if}
	{/each}
	<DeleteModal bind:modal {handleClose} {handleDelete} />
</section>
