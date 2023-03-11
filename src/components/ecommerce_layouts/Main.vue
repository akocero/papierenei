<template>
	<div class="relative font-quicksand text-gray-800">
		<Banner :text="store.activeBanner.text" v-if="store.item" />
		<Navbar />
		<AlertList :alerts="alerts" />
		<main class="">
			<RouterView :ecommSettingsStore="store" />
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
onBeforeMount(async () => {
	await store.load();
});
</script>

<style></style>
