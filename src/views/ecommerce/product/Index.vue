<template>
	<section class="wrapper max-w-[82rem]">
		<div class="grid grid-cols-12 gap-16" v-if="product">
			<div v-if="coverImage" class="col-span-7">
				<div class="h-[748px] overflow-hidden rounded-2xl">
					<img
						class="h-full w-full object-cover"
						:src="coverImage.secure_url"
						alt=""
					/>
				</div>

				<ul v-if="product?.images?.length" class="mt-4 flex space-x-4">
					<li
						v-if="product?.coverPhoto?.length"
						class="h-[139px] w-[139px]"
						@click="changeCoverImg(product.coverPhoto[0])"
					>
						<img
							:src="product.coverPhoto[0].secure_url"
							alt=""
							class="rounded-xl"
						/>
					</li>
					<li
						v-for="image in product.images"
						class="h-[139px] w-[139px]"
						@click="changeCoverImg(image)"
					>
						<img
							:src="image.secure_url"
							alt=""
							class="rounded-xl"
						/>
					</li>
				</ul>
			</div>
			<div
				v-else
				class="col-span-7 flex h-[748px] w-full items-center justify-center rounded-2xl bg-gray-300"
			>
				<VueFeather type="image" size="120" class="text-white" />
			</div>
			<div class="col-span-5" v-if="product">
				<h1
					class="font-nunito text-4xl font-black capitalize text-indigo-400"
				>
					{{ product.name }}
				</h1>
				<p class="mb-4 font-sans text-3xl" v-if="!product.salePrice">
					₱{{ numberFormat(product.unitCost) }}
				</p>

				<p class="mb-4 font-sans text-3xl" v-if="product.salePrice">
					<span class="text-lg line-through"
						>₱{{ numberFormat(product.unitCost) }}</span
					>
					<span class="text-red-400">
						₱{{ numberFormat(product.salePrice) }}
					</span>
				</p>

				<!-- <label for="" class="mt-10 inline-block text-xl"
					>Free Shipping on Orders $50+</label
				> -->

				<MainButton
					_class="w-full text-center mt-10"
					v-if="product.quantity"
					@click="CartStore.addToCart(product)"
				>
					Add to cart
				</MainButton>

				<button
					v-if="!product.quantity"
					:disabled="true"
					class="mt-10 block w-full rounded-xl bg-gray-300 py-2 text-center text-lg font-bold text-white"
				>
					Sold Out
				</button>

				<button
					v-if="!GuestStore.isInWishList(product._id)"
					@click="GuestStore.addWishList(product)"
					class="mt-3 flex w-full items-center justify-center text-lg text-red-400"
				>
					<VueFeather type="heart" size="24" class="mr-2" />
					<span>Add to Wishlist</span>
				</button>

				<div
					v-if="GuestStore.isInWishList(product._id)"
					class="mt-3 flex w-full items-center justify-center text-lg text-red-400"
				>
					<VueFeather
						type="heart"
						size="24"
						class="mr-2"
						fill="#F87171"
					/>
					<span>In wishlist</span>
				</div>

				<p class="mt-8 text-lg">
					{{ product.description }}
				</p>
			</div>
		</div>
	</section>
	<section class="wrapper mt-10">
		<JustForYou
			:collectionID="product?.collections[0] || null"
			v-if="product"
		/>
	</section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import useUtils from '@/composables/useUtils';
import ProductHero from '@/components/ecommerce/ProductHero.vue';
import JustForYou from './JustForYou.vue';
import { useCartStore } from '@/stores/cart';
import { useGuestStore } from '@/stores/guest';

const props = defineProps({
	ecommSettingsStore: Object,
});

const route = useRoute();
const productStore = useProductStore();
const { item: product } = storeToRefs(productStore);
const coverImage = ref(null);
const CartStore = useCartStore();
const GuestStore = useGuestStore();

const { numberFormat } = useUtils();

onBeforeMount(async () => {
	await productStore.find(route.params.id);
	setCoverImg();
});

onBeforeRouteUpdate(async (to, from, next) => {
	await productStore.find(to.params.id);
	setCoverImg();

	next();
});

const setCoverImg = () => {
	if (product.value.coverPhoto?.length) {
		coverImage.value = product.value.coverPhoto[0];
		return;
	}

	if (!product.value.coverPhoto?.length && product.value.images?.length) {
		coverImage.value = product.value.images[0];
		return;
	}

	coverImage.value = null;
};

const changeCoverImg = (image) => {
	coverImage.value = image;
};
</script>
