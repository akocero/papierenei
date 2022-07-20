<template>
	<router-link
		v-if="_type === 'link'"
		:to="routeObject"
		class="min-w-7 flex h-7 items-center justify-center rounded-sm border border-gray-200 p-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white"
	>
		{{ text }}
		<VueFeather :type="icon" size="16" v-if="icon" />
	</router-link>
	<button
		v-else
		class="min-w-7 flex h-7 items-center justify-center rounded-sm border border-gray-200 p-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white"
	>
		{{ text }}
		<VueFeather :type="icon" size="16" v-if="icon" />
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
		default: 'primary',
	},
	icon: {
		type: String,
	},
	routeObject: {
		type: Object,
	},
});
</script>

<style></style>
