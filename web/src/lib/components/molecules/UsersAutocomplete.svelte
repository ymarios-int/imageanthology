<script lang="ts">
	import { debounce, fetchUsersByTerm, type Option } from '$lib';
	import Autocomplete from '$lib/components/molecules/Autocomplete.svelte';
	import type { User } from '@prisma/client';
	import { createQuery } from '@tanstack/svelte-query';

	export let name: string = 'userId';
	export let value = '';
	export let label = '';

	let term = '';
	let options: Option[] = [];
	const usersQuery = createQuery<User[]>({
		queryKey: ['users', term],
		queryFn: () => fetchUsersByTerm({ term }),
		enabled: term.length > 3
	});

	$: ({ data, refetch } = $usersQuery);

	const updateSearch = debounce(() => {
		refetch();
	}, 500);

	function prepareOptions() {
		options =
			data?.map((o) => ({
				label: o.name,
				value: o.id
			})) || [];
	}

	$: if (term?.length > 3) updateSearch();
	$: if (data?.length) prepareOptions();
</script>

<Autocomplete {name} {options} bind:term bind:value bind:label />
