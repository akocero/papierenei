<template>
	<div class="flex h-screen items-center bg-gray-200">
		<div class="">
			<div
				class="relative mx-20 grid h-full grid-cols-12 rounded-xl bg-white p-10 shadow-2xl 2xl:p-20"
			>
				<div class="absolute left-10 -top-20 2xl:left-20 2xl:-top-12">
					<img
						v-if="EcommSettingStore.item?.logoBase?.length > 0"
						:src="EcommSettingStore.item.logoBase[0].secure_url"
						alt=""
						class="w-44 2xl:w-64"
					/>
					<img
						v-else
						src="@/assets/logo-t.png"
						alt=""
						class="w-44 2xl:w-64"
					/>
				</div>
				<div class="col-span-5 pr-28">
					<div class="mt-10">
						<h2
							class="mb-6 font-sans text-6xl font-extrabold text-red-400 drop-shadow 2xl:text-7xl"
						>
							Down for Maintenance
						</h2>

						<p class="text-lg text-gray-400 2xl:text-2xl">
							Our website is in maintenance mode as we work behind
							the scenes to give it a revitalized, fresh look
							along with exciting updates that will enhance your
							browsing experience.
						</p>
					</div>
				</div>
				<div class="col-span-7 flex h-full items-center justify-center">
					<div class="w-3/4">
						<img :src="notFoundImg" alt="" class="h-full" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import notFoundImg from '@/assets/undermaintenance.svg';
import { useEcommSettingStore } from '@/stores/ecomm_setting';

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
