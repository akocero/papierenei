<template>
	<div
		class="fixed top-0 left-0 z-30 flex h-screen w-full bg-gray-800/40"
		v-if="isSearchFocus"
	></div>
	<div
		class="relative w-full bg-white"
		:class="isSearchFocus ? 'z-40 shadow-xl' : 'z-20'"
		v-if="ecommSettingsStore.item"
		:style="{
			'background-image':
				'url(' + ecommSettingsStore?.activeNavbarBG?.secure_url + ')',
		}"
	>
		<div class="mx-auto max-w-base px-8 2xl:px-0">
			<div class="relative flex h-24 items-center justify-center">
				<!-- Search -->
				<form
					class="absolute left-0 hidden md:block"
					@submit.prevent="navigateToShop"
				>
					<div class="flex h-full items-center justify-end">
						<div class="relative">
							<button class="absolute top-1 text-gray-500">
								<vue-feather
									type="search"
									size="28"
									class="mt-1"
								/>
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

				<!--  logo -->
				<a href="#">
					<router-link to="/">
						<img
							v-if="ecommSettingsStore.item?.logoFlat?.length > 0"
							:src="
								ecommSettingsStore.item.logoFlat[0].secure_url
							"
							alt=""
							class="h-24 md:h-[4.2rem]"
						/>

						<img
							v-else
							src="@/assets/new_logos/flat.svg"
							alt=""
							class="h-24 md:h-[4.2rem]"
						/>
					</router-link>
				</a>

				<!-- Actions -->
				<div class="absolute right-0">
					<NavActions />
				</div>
			</div>
		</div>
	</div>
	<nav
		class="sticky top-0 z-10 w-full bg-gray-100"
		:class="[isNavbarSticky && 'shadow']"
	>
		<!-- Routes -->
		<div class="mx-auto max-w-base px-8 2xl:px-0">
			<ul
				class="relative flex h-14 items-center justify-center font-bold uppercase"
			>
				<li class="absolute left-0" v-if="isNavbarSticky">
					<button class="mt-1">
						<vue-feather
							type="search"
							size="24"
							class="text-gray-500"
							stroke-width="1.8"
						/>
					</button>
				</li>
				<li class="group relative z-20" v-for="link in navbarLinks">
					<router-link
						:to="link.routeObject"
						class="flex h-14 items-center border-b-[3px] border-gray-100 px-6 transition-all duration-500 hover:border-gray-500 group-hover:border-gray-500"
					>
						{{ link.text }}
					</router-link>
					<div
						class="invisible absolute top-14 left-0 z-20 w-64 border-b-[3px] border-gray-500 bg-white opacity-0 shadow transition-all duration-300 ease-in group-hover:visible group-hover:opacity-100"
						v-if="link.children"
					>
						<ul class="py-4 text-sm text-gray-400">
							<li
								class="mb-1 h-6"
								v-for="childLink in link?.children"
							>
								<router-link
									:to="childLink.routeObject"
									class="flex h-full w-full items-center px-4 hover:text-gray-600"
								>
									<span>{{ childLink.text }}</span>
								</router-link>
							</li>
						</ul>
					</div>
				</li>
				<li class="absolute right-0" v-if="isNavbarSticky">
					<NavActions />
				</li>
			</ul>
		</div>
		<transition
			enter-active-class="transition duration-500 ease-in"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
		>
			<Banner
				:text="ecommSettingsStore.activeBanner.text"
				v-if="
					ecommSettingsStore.item &&
					ecommSettingsStore?.activeBanner?.text &&
					isNavbarSticky
				"
			/>
		</transition>
	</nav>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

import { useGuestStore } from '@/stores/guest';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import ecomProdData from '@/views/ecommerce/data/ecommerce.json';
import ecomDevData from '@/views/ecommerce/data/dev_ecommerce.json';

import NavActions from './NavActions.vue';
import Banner from '../../ecommerce/Banner.vue';

const GuestStore = useGuestStore();
const ecommSettingsStore = useEcommSettingStore();
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
});

const navigateToShop = () => {
	router.push({ name: 'shop', query: { search: searchText.value } });
	searchBlur();
};
</script>

<style></style>
