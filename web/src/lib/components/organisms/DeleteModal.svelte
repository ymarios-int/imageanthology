<script lang="ts">
	export let handleClose: (event: MouseEvent) => void;
	export let handleDelete: (event: MouseEvent) => void;

	export let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Are you sure you want to delete this image?</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" on:click={handleClose}>Cancel</button>
				<button class="btn" on:click={handleDelete}>Delete</button>
			</form>
		</div>
	</div>
</dialog>
