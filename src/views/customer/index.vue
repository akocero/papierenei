<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Customers</h4>
			<BaseButton
				text="Add Customer"
				:routeObject="{ name: 'sales.customers.create' }"
			/>
		</div>
		<TableSearch
			:options="searchOptions"
			selected-option="firstName"
			@search="search"
		/>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th
							class="group flex items-center space-x-3 border-0 hover:border-r"
						>
							<span>Email</span>
							<VueFeather
								type="chevron-down"
								size="16"
								class="mr-4 hidden group-hover:inline-block"
							/>
						</th>
						<th>Customer Name</th>
						<th>Mobile No.</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>{{ item.email }}</td>
						<td class="capitalize">
							{{ item.lastName }}, {{ item.firstName }}
						</td>
						<td>{{ item.mobileNumber }}</td>

						<td>
							{{ moment(item.createdAt).format('MM/DD/YYYY') }}
						</td>

						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{
									name: 'sales.customers.edit',
									params: { id: item._id },
								}"
							/>

							<BaseTableActionButton
								icon="eye"
								:route-object="{
									name: 'sales.customers.view',
									params: { id: item._id },
								}"
							/>

							<!-- <BaseTableActionButton
								icon="trash"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								icon="printer"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								icon="mail"
								:route-object="{ name: 'sales.invoices' }"
							/> -->
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
import { useCustomerStore } from '@/stores/customer';
import useAlert from '../../composables/useAlert';
import TableSearch from '../../components/TableSearch.vue';
import moment from 'moment';

const store = useCustomerStore();
const { pushAlert } = useAlert();
const searchString = ref('');
const searchOptions = [{ label: 'First Name', value: 'firstName' }];

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
