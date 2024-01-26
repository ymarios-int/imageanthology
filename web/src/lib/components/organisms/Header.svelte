<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import avatarImage from '$lib/assets/dark-side-of-the-moon-small.jpg';
	import Logo from '../atoms/Logo.svelte';
</script>

<header class="shadow-md">
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-end space-x-6">
			<a href="/images/add" class="btn btn-secondary">Add Image</a>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<Avatar src={avatarImage} />
					</div>
				</div>

				<ul
					tabindex="-1"
					class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<button class="justify-between"> Account </button>
					</li>
					<li><button>Sign out</button></li>
				</ul>
			</div>
		</div>
	</div>
</header>
