<template>
	<MainTransition>
		<Loading
			v-if="ecommSettingsStore.isLoading || productStore.isLoading"
		/>
	</MainTransition>

	<div
		class="absolute top-0 left-0 h-96 w-full bg-gradient-to-b from-indigo-400 to-white"
	></div>
	<HeadingSection :heros="heroStore.list" />

	<CollectionSection :categories="categoryStore.list" />

	<ClassificationSection />

	<FeaturedSection @openModal="openModal" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';

/* Stores */
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';
import { useHeroStore } from '@/stores/hero';

/* Sections */
import HeadingSection from './HeadingSection.vue';
import CollectionSection from './CollectionSection.vue';
import ClassificationSection from './ClassificationSection.vue';
import FeaturedSection from './FeaturedSection.vue';

/* Components */
import ProductHero from '@/components/ecommerce/ProductHero.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';

/* JSON */
import ecomDevData from '../data/dev_ecommerce.json';
import ecomProdData from '../data/ecommerce.json';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const heroStore = useHeroStore();

const isOpen = ref(false);
const productModal = ref(null);

const props = defineProps({
	ecommSettingsStore: Object,
});

const _ourProducts = ref([]);

// &isPublished=1

onBeforeMount(async () => {
	// for our products
	await categoryStore.fetch('');
	await heroStore.fetch('?isPublished=1');

	let ourProductsID = [];

	if (import.meta.env.VITE_ENV === 'production') {
		ourProductsID = ecomProdData.ourProducts.map((op) => op._id);
	} else {
		ourProductsID = ecomDevData.ourProducts.map((op) => op._id);
	}

	_ourProducts.value = categoryStore.list.filter((ct) => {
		if (import.meta.env.VITE_ENV === 'production') {
			return ourProductsID.includes(ct._id);
		} else {
			return ourProductsID.includes(ct._id);
		}
	});
});

function openModal(product) {
	isOpen.value = true;
	productModal.value = product;
}

function closeModal() {
	isOpen.value = false;
	productModal.value = null;
}
</script>

<style></style>
