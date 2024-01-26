<script lang="ts">
	import type { User } from '@prisma/client';
	import Avatar from '../atoms/Avatar.svelte';

	export let data: { user: User; createdAt: Date };
</script>

<div class="flex-auto flex items-center space-x-4 text-sm font-semibold">
	<div class="flex-auto flex items-center space-x-2">
		<Avatar src={data.user.avatar} />
		<span class="line-clamp-1">{data.user.username}</span>
	</div>
	<span>{new Date(data.createdAt).toLocaleDateString('el')}</span>
</div>
