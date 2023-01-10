<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<div class="mt-2 grid grid-cols-2 gap-8 text-darkBlue">
			<div><img src="../../../assets/sample_product.webp" alt="" /></div>
			<div class="flex flex-col">
				<div>
					<h4 class="text-3xl font-bold">
						USB Electric Heated Hand Pillow
					</h4>
					<h5 class="font-mono text-2xl">₱45.00</h5>

					<p>
						Keep your pages marked with this motivational
						papemelroti bookmark. You never have to worry about it
						slipping out, t...
					</p>
				</div>
				<div class="mt-10">
					<ProductQuantity />
					<button
						class="mt-4 w-full rounded-lg bg-darkBlue px-6 py-2 text-xl font-bold text-white"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</QuickView>
	<header
		class="relative mx-auto mt-8 flex h-screen w-full max-w-screen-2xl items-center justify-center overflow-hidden bg-cover bg-center"
		v-if="!ecommSettingsStore.isLoading && activeHero"
		:style="{ 'background-image': 'url(' + activeHero.secure_url + ')' }"
	>
		<div class="">
			<button
				class="mx-auto flex items-center space-x-3 rounded-lg bg-darkYellow py-3 pr-3 pl-5 text-xl font-bold text-white shadow-lg"
			>
				SHOP NOW
				<vue-feather
					type="shopping-bag"
					size="24"
					class="ml-4 mb-1"
				></vue-feather>
			</button>
		</div>
	</header>
	<Spinner v-else />
	<!-- Our Product Section  -->
	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-screen-2xl">
			<div
				class="grid w-full grid-cols-1 gap-10 px-4 uppercase md:grid-cols-4 md:px-0"
			>
				<OurProduct
					v-for="ourProduct in ourProducts"
					:key="ourProduct.text"
					:ourProduct="ourProduct"
				/>
			</div>
		</div>
	</section>

	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-screen-2xl">
			<h2
				class="mb-16 rounded-lg py-3 text-5xl font-bold uppercase text-darkBlue"
			>
				New Arrivals
			</h2>
			<div
				class="grid w-full grid-cols-1 gap-16 px-4 md:grid-cols-5 md:px-0"
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
			<Spinner v-else />
		</div>
	</section>
</template>

<script setup>
import Product from '@/components/ecommerce/Product.vue';
import OurProduct from '@/components/ecommerce/OurProduct.vue';
import { onMounted, onBeforeMount, ref } from 'vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import ProductQuantity from '../../../components/ecommerce/ProductQuantity.vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/product';
import logoImg from '@/assets/logos.png';
import digitalArtImg from '@/assets/digital-arts.png';
import bearlyArtImg from '@/assets/bearly-art.png';
import Spinner from '@/components/Spinner.vue';

const ecommSettingsStore = useEcommSettingStore();
const productStore = useProductStore();
const { addToCart } = useCartStore();
const activeHero = ref(null);
const isOpen = ref(false);

// our product data
const ourProducts = ref([
	{ img: digitalArtImg, text: 'Digital Arts' },
	{ img: logoImg, text: 'Stickers' },
	{ img: bearlyArtImg, text: 'Stationery' },
	{ img: logoImg, text: 'Createables' },
]);

onBeforeMount(async () => {
	// Fetch products for new Arrivals section
	await productStore.fetch('?limit=10');

	// Check if there is any data on ecommer settings
	// if there is no data invoke init to create object on ecommerce settings
	//  please refer to stores/ecomm_setting.js
	await ecommSettingsStore.fetch('?limit=1');
	if (ecommSettingsStore.list.length <= 0) {
		await ecommSettingsStore.init();
		await ecommSettingsStore.fetch('?limit=1');
	}

	ecommSettingsStore.item = ecommSettingsStore.list[0];

	// get the active hero iamge
	activeHero.value = ecommSettingsStore.item.heros.find(
		(hero) => hero.isActive === true,
	);
	// if no active hero image use the first one
	if (!activeHero.value) {
		activeHero.value = ecommSettingsStore.item.heros[0];
	}
});

function openModal() {
	isOpen.value = true;
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
