<template>
	<TitleBar title="Customers">
		<template #actions>
			<BaseButton
				text="Add Customer"
				:routeObject="{ name: 'sales.customers.create' }"
				color="primary"
			/>
		</template>
	</TitleBar>
	<div class="card">
		<TableSearch
			:options="searchOptions"
			selected-option="firstName"
			@search="search"
		/>

		<TableData
			:data="store.list"
			:headers="tableHeaders"
			:isLoading="store.isLoading"
		>
			<template #item-createdAt="item">
				{{ moment(item.createdAt).format('MM/DD/YYYY') }}
			</template>

			<template #item-firstName="item">
				<span class="capitalize">
					{{ item.lastName }}, {{ item.firstName }}
				</span>
			</template>

			<template #item-actions="item">
				<BaseTableActionButton
					icon="edit"
					:route-object="{
						name: 'sales.customers.edit',
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
import { onBeforeMount, ref } from 'vue';
import { useCustomerStore } from '@/stores/customer';
import useAlert from '@/composables/useAlert';
import moment from 'moment';

const store = useCustomerStore();
const { pushAlert } = useAlert();
const searchString = ref('');
const searchOptions = [{ label: 'First Name', value: 'firstName' }];
const tableHeaders = [
	{ text: 'Email', value: 'email' },
	{ text: 'Customer', value: 'firstName' },
	{ text: 'Contact No.', value: 'mobileNumber' },
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
