<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			discard_route_name="warehouse.products"
			:isLoading="store.isLoading"
		/>
		<TitleBar back_route_name="warehouse.products" title="Update Product" />
		<Form :store="store" @handleSubmit="handleSubmit" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue';
import { useProductStore } from '@/stores/product';
import { useRoute, useRouter } from 'vue-router';
import useAlert from '../../composables/useAlert';
import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert, pushToast } = useAlert();
const store = useProductStore();

onBeforeMount(async () => {
	await store.find(route.params.id);

	if (!store.item) {
		router.push({ name: 'not-found' });
	}
});

/* Subscribe: This code will run if there is a changes on the state */
// store.$subscribe((mutation, state) => {
// 	console.log('subscrube', initProduct, state.item);
// 	console.log(_.isEqual(initProduct, state.item));
// });

const handleSubmit = async () => {
	store.error = null;

	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushToast({
		status: 'success',
		message: 'Updated succesfully!',
		title: 'Product Updated',
	});

	router.push({
		name: 'warehouse.products',
	});
};
</script>

<style></style>
