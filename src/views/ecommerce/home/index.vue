<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<ProductHero :product="productModal" v-if="productModal" />
	</QuickView>
	<Spinner v-if="ecommSettingsStore.isLoading || productStore.isLoading" />
	<header
		class="relative mx-auto flex h-72 w-full max-w-screen-2xl items-center justify-center overflow-hidden bg-cover bg-center md:mt-8 md:h-screen"
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
	</header>

	<!-- Our Product Section  -->
	<section
		class="bg-lightBlue flex items-center py-4 px-4 text-center md:px-6 md:py-16"
	>
		<div class="mx-auto w-full max-w-screen-2xl">
			<div
				class="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-10 md:px-0"
			>
				<OurProduct
					v-for="ourProduct in _ourProducts"
					:key="ourProduct.text"
					:ourProduct="ourProduct"
				/>
			</div>
		</div>
	</section>

	<section
		class="bg-lightBlue flex items-center px-4 text-center md:px-6 md:py-16"
	>
		<div class="mx-auto w-full max-w-screen-2xl">
			<h2
				class="mb-4 rounded-lg py-3 text-2xl font-bold uppercase text-darkBlue md:mb-16 md:text-5xl"
			>
				New Arrivals
			</h2>
			<div
				class="grid w-full grid-cols-2 gap-2 md:grid-cols-5 md:gap-16 md:px-4 md:px-0"
				v-if="!productStore.isLoading"
			>
				<div v-for="(product, key) in productStore.list">
					<Product
						:key="product"
						@openModal="openModal"
						@addToCart="addToCart($event)"
						:product="product"
						:index="key"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import Product from '@/components/ecommerce/Product.vue';

import { onBeforeMount, ref } from 'vue';
/* Stores */
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
/* Components */
import Spinner from '@/components/Spinner.vue';
import OurProduct from '@/components/ecommerce/OurProduct.vue';
import ProductHero from '@/components/ecommerce/ProductHero.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
/* Images */
import logoImg from '@/assets/logos.png';
import digitalArtImg from '@/assets/digital-arts.png';
import bearlyArtImg from '@/assets/bearly-art.png';

/* JSON */
import ecomDevData from '../data/dev_ecommerce.json';
import ecomProdData from '../data/ecommerce.json';

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const { addToCart } = useCartStore();

const isOpen = ref(false);
const productModal = ref(null);

const props = defineProps({
	ecommSettingsStore: Object,
});

// our product data
const ourProducts = ref([
	{ img: digitalArtImg, text: 'Digital Arts' },
	{ img: logoImg, text: 'Stickers' },
	{ img: bearlyArtImg, text: 'Stationery' },
	{ img: logoImg, text: 'Createables' },
]);

const _ourProducts = ref([]);

onBeforeMount(async () => {
	// Fetch products for new Arrivals section
	await productStore.fetch('?isPublished=1&limit=10');
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
