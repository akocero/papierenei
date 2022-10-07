<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<div class="mt-2 grid grid-cols-2 gap-8 text-darkBlue">
			<div><img src="../../assets/sample_product.webp" alt="" /></div>
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
	<div class="mx-auto my-12 flex max-w-7xl gap-10">
		<div class="w-1/3">
			<h3 class="rounded bg-lightBlue-2 px-3 py-1 font-semibold">
				SORTED BY
			</h3>
			<!-- <hr class="" /> -->
			<div class="my-4">
				<select class="w-full border-darkBlue focus:border-0">
					<option value="">Best Selling</option>
					<option value="">Sort #2</option>
				</select>
			</div>

			<h3 class="rounded bg-lightBlue-2 px-3 py-1 font-semibold">
				CATEGORIES
			</h3>

			<div class="my-3 font-sans">
				<div class="flex justify-between">
					<h5>0 Selected</h5>
					<a href="#">Reset</a>
				</div>
				<div class="border-b py-2">
					<input type="checkbox" class="border-darkBlue" />
					<label for="" class="ml-3 inline-block translate-y-1"
						>For Boy</label
					>
				</div>
				<div class="border-b py-2">
					<input type="checkbox" class="border-darkBlue" />
					<label for="" class="ml-3 inline-block translate-y-1"
						>For Girl</label
					>
				</div>
			</div>

			<h3 class="rounded bg-lightBlue-2 px-3 py-1 font-semibold">
				PRICE
			</h3>

			<div class="my-3 w-full font-sans">
				<div class="flex justify-between">
					<h5>The highest price is $19.80</h5>
					<a href="#">Reset</a>
				</div>
				<div class="mt-4 flex items-center justify-between">
					<div class="w-1/2">
						<input
							type="number"
							placeholder="$ From"
							class="w-full border-darkBlue"
						/>
					</div>
					<div class="w-1/2">
						<input
							type="number"
							placeholder="$ To"
							class="w-full border-darkBlue"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-lightBlue flex items-center px-6 text-center">
			<div class="mx-auto w-full max-w-7xl">
				<h2
					class="mb-16 rounded-lg bg-lightBlue-2 py-3 text-3xl font-bold uppercase"
				>
					Bearly Art
				</h2>
				<div
					class="grid w-full grid-cols-1 gap-10 px-4 md:grid-cols-3 md:px-0"
				>
					<div v-for="product in [1, 2, 3, 4, 5, 6]">
						<Product :key="product" @openModal="openModal" />
					</div>
					<!-- <Product /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Product from '@/components/ecommerce/Product.vue';
import { ref } from 'vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import ProductQuantity from '@/components/ecommerce/ProductQuantity.vue';
import BaseSelect from '../../components/BaseSelect.vue';

const isOpen = ref(false);
const sortedBy = ref('');

function openModal() {
	isOpen.value = true;
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
