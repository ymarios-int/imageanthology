<script lang="ts">
	import Reactions from '../../../lib/components/molecules/Reactions.svelte';
	import { fetchImageById } from '$lib/queries';
	import type { Image, User } from '@prisma/client';
	import { createQuery } from '@tanstack/svelte-query';
	import UserInfo from '$lib/components/molecules/UserInfo.svelte';

	export let data: { id: string };

	const query = createQuery<Image & { user: User }>({
		queryKey: ['image', data.id],
		queryFn: () => fetchImageById({ id: data.id })
	});
</script>

<svelte:head>
	<title>{$query.data?.title}</title>
</svelte:head>

{#if $query?.data}
	<section class="container mx-auto my-24 p-2">
		<div class="grid md:grid-cols-2 xs:grid-cols-1 gap-6 p-12">
			<div class="justify-self-end">
				<img src={$query.data.url} alt={$query.data.title} />
			</div>
			<div>
				<div class="text-3xl font-medium capitalize mb-4">{$query.data.title}</div>
				<div><p>{$query.data.description}</p></div>
				<div class="grid grid-cols-2 justify-between items-center mt-8 gap-">
					<Reactions data={{ views: $query.data.views, likes: $query.data.likes }} />

					<div class="grid justify-items-end mt-24 md:mt-0">
						<UserInfo data={{ user: $query.data.user, createdAt: $query.data.createdAt }} />
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
