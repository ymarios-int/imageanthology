<script lang="ts">
	import logo from '$lib/assets/image-anthology-logo.png';

	export let width: string = '100';
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<a href="/"><img {width} alt="The Image Anthology" src={logo} /></a>
