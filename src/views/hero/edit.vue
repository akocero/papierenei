<template>
	<div class="main-container">
		<ActionNavbar
			title="Unsave Changes"
			@handleSubmit="handleSubmit"
			:discard_route_name="indexRoute"
			:isLoading="store.isLoading"
		/>
		<TitleBar :back_route_name="indexRoute" title="Update Hero" />
		<Form :store="store" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useHeroStore } from '@/stores/hero';
import { useRoute, useRouter } from 'vue-router';
import useAlert from '@/composables/useAlert';
import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useHeroStore();
const indexRoute = 'ecomm.heros';

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

	pushAlert('info', `Hero <${res.name}> is updated!`);
	router.push({
		name: 'ecomm.heros',
	});
};
</script>

<style></style>
