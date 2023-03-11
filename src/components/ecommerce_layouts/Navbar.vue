<template>
	<div
		class="w-full bg-white"
		v-if="ecommSettingsStore.item"
		:style="{
			'background-image':
				'url(' + ecommSettingsStore?.activeNavbarBG?.secure_url + ')',
		}"
	>
		<div
			class="relative flex h-24 items-center justify-center md:mx-auto md:h-48 md:max-w-screen-2xl"
		>
			<a href="#">
				<router-link to="/">
					<img
						src="../../assets/logo-t.png"
						alt=""
						class="h-24 md:h-56"
					/>
				</router-link>
			</a>
			<form
				class="absolute right-0 mt-10 hidden h-40 md:block"
				@submit.prevent="navigateToShop"
				v-if="isShowSearch"
			>
				<div class="flex h-full items-center justify-end">
					<div class="relative">
						<button class="absolute left-3 top-1 text-darkBlue">
							<vue-feather type="search" size="24" class="mt-2" />
						</button>
						<input
							type="text"
							v-model="searchText"
							class="w-80 rounded-full border-2 border-darkBlue bg-lightBlue-1 pl-10 text-lg placeholder:text-darkBlue"
							placeholder=""
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
	<nav class="sticky top-0 z-20 h-14 bg-lightBlue-3 text-white">
		<ul
			class="right-0 flex h-full w-full items-center justify-between px-4 md:hidden"
		>
			<li>
				<button @click="openMenu = !openMenu">
					<vue-feather type="menu" size="28" class=""></vue-feather>
				</button>
			</li>
			<li class="">
				<router-link
					:to="{
						name: 'cart',
					}"
					class=""
				>
					<div class="relative mt-3">
						<div
							class="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-darkYellow font-mono text-gray-900"
						>
							{{ cartStore.list.length }}
						</div>

						<vue-feather
							type="shopping-cart"
							size="28"
						></vue-feather>
					</div>
				</router-link>
			</li>
		</ul>
		<div
			class="absolute top-14 w-full bg-lightBlue-3 font-bold md:relative md:top-0 md:h-full"
		>
			<ul
				class="flex-col md:mx-auto md:flex md:h-full md:max-w-screen-2xl md:flex-row md:items-center md:justify-between md:space-y-0 md:pb-0"
				:class="{ flex: openMenu, hidden: !openMenu }"
			>
				<li class="nav__item md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'home',
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
					>
						HOME
					</router-link>
				</li>
				<!-- <li class="nav__item md:flex md:h-full md:items-center">
					<router-link
						to=""
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>NEW
					</router-link>
				</li> -->
				<li class="nav__item md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'shop',
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>SHOP</router-link
					>
					<div
						class="nav__item--sub absolute left-0 top-14 hidden w-screen border-t border-lightBlue-3 bg-lightBlue-3 py-10 text-2xl text-white"
					>
						<div class="mx-auto grid max-w-screen-2xl grid-cols-12">
							<div class="col-span-2">
								<h5 class="font-bold underline">
									Shop by Kind
								</h5>
								<ul class="mt-2 text-[1rem] font-semibold">
									<li>Bearly Art</li>
									<li>Digital Files</li>
									<li>Custom Digital Files</li>
								</ul>
							</div>
							<div class="col-span-3">
								<h5 class="font-bold underline">
									Shop by Collection
								</h5>
								<ul class="mt-2 text-[1rem] font-semibold">
									<li>Spring</li>
									<li>Summer</li>
									<li>Fall</li>
									<li>Winter</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li class="md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'shop',
							query: { collection: '63be87f5266ce353db61dafb' },
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
					>
						STATIONERY</router-link
					>
					<ul></ul>
				</li>
				<li class="md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'shop',
							query: { collection: '63bd7ebcab01444f92149c92' },
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>STICKERS
					</router-link>
				</li>
				<li class="md:flex md:h-full md:items-center">
					<router-link
						to="terms"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>SALE
					</router-link>
				</li>
				<li class="md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'collections',
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>COLLECTIONS
					</router-link>
				</li>
				<li class="md:flex md:h-full md:items-center">
					<router-link
						to="terms"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>FREEBIES
					</router-link>
				</li>
				<li class="hidden md:block">
					<router-link
						:to="{
							name: 'cart',
						}"
						class=""
					>
						<div class="relative mt-3">
							<div
								class="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-darkYellow font-mono text-gray-900"
							>
								{{ cartStore.list.length }}
							</div>

							<vue-feather
								type="shopping-cart"
								size="28"
							></vue-feather>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

import { useCartStore } from '@/stores/cart';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const ecommSettingsStore = useEcommSettingStore();
const cartStore = useCartStore();
const router = useRouter();

const openMenu = ref(false);
const searchText = ref('');
const isShowSearch = ref(true);

onBeforeRouteUpdate((to, from) => {
	// if the current page is shop hide the search form
	if (to.name === 'shop') {
		isShowSearch.value = false;
		return;
	}

	isShowSearch.value = true;
});

const navigateToShop = () => {
	router.push({ name: 'shop', query: { search: searchText.value } });
	searchText.value = '';
};

onBeforeMount(() => {
	console.log('sett', ecommSettingsStore.item);
});
</script>

<style></style>
