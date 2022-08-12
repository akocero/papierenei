<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Invoices</h4>
			<BaseButton
				text="Add Invoice"
				:routeObject="{ name: 'sales.invoices.create' }"
			/>
		</div>
		<TableSearch
			:options="searchOptions"
			selected-option="invoiceFor"
			@search="search"
		/>

		<div class="table-responsive">
			<table class="invoice-table table">
				<thead>
					<tr>
						<th
							class="group flex items-center space-x-3 border-0 hover:border-r"
						>
							<span>Invoice No.</span>
							<VueFeather
								type="chevron-down"
								size="16"
								class="mr-4 hidden group-hover:inline-block"
							/>
						</th>
						<th>Bill to</th>
						<th>Created at</th>
						<th>Updated at</th>
						<th>Status</th>
						<th>Date Paid</th>
						<th>Amount Due</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>{{ item.invoiceNo }}</td>
						<td>{{ item.invoiceFor.name }}</td>
						<td>
							{{ moment(item.createdAt).format('MM/DD/YYYY') }}
						</td>
						<td>
							{{ moment(item.updatedAt).format('MM/DD/YYYY') }}
						</td>
						<td>
							<Badge
								:text="item.status"
								v-if="item.status === 'unsettled'"
								color="warning"
							/>
							<Badge
								:text="item.status"
								v-if="item.status === 'paid'"
								color="success"
							/>
							<Badge
								:text="item.status"
								v-if="item.status === 'overdue'"
								color="danger"
							/>
						</td>
						<td v-if="item.status === 'paid'">
							{{ moment(item.datePaid).format('MM/DD/YYYY') }}
						</td>
						<td v-else>
							<!-- <span class="text-danger"></span> -->
							<Badge text="to be paid" color="danger" />
						</td>
						<td>₱{{ item.amountDue }}</td>

						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{
									name: 'sales.invoices.edit',
									params: { id: item._id },
								}"
							/>

							<BaseTableActionButton
								icon="eye"
								:route-object="{
									name: 'sales.invoices.view',
									params: { id: item._id },
								}"
							/>

							<BaseTableActionButton
								_type="button"
								icon="printer"
								@click="print(item)"
							/>

							<!-- <button
								@click="print(item)"
								v-if="!isPrinting"
								class="btn btn-sm btn-default"
								style="margin-left: 4px"
							>
								<i v-html="iconPrinter"></i>
							</button> -->

							<!-- <BaseTableActionButton
								icon="trash"
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
import { useInvoiceStore } from '@/stores/invoice';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import Badge from '@/components/Badge.vue';
import moment from 'moment';

const store = useInvoiceStore();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');
const searchOptions = [{ label: 'Invoice For', value: 'invoiceFor' }];

const isPrinting = ref(false);
const printData = ref({});

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

const print = (item) => {
	store.print = item;

	// item.dueDate = item.dueDate.substring(0, 10);
	// printData.value = item;
	// isPrinting.value = true;
	setTimeout(() => {
		window.print();
		isPrinting.value = false;
	}, 500);

	return true;
};

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

	store.list = store.list.map((inv) => {
		const amountDue = computeAll(inv);
		return { ...inv, amountDue };
	});

	console.log(list);
};

const computeAll = (item) => {
	let _subtotal = 0;
	let _total = 0;
	let _discount = 0;
	if (item) {
		item.items.forEach((property) => {
			_subtotal +=
				parseFloat(property.unitPrice) * parseFloat(property.qty);
		});

		_total = _subtotal;
	}

	if (item.shippingFee) {
		_total += parseFloat(item.shippingFee);
	}

	if (item.discount && item.discount.discountKind === 'percent') {
		const _percent = parseFloat(item.discount.discountValue) / 100;
		_discount = parseFloat(_subtotal * _percent);
		_total -= _discount;

		// discountPercent.value = _percent * 100;
		// discount.value = numberFormat(_discount);
	}

	if (item.discount && item.discount.discountKind === 'amount') {
		_total -= parseFloat(item.discount.discountValue);

		// discount.value = numberFormat(parseFloat(item.discount.discountValue));
	}

	// subtotal.value = numberFormat(_subtotal);
	return numberFormat(_total);
	console.log(_subtotal);

	return numberFormat(total.value);
};
</script>

<style>
@media print {
	/* .invoice-table {
		display: none;
	}
	body * {
		visibility: hidden;
	}
	main {
		padding-left: 0 !important;
	}
	#print-table,
	#print-table * {
		visibility: visible;
	}
	#print-table {
		position: absolute;
		left: 0;
		top: 0;
	} */
}

/* #print-table {
	visibility: hidden;
	position: absolute;
	left: 0;
	top: 0;
} */
</style>
