<template>
	<div class="wrapper">
		<Spinner v-if="productStore.isLoading" />
		<div>
			<h1 class="mb-5 py-10 text-5xl font-bold">On Sale</h1>
			<div
				class="grid w-full grid-cols-2 gap-4 px-0 md:grid-cols-4 md:gap-10 md:px-0"
				v-if="productStore.list.length > 0"
			>
				<div v-for="(product, key) in productStore.list">
					<Product
						:key="product._id"
						:index="key"
						:product="product"
						@openModal="openModal"
						@addToCart="addToCart($event)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { onBeforeMount } from 'vue';
import Product from '@/components/ecommerce/Product.vue';
const productStore = useProductStore();

onBeforeMount(async () => {
	await productStore.fetch('?salePrice[gt]=0');
});
</script>
