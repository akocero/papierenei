<template>
	<div
		class="relative min-h-screen bg-gray-100 pb-16 font-karla text-gray-600"
	>
		<nav class="bg-white shadow-sm">
			<ul
				class="mx-auto flex h-24 max-w-base items-center justify-between px-10"
			>
				<li>
					<router-link
						:to="{
							name: 'home',
						}"
					>
						<img :src="Logo" alt="" class="w-28" />
					</router-link>
				</li>
				<li class="flex items-center gap-8">
					<router-link
						:to="{
							name: 'account-orders',
						}"
						class="font-semibold hover:text-indigo-600"
						>Orders</router-link
					>
					<router-link
						:to="{
							name: 'account-details',
						}"
						class="font-semibold hover:text-indigo-600"
						>Account Info</router-link
					>
					<router-link
						:to="{
							name: 'home',
						}"
						class="rounded-lg bg-red-400 py-4 px-3 font-semibold text-white"
					>
						Go to store
					</router-link>
				</li>
			</ul>
		</nav>
		<AlertList :alerts="alerts" />
		<main class="">
			<RouterView />
		</main>
		<footer class="absolute bottom-0 mx-auto h-14 w-full">
			<div class="mx-auto max-w-base">
				<hr />
				<ul class="flex gap-10 p-4">
					<li v-for="link in links" :key="link.text">
						<router-link
							:to="link.to"
							class="font-semibold text-red-400 underline"
							>{{ link.text }}</router-link
						>
					</li>
				</ul>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import useAlert from '@/composables/useAlert.js';
import AlertList from '@/components/AlertList.vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/new_logos/regular.svg';

const { alerts } = useAlert();
const store = useEcomAuthStore();
const router = useRouter();
onBeforeMount(async () => {});

const links = [
	{
		to: {
			name: 'return-refund',
		},
		text: 'Shop policy',
	},
	{
		to: {
			name: 'terms',
		},
		text: 'Terms of Service',
	},
	{
		to: {
			name: 'order-tracking',
		},
		text: 'Order Tracking',
	},
	{
		to: {
			name: 'about',
		},
		text: 'About',
	},
	{
		to: {
			name: 'contact',
		},
		text: 'Contact us',
	},
];
</script>

<style></style>
