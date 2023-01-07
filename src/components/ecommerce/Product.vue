<template>
	<div class="relative rounded-lg text-left text-gray-800" v-if="product">
		<span
			class="absolute -left-5 -top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-400 px-2 py-1 text-sm font-bold text-white"
			v-if="product.salePrice"
			>SALE!</span
		>

		<span
			class="absolute -right-5 -top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-darkYellow px-2 py-1 text-sm font-bold text-white"
			>NEW!</span
		>
		<div class="group relative">
			<div
				v-if="product.images.length || product.coverPhoto"
				class="relative h-64 w-full"
			>
				<div
					v-if="!product.quantity"
					class="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-2/4 -translate-y-2/4 transform items-center justify-center rounded-full bg-gray-900/50 text-sm font-bold text-white"
				>
					<span>sold out</span>
				</div>
				<img
					class="h-full w-full object-cover"
					:src="product.coverPhoto.secure_url"
					alt=""
					v-if="product.coverPhoto"
				/>
				<img
					class="h-full w-full object-cover"
					:src="product.images[0].secure_url"
					alt=""
					v-else
				/>
			</div>

			<div v-else class="h-64 w-full">
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

			<button
				class="absolute bottom-0 hidden w-full bg-black/75 py-1 text-sm font-bold uppercase text-white group-hover:block"
				@click="$emit('openModal')"
			>
				Quick View
			</button>
		</div>

		<div class="mt-2 text-center text-xl font-bold">
			<h4 class="capitalize">{{ product.name }}</h4>

			<h5 class="font-mono" v-if="!product.salePrice">
				₱ {{ numberFormat(product.unitCost) }}
			</h5>

			<h5 class="font-mono text-2xl" v-if="product.salePrice">
				<span class="text-lg text-gray-400 line-through"
					>₱ {{ numberFormat(product.unitCost) }}</span
				>
				<span class="text-red-400">
					₱ {{ numberFormat(product.salePrice) }}
				</span>
			</h5>

			<p class="my-2 text-sm font-bold text-green-600">
				<span v-if="product.quantity > 0"
					>In stock, {{ product.quantity }} units</span
				>
			</p>

			<button
				class="w-full bg-darkBlue px-6 py-2 text-sm font-bold text-white"
				@click="$emit('addToCart', product)"
				v-if="product.quantity"
			>
				Add to Cart
			</button>
		</div>
	</div>
</template>

<script setup>
import useUtils from '@/composables/useUtils';

const { numberFormat } = useUtils();

const props = defineProps({
	product: Object,
});
</script>
