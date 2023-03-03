<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Customer"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="New Customer" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useCustomerStore } from '@/stores/customer';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';
import Form from './Form.vue';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useCustomerStore();
const indexRoute = 'sales.customers';

onBeforeMount(() => {
	/* this line of code is important 
	   because by default in store item, the store.item is null the update
	   part of this module will have an error, but if it is empty object
	   in condition of if(store.item) empty object will be true
	*/
	store.item = {};
});

const handleSubmit = async () => {
	store.error = null;

	await store.create(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Customer added!');
	router.push({
		name: 'sales.customers',
	});
};
</script>

<style></style>
