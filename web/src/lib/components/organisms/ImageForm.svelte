<script lang="ts">
	import UsersAutocomplete from '$lib/components/molecules/UsersAutocomplete.svelte';
	import { type IImageFormErrors, type ImageFormType } from '$lib';
	import DeleteIcon from '../atoms/DeleteIcon.svelte';

	export let action: string = '';
	export let handleSubmit: (event: SubmitEvent) => void;
	export let errors: IImageFormErrors = {};
	export let image: Partial<ImageFormType>;
</script>

<form
	on:submit|preventDefault={handleSubmit}
	enctype="multipart/form-data"
	{action}
	class="form-control w-full max-w-xl mx-auto p-4 card rounded-xl shadow-xl"
>
	{#if image.id}
		<input type="hidden" name="id" bind:value={image.id} />
	{/if}
	<!-- Title Field -->
	<div class="mb-4">
		<label class="label" for="title">
			<span class="label-text">Title</span>
		</label>
		<input
			name="title"
			type="text"
			placeholder="Enter title"
			class="input input-bordered w-full"
			bind:value={image.title}
		/>
		{#if errors.title}
			<span class="text-red-500">{errors.title}</span>
		{/if}
	</div>

	<!-- Description Field -->
	<div class="mb-4">
		<label class="label" for="description">
			<span class="label-text">Description</span>
		</label>
		<textarea
			name="description"
			placeholder="Enter description"
			class="textarea textarea-bordered w-full"
			rows="10"
			bind:value={image.description}
		/>
		{#if errors.description}
			<span class="text-red-500">{errors.description}</span>
		{/if}
	</div>

	<!-- File Input -->
	<div class="mb-4">
		<label class="label" for="file">
			<span class="label-text">File</span>
		</label>
		{#if image.url}
			<div class="shadow-sm p-2">
				<dl class="list-dl">
					<div class="grid grid-cols-8 gap-4 justify-between items-center">
						<div class="col-start-1 col-span-7">
							<span><img width="128" src={image.url} alt="" /></span>
							<span class="flex-auto">
								<dt>{image.fileName}</dt>
							</span>
						</div>
						<div class="col-end-9 col-span-21">
							<button on:click={() => (image.url = '')}><DeleteIcon /></button>
						</div>
					</div>
				</dl>
			</div>
		{:else}
			<input
				type="file"
				name="file"
				class="file-input file-input-bordered file-input-secondary w-full"
				accept=".jpg, .jpeg, .png, .webp"
			/>
			{#if errors.file}
				<span class="text-red-500">{errors.file}</span>
			{/if}
		{/if}
	</div>

	<!-- User Field -->
	<div class="mb-8">
		<label class="label" for="userId">
			<span class="label-text">User</span>
		</label>
		<UsersAutocomplete bind:value={image.userId} bind:label={image.userName} />
		{#if errors.userId}
			<span class="text-red-500">User is required</span>
		{/if}
	</div>

	<!-- Submit Button -->
	<div class="mt-6">
		<button class="btn btn-secondary w-full">Save</button>
	</div>
</form>
