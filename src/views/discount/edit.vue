<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="Update Discount" />
		<Form :store="store" @handleSubmit="handleSubmit" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useDiscountStore } from '@/stores/discount';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useDiscountStore();
const indexRoute = 'sales.discounts';

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
	pushAlert('info', `Discount <${res.code}> is updated!`);
	router.push({
		name: 'sales.discounts',
	});
};
</script>

<style></style>
