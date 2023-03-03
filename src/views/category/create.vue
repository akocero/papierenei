<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Category"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="New Category" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { useRouter } from 'vue-router';
import useAlert from '../../composables/useAlert';
import Form from './Form.vue';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useCategoryStore();
const indexRoute = 'warehouse.categories';

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

	console.log(res);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Category added!');
	router.push({
		name: 'warehouse.categories.edit',
		params: { id: res.data._id },
	});

	// router.push({ name: 'user', params: { username } })
};
</script>

<style></style>
