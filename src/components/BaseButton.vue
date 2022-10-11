<template>
	<router-link
		v-if="_type === 'link'"
		:to="routeObject"
		class="inline-block rounded-md py-2 px-3 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
		:disabled="disabled"
		:class="[
			{
				'bg-primary-600 text-white ': color === 'primary',
				'border bg-yellow-500 text-yellow-50 ': color === 'yellow',
				'border bg-green-500 text-green-50 ': color === 'green',
				'border border-gray-200 bg-gray-100 text-gray-900':
					color === 'default',
				'bg-red-600 text-red-50 ': color === 'red',
			},
			_class,
		]"
		>{{ text }}</router-link
	>

	<button
		v-else
		:type="_type"
		class="inline-block rounded-md py-2 px-3 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
		:disabled="disabled"
		:class="[
			{
				'bg-primary-600 text-white ': color === 'primary',
				'border border-gray-300 bg-gray-200 text-gray-900':
					color === 'default',
				'border bg-yellow-500 text-yellow-50 ': color === 'yellow',
				'border bg-green-500 text-green-50 ': color === 'green',
				'bg-red-600 text-red-50 ': color === 'red',
			},
			_class,
		]"
	>
		{{ text }}
	</button>
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
		default: 'default',
	},
	routeObject: {
		type: Object,
		default: {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});
</script>

<style></style>
