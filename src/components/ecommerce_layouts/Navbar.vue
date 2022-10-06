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
		<nav class="relative hidden md:block">
			<ul
				class="flex h-12 items-center justify-center bg-lightBlue-2 px-10 text-lg font-bold"
			>
				<li class="group">
					<a
						href="#"
						class="peer flex h-12 items-center px-6 hover:bg-mediumBlue"
						>Shop</a
					>
					<div
						class="absolute left-0 top-20 -z-10 flex w-full gap-20 border-t border-mediumBlue bg-lightBlue-2 px-10 py-5 opacity-0 transition-all duration-500 ease-in group-hover:top-12 group-hover:z-10 group-hover:opacity-100"
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
					<a
						href="#"
						class="peer flex h-12 items-center px-6 hover:bg-mediumBlue"
						>Sale</a
					>
					<div
						class="absolute left-0 top-20 -z-10 h-80 w-full bg-white opacity-0 transition-all duration-500 ease-in group-hover:top-12 group-hover:z-10 group-hover:opacity-100"
					>
						<a href="#">Sale</a>
					</div>
				</li>
				<li class="group">
					<a
						href="#"
						class="peer flex h-12 items-center px-6 hover:bg-mediumBlue"
						>About</a
					>
					<div
						class="absolute left-0 top-20 -z-10 h-80 w-full bg-white opacity-0 transition-all duration-500 ease-in group-hover:top-12 group-hover:z-10 group-hover:opacity-100"
					>
						<a href="#">About</a>
					</div>
				</li>
				<li class="group">
					<a
						href="#"
						class="peer flex h-12 items-center px-6 hover:bg-mediumBlue"
						>FAQs</a
					>
					<div
						class="absolute left-0 top-20 -z-10 h-80 w-full bg-white opacity-0 transition-all duration-500 ease-in group-hover:top-12 group-hover:z-10 group-hover:opacity-100"
					>
						<a href="#">FAQs</a>
					</div>
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

const hoverTest = () => {
	console.log('test');
};
</script>

<style></style>
