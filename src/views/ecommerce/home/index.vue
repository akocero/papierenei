<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<ProductHero :product="productModal" v-if="productModal" />
	</QuickView>

	<Loading v-if="ecommSettingsStore.isLoading || productStore.isLoading" />

	<!-- <header
		class="relative mx-auto flex h-72 w-full max-w-base items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center shadow-xl md:mt-8 md:h-screen"
		v-if="ecommSettingsStore.item"
		:style="{
			'background-image':
				'url(' + ecommSettingsStore?.activeHero?.secure_url + ')',
		}"
	>
		<div class="">
			<router-link
				:to="{
					name: 'shop',
				}"
				class="mx-auto flex items-center space-x-3 rounded-lg bg-darkYellow py-3 pr-3 pl-5 text-xl font-bold text-white shadow-lg"
			>
				SHOP NOW
				<vue-feather
					type="shopping-bag"
					size="24"
					class="ml-4 mb-1"
				></vue-feather>
			</router-link>
		</div>
	</header> -->
	<div
		class="absolute top-0 left-0 h-96 w-full bg-gradient-to-b from-indigo-400 to-white"
	></div>
	<HeadingSection />

	<CollectionSection :products="_ourProducts" />

	<ClassificationSection />

	<FeaturedSection @openModal="openModal" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';

/* Stores */
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';

/* Sections */
import HeadingSection from './HeadingSection.vue';
import CollectionSection from './CollectionSection.vue';
import ClassificationSection from './ClassificationSection.vue';
import FeaturedSection from './FeaturedSection.vue';

/* Components */
import Loading from '@/components/Loading.vue';
import ProductHero from '@/components/ecommerce/ProductHero.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';

/* JSON */
import ecomDevData from '../data/dev_ecommerce.json';
import ecomProdData from '../data/ecommerce.json';

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const isOpen = ref(false);
const productModal = ref(null);

const props = defineProps({
	ecommSettingsStore: Object,
});

const _ourProducts = ref([]);

onBeforeMount(async () => {
	// for our products
	await categoryStore.fetch('');

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
