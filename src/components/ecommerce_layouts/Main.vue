<template>
	<div
		class="relative min-h-screen bg-white pb-[48rem] font-karla text-gray-600 lg:pb-[21rem]"
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
	<MainTransition v-if="mainIsLoading">
		<Loading />
	</MainTransition>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import { useEcomAppStore } from '@/stores/ecom_app';
import Navbar from './navbar/Navbar.vue';
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
const mainIsLoading = ref(false);
onBeforeMount(async () => {
	// Load Ecommerce Store Data e.g Banner, Hero, Bg's

	mainIsLoading.value = true;
	await store.load();

	if (store.item.is_maintenance) {
		mainIsLoading.value = false;
		router.push({ name: 'maintenance' });
	}

	mainIsLoading.value = false;
});
</script>

<style></style>
