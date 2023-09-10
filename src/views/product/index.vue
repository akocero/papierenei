<template>
	<TitleBar title="Products">
		<template #actions>
			<BaseButton
				text="Add product"
				:routeObject="{ name: 'warehouse.products.create' }"
				color="primary"
			/>
		</template>
	</TitleBar>
	<div class="card">
		<TableSearch
			:options="searchOptions"
			selected-option="sku"
			@search="search"
		/>

		<TableData
			:data="store.list"
			:headers="tableHeaders"
			:isLoading="store.isLoading"
		>
			<template #header-sku="header"> {{ header.text }} </template>
			<template #item-sku="item">
				{{ item.sku ? item.sku : 'N/A' }}
			</template>
			<template #item-isPublished="item">
				<Badge
					color="success"
					text="published"
					v-if="item.isPublished"
				/>
				<Badge text="unpublished" v-else />
			</template>
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
					_type="button"
					icon="trash"
					@click="deleteItem(item._id)"
				/>
			</template>
		</TableData>
		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import Badge from '@/components/Badge.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useProductStore } from '@/stores/product';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import TableData from '@/components/TableData.vue';
import TablePagination from '@/components/TablePagination.vue';
import moment from 'moment';

const store = useProductStore();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');
const searchOptions = [{ label: 'SKU', value: 'sku' }];
const tableHeaders = [
	{
		text: 'SKU',
		value: 'sku',
		headerClass: 'w-[15%]',
	},
	{
		text: 'Name',
		value: 'name',
		cellClass: 'capitalize',
	},
	{
		text: 'Unit Cost',
		value: 'unitCost',
		headerClass: ' text-right',
		cellClass: 'text-right',
	},
	{
		text: 'Status',
		value: 'isPublished',
		headerClass: 'w-[5%]',
		cellClass: 'capitalize',
	},
	{
		text: 'Actions',
		value: 'actions',
		cellClass: 'flex space-x-2',
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
const deleteItem = async (id) => {
	let text = 'Are you sure you want to delete this data?';

	if (confirm(text) == true) {
		await store.delete(id);

		if (store.error) {
			pushAlert('error', store.error.message);
		}

		pushAlert('success', 'Deleted succesfully');
	}

	return;
};
</script>

<style></style>
