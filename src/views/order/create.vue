<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Order"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="New Order" />

		<Form :store="store" @handleSubmit="handleSubmit" />
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useCollectionStore } from '@/stores/collection';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';
import Form from './Form.vue';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useCollectionStore();
const indexRoute = 'warehouse.products';

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

	const res = await store.create(data);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Collection added!');

	router.push({
		name: 'warehouse.collections.edit',
		params: { id: res.data._id },
	});
};
</script>

<style></style>
