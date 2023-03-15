<template>
	<div class="wrapper my-10 flex" v-if="orderDetails">
		<div class="w-[60%] p-8" v-if="orderDetails">
			<h2 class="mb-4 text-4xl">Papier Renei</h2>
			<h3 class="mb-4 text-2xl font-bold capitalize">
				Thank you {{ orderDetails.firstName }}!
			</h3>

			<div class="mb-4 border p-6">
				<h2 class="text-2xl">Your order is confirmed</h2>
				<p for="">Payment details to be sent via Email</p>
			</div>

			<div class="border p-6">
				<h2 class="mb-4 text-2xl">Contact Information</h2>
				<div class="grid grid-cols-12 gap-y-8">
					<div class="col-span-6">
						<label for="">Contact Info.</label>
						<p class="font-bold">{{ orderDetails.email }}</p>
					</div>
					<div class="col-span-6">
						<label for="">Payment Method</label>
						<p class="font-bold">
							{{ orderDetails.paymentMethod }} -
							<span class="font-sans">
								₱{{ numberFormat(orderDetails.total) }}PHP
							</span>
						</p>
					</div>
					<div class="col-span-6">
						<label for="">Shipping Address</label>
						<p class="font-bold">
							{{ orderDetails.streetAddress }},
							{{ orderDetails.city }},
							{{ orderDetails.state }} ({{
								orderDetails.zipCode
							}})
						</p>
					</div>
					<div class="col-span-6">
						<label for="">Billing Address</label>
						<p class="font-bold"></p>
					</div>
				</div>
			</div>

			<div class="mt-8 flex justify-end">
				<router-link
					:to="{
						name: 'shop',
					}"
					class="bg-darkBlue px-8 py-4 font-bold text-white"
					>Continue shopping</router-link
				>
			</div>
		</div>
		<!-- <div v-if="!orderStore.isLoading && orderDetails.items.length > 0">
			{{ orderDetails.items }}
		</div> -->

		<div
			class="col-span-5 w-[40%] p-12 shadow-lg"
			v-if="!orderStore.isLoading && orderDetails.items.length > 0"
		>
			<h3 class="col-span-full mb-2 text-xl font-semibold">
				Order Summary
			</h3>

			<ul>
				<li class="border-b py-4" v-for="ct in orderDetails.items">
					<div class="flex items-center">
						<!-- <div
							v-if="ct.images.length || ct.coverPhoto"
							class="relative h-24 w-24"
						>
							<img
								class="h-full w-full object-cover"
								:src="ct.coverPhoto.secure_url"
								alt=""
								v-if="ct.coverPhoto"
							/>
							<img
								class="h-full w-full object-cover"
								:src="ct.images[0].secure_url"
								alt=""
								v-else
							/>

							<span
								class="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 font-sans text-white"
							>
								{{ ct.cartQuantity }}
							</span>
						</div> -->
						<div class="relative h-24 w-24">
							<img
								class="h-full w-full object-cover"
								src="https://via.placeholder.com/400?text=Image+N/A"
								alt=""
							/>
							<span
								class="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 font-sans text-white"
							>
								{{ ct.qty }}
							</span>
						</div>
						<div class="ml-4 font-semibold">
							<label>{{ ct.name }}</label>
						</div>
						<label class="ml-auto font-sans font-semibold"
							>₱{{ numberFormat(ct.total) }}</label
						>
					</div>
				</li>
				<li class="space-y-2 border-b py-4" v-if="orderDetails.items">
					<div class="flex justify-between">
						<label>Subtotal</label>
						<span class="font-sans font-semibold"
							>₱{{ numberFormat(orderDetails.subtotal) }}</span
						>
					</div>
					<div class="flex justify-between">
						<label>Shipping</label>
						<span class="font-sans font-semibold"
							>₱{{
								numberFormat(orderDetails.shippingDetails.fee)
							}}</span
						>
					</div>
				</li>
				<li class="space-y-2 border-b py-4">
					<div class="flex justify-between">
						<label class="font-semibold">Total</label>
						<span class="font-sans text-xl font-semibold"
							>₱{{ numberFormat(orderDetails.total) }}</span
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useOrderStore } from '@/stores/order';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useUtils from '@/composables/useUtils';

const route = useRoute();
const orderStore = useOrderStore();
const { numberFormat } = useUtils();
const items = ref([]);

const { item: orderDetails } = storeToRefs(orderStore);

onBeforeMount(async () => {
	await orderStore.find(route.params.id);

	console.log(orderStore.item);
});
</script>
