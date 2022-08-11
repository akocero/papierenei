<template>
	<span
		class="rounded-full border px-2 font-semibold text-white"
		:class="[
			{
				'border-yellow-500 bg-yellow-300/40 text-yellow-700':
					color === 'warning',
				'bg-red-500': color === 'danger',
				'bg-blue-500': color === 'info',
				'border-green-500 bg-green-300/70 text-green-700':
					color === 'success',
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
