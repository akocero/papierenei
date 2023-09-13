<template>
	<div class="mx-auto max-w-base">
		<div class="mx-10">
			<h2 class="my-6 font-nunito text-3xl font-black text-indigo-400">
				Orders
			</h2>
			<div class="card">
				<div class="relative overflow-x-auto">
					<table class="w-full text-left text-sm text-gray-500">
						<thead
							class="bg-gray-50 text-xs uppercase text-gray-700"
						>
							<tr>
								<th scope="col" class="px-6 py-3">Order</th>
								<th scope="col" class="px-6 py-3">Date</th>
								<th scope="col" class="px-6 py-3">
									Payment Status
								</th>
								<th scope="col" class="px-6 py-3">
									Fulfillment Status
								</th>
								<th scope="col" class="px-6 py-3">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr
								class="border-b bg-white"
								v-for="order in GuestStore.orders"
							>
								<th
									scope="row"
									class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
								>
									<RouterLink
										class="text-indigo-500 hover:text-indigo-600"
										:to="{
											name: 'account-orders-view',
											params: { id: order._id },
										}"
										>{{ order._id }}</RouterLink
									>
								</th>
								<td class="px-6 py-4">
									{{ convertToRelativeTime(order.createdAt) }}
								</td>
								<td class="px-6 py-4">
									<Badge
										v-if="order.paymentStatus === 'pending'"
										:text="order.paymentStatus"
										color="warning"
									/>

									<Badge
										v-else
										:text="order.paymentStatus"
										color="success"
									/>
								</td>
								<td class="px-6 py-4">
									<Badge
										v-if="order.status === 'pending'"
										:text="order.status"
										color="warning"
									/>

									<Badge
										v-else
										:text="order.status"
										color="success"
									/>
								</td>
								<td class="px-6 py-4">
									₱ {{ currencyFormat(order.total) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGuestStore } from '@/stores/guest';
import useUtils from '@/composables/useUtils';

const GuestStore = useGuestStore();
const { convertToRelativeTime, currencyFormat } = useUtils();

onMounted(async () => {
	const res = await GuestStore.getOrders();
});
</script>

<style lang="scss" scoped></style>
