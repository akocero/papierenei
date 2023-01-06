<template>
	<div class="relative font-quicksand text-gray-800">
		<Banner :text="activeBanner.text" v-if="store.item" />
		<Navbar />
		<AlertList :alerts="alerts" />
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
import useAlert from '@/composables/useAlert.js';
import AlertList from '@/components/AlertList.vue';

const { alerts } = useAlert();
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
});
</script>

<style></style>
