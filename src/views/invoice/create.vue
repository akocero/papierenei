<template>
	<div class="flex w-full flex-col items-start gap-x-5 sm:flex-row">
		<div class="w-full sm:w-7/12">
			<div class="card">
				<div class="mb-4 flex items-baseline justify-between">
					<h4 class="text-xl">New Invoice</h4>
					<BaseButton
						_type="link"
						text="Back"
						:routeObject="{ name: 'sales.invoices' }"
					/>
				</div>
				<form @submit.prevent="handleSubmit" v-if="!isLoading">
					<div class="grid grid-cols-6 gap-4">
						<div class="col-span-full grid grid-cols-6 gap-4">
							<div class="col-span-full font-semibold">
								Billing info.
							</div>
							<div class="col-span-full md:col-span-2">
								<BaseInput
									id="name"
									label="Invoice #"
									v-model="invoiceNo"
									:error="invoiceStore.error"
									:errorField="
										invoiceStore.error?.errors.invoiceNo ||
										null
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
									v-model="payableTo"
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
									v-model="shippingFee"
									:error="invoiceStore.error"
									:errorField="
										invoiceStore.error?.errors
											?.shippingFee || null
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
									v-model="dueDate"
									:error="invoiceStore.error"
									:errorField="
										invoiceStore.error?.errors?.dueDate ||
										null
									"
									placeholder="Ex. ABC"
									:required="false"
								/>
							</div>
							<div class="col-span-full md:col-span-4">
								<BaseInput
									id="notes"
									label="Notes"
									v-model="notes"
									:error="invoiceStore.error"
									:errorField="
										invoiceStore.error?.errors?.notes ||
										null
									"
									placeholder="Ex. "
									:required="false"
								/>
							</div>
						</div>

						<div class="col-span-full font-semibold">
							Bill discount
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseSelect
								id="discount"
								label="Discount"
								v-model="discount"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'discount.code'
									] || null
								"
								optionValue="_id"
								optionLabel="code"
								:options="discountStore.list"
								:required="false"
							/>
						</div>
						<div class="col-span-full md:col-span-2">
							<BaseInput
								id="input_discountValue"
								label="Discount Value"
								v-model="discountValue"
								:error="invoiceStore.error"
								:errorField="
									invoiceStore.error?.errors[
										'discount.code'
									] || null
								"
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
								v-model="selectedInvoiceFor.name"
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
								v-model="selectedInvoiceFor.email"
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
								v-model="selectedInvoiceFor.mobileNumber"
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
								v-model="selectedInvoiceFor.streetAddress"
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
								v-model="selectedInvoiceFor.city"
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
								v-model="selectedInvoiceFor.state"
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
								v-model="selectedInvoiceFor.zipCode"
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
							text="Save"
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
						<div class="justify col-span-full flex items-center justify-between">
							<h4 class="text-xl">Items</h4>
							<BaseButton
								:text="
									isCustomItem ? 'Select Item' : 'Custom Item'
								"
								color="default"
								@click="isCustomItem = !isCustomItem"
							/>
						</div>
						<div
							class="col-span-full md:col-span-3"
							v-if="isCustomItem"
						>
							<BaseInput
								id="custom_item_name"
								label="Item Name"
								v-model="customItemName"
								:error="error"
								:errorField="
									error?.errors?.customItemName || null
								"
								placeholder="Ex. Item 1"
								:required="true"
								type="text"
							/>
						</div>
						<div
							class="col-span-full md:col-span-2"
							v-if="isCustomItem"
						>
							<BaseInput
								id="custom_item_cost"
								label="Item Cost"
								v-model="customItemCost"
								:error="error"
								:errorField="
									error?.errors?.customItemCost || null
								"
								placeholder="Ex. 2"
								:required="true"
								type="number"
								:step=".01"
							/>
						</div>
						<div
							class="col-span-full md:col-span-1"
							v-if="isCustomItem"
						>
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
						<div
							class="col-span-full md:col-span-4"
							v-if="!isCustomItem"
						>
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

						<div
							class="col-span-full md:col-span-2"
							v-if="!isCustomItem"
						>
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
							@click="deleteAddedItem(i.id)"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputMultiple from '@/components/InputMultiple.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import DisplayFieldArray from '@/components/DisplayFieldArray.vue';
import useInputMultiple from '@/composables/useInputMultiple';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useInvoiceStore } from '@/stores/invoice';
import { useCustomerStore } from '@/stores/customer';
import { useDiscountStore } from '@/stores/discount';
import { useProductStore } from '@/stores/product';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
const route = useRoute();
const router = useRouter();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();

const invoiceStore = useInvoiceStore();
const customerStore = useCustomerStore();
const discountStore = useDiscountStore();
const productStore = useProductStore();

const isLoading = ref(false);
const isCustomItem = ref(false);

const customItemName = ref('');
const customItemCost = ref(0);

const invoiceFor = ref({});
const selectedInvoiceFor = ref({});
const selectedItem = ref('');
const selectedQty = ref('');
const payableTo = ref('');
const discount = ref('');
const selectedDiscount = ref('');
const discountValue = ref('');
const shippingFee = ref('');
const notes = ref('');
const addedItems = ref([]);
const addedItemsTotal = ref(0);
const errorItems = ref('');
const invoiceNo = ref('');
const dueDate = ref('');

const error = null;

onBeforeMount(async () => {
	isLoading.value = true;

	await customerStore.fetch(`?page=1&limit=1000`);
	await productStore.fetch(`?page=1&limit=1000`);
	await discountStore.fetch(`?page=1&limit=1000`);

	isLoading.value = false;
});
onMounted(async () => {
	console.log(route.query);
	let invoiceCount = 0;
	if (route.query.count) {
		invoiceCount = parseInt(route.query.count) + 1;
	} else {
		await invoiceStore.fetch(`?page=1&limit=1000`);
		invoiceCount = parseInt(invoiceStore.list.length) + 1;
	}
	invoiceCount = invoiceCount.toString().padStart(4, '0');
	invoiceNo.value = `INVPR${invoiceCount}`;
});

watch(invoiceFor, (newInvoiceFor) => {
	if (newInvoiceFor) {
		const _selectedInvoiceFor = customerStore.list.find(
			(item) => item._id === newInvoiceFor,
		);
		selectedInvoiceFor.value = _selectedInvoiceFor;
		selectedInvoiceFor.value.name = `${_selectedInvoiceFor.firstName} ${_selectedInvoiceFor.lastName}`;
	} else {
		console.log('va');
		selectedInvoiceFor.value = {};
	}
});

watch(discount, (newDiscount) => {
	if (newDiscount) {
		const _selectedDiscount = discountStore.list.find(
			(item) => item._id === newDiscount,
		);
		selectedDiscount.value = _selectedDiscount;

		console.log(_selectedDiscount);
		if (_selectedDiscount.discountKind === 'percent') {
			discountValue.value = _selectedDiscount.discountValue + '%';
		} else {
			discountValue.value =
				'₱' + numberFormat(_selectedDiscount.discountValue);
		}
		// discountValue.value = _selectedDiscount.discountValue
	} else {
		selectedDiscount.value = {};
	}
});

const addItem = () => {
	if (!selectedQty.value || selectedQty.value <= 0) {
		pushAlert('error', 'Please select item and quantity!');

		return false;
	}
	let _item;
	if (isCustomItem.value) {
		_item = {
			_id: uuidv4(),
			name: customItemName.value,
			unitCost: customItemCost.value,
		};
	} else {
		_item = productStore.list.find(
			(item) => item._id === selectedItem.value,
		);
	}

	const isItemExist = addedItems.value.find((el) => _item._id === el.id);
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
	customItemCost.value = 0;
	customItemName.value = '';
	getTotal();
};

const getTotal = () => {
	let _total = 0;
	addedItems.value.forEach((el) => {
		_total += el.unitPrice * el.qty;
	});

	addedItemsTotal.value = _total;
};

const deleteAddedItem = (id) => {
	addedItems.value = addedItems.value.filter((el) => el.id !== id);
	getTotal();
};

const handleSubmit = async () => {
	invoiceStore.error = null;

	if (!addedItems.value.length) {
		pushAlert('error', 'Please add items!');
		return;
	}

	const data = {
		invoiceNo: invoiceNo.value,
		invoiceFor: selectedInvoiceFor.value,
		payableTo: payableTo.value,
		items: addedItems.value,
		discount: selectedDiscount.value,
		shippingFee: shippingFee.value,
		notes: notes.value,
		dueDate: dueDate.value,
	};

	await invoiceStore.create(data);

	if (invoiceStore.error) {
		pushAlert('error', invoiceStore.error.message);
		return;
	}

	pushAlert('success', 'Invoice created!');
	router.push({
		name: 'sales.invoices',
	});
};
</script>

<style></style>
