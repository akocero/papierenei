<template>
	<h2
		class="mb-10 rounded-lg text-center font-nunito text-2xl font-black uppercase text-indigo-400"
		:class="[textSize[size]]"
	>
		{{ title }}
	</h2>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: 'TITLE',
	},
	size: {
		type: String,
		default: 'lg',
	},
});

const textSize = {
	lg: 'md:text-4xl',
	md: 'md:text-3xl',
};
</script>
