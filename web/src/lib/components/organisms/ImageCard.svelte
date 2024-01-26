<script lang="ts">
	import type { Image, User } from '@prisma/client';
	import UserInfo from '../molecules/UserInfo.svelte';
	import Reactions from '../molecules/Reactions.svelte';
	import DeleteIcon from '../atoms/DeleteIcon.svelte';
	import EditIcon from '../atoms/EditIcon.svelte';
	import { goto } from '$app/navigation';

	export let image: Image & {
		user: User;
	};
	export let handleOpen: (id: string) => void;

	function handleEditClick(id: string) {
		goto(`/images/edit/${id}`);
	}
</script>

<a href={`/images/${image.id}`}>
	<div class="card w-68 bg-base-100 shadow-xl">
		<div class="relative overflow-hidden">
			<figure class="rounded-t-2xl">
				<img src={image.url} alt={image.title} />
			</figure>
			<div class="absolute top-3 left-2">
				<button class="btn-icon btn-icon-xl" on:click|preventDefault={() => handleOpen(image.id)}>
					<DeleteIcon />
				</button>
			</div>
			<div class="absolute top-3 right-2">
				<button
					class="btn-icon btn-icon-xl"
					on:click|preventDefault={() => handleEditClick(image.id)}
				>
					<EditIcon />
				</button>
			</div>
		</div>

		<div class="card-body p-3">
			<h2 class="card-title">
				{image.title}
			</h2>
			<p class="line-clamp-2 text-sm mb-4 h-16 min-h-full">{image.description}</p>
			<Reactions data={{ views: image.views, likes: image.likes }} />
		</div>
		<div class="flex justify-between p-3">
			<UserInfo data={{ user: image.user, createdAt: image.createdAt }} />
		</div>
	</div>
</a>
