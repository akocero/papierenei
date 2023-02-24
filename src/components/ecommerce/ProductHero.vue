<template>
	<div v-if="product" class="grid grid-cols-12 gap-10">
		<div class="col-span-7">
			<div
				v-if="product?.images?.length || product?.coverPhoto?.length"
				class="relative h-44 w-full md:h-[32rem]"
			>
				<div
					v-if="!product.quantity"
					class="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-2/4 -translate-y-2/4 transform items-center justify-center rounded-full bg-gray-900/50 text-sm font-bold text-white"
				>
					<span>sold out</span>
				</div>
				<img
					class="h-full w-full object-cover"
					:src="product.coverPhoto[0].secure_url"
					alt=""
					v-if="product.coverPhoto.length"
				/>
				<img
					class="h-full w-full object-cover"
					:src="product.images[0].secure_url"
					alt=""
					v-else
				/>
			</div>
			<div v-else class="h-44 w-full md:h-[32rem]">
				<div
					v-if="!product.quantity"
					class="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-2/4 -translate-y-2/4 transform items-center justify-center rounded-full bg-gray-900/50 text-sm font-bold text-white"
				>
					<span>sold out</span>
				</div>
				<img
					class="h-full w-full object-cover"
					src="https://via.placeholder.com/400?text=Image+N/A"
					alt=""
				/>
			</div>
		</div>
		<div class="col-span-5">
			<label class="font-sans text-xs text-gray-400"
				>PAPIER RENEI STORE</label
			>
			<h2 class="mb-4 mt-3 text-4xl">{{ product.name }}</h2>
			<!-- <p class="mb-4 font-sans text-xl">
				₱{{ numberFormat(product.unitCost) }} PHP
			</p> -->
			<p class="mb-4 font-sans text-xl" v-if="!product.salePrice">
				₱{{ numberFormat(product.unitCost) }}
			</p>

			<p class="mb-4 font-sans text-xl" v-if="product.salePrice">
				<span class="text-lg text-gray-400 line-through"
					>₱{{ numberFormat(product.unitCost) }}</span
				>
				<span class="text-red-400">
					₱{{ numberFormat(product.salePrice) }}
				</span>
			</p>

			<label class="font-sans text-xs text-gray-400">QUANTITY</label>
			<Quantity v-model="quantity" :currentQty="product.quantity" />

			<button
				v-if="product.quantity"
				class="mt-4 w-full bg-lightBlue-3 py-4 px-8 font-bold text-white"
				@click="cartStore.addToCart(product)"
			>
				Add to cart
			</button>
		</div>
	</div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import Quantity from '@/components/ecommerce/Quantity.vue';
import useUtils from '@/composables/useUtils';

const props = defineProps({
	product: Object,
});
const cartStore = useCartStore();
const { numberFormat } = useUtils();
const quantity = ref(1);
</script>
