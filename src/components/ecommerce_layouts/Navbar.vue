<template>
	<div
		class="fixed top-0 left-0 z-30 flex h-screen w-full bg-gray-800/40"
		v-if="isSearchFocus"
	></div>
	<div
		class="relative w-full bg-white"
		:class="isSearchFocus ? 'z-40 shadow-xl' : 'z-10'"
		v-if="ecommSettingsStore.item"
		:style="{
			'background-image':
				'url(' + ecommSettingsStore?.activeNavbarBG?.secure_url + ')',
		}"
	>
		<div
			class="relative flex h-20 items-center justify-center md:mx-auto md:h-24 md:max-w-base"
		>
			<a href="#">
				<router-link to="/">
					<img
						src="../../assets/new_logos/flat.svg"
						alt=""
						class="h-24 md:h-[4.2rem]"
					/>
				</router-link>
			</a>
			<div class="absolute right-2 space-x-3">
				<button @click="EcomAppStore.toggleAuthModal">
					<vue-feather
						type="user"
						size="28"
						class="text-gray-500"
						stroke-width="1.8"
					/>
				</button>
				<a href="#" class="relative inline-block h-8">
					<span
						class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 font-mono text-xs text-white"
						>0</span
					>
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
						>{{ cartStore.list.length }}</span
					>
					<vue-feather
						type="shopping-bag"
						size="28"
						class="text-gray-500"
						stroke-width="1.8"
					/>
				</router-link>
			</div>
			<form
				class="absolute left-1 hidden md:block"
				@submit.prevent="navigateToShop"
				v-if="isShowSearch"
			>
				<div class="flex h-full items-center justify-end">
					<div class="relative">
						<button class="absolute top-1 text-gray-500">
							<vue-feather type="search" size="28" class="mt-1" />
						</button>
						<input
							type="text"
							v-model="searchText"
							@focus="searchFocus"
							@blur="searchBlur"
							class="w-80 border-0 pl-10 text-lg placeholder:text-gray-400 focus:ring-0"
							placeholder="Search our store"
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
	<nav
		class="sticky top-0 z-20 h-[3.3rem] bg-lightBlue-3"
		:class="isNavbarSticky && 'shadow'"
	>
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
			class="absolute top-14 w-full bg-gray-100 pr-6 font-bold md:relative md:top-0 md:h-full"
		>
			<ul
				class="relative flex-col justify-center space-x-8 md:mx-auto md:flex md:h-full md:max-w-base md:flex-row md:items-center md:space-y-0 md:pb-0"
				:class="{ flex: openMenu, hidden: !openMenu }"
				v-if="navbarLinks?.length > 0"
			>
				<li
					class="nav__item md:flex md:h-full md:items-center"
					v-for="link in navbarLinks"
				>
					<router-link
						:to="link.routeObject"
						class="flex h-full items-center justify-center px-4 py-2 uppercase hover:bg-gray-200 hover:text-gray-900"
					>
						{{ link.text }}
					</router-link>
				</li>
				<div class="absolute right-2 space-x-3" v-if="isNavbarSticky">
					<a href="#">
						<vue-feather
							type="user"
							size="28"
							class="text-gray-500"
						/>
					</a>
					<a href="#" class="relative inline-block h-8">
						<span
							class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 font-mono text-xs text-white"
							>0</span
						>
						<vue-feather
							type="heart"
							size="28"
							class="text-gray-500"
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
							>{{ cartStore.list.length }}</span
						>
						<vue-feather
							type="shopping-bag"
							size="28"
							class="text-gray-500"
						/>
					</router-link>
				</div>

				<div v-if="isNavbarSticky" class="absolute top-3 -left-1">
					<button class="">
						<vue-feather
							type="search"
							size="28"
							class="text-gray-500"
						/>
					</button>
				</div>
				<!-- <li class="nav__item md:flex md:h-full md:items-center">
					<router-link
						to=""
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
						>NEW
					</router-link>
				</li> -->
				<!-- <li class="nav__item md:flex md:h-full md:items-center">
					<router-link
						:to="{
							name: 'shop',
						}"
						class="flex h-full items-center justify-center px-4 py-2 hover:bg-lightBlue-2 hover:text-darkBlue"
					>
						SHOP
					</router-link>
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
				</li>-->
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

import { useCartStore } from '@/stores/cart';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { useEcomAppStore } from '@/stores/ecom_app';
import ecomProdData from '@/views/ecommerce/data/ecommerce.json';
import ecomDevData from '@/views/ecommerce/data/dev_ecommerce.json';

const ecommSettingsStore = useEcommSettingStore();
const cartStore = useCartStore();
const EcomAppStore = useEcomAppStore();
const router = useRouter();

const openMenu = ref(false);
const searchText = ref('');
const isShowSearch = ref(true);
const navbarLinks = ref([]);
const isSearchFocus = ref(false);

const limitPosition = ref(200);
const isNavbarSticky = ref(false);
const lastPosition = ref(0);

const searchFocus = () => {
	isSearchFocus.value = true;
	document.body.classList.add('overflow-y-hidden', 'h-screen');
};

const searchBlur = () => {
	isSearchFocus.value = false;
	document.body.classList.remove('overflow-y-hidden', 'h-screen');
};

const handleScroll = () => {
	if (
		lastPosition.value < window.scrollY &&
		limitPosition.value < window.scrollY
	) {
		isNavbarSticky.value = true;
	}

	if (
		lastPosition.value > window.scrollY &&
		limitPosition.value > window.scrollY
	) {
		isNavbarSticky.value = false;
	}

	lastPosition.value = window.scrollY;
	// this.isNavbarSticky = window.scrollY > 250;
};

onBeforeMount(() => {
	window.addEventListener('scroll', handleScroll);

	if (import.meta.env.VITE_ENV === 'production') {
		navbarLinks.value = ecomProdData.navbarLinks;
	} else {
		navbarLinks.value = ecomDevData.navbarLinks;
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
});

onBeforeRouteLeave(() => {
	window.scrollTo(0, 0);
});

onBeforeRouteUpdate((to, from) => {
	window.scrollTo(0, 0);
	openMenu.value = false;

	if (to.query) {
		openMenu.value = false;
	}

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
</script>

<style></style>
