<template>
	<div class="bg-lightBlue-1">
		<div class="mx-auto flex items-center justify-between space-x-10 px-4">
			<a href="#">
				<img
					src="../../assets/logo-t.png"
					alt=""
					class="w-20 md:w-32"
				/>
			</a>
			<form class="hidden grow md:block">
				<div class="flex">
					<!-- <vue-feather
						type="search"
						size="20"
						class="absolute left-3 top-[10px]"
					></vue-feather> -->
					<input
						type="text"
						class="w-full rounded-l-md border border-mediumBlue bg-lightBlue-1 text-lg placeholder:text-darkBlue"
						placeholder="Search"
					/>
					<button class="rounded-r-md bg-mediumBlue py-1 px-3">
						<vue-feather
							type="search"
							size="24"
							class="mt-2"
						></vue-feather>
					</button>
				</div>
			</form>
			<div class="flex space-x-4">
				<a href="#" class="flex items-center space-x-4">
					<div class="relative">
						<div
							class="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 font-mono text-white"
						>
							0
						</div>

						<vue-feather
							type="shopping-cart"
							size="28"
						></vue-feather>
					</div>

					<span class="hidden font-bold md:inline-block">Cart</span>
				</a>
				<button
					class="relative flex items-center md:hidden"
					@click="disableBodyScroll(true)"
				>
					<vue-feather type="menu" size="28"></vue-feather>
				</button>
			</div>
		</div>
		<nav class="hidden md:block">
			<ul
				class="flex h-12 items-center space-x-14 bg-lightBlue-2 px-10 text-lg font-bold"
			>
				<li>Shop</li>
				<li>Sale</li>
				<li>About</li>
				<li>FAQs</li>
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
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-red-300 hover:text-white"
				>
					<a href="#" class="">Blog</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-red-300 hover:text-white"
				>
					<a href="#" class="">Collections</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-red-300 hover:text-white"
				>
					<a href="#" class="">Crafts</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-red-300 hover:text-white"
				>
					<a href="#" class="">Paper</a>
				</li>
				<li
					class="mx-6 rounded-md bg-lightBlue-2 py-3 transition-all hover:bg-red-300 hover:text-white"
				>
					<a href="#" class="">About</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- <div class="bg-lightBlue px-4 text-lg font-bold md:px-12">
		<nav class="flex h-20 items-center justify-between md:h-32">
			<ul class="hidden space-x-6 md:flex">
				<li>Blog</li>
				<li>Collections</li>
				<li>Crafts</li>
				<li>Paper</li>
				<li>About</li>
			</ul>
			<div class="">
				<img
					src="../../assets/logo-t.png"
					alt=""
					class="w-24 md:w-28"
				/>
			</div>
			<div class="flex justify-end space-x-6">
				<form class="hidden md:block">
					<div class="relative">
						<vue-feather
							type="search"
							size="20"
							class="absolute left-3 top-[0.5rem]"
						></vue-feather>
						<input
							type="text"
							class="rounded-full border-0 bg-[#BEEDF3] pl-10 accent-[#05A0B5] placeholder:text-[#05A0B5]"
							placeholder="Search"
						/>
					</div>
				</form>
				<div class="relative flex items-center">
					<div
						class="absolute top-6 left-[7.3px] h-5 bg-red-500 px-[2px] text-base text-white"
					>
						0
					</div>
					<vue-feather type="shopping-bag" size="28"></vue-feather>
				</div>

				<button
					class="relative flex items-center md:hidden"
					@click="disableBodyScroll(true)"
				>
					<vue-feather type="menu" size="28"></vue-feather>
				</button>
			</div>
		</nav>
	</div>
	 -->
</template>

<script setup>
import { ref } from 'vue';

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
</script>

<style></style>
