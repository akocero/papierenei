<template>
	<router-link
		:to="{ name: 'warehouse.inventory' }"
		class="mt-2 inline-block rounded-md py-2 px-5 shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
		:class="[
			{
				'bg-primary-600 text-primary-50 shadow-primary-600/60':
					color === 'primary',
				'border bg-yellow-500 text-yellow-50 shadow-yellow-400/60 ':
					color === 'yellow',
				'bg-red-600 text-red-50 shadow-red-600/60': color === 'red',
			},
			_class,
		]"
		>{{ text }}</router-link
	>
</template>

<script setup>
const props = defineProps({
	text: String,
	_type: {
		type: String,
		default: 'link',
	},
	_class: {
		type: String,
		default: '',
	},
	color: {
		type: String,
		default: 'primary',
	},
});
</script>

<style></style>
