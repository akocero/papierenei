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
	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-7xl">
			<h2
				class="mb-16 rounded-lg bg-mediumBlue py-3 text-3xl font-bold uppercase"
			>
				Our Products
			</h2>
			<div
				class="grid w-full grid-cols-1 gap-20 px-4 md:grid-cols-3 md:px-0"
			>
				<div
					class="relative h-80 overflow-hidden rounded-2xl bg-[url('../assets/bearly-art.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="external-link"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Bearly Art</span>
						</div>
					</a>
				</div>
				<div
					class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/digital-arts.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="external-link"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Digital Arts</span>
						</div>
					</a>
				</div>
				<div
					class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/logos.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="external-link"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Custom Logos</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>
	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-7xl">
			<h2
				class="mb-16 rounded-lg bg-mediumBlue py-3 text-3xl font-bold uppercase"
			>
				New Arrivals
			</h2>
			<div
				class="grid w-full grid-cols-1 gap-20 px-4 md:grid-cols-3 md:px-0"
			>
				<div
					class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/bearly-art.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="search"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Bearly Art</span>
						</div>
					</a>
				</div>
				<div
					class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/digital-arts.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="search"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Digital Arts</span>
						</div>
					</a>
				</div>
				<div
					class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-[url('../assets/logos.jpg')] bg-cover bg-center shadow-md"
				>
					<a
						href="#"
						class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
					>
						<div
							class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
						>
							<vue-feather
								type="search"
								size="32"
								class="mx-auto"
							></vue-feather>
							<span class="">Custom Logos</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>

<style></style>
