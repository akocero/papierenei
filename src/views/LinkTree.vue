<template>
	<div class="flex h-screen flex-col items-center justify-center font-karla">
		<div class="w-52">
			<img
				v-if="EcommSettingStore.item?.logoBase?.length > 0"
				:src="EcommSettingStore.item.logoBase[0].secure_url"
				alt=""
			/>

			<img v-else src="../assets/logo-t.png" alt="" />
		</div>
		<h3 class="mt-2 mb-8 text-2xl font-bold text-indigo-600">
			@papierenei
		</h3>
		<ul class="w-[90%] sm:w-[30%]">
			<li v-for="link in links" class="">
				<a
					:href="link.link"
					target="_blank"
					class="mb-4 flex h-14 w-full items-center justify-center rounded-xl bg-indigo-400 text-xl text-white"
				>
					{{ link.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const EcommSettingStore = useEcommSettingStore();

onMounted(async () => {
	if (!EcommSettingStore.item) {
		await EcommSettingStore.load();
	}
});

const links = ref([
	{
		link: 'mailto:papierenei@gmail.com',
		text: 'Email',
	},
	{
		link: 'https://papierenei.vercel.app',
		text: 'Shop',
	},
	{
		link: 'https://facebook.com/papierenei',
		text: 'Facebook',
	},
	{
		link: 'https://instagram.com/papierenei',
		text: 'Instagram',
	},
	{
		link: 'https://tiktok.com/papierenei',
		text: 'Tiktok',
	},
	{
		link: 'https://youtube.com/@papierenei',
		text: 'YouTube',
	},
]);
</script>
