<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			discard_route_name="sales.orders"
			:isLoading="store.isLoading"
		/>
		<TitleBar back_route_name="sales.orders" title="Update Order Info." />
	</div>
	<Form :store="store" @handleSubmit="handleSubmit" />
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useOrderStore } from '@/stores/order';
import Form from './Form.vue';

import useAlert from '@/composables/useAlert';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useOrderStore();
const productStore = useProductStore();

const addedItems = ref([]);
const addedPayments = ref([]);

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

	removeTempPaymentsID();
	// store.item.payments = addedPayments.value;
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
