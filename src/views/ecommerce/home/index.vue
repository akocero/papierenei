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
		v-if="store.item && activeHero"
		:style="{ 'background-image': 'url(' + activeHero.secure_url + ')' }"
	>
		<!-- <img src="../../../assets/hero.jpg" alt="" class="object-cover" /> -->
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
	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-screen-2xl">
			<div
				class="grid w-full grid-cols-1 gap-10 px-4 md:grid-cols-4 md:px-0"
			>
				<OurProduct
					v-for="ourProduct in ourProducts"
					:index="ourProduct.text"
					:ourProduct="ourProduct"
				/>
			</div>
		</div>
	</section>

	<section class="bg-lightBlue flex items-center px-6 py-16 text-center">
		<div class="mx-auto w-full max-w-screen-2xl">
			<h2 class="mb-16 rounded-lg py-3 text-5xl font-bold uppercase">
				New Arrivals
			</h2>
			<div
				class="grid w-full grid-cols-1 gap-20 px-4 md:grid-cols-3 md:px-0"
			>
				<div v-for="product in [1, 2, 3, 4, 5, 6]">
					<Product :key="product" @openModal="openModal" />
				</div>
				<!-- <Product /> -->
			</div>
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
import logoImg from '@/assets/logos.png';
import digitalArtImg from '@/assets/digital-arts.png';
import bearlyArtImg from '@/assets/bearly-art.png';

const store = useEcommSettingStore();
const activeHero = ref(null);
const isOpen = ref(false);

const ourProducts = ref([
	{ url: logoImg, text: 'Createables' },
	{ url: logoImg, text: 'Custom Logos' },
	{ url: digitalArtImg, text: 'Digital Arts' },
	{ url: bearlyArtImg, text: 'Bearly Art' },
]);

onBeforeMount(async () => {
	await store.fetch('?limit=1');
	if (store.list.length <= 0) {
		await store.init();
		await store.fetch('?limit=1');
	}

	store.item = store.list[0];
	activeHero.value = store.item.heros.find((hero) => hero.isActive === true);
	console.log('activeHero.value', store.item.heros[0]);
	if (!activeHero.value) {
		activeHero.value = store.item.heros[0];
	}
	console.log(activeHero.value);
});

function openModal() {
	isOpen.value = true;
	console.log(store.value);
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
