<template>
	<header class="relative z-20 flex h-14">
		<div
			class="hidden w-64 items-center bg-indigo-600 px-4 text-white shadow-md sm:flex"
		>
			<vue-feather type="box" size="18" class="mr-2"></vue-feather>
			<span>Company Logo</span>
			<a href="#" class="ml-auto" @click="$emit('toggleSidebar')">
				<vue-feather
					:type="isSidebarOpen ? `toggle-right` : `toggle-left`"
					size="20"
					class="mt-[8px]"
				></vue-feather>
			</a>
		</div>
		<nav
			class="flex flex-1 items-center bg-indigo-600 px-6 text-white shadow-sm sm:bg-white sm:text-gray-900"
		>
			<a href="#" class="sm:hidden" @click="$emit('toggleSidebar')">
				<vue-feather
					:type="isSidebarOpen ? `toggle-right` : `toggle-left`"
					size="20"
					class="mt-[8px]"
				></vue-feather>
			</a>
			<div class="hidden sm:flex">
				<vue-feather type="search" size="18" class="mr-4"></vue-feather>
				<vue-feather type="refresh-cw" size="18" class=""></vue-feather>
			</div>

			<ul class="ml-auto flex space-x-4">
				<li class="flex items-center">
					<vueFeather
						type="log-out"
						size="18"
						class="mr-2"
					></vueFeather>
					<RouterLink to="/login">Logout</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
const props = defineProps({
	isSidebarOpen: Boolean,
});
</script>

<style></style>
