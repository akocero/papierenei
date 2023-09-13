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

		<router-link
			:to="{
				name: 'wish-list',
			}"
			class="relative inline-block h-8"
		>
			<span
				class="absolute -top-2 -right-2 flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full border bg-gray-500 font-mono text-xs text-white"
			>
				{{ GuestStore.wishList.length }}
			</span>
			<vue-feather
				type="heart"
				size="28"
				class="text-gray-500"
				stroke-width="1.8"
				:fill="GuestStore.wishList.length > 0 ? '#737373' : '#FFFFFF'"
			/>
		</router-link>
		<router-link
			:to="{
				name: 'cart',
			}"
			href="#"
			class="relative inline-block h-8"
		>
			<span
				class="absolute -top-2 -right-2 flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full border bg-gray-500 font-mono text-xs text-white"
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
import { useGuestStore } from '@/stores/guest';
import { useEcomAppStore } from '@/stores/ecom_app';
import { useCartStore } from '@/stores/cart';

const GuestStore = useGuestStore();

const EcomAuthStore = useEcomAuthStore();
const CartStore = useCartStore();
const EcomAppStore = useEcomAppStore();
</script>

<style lang="scss" scoped></style>
