<script lang="ts">
	import '@fontsource-variable/nunito';
	import '../app.postcss';
	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import type { LayoutData } from './$types';
	import { setGeneralState } from '$lib';

	export let data: LayoutData;

	$: {
		setGeneralState();
	}
</script>

<QueryClientProvider client={data.queryClient}>
	<Header />
	<main class="flex-grow container mx-auto p-4 flex justify-center items-center">
		<slot />
	</main>
	<Footer />
	<SvelteQueryDevtools />
</QueryClientProvider>
