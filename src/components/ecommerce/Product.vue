<template>
	<div class="relative rounded-lg text-left text-gray-600" v-if="product">
		<span
			class="absolute -left-2 top-3 z-10 flex items-center justify-center rounded-full bg-red-400 px-2 py-1 text-sm font-bold text-white"
			v-if="product.salePrice"
			>SALE!</span
		>

		<span
			:class="[
				'absolute -left-2 z-10 flex items-center justify-center rounded-full bg-darkYellow px-2 py-1 text-sm font-bold text-white ',
				product.salePrice ? 'top-11' : 'top-3',
			]"
			v-if="isNewProduct(product.createdAt)"
			>NEW!</span
		>
		<div class="group relative overflow-hidden rounded-2xl">
			<RouterLink :to="{ name: 'product', params: { id: product._id } }">
				<div
					v-if="
						product?.images?.length || product?.coverPhoto?.length
					"
					class="relative h-44 w-full md:h-72"
				>
					<div
						v-if="!product.quantity"
						class="absolute bottom-3 right-3 rounded-2xl bg-gray-700 px-4 py-2 capitalize text-white"
					>
						sold out
					</div>
					<img
						class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
						:src="product.coverPhoto[0].secure_url"
						alt=""
						v-if="
							product.coverPhoto.length &&
							product?.images?.length === 0
						"
					/>

					<img
						class="h-full w-full object-cover group-hover:hidden"
						:src="product.coverPhoto[0].secure_url"
						alt=""
						v-if="
							product.coverPhoto.length &&
							product?.images?.length >= 1
						"
					/>
					<img
						class="h-full w-full object-cover"
						:src="product.images[0].secure_url"
						alt=""
						v-if="
							product.coverPhoto.length &&
							product?.images?.length >= 1
						"
					/>

					<img
						class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
						:src="product.images[0].secure_url"
						alt=""
						v-if="
							product?.coverPhoto?.length === 0 &&
							product?.images?.length >= 1
						"
					/>
				</div>
				<div
					v-else
					class="flex h-44 w-full items-center justify-center bg-gray-300 md:h-72"
				>
					<div
						v-if="!product.quantity"
						class="absolute bottom-3 right-3 rounded-2xl bg-gray-700 px-4 py-2 capitalize text-white"
					>
						sold out
					</div>
					<VueFeather type="image" size="90" class="text-white" />
				</div>
			</RouterLink>

			<button
				class="absolute bottom-0 hidden w-full bg-black/75 py-1 text-sm font-bold uppercase text-white group-hover:block"
				@click="$emit('openModal', product)"
				v-if="product.quantity"
			>
				Quick View
			</button>
		</div>

		<div class="mt-3 text-center text-xl">
			<h4 class="capitalize sm:text-xl md:text-[1.13rem]">
				{{ product.name }}
			</h4>

			<h5 class="mt-1 text-2xl text-gray-700" v-if="!product.salePrice">
				₱ {{ numberFormat(product.unitCost) }}
			</h5>

			<h5
				class="mt-1 space-x-1 text-2xl text-gray-700"
				v-if="product.salePrice"
			>
				<span class="text-red-400">
					₱ {{ numberFormat(product.salePrice) }}
				</span>
				<span class="text-lg text-gray-400 line-through"
					>₱ {{ numberFormat(product.unitCost) }}</span
				>
			</h5>

			<p class="my-2 text-sm font-bold text-green-600">
				<span v-if="product.quantity > 0"
					>In stock, {{ product.quantity }} units</span
				>
			</p>

			<!-- <button
				class="w-full bg-darkBlue px-6 py-2 text-sm font-bold text-white"
				@click="$emit('addToCart', product)"
				v-if="product.quantity"
			>
				Add to Cart
			</button> -->
		</div>
	</div>
</template>

<script setup>
import useUtils from '@/composables/useUtils';
import moment from 'moment';

const { numberFormat } = useUtils();

const props = defineProps({
	product: Object,
	index: Number,
});

const isNewProduct = (createdAt) => {
	createdAt = moment(new Date(createdAt), 'DD-MM-YYYY').add(15, 'days');
	const dateNow = new Date();
	return moment(createdAt).isAfter(dateNow);
};
</script>
