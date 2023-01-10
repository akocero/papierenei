<template>
	<div class="top-0 z-30 bg-lightBlue-1" style="position: sticky">
		<div
			class="relative mx-auto flex max-w-screen-2xl items-center justify-center"
		>
			<a href="#">
				<router-link to="/"
					><img
						src="../../assets/logo-t.png"
						alt=""
						class="w-20 md:w-56"
				/></router-link>
			</a>
			<form class="absolute right-0 mt-10 hidden h-40 md:block">
				<div class="flex h-full items-center justify-end">
					<!-- <vue-feather
						type="search"
						size="20"
						class="absolute left-3 top-[10px]"
					></vue-feather> -->
					<div class="relative">
						<button class="absolute left-3 top-1 text-darkBlue">
							<vue-feather
								type="search"
								size="24"
								class="mt-2"
							></vue-feather>
						</button>
						<input
							type="text"
							class="w-80 rounded-full border-2 border-darkBlue bg-lightBlue-1 text-lg placeholder:text-darkBlue"
							placeholder=""
						/>
					</div>
				</div>
			</form>
			<!-- <div class="flex space-x-4">
				<router-link to="cart" class="flex items-center space-x-4">
					<div class="relative">
						<div
							class="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-darkYellow font-mono text-gray-900"
						>
							0
						</div>

						<vue-feather
							type="shopping-cart"
							size="28"
						></vue-feather>
					</div>

					<span class="hidden font-bold md:inline-block">Cart</span>
				</router-link>

				<button
					class="relative flex items-center md:hidden"
					@click="disableBodyScroll(true)"
				>
					<vue-feather type="menu" size="28"></vue-feather>
				</button>
			</div> -->
		</div>
		<nav class="relative hidden bg-lightBlue-3 md:block">
			<ul
				class="mx-auto flex h-14 max-w-screen-2xl items-center justify-between text-lg font-bold uppercase text-primary-0"
			>
				<li class="group">
					<router-link
						to="shop"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>HOME</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="shop"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>NEW</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="shop"
						class="peer flex h-14 items-center px-6 hover:bg-mediumBlue"
						>SHOP</router-link
					>
					<div
						class="invisible absolute left-0 top-20 flex w-full gap-20 border-t border-mediumBlue bg-primary-2 px-10 py-5 opacity-0 transition-all duration-700 ease-in-out group-hover:visible group-hover:top-14 group-hover:opacity-100"
					>
						<div>
							<h5 class="font-bold underline">Shop by Kind</h5>
							<ul class="mt-2 text-[1rem] font-semibold">
								<li>Bearly Art</li>
								<li>Digital Files</li>
								<li>Custom Digital Files</li>
							</ul>
						</div>
						<div>
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
				</li>

				<li class="group">
					<router-link
						to="about"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>STATIONERY</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="terms"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>STICKERS</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="terms"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>SALES</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="terms"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
						>FREEBIES</router-link
					>
				</li>
				<li class="group">
					<router-link
						to="cart"
						class="flex h-12 items-center px-6 hover:bg-mediumBlue"
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
		</nav>

		<div
			v-if="openSidebar"
			class="absolute top-0 left-0 z-10 h-screen w-full bg-white"
		>
			<button
				class="absolute top-7 right-4 flex items-center md:hidden"
				@click="disableBodyScroll(false)"
			>
				<vue-feather type="x" size="28"></vue-feather>
			</button>
			<ul
				class="mt-20 flex flex-col space-y-4 text-center text-xl font-bold"
			>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-darkYellow hover:text-white"
				>
					<a href="#" class="">Blog</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-darkYellow hover:text-white"
				>
					<a href="#" class="">Collections</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-darkYellow hover:text-white"
				>
					<a href="#" class="">Crafts</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-darkYellow hover:text-white"
				>
					<a href="#" class="">Paper</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-darkYellow hover:text-white"
				>
					<a href="#" class="">About</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const openSidebar = ref(false);

const disableBodyScroll = (isOpenSidebar) => {
	if (isOpenSidebar) {
		openSidebar.value = true;
		document.body.style.overflow = 'hidden';
	} else {
		openSidebar.value = false;
		document.body.style.overflow = 'auto';
	}
};

const hoverTest = () => {
	console.log('test');
};
</script>

<style></style>
