<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Orders</h4>
			<!-- <BaseButton
				text="Add Order"
				:routeObject="{ name: 'sales.orders.create' }"
			/> -->
		</div>
		<TableSearch
			:options="searchOptions"
			selected-option="sku"
			@search="search"
		/>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Customer Name</th>
						<th>Customer Email</th>
						<th>Payment Status</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>{{ item._id }}</td>
						<td class="capitalize">
							{{ item.firstName }}, {{ item.lastName }}
						</td>
						<td>{{ item.email }}</td>
						<td>
							<button
								class="min-w-7 flex h-7 items-center justify-center rounded-sm border border-gray-200 p-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white"
							>
								Confirm payment
							</button>
						</td>
						<td>0</td>
						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{
									name: 'sales.orders.edit',
									params: { id: item._id },
								}"
							/>

							<!-- <BaseTableActionButton
								icon="eye"
								:route-object="{
									name: 'sales.orders.view',
									params: { id: item._id },
								}"
							/> -->

							<button
								class="min-w-7 flex h-7 items-center justify-center rounded-sm border border-gray-200 p-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white"
							>
								<VueFeather
									type="send"
									size="16"
									class="mr-1"
								/>
								Resend email
							</button>
						</td>
					</tr>
					<tr v-if="store.isLoading">
						<td colspan="10" class="text-center">Loading...</td>
					</tr>
					<tr v-if="store.list.length <= 0 && !store.isLoading">
						<td colspan="10" class="text-center">
							No results found!
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import TablePagination from '@/components/TablePagination.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useOrderStore } from '@/stores/order';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import moment from 'moment';

const store = useOrderStore();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');
const searchOptions = [{ label: 'SKU', value: 'sku' }];

onBeforeMount(async () => {
	// if (store.list.length <= 0) {
	await fetchData();
	// }
	if (store.error) {
		console.log('index', store.error);
		pushAlert('error', store.error.message);
		return;
	}
});

const search = async (_searchString) => {
	if (_searchString) {
		await fetchData(1, _searchString);

		if (store.list.length <= 0) {
		}
	} else {
		await fetchData();
	}
	searchString.value = _searchString;
};

const paginate = (page) => {
	fetchData(page, searchString.value || '');
};

const fetchData = async (page = 1, search = '', limit = 10) => {
	await store.fetch(`?${search}page=${page}&limit=${limit}`);
};
</script>

<style></style>
