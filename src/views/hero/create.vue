<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Hero"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="New Hero" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useHeroStore } from '@/stores/hero';
import { useRouter } from 'vue-router';
import useAlert from '../../composables/useAlert';
import Form from './Form.vue';

const indexRoute = 'ecomm.heros';
const router = useRouter();
const { pushAlert } = useAlert();
const store = useHeroStore();

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
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Hero added!');
	router.push({
		name: 'ecomm.heros.edit',
		params: { id: res.data._id },
	});

	// router.push({ name: 'user', params: { username } })
};
</script>

<style></style>
