<script lang="ts">
	import EyeIcon from '$lib/components/atoms/EyeIcon.svelte';
	import Like from '$lib/components/atoms/Like.svelte';

	export let data: { views: number; likes: number };
</script>

<div class="card-actions">
	<EyeIcon /><span class="pt-0.5">{data.views}</span>
	<Like /><span class="pt-0.5">{data.likes}</span>
</div>
