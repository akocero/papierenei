<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Product"
			@handleSubmit="handleSubmit"
			discard_route_name="warehouse.products"
			:isLoading="store.isLoading"
		/>
		<TitleBar back_route_name="warehouse.products" title="New Product" />
		<ErrorBar
			:error="store.error"
			v-if="store.error && store.error.errors"
		/>

		<Form :store="store" @handleSubmit="handleSubmit" />
	</div>
</template>

<script setup>
import Form from './Form.vue';
import { onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/product';
import { useAppStore } from '@/stores/app';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useProductStore();
const appStore = useAppStore();

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

	const res = await store.create(store.item);

	if (store.error) {
		// pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Product added!');
	router.push({
		name: 'warehouse.products.edit',
		params: { id: res.data._id },
	});
};
</script>

<style></style>
