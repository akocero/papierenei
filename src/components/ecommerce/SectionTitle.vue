<template>
	<h2
		:class="[
			'mb-4 rounded-lg text-center font-nunito text-2xl font-black uppercase text-indigo-400 lg:mb-10',
			textSize[size],
			_class,
		]"
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
	_class: {
		type: String,
	},
});

const textSize = {
	lg: 'md:text-4xl',
	md: 'md:text-3xl',
};
</script>
