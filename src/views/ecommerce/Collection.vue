<template>
	<div class="wrapper">
		<MainTransition>
			<Loading v-if="collectionStore.isLoading" />
		</MainTransition>
		<div v-if="collectionStore.list.length > 0">
			<SectionTitle title="Collections" size="md" />
			<ul class="grid grid-cols-8 gap-4 sm:grid-cols-12">
				<li
					class="col-span-3 text-center"
					v-for="cl in sortedCollection"
				>
					<router-link
						:to="{
							name: 'shop',
							query: { collection: cl._id },
						}"
						class="group relative flex h-40 items-center justify-center overflow-hidden rounded-2xl md:h-96"
					>
						<img
							v-if="cl.coverPhoto.length"
							:src="cl.coverPhoto[0].secure_url"
							alt=""
							class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
						/>
						<div
							v-else
							class="flex h-full w-full items-center justify-center bg-gray-300"
						>
							<vue-feather
								type="image"
								size="120"
								class="text-white"
							/>
						</div>
					</router-link>
					<router-link
						:to="{
							name: 'shop',
							query: { collection: cl._id },
						}"
						class="mt-4 inline-block font-karla text-xl font-semibold text-red-400 underline underline-offset-2"
					>
						{{ cl.name }}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useCollectionStore } from '@/stores/collection';
import OurProduct from '@/components/ecommerce/OurProduct.vue';
import useUtils from '@/composables/useUtils';

const collectionStore = useCollectionStore();
const { sortString } = useUtils();

onBeforeMount(async () => {
	await collectionStore.fetch('');
});

const sortedCollection = computed(() => {
	if (collectionStore.list.length > 0) {
		return sortString(collectionStore.list, 'name');
		// return collectionStore.list;
	}
});
</script>
