<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-indigo-500"
	>
		<img
			v-if="ecommSettingsStore.item"
			:src="ecommSettingsStore.item.logoBase[0].secure_url"
			alt=""
			class="z-50 -ml-5 w-48"
		/>

		<img v-else :src="LogoT" alt="" class="z-50 -ml-5 w-48" />
		<h3
			class="mb-4 mt-6 font-quicksand text-3xl font-extrabold text-lightBlue-1 drop-shadow-xl"
		>
			Loading the Best Deals for You
		</h3>
		<p class="max-w-2xl font-quicksand text-lightBlue-1 drop-shadow-xl">
			"Your shopping journey is just a heartbeat away. Like a skilled
			artisan crafting perfection, our app is meticulously preparing an
			experience tailored to your desires. The cart is being loaded, the
			pixels aligning, and soon your world of online shopping will come to
			life. Thank you for your patience as we make every click count."
		</p>
	</div>
</template>

<script setup>
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import LogoT from '@/assets/logo-t.png';

const ecommSettingsStore = useEcommSettingStore();
</script>

<style>
.loading {
	/* display: block;
	width: 62px;
	height: 62px;
	margin: 30px auto;
	border: 8px solid rgb(218, 218, 218);
	border-radius: 50%;
	border-top-color: #1c344c; */
	animation: spin 2.4s ease infinite;
}
@keyframes spin {
	to {
		-webkit-transform: rotateZ(360deg);
	}
}
</style>
