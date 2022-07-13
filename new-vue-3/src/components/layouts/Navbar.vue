<template>
	<header>
		<nav
			class="
				flex
				w-full
				bg-slate-50
				shadow-sm
				h-14
				items-center
				px-4
				text-slate-800
			"
		>
			<div class="mr-auto flex items-center ml-20 sm:ml-3">
				<vue-feather type="box" size="18" class="mr-2"></vue-feather
				><span class="font-bold">Brand Logo</span>
			</div>
			<ul class="flex space-x-4">
				<!-- <li class="flex items-center">
					<vue-feather
						type="user"
						size="18"
						class="mr-2"
					></vue-feather
					><RouterLink to="/login">Login</RouterLink>
				</li> -->
				<!-- <li class="ml-4">
					<RouterLink to="/signup">Signup</RouterLink>
				</li> -->
				<li class="flex items-center">
					<vue-feather
						type="log-out"
						size="18"
						class="mr-2"
					></vue-feather>
					<RouterLink to="/login">Logout</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup></script>

<style></style>
