<template>
	<div class="relative font-quicksand text-[rgb(5,160,181)]">
		<Banner :text="activeBanner.text" v-if="store.item" />
		<Navbar />
		<main class="">
			<RouterView />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import Banner from '../ecommerce/Banner.vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { onBeforeMount, ref } from 'vue';

const store = useEcommSettingStore();
const activeBanner = ref('');
onBeforeMount(async () => {
	await store.fetch('?limit=1');
	if (store.list.length <= 0) {
		await store.init();
		await store.fetch('?limit=1');
	}
	store.item = store.list[0];
	activeBanner.value = store.item.banners.find(
		(hero) => hero.isActive === true,
	);
	if (!activeBanner.value) {
		activeBanner.value = store.item.banners[0];
	}
	console.log('main', store.item);
});
</script>

<style></style>
