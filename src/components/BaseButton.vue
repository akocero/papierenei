<template>
	<router-link
		:to="{ name: 'warehouse.inventory' }"
		class="
			py-2
			px-5
			mt-2
			transition-all
			duration-200
			rounded-md
			inline-block
			hover:translate-y-[-2px]
			shadow-lg
		"
		:class="[
			{
				'bg-primary-600 text-primary-50 shadow-primary-600/60':
					color === 'primary',
				'bg-yellow-500 text-yellow-50 shadow-yellow-400/60 border ':
					color === 'yellow',
				'bg-red-600 text-red-50 shadow-red-600/60': color === 'red'
			},
			_class
		]"
		>{{ text }}</router-link
	>
</template>

<script setup>
const props = defineProps({
	text: String,
	_type: {
		type: String,
		default: 'link'
	},
	_class: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: 'primary'
	}
});
</script>

<style></style>
