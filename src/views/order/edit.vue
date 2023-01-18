<template>
	<div class="flex w-full flex-col items-start gap-x-5 sm:flex-row">
		<div class="card w-full sm:w-7/12">
			<div class="mb-4 flex items-baseline justify-between">
				<h4 class="text-xl">Update Order Info.</h4>
				<div class="space-x-2">
					<button
						class="rounded-lg bg-green-500 px-4 py-2 text-white"
						v-if="store.item && store.item.status === 'fulfilled'"
						@click="store.item.status = 'pending'"
					>
						Fulfilled
					</button>

					<button
						class="rounded-lg bg-gray-500 px-4 py-2 text-white"
						v-if="store.item && store.item.status === 'pending'"
						@click="store.item.status = 'fulfilled'"
					>
						Unsettled
					</button>
					<button
						class="rounded-lg bg-green-500 px-4 py-2 text-white"
						v-if="store.item && store.item.paymentStatus === 'paid'"
						@click="store.item.paymentStatus = 'pending'"
					>
						Paid
					</button>

					<button
						class="rounded-lg bg-gray-500 px-4 py-2 text-white"
						v-if="
							store.item && store.item.paymentStatus === 'pending'
						"
						@click="store.item.paymentStatus = 'paid'"
					>
						Pending payment
					</button>
					<BaseButton
						_type="link"
						text="Back"
						:routeObject="{ name: 'sales.orders' }"
					/>
				</div>
			</div>
			<form
				@submit.prevent="handleSubmit"
				v-if="store.item && !store.isLoading"
			>
				<div class="grid grid-cols-12 gap-4">
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Customer First Name"
							v-model="store.item.firstName"
							:error="store.error"
							:errorField="store.error?.errors?.firstName || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Customer Last Name"
							v-model="store.item.lastName"
							:error="store.error"
							:errorField="store.error?.errors?.lastName || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Customer Email"
							v-model="store.item.email"
							:error="store.error"
							:errorField="store.error?.errors?.email || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Customer Contact Number"
							v-model="store.item.contactNumber"
							:error="store.error"
							:errorField="
								store.error?.errors?.contactNumber || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-4">
						<BaseInput
							id="input_name"
							label="Street Address"
							v-model="store.item.streetAddress"
							:error="store.error"
							:errorField="
								store.error?.errors?.streetAddress || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseInput
							id="input_name"
							label="Country"
							v-model="store.item.country"
							:error="store.error"
							:errorField="store.error?.errors?.country || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseInput
							id="input_name"
							label="State"
							v-model="store.item.state"
							:error="store.error"
							:errorField="store.error?.errors?.state || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseInput
							id="input_name"
							label="City"
							v-model="store.item.city"
							:error="store.error"
							:errorField="store.error?.errors?.city || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseInput
							id="input_name"
							label="Zip Code"
							v-model="store.item.zipCode"
							:error="store.error"
							:errorField="store.error?.errors?.zipCode || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>

					<div class="col-span-full md:col-span-6">
						<BaseTextArea
							id="input_description"
							label="Order Notes"
							v-model="store.item.notes"
							:error="store.error"
							:errorField="store.error?.errors?.notes || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full">
						<h2 class="text-xl">Payments</h2>
					</div>
					<div class="col-span-full md:col-span-4">
						<BaseInput
							id="input_payment_tnumber"
							label="Transaction Number"
							v-model="payment.transactionNumber"
							:error="store.error"
							:errorField="
								store.error?.errors?.payments
									.transactionNumber || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseInput
							id="input_payment_amount"
							label="Amount"
							v-model="payment.amount"
							:error="store.error"
							:errorField="
								store.error?.errors?.payments.amount || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-3">
						<BaseInput
							id="input_payment_type"
							label="Payment Type"
							v-model="payment.paymentType"
							:error="store.error"
							:errorField="
								store.error?.errors?.payments.paymentType ||
								null
							"
							placeholder="Ex. (Credit Card, GCash, PayMaya, etc...)"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
						<BaseSelect
							id="input_payment_status"
							label="Payment Status"
							v-model="payment.status"
							:error="store.error"
							:errorField="
								store.error?.errors?.payments.status || null
							"
							:options="[
								{
									value: 'verified',
									label: 'Verified',
								},
							]"
							:required="true"
						/>
					</div>
					<div class="col-span-1 flex items-end">
						<button
							type="button"
							class="flex h-10 w-full items-center justify-center rounded-lg bg-primary-600 text-white"
							@click="addPayment"
						>
							<vueFeather type="arrow-right" size="16" />
						</button>
					</div>
					<div class="col-span-full">
						<ul class="">
							<li class="flex border-b py-4 font-bold">
								<span class="w-[34%]">Transaction #</span>
								<span class="w-[25.5%]">Amount</span>
								<span class="w-[25.5%]">Payment Type</span>
								<span>Status</span>
							</li>
							<li
								class="flex border-b py-2"
								v-for="pm in addedPayments"
								:key="pm._id"
							>
								<span class="w-[34%]">{{
									pm.transactionNumber
								}}</span>
								<span class="w-[25.5%]"
									>{{ pm.amount }} PHP</span
								>
								<span class="w-[25.5%]"
									>{{ pm.paymentType }}
								</span>
								<span
									class="flex w-[15%] items-center justify-between pr-2"
								>
									<span>{{ pm.status }}</span>
									<vue-feather
										type="x"
										size="16"
										class="cursor-pointer"
										@click="deletePayment(pm._id)"
									/>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="mt-6">
					<BaseButton
						v-if="!store.isLoading"
						_type="submit"
						text="Save Changes"
						color="primary"
					/>
					<BaseButton
						v-if="store.isLoading"
						_type="submit"
						text="Updating..."
						color="primary"
						:disabled="true"
					/>
				</div>
			</form>
			<Spinner v-else />
		</div>
		<div class="w-full flex-1">
			<div class="card">
				<form @submit.prevent="addItem" v-if="!isLoading">
					<div class="grid grid-cols-6 gap-4">
						<div
							class="justify col-span-full flex items-center justify-between"
						>
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
								:step="0.01"
							/>
						</div>
						<div
							class="col-span-full md:col-span-1"
							v-if="isCustomItem"
						>
							<BaseInput
								id="qty"
								label="Qty"
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
								label="Qty"
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
							₱{{ numberFormat(_addedItemsTotal) }}
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
							<h5>₱{{ numberFormat(i.price) }}</h5>
						</div>

						<div class="w-[5.5rem]">
							<label class="text-sm text-gray-500">Total</label>
							<h5>₱{{ numberFormat(i.total) }}</h5>
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
import { v4 as uuidv4 } from 'uuid';

import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputMultiple from '@/components/InputMultiple.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import DisplayFieldArray from '@/components/DisplayFieldArray.vue';
import useInputMultiple from '@/composables/useInputMultiple';
import Spinner from '@/components/Spinner.vue';
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useOrderStore } from '@/stores/order';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import useUtils from '@/composables/useUtils';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useOrderStore();
const productStore = useProductStore();
const { numberFormat } = useUtils();

const isLoading = ref(false);
const isCustomItem = ref(false);

const customItemName = ref('');
const customItemCost = ref(0);

const selectedItem = ref('');
const selectedQty = ref('');
const addedItems = ref([]);

const addedPayments = ref([]);
const payment = ref({
	status: '',
	transactionNumber: '',
	amount: 0,
	paymentType: '',
});

const error = null;

onBeforeMount(async () => {
	await productStore.fetch(`?page=1&limit=1000`);
	await store.find(route.params.id);

	if (store.item.items.length) {
		addedItems.value = store.item.items;
	}

	if (store.item.payments.length) {
		addedPayments.value = store.item.payments;
	}

	console.log(store.item);
});

const handleSubmit = async () => {
	store.error = null;
	store.item.items = addedItems.value;
	removeTempPaymentsID();
	store.item.payments = addedPayments.value;
	store.item.total = _addedItemsTotal.value + store.item.shippingDetails.fee;
	store.item.subtotal = _addedItemsTotal.value;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Order is updated!`);
	router.push({
		name: 'sales.orders',
	});
};

const addItem = () => {
	if (!selectedQty.value || selectedQty.value <= 0) {
		pushAlert('error', 'Please select item and quantity!');
		return;
	}

	let _item;
	if (isCustomItem.value) {
		_item = {
			_id: 'custom-item-' + uuidv4(),
			name: customItemName.value,
			unitCost: customItemCost.value,
		};
	} else {
		_item = productStore.list.find(
			(item) => item._id === selectedItem.value,
		);
	}

	const isItemExist = addedItems.value.find((el) => _item._id === el.item_id);

	if (isItemExist) {
		pushAlert('warning', 'Item is already added!');
		return false;
	}
	console.log('_item', _item);
	// check if the items is in sale
	const itemPrice = _item.salePrice ? _item.salePrice : _item.unitCost;
	addedItems.value.push({
		item_id: _item._id,
		name: _item.name,
		price: itemPrice,
		qty: parseFloat(selectedQty.value),
		total: itemPrice * parseFloat(selectedQty.value),
	});

	selectedItem.value = '';
	selectedQty.value = '';
	customItemCost.value = 0;
	customItemName.value = '';
};

const _addedItemsTotal = computed(() => {
	let _total = 0;
	addedItems.value.forEach((el) => {
		_total += el.price * el.qty;
	});

	return _total;
});

const deleteAddedItem = (name) => {
	addedItems.value = addedItems.value.filter((el) => el.name !== name);
};

const addPayment = () => {
	payment.value._id = uuidv4();
	addedPayments.value.push(payment.value);
	console.log(addedPayments.value);

	payment.value = {};
};

const deletePayment = (id) => {
	addedPayments.value = addedPayments.value.filter((el) => el._id !== id);
};

const removeTempPaymentsID = () => {
	addedPayments.value = addedPayments.value.map((pm) => {
		if (pm._id && pm._id.includes('-')) {
			delete pm._id;
		}
		return pm;
	});
};
</script>

<style></style>
