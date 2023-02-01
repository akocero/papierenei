<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Products</h4>
			<BaseButton
				text="Add Product"
				:routeObject="{ name: 'warehouse.products.create' }"
			/>
		</div>
		<TableSearch
			:options="searchOptions"
			selected-option="sku"
			@search="search"
		/>

		<div class="table-responsive">
			<TableData :data="store.list" :headers="headers">
				<!-- <template #header="{ value }"> {{ value }} </template> -->
				<template #header-sku="header"> {{ header.text }} </template>
				<template #item-sku="item"> {{ item.sku }} </template>
				<template #item-unitCost="item">
					₱{{ numberFormat(item.unitCost) }}
				</template>

				<template #item-actions="item">
					<BaseTableActionButton
						icon="edit"
						:route-object="{
							name: 'warehouse.products.edit',
							params: { id: item._id },
						}"
					/>

					<BaseTableActionButton
						icon="eye"
						:route-object="{
							name: 'warehouse.products.view',
							params: { id: item._id },
						}"
					/>
				</template>
			</TableData>
			<!-- <table class="table">
				<thead>
					<tr>
						<th
							class="group flex items-center space-x-3 border-0 hover:border-r"
						>
							<span>SKU</span>
							<VueFeather
								type="chevron-down"
								size="16"
								class="mr-4 hidden group-hover:inline-block"
							/>
						</th>
						<th>Name</th>
						<th>Description</th>
						<th>Unit Cost</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>{{ item.sku ? item.sku : 'N/A' }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.description }}</td>
						<td style="width: 10%">
							₱{{ numberFormat(item.unitCost) }}
						</td>

						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{
									name: 'warehouse.products.edit',
									params: { id: item._id },
								}"
							/>

							<BaseTableActionButton
								icon="eye"
								:route-object="{
									name: 'warehouse.products.view',
									params: { id: item._id },
								}"
							/>
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
			</table> -->
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
import { useProductStore } from '@/stores/product';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import TableData from '@/components/TableData.vue';
import moment from 'moment';

const store = useProductStore();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');
const searchOptions = [{ label: 'SKU', value: 'sku' }];
const headers = [
	{
		text: 'ID',
		value: '_id',
	},
	{
		text: 'SKU',
		value: 'sku',
	},
	{
		text: 'Name',
		value: 'name',
		cellClass: 'capitalize',
	},
	{
		text: 'Unit Cost',
		value: 'unitCost',
		headerClass: 'w-2/5 text-right',
		cellClass: 'text-right',
	},
	{
		text: 'Description',
		value: 'description',
	},
	{
		text: 'Actions',
		value: 'actions',
		cellClass: 'flex space-x-2',
	},
];

const rows = [
	{
		sku: 'sku1',
		name: 'name',
		description: 'desc',
	},
	{
		sku: 'sku2',
		name: 'name',
		description: 'desc',
	},
	{
		sku: 'sku3',
		name: 'name',
		description: 'desc',
	},
	{
		sku: 'sku4',
		name: 'name',
		description: 'desc',
	},
	{
		sku: 'sku5',
		name: 'name',
		description: 'desc',
	},
];

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
