<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="Update Customer" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useCustomerStore } from '@/stores/customer';
import { useRoute, useRouter } from 'vue-router';
import useAlert from '../../composables/useAlert';

import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useCustomerStore();
const indexRoute = 'sales.customers';

onBeforeMount(async () => {
	await store.find(route.params.id);
});

const handleSubmit = async () => {
	store.error = null;

	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Customer <${res.firstName}> is updated!`);
	router.push({
		name: 'sales.customers',
	});
};
</script>

<style></style>
