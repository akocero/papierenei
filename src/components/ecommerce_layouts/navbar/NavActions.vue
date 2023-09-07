<template>
	<div class="flex items-center space-x-3">
		<button
			@click="EcomAppStore.toggleAuthModal"
			v-if="!EcomAuthStore.user"
		>
			<vue-feather
				type="user"
				size="28"
				class="text-gray-500"
				stroke-width="1.8"
			/>
		</button>

		<AccountMenu v-if="EcomAuthStore.user" :user="EcomAuthStore.user" />

		<a href="#" class="relative inline-block h-8">
			<span
				class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 font-mono text-xs text-white"
			>
				0
			</span>
			<vue-feather
				type="heart"
				size="28"
				class="text-gray-500"
				stroke-width="1.8"
			/>
		</a>
		<router-link
			:to="{
				name: 'cart',
			}"
			href="#"
			class="relative inline-block h-8"
		>
			<span
				class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 font-mono text-xs text-white"
				>{{ CartStore.list.length }}</span
			>
			<vue-feather
				type="shopping-bag"
				size="28"
				class="text-gray-500"
				stroke-width="1.8"
			/>
		</router-link>
	</div>
</template>

<script setup>
import AccountMenu from './AccountMenu.vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import { useEcomAppStore } from '@/stores/ecom_app';
import { useCartStore } from '@/stores/cart';

const EcomAuthStore = useEcomAuthStore();
const CartStore = useCartStore();
const EcomAppStore = useEcomAppStore();
</script>

<style lang="scss" scoped></style>
