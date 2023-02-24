<template>
	<div class="mx-auto my-8 max-w-screen-2xl">
		<div class="flex items-baseline justify-between">
			<h2 class="text-4xl font-semibold">Your Cart</h2>
			<router-link to="shop" class="font-semibold underline"
				>Continue Shopping</router-link
			>
		</div>
		<div class="mt-4">
			<table class="mb-5 w-full">
				<thead class="border-b">
					<tr class="text-left">
						<th class="w-16 py-2"></th>
						<th class="py-2">Product</th>
						<th class="py-2">Quantity</th>
						<th class="py-2 text-right">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="border-b py-1"
						v-for="product in list"
						v-if="!cartStore.isLoading"
					>
						<td class="py-4">
							<button
								class="h-8 w-8"
								@click="removeToCart(product._id)"
							>
								<vue-feather
									type="x"
									size="20"
									class=""
								></vue-feather>
							</button>
						</td>
						<td class="py-4">
							<div class="flex items-center gap-10">
								<div
									v-if="
										product?.images?.length ||
										product?.coverPhoto?.length
									"
									class="relative h-24 w-24"
								>
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
								<div v-else class="h-24 w-24">
									<img
										class="h-full w-full object-cover"
										src="https://via.placeholder.com/400?text=Image+N/A"
										alt=""
									/>
								</div>
								<div>
									<h5 class="capitalize">
										{{ product.name }}
									</h5>
									<div class="font-sans">
										<div class="" v-if="product.salePrice">
											<span
												class="text-gray-400 line-through"
											>
												₱{{
													numberFormat(
														product.unitCost,
													)
												}}
											</span>
											₱{{
												numberFormat(product.salePrice)
											}}
										</div>
										<span
											class=""
											v-if="!product.salePrice"
										>
											₱{{
												numberFormat(product.unitCost)
											}}
										</span>
									</div>
								</div>
							</div>
						</td>
						<td class="py-4">
							<ProductQuantity :product="product" />
						</td>
						<td class="py-4 text-right font-sans">
							<span v-if="!product.salePrice">
								₱{{
									numberFormat(
										product.unitCost * product.cartQuantity,
									)
								}}
							</span>
							<div v-else>
								₱{{ numberFormat(product.cartTotal) }}
							</div>
						</td>
					</tr>
					<tr v-else>
						<Spinner />
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex justify-between">
			<div class="flex flex-col">
				<label for="">Order special instructions</label>
				<textarea name="" id="" cols="30" rows="3" class=""></textarea>
			</div>
			<div class="max-w-xl">
				<div>
					<h4 class="text-right">
						<span class="font-bold">Subtotal</span>
						<span class="font-sans text-xl">
							₱{{ numberFormat(subTotal) }}
						</span>
					</h4>
					<p>Taxes and shipping calculated at checkout</p>
				</div>

				<router-link
					to="check-out"
					v-if="list.length"
					class="mt-4 block w-full rounded-lg bg-darkBlue px-6 py-2 text-center text-xl font-semibold text-white"
					>Check Out</router-link
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProductQuantity from '@/components/ecommerce/ProductQuantity.vue';
import { useCartStore } from '@/stores/cart';
import useUtils from '@/composables/useUtils';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import Spinner from '@/components/Spinner.vue';

const cartStore = useCartStore();
const { list, subTotal } = storeToRefs(cartStore);
const { removeToCart } = cartStore;

const { numberFormat } = useUtils();

onBeforeMount(async () => {
	await cartStore.updateCartListDetails();
});
</script>

<style></style>
