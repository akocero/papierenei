<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			discard_route_name="sales.orders"
			:isLoading="store.isLoading"
		/>
		<TitleBar back_route_name="sales.orders" title="Update Order Info.">
			<template #actions>
				<BaseButton
					v-if="store.item && !store.isLoading"
					_type="button"
					text="Send receipt"
					@click="sendEmail(store.item._id)"
				/>
				<BaseButton
					v-if="store.isLoading"
					_type="button"
					text="Sending Email..."
					:disabled="true"
				/>
			</template>
		</TitleBar>
	</div>
	<Form :store="store" />
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useOrderStore } from '@/stores/order';
import Form from './Form.vue';

import useAlert from '@/composables/useAlert';
import moment from 'moment';

const router = useRouter();
const route = useRoute();
const { pushAlert, pushToast } = useAlert();
const store = useOrderStore();
const productStore = useProductStore();

const addedItems = ref([]);
const addedPayments = ref([]);

const tempItem = ref({});

onBeforeMount(async () => {
	await productStore.fetch(`?page=1&limit=1000`);
	await store.find(route.params.id);

	tempItem.value = store.item;

	if (store.item.items.length) {
		addedItems.value = store.item.items;
	}

	if (store.item.payments.length) {
		addedPayments.value = store.item.payments;
	}

	store.item.orderfulfilledDate = store.item.orderfulfilledDate.substring(
		0,
		10,
	);
	store.item.orderPaidDate = store.item.orderPaidDate.substring(0, 10);
	// invoiceStore.item.datePaid = invoiceStore.item.datePaid
	// 	? item.value.datePaid.substring(0, 10)
	// 	: undefined;
});

const sendEmail = async (id) => {
	await store.sendEmailOrderDetails(id);

	if (store.error) {
		pushAlert('info', `Email sending failed, Please try again later!`);
		return;
	}

	pushAlert('info', `Email receipt sent!`);
	return;
};

/* Subscribe: This code will run if there is a changes on the state
store.$subscribe((mutation, state) => {
	if (state.item?.paymentStatus) {
		if (state.item.paymentStatus === 'paid') {
			state.item.orderPaidDate = moment(new Date()).format('YYYY-MM-DD');
		} else {
			state.item.orderPaidDate = moment(new Date('1999-01-01')).format(
				'YYYY-MM-DD',
			);
		}
	}
}); */

const handleSubmit = async () => {
	store.error = null;

	removeTempPaymentsID();
	// store.item.payments = addedPayments.value;
	store.item.total =
		parseFloat(_addedItemsTotal.value) +
		parseFloat(store.item.shippingDetails.fee);
	store.item.subtotal = _addedItemsTotal.value;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('info', `Order is updated!`);
	router.push({
		name: 'sales.orders',
	});
};

const _addedItemsTotal = computed(() => {
	let _total = 0;
	store.item.items.forEach((el) => {
		_total += el.price * el.qty;
	});

	return _total;
});

const removeTempPaymentsID = () => {
	addedPayments.value = addedPayments.value.map((pm) => {
		if (pm._id && pm._id.includes('custom-payment')) {
			delete pm._id;
		}
		return pm;
	});
};
</script>
