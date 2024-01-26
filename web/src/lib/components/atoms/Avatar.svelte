<script lang="ts">
	export let src: string;
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<div class="avatar">
	<div class={`w-8 rounded-full`}>
		<img alt="user" {src} />
	</div>
</div>
