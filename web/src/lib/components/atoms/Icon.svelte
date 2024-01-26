<script lang="ts">
	export let src: {
		a: { [key: string]: any };
		c?: string;
	};
	export let size: string = '1em';
	export let color: string = '';
	export let title: string = '';
	export let className: string = '';

	let innerHtml = '';
	let attr: { [key: string]: any } = {};

	$: {
		attr = {};
		if (color) {
			if (src.a.stroke !== 'none') {
				attr.stroke = color;
			}
			if (src.a.fill !== 'none') {
				attr.fill = color;
			}
		}
	}

	$: {
		innerHtml = (title ? `<title>${title}</title>` : '') + src.c;
	}
</script>

<svelte:head>
	<style>
		/* Add any styles you need here */
	</style>
</svelte:head>

<svg
	width={size}
	height={size}
	stroke-width="0"
	class={className}
	{...src.a}
	{...attr}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html innerHtml}
</svg>
