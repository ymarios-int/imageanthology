<script lang="ts">
	import type { Option } from '$lib';
	import { onMount } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	export let name: string = 'text';
	export let term = '';
	export let options: Option[] = [];
	export let placeholder: string = 'Search';
	export let value = '';
	export let label = '';

	let showSuggestions = false;

	function filterSuggestions() {
		if (options.length > 0) {
			showSuggestions = true;
		} else {
			showSuggestions = false;
		}
	}

	$: options, filterSuggestions();

	function selectSuggestion(suggestion: Option) {
		label = suggestion.label;
		value = suggestion.value;
		showSuggestions = false;
	}

	function handleInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		term = value;
	}

	const handleClick = (event: MouseEvent) => {
		const target = event.target as Element;
		if (!target?.closest('.autocomplete-container')) {
			showSuggestions = false;
		}
	};
	// Hide suggestions when clicking outside
	onMount(() => {
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	});
</script>

<div class="autocomplete-container relative w-full">
	<input
		type="text"
		class="input input-bordered w-full pl-2 pr-4 py-2"
		{placeholder}
		bind:value={label}
		on:input={handleInput}
		autocomplete="off"
	/>
	<input type="hidden" {name} bind:value />
	{#if showSuggestions}
		<div class="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
			{#each options as suggestion}
				<button
					class="p-2 w-full text-left hover:bg-gray-100"
					on:click={() => selectSuggestion(suggestion)}
					type="button"
				>
					{suggestion.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
