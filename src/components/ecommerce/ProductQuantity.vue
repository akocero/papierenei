<template>
	<div class="flex">
		<button
			class="h-10 w-8 rounded-l-lg border disabled:bg-gray-200"
			@click="decQty(product._id, 1)"
			:disabled="product.cartQuantity <= 1"
		>
			<vue-feather type="minus" size="14"></vue-feather>
		</button>
		<input
			type="text"
			class="w-14 border-gray-200 py-[7px] pl-5 font-mono"
			v-model="product.cartQuantity"
			disabled
		/>
		<button
			class="h-10 w-8 rounded-r-lg border disabled:bg-gray-200"
			@click="incQty(product._id, 1)"
			:disabled="product.quantity <= product.cartQuantity"
		>
			<vue-feather type="plus" size="14"></vue-feather>
		</button>
	</div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';

const props = defineProps({
	product: Object,
});

const { incQty, decQty } = useCartStore();
</script>
