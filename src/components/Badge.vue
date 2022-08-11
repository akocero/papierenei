<template>
	<span
		class="rounded-full px-2 text-white"
		:class="[
			{
				'bg-yellow-500': color === 'warning',
				'bg-red-500': color === 'danger',
				'bg-blue-500': color === 'info',
				'bg-green-500': color === 'success',
				'bg-gray-500': color === '',
			},
		]"
		>{{ text }}</span
	>
</template>

<script setup>
const props = defineProps({
	text: String,
	color: {
		type: String,
		default: '',
	},
});
</script>
