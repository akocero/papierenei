<template>
	<TitleBar title="Collections">
		<template #actions>
			<BaseButton
				text="Add Collection"
				:routeObject="{ name: 'warehouse.collections.create' }"
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
			editRoute="warehouse.collections.edit"
		>
			<template #item-createdAt="item">
				{{ moment(item.createdAt).format('MM/DD/YYYY') }}
			</template>

			<template #item-actions="item">
				<BaseTableActionButton
					icon="edit"
					:route-object="{
						name: 'warehouse.collections.edit',
						params: { id: item._id },
					}"
				/>
			</template>
		</TableData>

		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useCollectionStore } from '@/stores/collection';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import moment from 'moment';

const store = useCollectionStore();
const { pushAlert } = useAlert();
const searchString = ref('');
const searchOptions = [{ label: 'SKU', value: 'sku' }];
const tableHeaders = [
	{ text: 'Name', value: 'name' },
	{ text: 'Created at', value: 'createdAt' },
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
</script>

<style></style>
