<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-indigo-400"
	>
		<img
			v-if="EcommSettingsStore?.item"
			:src="EcommSettingsStore.item.logoBase[0].secure_url"
			alt=""
			class="z-50 -ml-5 w-48"
		/>

		<img v-else :src="regularLogo" alt="" class="z-50 -ml-5 w-48" />
		<h3
			class="mb-4 mt-6 font-quicksand text-xl font-extrabold text-white drop-shadow-xl lg:text-3xl"
		>
			Down for Maintenance
		</h3>
		<p
			class="max-w-2xl px-6 text-center font-quicksand text-white drop-shadow-xl"
		>
			Our website is in maintenance mode as we work behind the scenes to
			give it a revitalized, fresh look along with exciting updates that
			will enhance your browsing experience.
		</p>
	</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import notFoundImg from '@/assets/undermaintenance.svg';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import regularLogo from '@/assets/new_logos/regular.svg';

const EcommSettingStore = useEcommSettingStore();
const router = useRouter();

onBeforeMount(async () => {
	// Load Ecommerce Store Data e.g Banner, Hero, Bg's
	await EcommSettingStore.load();

	if (!EcommSettingStore.item.is_maintenance) {
		router.push({ name: 'home' });
	}
});
</script>
