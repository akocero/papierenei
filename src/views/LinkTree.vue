<template>
	<div class="flex h-screen items-center justify-center">
		<ul class="w-[30%]">
			<li v-for="link in links" class="bg-gray-300">
				<a
					:href="link.link"
					target="_blank"
					class="mb-4 flex h-20 w-full items-center justify-center rounded-xl bg-gray-800 text-2xl text-white"
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
		link: 'https://eugenebadato.vercel.app/',
		text: 'Eugene',
	},
	{
		link: 'https://papierenei.vercel.app/',
		text: 'Papier Renei',
	},
]);
</script>
