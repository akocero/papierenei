<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="Update Collection" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useCollectionStore } from '@/stores/collection';
import { useRoute, useRouter } from 'vue-router';
import useAlert from '../../composables/useAlert';
import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useCollectionStore();
const indexRoute = 'warehouse.collections';

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
	pushAlert('info', `Collection <${res.name}> is updated!`);
	router.push({
		name: 'warehouse.collections',
	});
};
</script>

<style></style>
