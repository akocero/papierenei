<template>
	<div
		class="relative bg-white font-karla text-gray-600"
		v-if="store.item && !store.item.is_maintenance"
	>
		<AuthModal v-if="EcomStore.isAuthModalOpen" />
		<Banner
			:text="store.activeBanner.text"
			v-if="store.item && store?.activeBanner?.text"
		/>
		<Navbar />
		<AlertList :alerts="alerts" />
		<main class="">
			<RouterView :ecommSettingsStore="store" />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { useEcomAppStore } from '@/stores/ecom_app';
import Navbar from './navbar/Index.vue';
import Footer from './Footer.vue';
import Banner from '../ecommerce/Banner.vue';
import useAlert from '@/composables/useAlert.js';
import AlertList from '@/components/AlertList.vue';
import AuthModal from '@/views/ecommerce/auth/Index.vue';
import { useRouter } from 'vue-router';

const { alerts } = useAlert();
const EcomStore = useEcomAppStore();
const store = useEcommSettingStore();
const router = useRouter();
onBeforeMount(async () => {
	// Load Ecommerce Store Data e.g Banner, Hero, Bg's
	await store.load();

	if (store.item.is_maintenance) {
		router.push({ name: 'maintenance' });
	}
});
</script>

<style></style>
