<script lang="ts">
	import SearchIcon from '../atoms/SearchIcon.svelte';

	export let value: string = '';
</script>

<div class="relative">
	<input
		bind:value
		type="text"
		class="input input-bordered w-82 md:w-96 pl-10 py-2"
		placeholder="Search"
	/>
	<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
		<SearchIcon />
	</div>
</div>
