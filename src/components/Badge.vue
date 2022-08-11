<template>
	<span
		class="rounded-full border px-2 font-semibold text-white"
		:class="[
			{
				'border-yellow-300 bg-yellow-300/40 text-yellow-700':
					color === 'warning',
				'border-red-300 bg-red-300/40 text-red-700': color === 'danger',
				'border-blue-300 bg-blue-300/40 text-blue-700':
					color === 'info',
				'border-green-300 bg-green-300/40 text-green-700':
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
