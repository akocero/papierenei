<template>
	<section class="wrapper">
		<SectionTitle title="Featured Products" />
		<div
			class="grid w-full grid-cols-2 gap-4 md:gap-8 md:px-0 lg:grid-cols-4"
			v-if="!productStore.isLoading"
		>
			<div v-for="(product, key) in productStore.list">
				<Product
					:key="product"
					@openModal="$emit('openModal', product)"
					@addToCart="addToCart($event)"
					:product="product"
					:index="key"
					:isLarge="true"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';

import Product from '@/components/ecommerce/Product.vue';

import ecomProdData from '@/views/ecommerce/data/ecommerce.json';
import ecomDevData from '@/views/ecommerce/data/dev_ecommerce.json';

const productStore = useProductStore();
const { addToCart } = useCartStore();

//
onBeforeMount(async () => {
	let featureProductCollectionID = '';
	if (import.meta.env.VITE_ENV === 'production') {
		featureProductCollectionID = ecomProdData.featuredColID;
	} else {
		featureProductCollectionID = ecomDevData.featuredColID;
	}

	await productStore.fetch(
		'?isPublished=1&collections[in][0]=' + featureProductCollectionID,
	);
});
</script>

<style lang="scss" scoped></style>
