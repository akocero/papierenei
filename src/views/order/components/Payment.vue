<template>
	<div class="card grid grid-cols-12 gap-4">
		<div class="col-span-full -mt-3 font-semibold">Payments</div>
		<div class="col-span-full md:col-span-4">
			<BaseInput
				id="input_payment_tnumber"
				label="Transaction Number"
				v-model="payment.transactionNumber"
				:error="store.error"
				:errorField="
					store.error?.errors?.payments?.transactionNumber || null
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
				:errorField="store.error?.errors?.payments?.amount || null"
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
				:errorField="store.error?.errors?.payments?.paymentType || null"
				placeholder="Ex. (Credit Card, GCash, PayMaya, etc...)"
				:required="true"
			/>
		</div>
		<div class="col-span-full md:col-span-2">
			<BaseSelect
				id="input_payment_status"
				label="Status"
				v-model="payment.status"
				:error="store.error"
				:errorField="store.error?.errors?.payments?.status || null"
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
				<vueFeather type="corner-right-down" size="16" />
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
					<span class="w-[34%]">{{ pm.transactionNumber }}</span>
					<span class="w-[25.5%]">{{ pm.amount }} PHP</span>
					<span class="w-[25.5%]">{{ pm.paymentType }} </span>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import useAlert from '@/composables/useAlert';

const props = defineProps({
	store: Object,
});

const { pushAlert } = useAlert();
const addedPayments = ref([]);

onMounted(() => {
	if (props.store.item.payments.length) {
		addedPayments.value = props.store.item.payments;
	}
});

const payment = ref({
	status: '',
	transactionNumber: '',
	amount: 0,
	paymentType: '',
});

const addPayment = () => {
	if (
		!payment.value.transactionNumber ||
		!payment.value.status ||
		!payment.value.amount ||
		!payment.value.paymentType
	) {
		pushAlert('error', 'Please fill out required fields!');
		return;
	}
	payment.value._id = 'custom-payment-' + uuidv4();
	addedPayments.value.push(payment.value);

	payment.value = {};
};

const deletePayment = (id) => {
	addedPayments.value = addedPayments.value.filter((el) => el._id !== id);
};
</script>
