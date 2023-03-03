<template>
	<router-link
		v-if="_type === 'link'"
		:to="routeObject"
		:disabled="disabled"
		:class="[
			colorClass[color],
			'inline-block rounded-sm py-2 px-3 shadow disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none',
			_class,
		]"
	>
		{{ text }}
	</router-link>

	<button
		v-else
		:type="_type"
		class=""
		:disabled="disabled"
		:class="[
			colorClass[color],
			'inline-block rounded-sm py-2 px-3 shadow disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none',
			_class,
		]"
	>
		{{ text }}
	</button>
</template>

<script setup>
const props = defineProps({
	text: {
		type: String,
		default: 'Sample button',
	},
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

const colorClass = {
	primary: 'bg-gray-700 text-white',
	default: 'border  bg-gray-100 text-gray-700 shadow-none',
	yellow: 'bg-yellow-500 text-yellow-50 ',
	green: 'bg-green-500 text-white  hover:bg-green-400',
	red: 'bg-red-600 text-red-50',
	dark: 'bg-gray-800 text-white hover:bg-gray-700',
};
</script>

<style></style>
