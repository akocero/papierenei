<template>
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
</template>

<script setup>
import Banner from '../../ecommerce/Banner.vue';
const props = defineProps([
	'isNavbarSticky',
	'navbarLinks',
	'ecommSettingsStore',
]);
</script>
