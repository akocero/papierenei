<template>
	<div class="wrapper my-10">
		<div v-if="collectionStore.list.length > 0">
			<h1 class="mb-5 text-5xl font-bold">Collections</h1>
			<ul class="grid grid-cols-8 gap-4 sm:grid-cols-12">
				<li class="col-span-4" v-for="cl in collectionStore.list">
					<router-link
						:to="{
							name: 'shop',
							query: { collection: cl._id },
						}"
						class="flex h-40 items-center justify-center rounded-lg border bg-gray-200 text-xl font-bold sm:text-3xl"
					>
						<span>{{ cl.name }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useCollectionStore } from '@/stores/collection';

const collectionStore = useCollectionStore();

onBeforeMount(async () => {
	await collectionStore.fetch('');
});
</script>
