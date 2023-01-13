<template>
	<div class="wrapper my-10 px-60">
		<ProductHero
			:product="product"
			v-if="!productStore.isLoading && product"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import useUtils from '@/composables/useUtils';
import ProductHero from '@/components/ecommerce/ProductHero.vue';

const route = useRoute();
const productStore = useProductStore();
const { item: product } = storeToRefs(productStore);

const { numberFormat } = useUtils();

onBeforeMount(async () => {
	await productStore.find(route.params.id);
	console.log(product.value);
});
</script>
