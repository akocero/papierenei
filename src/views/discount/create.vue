<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Discount"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="New Discount" />
		<Form :store="store" @handleSubmit="handleSubmit" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDiscountStore } from '@/stores/discount';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';
import Form from './Form.vue';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useDiscountStore();
const indexRoute = 'sales.discounts';

onMounted(() => {
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

	pushAlert('success', 'Discount added!');
	router.push({
		name: 'sales.discounts',
	});
};
</script>

<style></style>
