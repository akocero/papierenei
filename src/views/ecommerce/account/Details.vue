<template>
	<div class="mx-auto min-h-screen max-w-base">
		<div class="mx-10">
			<h2 class="my-6 font-nunito text-2xl font-black text-indigo-400">
				Account information
			</h2>

			<h3 class="mb-3 text-xl">Profile</h3>
			<div class="relative bg-white px-6 py-4 text-lg">
				<button class="absolute right-5 top-5">
					<VueFeather type="edit" size="18" class="" />
				</button>
				<ul>
					<li>First name: {{ EcomAuthStore.user.firstName }}</li>
					<li>Last name: {{ EcomAuthStore.user.lastName }}</li>
					<li>Email: {{ EcomAuthStore.user.email }}</li>
				</ul>
			</div>
			<h3 class="mb-3 mt-6 text-xl">Address</h3>
			<div class="relative bg-white px-6 py-4 text-lg">
				<button class="absolute right-4 top-4">
					<VueFeather type="edit" size="18" class="" />
				</button>
				<ul>
					<li>First name: {{ EcomAuthStore.user.firstName }}</li>
					<li>Last name: {{ EcomAuthStore.user.lastName }}</li>
					<li>Email: {{ EcomAuthStore.user.email }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useEcomAuthStore } from '@/stores/ecom_auth';

const EcomAuthStore = useEcomAuthStore();
</script>

<style lang="scss" scoped></style>
