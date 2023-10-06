<template>
	<div
		class="fixed top-0 left-0 z-30 flex h-screen w-full bg-gray-800/40"
		v-if="isSearchFocus"
	></div>
	<div
		class="relative hidden w-full bg-white lg:block"
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

	<!-- Desktop navbar list  -->
	<nav
		class="sticky top-0 z-10 hidden w-full bg-gray-100 sm:block"
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

	<!-- Mobile navbar links  -->
	<nav
		class="sticky top-0 z-20 w-full bg-white sm:hidden"
		:class="[isNavbarSticky && 'shadow']"
	>
		<div class="mx-4 flex h-16 items-center">
			<button @click="toggleMenu">
				<vue-feather
					type="menu"
					size="24"
					class="mt-2"
					stroke-width="1.8"
				/>
			</button>

			<!--  logo -->
			<a href="#" class="ml-3 mt-1">
				<router-link to="/">
					<img
						v-if="ecommSettingsStore.item?.logoFlat?.length > 0"
						:src="ecommSettingsStore.item.logoFlat[0].secure_url"
						alt=""
						class="h-9"
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
			<div class="absolute right-6 mt-2">
				<NavActions />
			</div>
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

	<transition
		enter-active-class="transition duration-500 ease-in"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
	>
		<div
			class="fixed top-0 left-0 z-20 h-screen w-full overflow-scroll bg-gray-100"
			v-if="isMenuOpen"
		>
			<div class="mx-6 mt-6 flex flex-col items-start">
				<button @click="toggleMenu">
					<vue-feather
						type="x"
						size="32"
						class="mt-2 text-gray-800"
						stroke-width="1.8"
					/>
				</button>
				<label
					for="input_search_menu"
					class="relative mt-4 block h-14 w-full overflow-hidden rounded bg-gray-200"
				>
					<vue-feather
						type="search"
						size="28"
						class="absolute top-3 left-3 text-gray-800"
						stroke-width="1.8"
					/>
					<input
						type="text"
						id="input_search_menu"
						placeholder="Search our store"
						class="h-full w-full border-0 bg-gray-300 pl-12"
					/>
				</label>
				<nav class="mt-4 w-full text-xl font-semibold text-gray-800">
					<ul class="">
						<li
							v-for="link in navbarLinks"
							class="relative border-b"
						>
							<div class="flex">
								<router-link
									@click="toggleMenu"
									:to="link.routeObject"
									class="flex h-16 flex-grow items-center border-gray-300 px-2 capitalize transition-all duration-500 hover:border-gray-500 group-hover:border-gray-500"
								>
									{{ link.text }}
								</router-link>
								<button
									class="w-16"
									v-if="link.children"
									@click="
										link.openChildren = !link.openChildren
									"
								>
									<vue-feather
										type="chevron-down"
										size="20"
										class="mt-2 transform text-gray-900 transition-all"
										:class="
											link.openChildren
												? 'rotate-180'
												: 'rotate-0'
										"
										stroke-width="1.8"
									/>
								</button>
							</div>
							<!--  TODO: this animation need to be dynamic height to work -->
							<div
								class="overflow-y-hidden transition-all duration-500 ease-in-out"
								:class="
									link.children && link.openChildren
										? ''
										: 'h-0'
								"
							>
								<ul class="text-xl">
									<li
										class="h-14"
										v-for="childLink in link?.children"
									>
										<router-link
											@click="toggleMenu"
											:to="childLink.routeObject"
											class="flex h-full items-center pl-5 capitalize"
										>
											<span>{{ childLink.text }}</span>
										</router-link>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</transition>

	<div class="relative z-10 w-full bg-gray-100 lg:hidden">
		<div class="relative z-10 mx-4 flex h-16 items-center">
			<label for="input_search" class="flex items-center">
				<vue-feather
					type="search"
					size="28"
					class="text-gray-800"
					stroke-width="1.8"
				/>
				<input
					type="text"
					id="input_search"
					placeholder="Search our store"
					class="border-0 bg-transparent focus:ring-0"
				/>
			</label>
		</div>
	</div>
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
import DesktopNavList from './DesktopNavList.vue';

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
const isMenuOpen = ref(false);

const searchFocus = () => {
	isSearchFocus.value = true;
	document.body.classList.add('overflow-y-hidden', 'h-screen');
};

const searchBlur = () => {
	isSearchFocus.value = false;
	document.body.classList.remove('overflow-y-hidden', 'h-screen');
};

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;

	if (isMenuOpen.value === false) {
		document.body.classList.remove('overflow-y-hidden', 'h-screen');
		return;
	}
	document.body.classList.add('overflow-y-hidden', 'h-screen');
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
