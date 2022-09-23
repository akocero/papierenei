<template>
	<header
		class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[url('../assets/hero.jpg')] bg-cover bg-center"
	>
		<!-- <img src="../../../assets/hero.jpg" alt="" class="object-cover" /> -->
		<div class="">
			<button
				class="mx-auto flex items-center space-x-3 rounded-lg bg-red-300 py-3 pr-3 pl-5 text-xl font-bold text-white shadow-lg"
			>
				SHOP NOW
				<vue-feather
					type="shopping-bag"
					size="24"
					class="ml-4 rounded-lg bg-red-400 p-2"
				></vue-feather>
			</button>
		</div>
	</header>
	<section class="flex items-center bg-lightBlue px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-7xl">
			<h2 class="mb-16 text-3xl font-bold md:text-4xl">New Arrivals</h2>
			<div
				class="grid w-full grid-cols-1 gap-20 px-4 md:grid-cols-3 md:px-0"
			>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/bearly-art.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Bearly Arts
					</h3>
				</div>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/digital-arts.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block -rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Digital Arts
					</h3>
				</div>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/logos.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block -rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Custom <br />
						Logos
					</h3>
				</div>
			</div>
		</div>
	</section>
	<section class="flex items-center bg-white px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-7xl">
			<h2 class="mb-16 text-3xl font-bold md:text-4xl">New Arrivals</h2>
			<div
				class="grid w-full grid-cols-1 gap-20 px-4 md:grid-cols-3 md:px-0"
			>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/bearly-art.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Bearly Arts
					</h3>
				</div>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/digital-arts.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block -rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Digital Arts
					</h3>
				</div>
				<div
					class="relative flex h-80 rotate-2 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/logos.jpg')] bg-cover bg-center shadow-md shadow-blue-200"
				>
					<h3
						class="mx-auto block -rotate-6 rounded-lg bg-white px-4 py-2 text-center text-4xl font-extrabold shadow-xl md:mt-48"
					>
						Custom <br />
						Logos
					</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>

<style></style>
