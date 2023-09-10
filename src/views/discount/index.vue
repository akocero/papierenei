<template>
	<div class="">
		<TitleBar title="Discounts">
			<template #actions>
				<BaseButton
					text="Add Discount"
					:routeObject="{ name: 'sales.discounts.create' }"
					color="primary"
				/>
			</template>
		</TitleBar>
		<div class="card">
			<TableSearch
				:options="searchOptions"
				selected-option="code"
				@search="search"
			/>

			<TableData
				:data="store.list"
				:headers="tableHeaders"
				:isLoading="store.isLoading"
			>
				<template #item-discountValue="item">
					<span v-if="item.discountKind === 'percent'"
						>{{ item.discountValue }}%</span
					>
					<span v-else>
						₱{{ numberFormat(item.discountValue) }}
					</span>
				</template>

				<template #item-actions="item">
					<BaseTableActionButton
						icon="edit"
						:route-object="{
							name: 'sales.discounts.edit',
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
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useDiscountStore } from '@/stores/discount';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import moment from 'moment';

const store = useDiscountStore();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');
const searchOptions = [{ label: 'Code', value: 'code' }];
const tableHeaders = [
	{ text: 'Code', value: 'code' },
	{ text: 'Type', value: 'discountKind' },
	{ text: 'Value', value: 'discountValue', cellClass: 'capitalize' },
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
