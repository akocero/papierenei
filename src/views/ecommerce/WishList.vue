<template>
	<div class="wrapper">
		<SectionTitle title="Wishlist" />
		<div
			class="grid w-full grid-cols-2 gap-4 px-0 md:grid-cols-5 md:gap-8 md:px-0"
			v-if="GuestStore.wishList.length > 0"
		>
			<div v-for="(product, key) in GuestStore.wishList" class="relative">
				<button
					v-if="EcomAuthStore.user"
					@click="GuestStore.removeWishList(product._id)"
					class="absolute top-3 right-3 z-[5] flex h-8 w-8 items-center justify-center rounded-xl bg-white/50 hover:bg-red-400 hover:text-white"
				>
					<VueFeather type="x" size="24" class="" />
				</button>
				<router-link
					:to="{ name: 'product', params: { id: product._id } }"
				>
					<div class="h-72" v-if="product.coverPhoto.length > 0">
						<img
							:src="product.coverPhoto[0].secure_url"
							alt=""
							class="h-full w-full rounded-2xl"
						/>
					</div>

					<div
						class="flex h-72 items-center justify-center rounded-2xl bg-gray-300"
						v-else
					>
						<VueFeather type="image" size="90" class="text-white" />
					</div>
					<div class="mt-3 text-center text-xl">
						<h4 class="capitalize sm:text-xl md:text-[1.13rem]">
							{{ product.name }}
						</h4>

						<h5
							class="mt-1 text-2xl text-gray-700"
							v-if="!product.salePrice"
						>
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

						<MainButton
							v-if="product.quantity"
							_class="mt-4 w-full"
							@click="CartStore.addToCart(product)"
						>
							Add to cart
						</MainButton>
					</div>
				</router-link>
			</div>
		</div>
		<div v-else class="text-center text-xl">Your wishlist is empty</div>
	</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useGuestStore } from '@/stores/guest';
import { useCartStore } from '@/stores/cart';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import useUtils from '@/composables/useUtils';

const GuestStore = useGuestStore();
const CartStore = useCartStore();
const EcomAuthStore = useEcomAuthStore();

const { numberFormat } = useUtils();

onBeforeMount(async () => {
	if (EcomAuthStore.user) {
		await GuestStore.getWishList();
	}
});
</script>

<style lang="scss" scoped></style>
