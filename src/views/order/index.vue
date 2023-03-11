<template>
	<TitleBar title="Orders">
		<template #actions>
			<!-- <BaseButton
					text="Add order"
					:routeObject="{ name: 'sales.orders.create' }"
					color="primary"
				/> -->
		</template>
	</TitleBar>
	<div class="card">
		<TableSearch :options="searchOptions" @search="search" />
		<TableData
			:data="store.list"
			:headers="tableHeaders"
			:isLoading="store.isLoading"
			editRoute="sales.orders.edit"
		>
			<template #item-createdAt="item">
				{{ moment(item.createdAt).format('MM/DD/YYYY') }}
			</template>
			<template #item-fullName="item">
				{{ item.lastName }}, {{ item.firstName }}
			</template>

			<template #item-total="item">
				₱{{ numberFormat(item.total) }}
			</template>

			<template #item-paymentStatus="item">
				<Badge
					:text="item.paymentStatus"
					v-if="item.paymentStatus === 'pending'"
					color="warning"
				/>
				<Badge :text="item.paymentStatus" v-else color="success" />
			</template>

			<template #item-status="item">
				<Badge
					:text="item.status"
					v-if="item.status === 'pending'"
					color="warning"
				/>
				<Badge :text="item.status" v-else color="success" />
			</template>

			<template #item-items="item">
				{{ item.items.length }} Item/s
			</template>

			<template #item-actions="item">
				<BaseTableActionButton
					icon="edit"
					:route-object="{
						name: 'sales.orders.edit',
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
import TablePagination from '@/components/TablePagination.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useOrderStore } from '@/stores/order';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import TableData from '@/components/TableData.vue';
import Badge from '@/components/Badge.vue';
import moment from 'moment';

const store = useOrderStore();
const { pushAlert } = useAlert();
const { numberFormat, convertToRelativeTime } = useUtils();
const searchString = ref('');
const searchOptions = [
	{ label: 'Order ID', value: 'lastName' },
	{ label: 'Last Name', value: 'lastName' },
	{ label: 'First Name', value: 'firstName' },
];
const tableHeaders = [
	{ text: 'Order ID', value: '_id' },
	{ text: 'Date', value: 'createdAt' },
	{ text: 'Customer', value: 'fullName', cellClass: 'capitalize' },
	{ text: 'Total', value: 'total' },
	{ text: 'Payment Status', value: 'paymentStatus' },
	{ text: 'Fulfillment', value: 'status' },
	{ text: 'Items', value: 'items' },
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

	console.log(store.list);
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
