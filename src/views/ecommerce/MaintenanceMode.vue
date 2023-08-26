<template>
	<div class="flex h-screen items-center bg-gray-50 p-32">
		<div class="">
			<div class="grid h-full grid-cols-12">
				<div class="col-span-6 pr-28">
					<div class="w-full">
						<img
							src="@/assets/new_logo.svg"
							alt=""
							class="w-44 2xl:w-64"
						/>
					</div>
					<div class="mt-10 2xl:mt-28">
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
				<div class="col-span-6 flex h-full items-center justify-center">
					<div class="h-full">
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
import notFoundImg from '@/assets/maintenance.svg';
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const store = useEcommSettingStore();
const router = useRouter();

onBeforeMount(async () => {
	// Load Ecommerce Store Data e.g Banner, Hero, Bg's
	await store.load();

	if (!store.item.is_maintenance) {
		router.push({ name: 'home' });
	}
});
</script>
