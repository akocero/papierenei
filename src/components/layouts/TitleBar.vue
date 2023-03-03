<template>
	<div class="mb-3 flex w-full items-center">
		<router-link
			v-if="back_route_name"
			:to="{ name: back_route_name }"
			class="mr-4 flex items-center justify-center rounded-sm border border-gray-300 py-2 px-2 text-gray-600 hover:bg-gray-200"
		>
			<VueFeather type="arrow-left" size="22" class="" />
		</router-link>
		<h4 class="text-xl">{{ title }}</h4>
		<div class="ml-auto">
			<slot name="actions"></slot>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: 'No Title',
	},
	back_route_name: {
		type: String,
		default: '',
	},
});
</script>
