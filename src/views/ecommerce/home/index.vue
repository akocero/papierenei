<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<div class="mt-2 grid grid-cols-2 gap-8 text-darkBlue">
			<div><img src="../../../assets/sample_product.webp" alt="" /></div>
			<div class="flex flex-col">
				<div>
					<h4 class="text-3xl font-bold">
						USB Electric Heated Hand Pillow
					</h4>
					<h5 class="font-mono text-2xl">₱45.00</h5>

					<p>
						Keep your pages marked with this motivational
						papemelroti bookmark. You never have to worry about it
						slipping out, t...
					</p>
				</div>
				<div class="mt-10">
					<ProductQuantity />
					<button
						class="mt-4 w-full rounded-lg bg-darkBlue px-6 py-2 text-xl font-bold text-white"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</QuickView>
	<header
		class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[url('../assets/hero.jpg')] bg-cover bg-center"
	>
		<!-- <img src="../../../assets/hero.jpg" alt="" class="object-cover" /> -->
		<div class="">
			<button
				class="mx-auto flex items-center space-x-3 rounded-lg bg-darkYellow py-3 pr-3 pl-5 text-xl font-bold text-white shadow-lg"
			>
				SHOP NOW
				<vue-feather
					type="shopping-bag"
					size="24"
					class="ml-4 mb-1"
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
				<div v-for="product in [1, 2, 3, 4, 5, 6]">
					<Product :key="product" @openModal="openModal" />
				</div>
				<!-- <Product /> -->
			</div>
		</div>
	</section>
</template>

<script setup>
import Product from '@/components/ecommerce/Product.vue';
import { ref } from 'vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import ProductQuantity from '../../../components/ecommerce/ProductQuantity.vue';
const isOpen = ref(false);

function openModal() {
	isOpen.value = true;
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
