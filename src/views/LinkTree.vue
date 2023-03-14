<template>
	<div
		class="flex h-screen flex-col items-center justify-center font-comfortaa"
	>
		<div class="w-52">
			<img src="../assets/logo-t.png" alt="" />
		</div>
		<h3 class="-mt-2 mb-8 text-2xl font-bold">@papierenei</h3>
		<ul class="w-[90%] sm:w-[30%]">
			<li v-for="link in links" class="">
				<a
					:href="link.link"
					target="_blank"
					class="mb-4 flex h-20 w-full items-center justify-center rounded-xl bg-[#89deea] text-2xl text-white"
				>
					{{ link.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const links = ref([
	{
		link: 'https://papierenei@gmail.com',
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
		link: 'https://youtube.com/@papierenei',
		text: 'YouTube',
	},
]);
</script>
