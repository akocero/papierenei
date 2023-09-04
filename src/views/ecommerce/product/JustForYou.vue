<template>
	<section class="wrapper">
		<SectionTitle title="Just For You" />
		<div
			class="grid w-full grid-cols-2 gap-2 md:grid-cols-5 md:gap-8 md:px-0"
			v-if="!productStore.isLoading"
		>
			<div v-for="(product, key) in productStore.list">
				<Product
					:key="product"
					@openModal="$emit('openModal', product)"
					@addToCart="addToCart($event)"
					:product="product"
					:index="key"
					:isLarge="false"
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

const productStore = useProductStore();
const { addToCart } = useCartStore();

const props = defineProps(['collectionID']);

onBeforeMount(async () => {
	let collectionQry = '';
	if (props.collectionID) {
		collectionQry = `&collections[in][0]=${props.collectionID}`;
	}
	await productStore.fetch('?isPublished=1&limit=5' + collectionQry);
});
</script>

<style lang="scss" scoped></style>
