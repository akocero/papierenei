<template>
	<div class="flex w-full flex-col items-start gap-x-5 sm:flex-row">
		<div class="w-full sm:w-7/12">
			<div class="card">
				<div class="mb-4 flex items-baseline justify-between">
					<h4 class="text-xl">
						Edit Invoice
						<span v-if="item">#{{ item.invoiceNo }}</span>
					</h4>
					<BaseButton
						_type="link"
						text="Back"
						:routeObject="{ name: 'sales.invoices' }"
					/>
				</div>
				<form @submit.prevent="handleSubmit" v-if="!isLoading && item">
					<div class="grid grid-cols-6 gap-4">
						<div class="col-span-full font-semibold">
							Bill Status.
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseSelect
								id="payableTo"
								label="Invoice Status"
								v-model="item.status"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.status || null
								"
								:options="[
									{
										value: 'unsettled',
										label: 'Unsettled',
									},
									{
										value: 'paid',
										label: 'Paid',
									},
									{
										value: 'overdue',
										label: 'Overdue',
									},
								]"
								:required="true"
								:disabled="disableStatus"
							/>
						</div>
						<div
							class="col-span-full md:col-span-2"
							v-if="item.status === 'paid'"
						>
							<BaseInput
								type="date"
								id="datePaid"
								label="Date Paid"
								v-model="item.datePaid"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.datePaid || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="disableStatus"
							/>
						</div>

						<div class="col-span-full font-semibold">
							Billing info.
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="name"
								label="Invoice #"
								v-model="item.invoiceNo"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors.invoiceNo || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseSelect
								id="payableTo"
								label="Payable to"
								v-model="item.payableTo"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.payableTo ||
									null
								"
								:options="[
									{
										value: 'Papier Renei',
										label: 'Papier Renei',
									},
								]"
								:required="true"
							/>
						</div>

						<div class="col-span-full md:col-span-2">
							<BaseInput
								type="number"
								id="shippingFee"
								label="Shipping Fee"
								v-model="item.shippingFee"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.shippingFee ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								type="date"
								id="dueDate"
								label="Due Date"
								v-model="item.dueDate"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.dueDate || null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-full md:col-span-4">
							<BaseInput
								id="notes"
								label="Notes"
								v-model="item.notes"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.notes || null
								"
								placeholder="Ex. "
								:required="false"
							/>
						</div>

						<div class="col-span-full font-semibold">
							Bill discount
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseSelect
								id="discount"
								label="Select Discount"
								v-model="discount"
								:error="error"
								:errorField="error?.errors?.discount || null"
								optionValue="_id"
								optionLabel="code"
								:options="discountStore.list"
								:required="true"
							/>
						</div>
						<div
							class="col-span-full md:col-span-2"
							v-if="item.discount"
						>
							<BaseInput
								id="discountKind"
								label="Discount Type"
								v-model="item.discount.discountKind"
								:error="error"
								:errorField="error?.errors?.discount || null"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div
							class="col-span-full md:col-span-2"
							v-if="item.discount"
						>
							<BaseInput
								id="discountValue"
								label="Discount Value"
								v-model="item.discount.discountValue"
								:error="error"
								:errorField="error?.errors?.discount || null"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full font-semibold">Bill to.</div>
						<div class="col-span-full md:col-span-2">
							<BaseSelect
								id="invoiceFor"
								label="Invoice for"
								v-model="invoiceFor"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'invoiceFor.name'
									] || null
								"
								:options="customerStore.list"
								optionLabel="firstName"
								optionValue="_id"
								:required="true"
							/>
						</div>

						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="name"
								label="Customer Name"
								v-model="item.invoiceFor.name"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'invoiceFor.name'
									] || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="email"
								label="Email"
								v-model="item.invoiceFor.email"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'invoiceFor.email'
									] || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="contactNo"
								label="Contact No."
								v-model="item.invoiceFor.mobileNumber"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'invoiceFor.mobileNumber'
									] || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="streetAddress"
								label="Street Address"
								v-model="item.invoiceFor.streetAddress"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.streetAddress ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="city"
								label="City"
								v-model="item.invoiceFor.city"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.city || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="state"
								label="State"
								v-model="item.invoiceFor.state"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.state || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="zipCode"
								label="Zip Code"
								v-model="item.invoiceFor.zipCode"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors?.zipCode || null
								"
								placeholder="Ex. ABC"
								:required="false"
								:disabled="true"
							/>
						</div>
					</div>

					<div class="mt-6">
						<BaseButton
							_type="submit"
							text="Save Changes"
							color="primary"
							v-if="!invoiceStore.isLoading"
						/>
						<BaseButton
							v-if="invoiceStore.isLoading"
							_type="submit"
							text="Saving..."
							color="primary"
							:disabled="true"
						/>
					</div>
				</form>
				<Spinner v-else />
			</div>
		</div>
		<div class="w-full flex-1">
			<div class="card">
				<form @submit.prevent="addItem" v-if="!isLoading">
					<div class="grid grid-cols-6 gap-4">
						<div class="col-span-full md:col-span-4">
							<BaseSelect
								id="invoiceFor"
								label="Select Item"
								v-model="selectedItem"
								:error="error"
								:errorField="error?.errors?.items || null"
								:options="productStore.list"
								optionLabel="name"
								optionValue="_id"
								:required="true"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="qty"
								label="Quantity"
								v-model="selectedQty"
								:error="error"
								:errorField="error?.errors?.qty || null"
								placeholder="Ex. 2"
								:required="true"
								type="number"
							/>
						</div>
						<div class="col-span-full">
							<BaseButton
								_type="submit"
								text="Add Item"
								color="primary"
								_class="w-full"
							/>
						</div>
					</div>
				</form>
				<Spinner v-else />
			</div>
			<div class="flex flex-col space-y-4">
				<div v-if="addedItems.length" class="">
					<h3>
						Total:
						<span class="font-semibold text-green-400">
							₱{{ numberFormat(addedItemsTotal) }}
						</span>
					</h3>
				</div>
				<div
					class="relative flex items-start space-x-3 overflow-x-auto rounded-sm bg-white px-4 py-2 shadow-sm"
					v-for="i in addedItems"
					:key="i.id"
				>
					<div class="flex-1">
						<label class="text-sm text-gray-500">Item</label>
						<h5>{{ i.name }}</h5>
					</div>
					<div class="flex">
						<div class="w-10 flex-none">
							<label class="text-sm text-gray-500">Qty</label>
							<h5>{{ i.qty }}</h5>
						</div>

						<div class="w-20">
							<label class="text-sm text-gray-500">Price</label>
							<h5>₱{{ numberFormat(i.unitPrice) }}</h5>
						</div>

						<div class="w-[5.5rem]">
							<label class="text-sm text-gray-500">Total</label>
							<h5>₱{{ numberFormat(i.unitPrice * i.qty) }}</h5>
						</div>
					</div>
					<button class="absolute top-2 right-2">
						<VueFeather
							type="x"
							size="16"
							class="hover:text-red-500"
							@click="deleteAddedItem(i.name)"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputMultiple from '@/components/InputMultiple.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import DisplayFieldArray from '@/components/DisplayFieldArray.vue';
import useInputMultiple from '@/composables/useInputMultiple';
import Spinner from '@/components/Spinner.vue';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useInvoiceStore } from '@/stores/invoice';
import { useCustomerStore } from '@/stores/customer';
import { useDiscountStore } from '@/stores/discount';
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import useUtils from '@/composables/useUtils';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();

const invoiceStore = useInvoiceStore();
const customerStore = useCustomerStore();
const discountStore = useDiscountStore();
const productStore = useProductStore();

const isLoading = ref(false);

const invoiceFor = ref({});
const selectedItem = ref('');
const selectedQty = ref('');
const discount = ref('');
const addedItems = ref([]);
const addedItemsTotal = ref(0);
const errorItems = ref('');
const item = ref(null);
const disableStatus = ref(false);

const error = null;

onBeforeMount(async () => {
	isLoading.value = true;
	await invoiceStore.find(route.params.id);
	item.value = invoiceStore.item;
	await customerStore.fetch(`?page=1&limit=1000`);
	await productStore.fetch(`?page=1&limit=1000`);
	await discountStore.fetch(`?page=1&limit=1000`);
	if (invoiceStore.item.items.length) {
		addedItems.value = invoiceStore.item.items;
	}

	if (invoiceStore.item.status === 'paid') {
		disableStatus.value = false;
	}

	invoiceStore.item.dueDate = invoiceStore.item.dueDate.substring(0, 10);
	invoiceStore.item.datePaid = invoiceStore.item.datePaid
		? item.value.datePaid.substring(0, 10)
		: undefined;
	// console.log(item.value.dueDate);
	// await loadDiscounts('discounts');
	getTotal();

	isLoading.value = false;
});

watch(invoiceFor, (newInvoiceFor) => {
	if (newInvoiceFor) {
		const _selectedInvoiceFor = customerStore.list.find(
			(item) => item._id === newInvoiceFor,
		);
		item.value.invoiceFor = _selectedInvoiceFor;
		item.value.invoiceFor.name = `${_selectedInvoiceFor.firstName} ${_selectedInvoiceFor.lastName}`;
	} else {
		item.value.invoiceFor = {};
	}

	console.log(item.value.invoiceFor);
});

watch(discount, (newDiscount) => {
	if (newDiscount) {
		const _selectedDiscount = discountStore.list.find(
			(item) => item._id === newDiscount,
		);
		item.value.discount = _selectedDiscount;
	} else {
		item.value.discount = {};
	}
});

const addItem = () => {
	if (!selectedQty.value || selectedQty.value <= 0) {
		pushAlert('error', 'Please select item and quantity!');

		return;
	}
	const _item = productStore.list.find(
		(item) => item._id === selectedItem.value,
	);

	const isItemExist = addedItems.value.find((el) => _item.name === el.name);
	console.log(_item);
	if (!isItemExist) {
		addedItems.value.push({
			id: _item._id,
			name: _item.name,
			unitPrice: _item.unitCost,
			qty: selectedQty.value,
		});
	} else {
		pushAlert('warning', 'Item is already added!');
		return false;
	}

	selectedItem.value = '';
	selectedQty.value = '';
	getTotal();
};

const getTotal = () => {
	let _total = 0;
	addedItems.value.forEach((el) => {
		_total += el.unitPrice * el.qty;
	});

	addedItemsTotal.value = _total;
};

const deleteAddedItem = (name) => {
	addedItems.value = addedItems.value.filter((el) => el.name !== name);

	getTotal();
};

const handleSubmit = async () => {
	invoiceStore.error = null;

	if (!addedItems.value.length) {
		pushAlert('error', 'Please add items!');
		return;
	}

	item.value.items = addedItems.value;

	if (item.value.status === 'paid') {
		if (item.value.datePaid) {
			item.value.datePaid.substring(0, 10);
		} else {
			console.log(item.value.status, item.value.datePaid);
			invoiceStore.error = {
				errors: {
					datePaid: 'Please add date paid.',
				},
				message: 'Invalid Inputs!',
			};

			pushAlert('error', 'Date paid is required when status is paid!');
			return false;
		}
	}

	await invoiceStore.update(item.value);

	if (invoiceStore.error) {
		pushAlert('error', invoiceStore.error.message);
		return;
	}

	pushAlert('info', 'Invoice Updated!');
	router.push({
		name: 'sales.invoices',
	});
};
</script>

<style></style>
