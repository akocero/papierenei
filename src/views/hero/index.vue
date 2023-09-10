<template>
	<TitleBar title="Heros">
		<template #actions>
			<BaseButton
				text="Add Hero"
				:routeObject="{ name: 'ecomm.heros.create' }"
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
			editRoute="ecomm.heros.edit"
		>
			<template #item-createdAt="item">
				{{ moment(item.createdAt).format('MM/DD/YYYY') }}
			</template>

			<template #item-isPublished="item">
				<Badge
					text="Unpublished"
					v-if="!item.isPublished"
					color="warning"
				/>
				<Badge text="Published" v-else color="success" />
			</template>

			<template #item-actions="item">
				<BaseTableActionButton
					icon="edit"
					:route-object="{
						name: 'ecomm.heros.edit',
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
import { useHeroStore } from '@/stores/hero';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import moment from 'moment';

const store = useHeroStore();
const { pushAlert } = useAlert();
const searchString = ref('');
const searchOptions = [{ label: 'SKU', value: 'sku' }];
const tableHeaders = [
	{ text: 'Title', value: 'title' },
	{ text: 'Published', value: 'isPublished' },
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

	console.log(store.list);
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
