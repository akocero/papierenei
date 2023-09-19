<template>
	<div class="mx-auto mb-10 max-w-[54rem]">
		<div class="mx-10">
			<h2 class="my-6 font-nunito text-3xl font-black text-indigo-400">
				Order Info
			</h2>
			<div class="card" v-if="order">
				<div class="mb-2 flex justify-between">
					<h2 class="mb-3 font-nunito font-bold text-indigo-400">
						Order #{{ order._id }}
					</h2>
					<h2 class="mb-3 text-sm text-gray-500">
						{{ formatDate(order.createdAt) }}
					</h2>
				</div>

				<div class="relative overflow-x-auto">
					<table
						class="w-full text-left text-sm uppercase text-gray-500"
					>
						<thead class="bg-gray-100 text-xs text-gray-700">
							<tr>
								<th scope="col" class="px-6 py-3">Product</th>
								<th scope="col" class="px-6 py-3">Quantity</th>
								<th scope="col" class="px-6 py-3">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr
								class="border-b bg-white"
								v-for="product in order.items"
							>
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								>
									{{ product.name }}<br />
									₱
									{{ currencyFormat(product.price) }}
								</th>
								<td class="px-6 py-4">
									{{ product.qty }}
								</td>
								<td class="px-6 py-4">
									₱ {{ currencyFormat(product.total) }}
								</td>
							</tr>
							<tr class="border-b bg-white">
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								></th>
								<td class="px-6 py-4">Subtotal</td>
								<td class="px-6 py-4">
									₱ {{ currencyFormat(order.subtotal) }}
								</td>
							</tr>
							<tr class="border-b bg-white">
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								></th>
								<td class="px-6 py-4">Shipping Fee</td>
								<td class="px-6 py-4">
									₱
									{{
										currencyFormat(
											order.shippingDetails.fee,
										)
									}}
								</td>
							</tr>
							<tr class="border-b bg-white" v-if="order.discount">
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								></th>
								<td class="px-6 py-4">Discount</td>
								<td class="px-6 py-4">
									- ₱
									{{
										currencyFormat(
											order.discount.discountTotal,
										)
									}}
								</td>
							</tr>
							<tr class="bg-white">
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								></th>
								<td class="px-6 py-4">Total</td>
								<td class="px-6 py-4">
									₱ {{ currencyFormat(order.total) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="card" v-if="order">
				<h3
					class="mb-3 font-nunito font-bold capitalize text-indigo-400"
				>
					Other order details
				</h3>
				<ul class="text-gray-400">
					<li>
						Notes:
						<span class="text-gray-600">{{ order.notes }}</span>
					</li>
					<li>
						Tracking #:
						<span class="text-gray-600">{{
							order.trackingNumber
						}}</span>
					</li>
				</ul>
			</div>
			<div class="mt-4 grid grid-cols-2 gap-4" v-if="order">
				<div class="card">
					<h3 class="mb-3 font-nunito font-bold text-indigo-400">
						Billing Address
					</h3>
					<ul class="capitalize text-gray-400">
						<li>
							City:
							<span class="text-gray-600">{{ order.city }}</span>
						</li>
						<li>
							State:
							<span class="text-gray-600">{{ order.state }}</span>
						</li>
						<li>
							Street address:
							<span class="text-gray-600">{{
								order.streetAddress
							}}</span>
						</li>
						<li>
							Zip Code:
							<span class="text-gray-600">{{
								order.zipCode
							}}</span>
						</li>
					</ul>
				</div>

				<div class="card">
					<h3 class="mb-3 font-nunito font-bold text-indigo-400">
						Shipping Address
					</h3>
					<ul class="capitalize text-gray-400">
						<li>
							City:
							<span class="text-gray-600">{{ order.city }}</span>
						</li>
						<li>
							State:
							<span class="text-gray-600">{{ order.state }}</span>
						</li>
						<li>
							Street address:
							<span class="text-gray-600">{{
								order.streetAddress
							}}</span>
						</li>
						<li>
							Zip Code:
							<span class="text-gray-600">{{
								order.zipCode
							}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGuestStore } from '@/stores/guest';
import useUtils from '@/composables/useUtils';

const GuestStore = useGuestStore();
const { formatDate, currencyFormat } = useUtils();

const router = useRouter();
const route = useRoute();
const order = ref(null);

onBeforeMount(async () => {
	order.value = await GuestStore.getSingleOrder(route.params.id);
});
</script>

<style lang="scss" scoped></style>
