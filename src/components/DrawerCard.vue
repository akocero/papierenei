<template>
	<div class="card p-0">
		<div
			class="flex items-center justify-between border-b border-gray-100 px-6 py-2"
		>
			<h4 class="font-semibold">{{ title }}</h4>
			<button
				type="button"
				v-if="!isCardOpen"
				@click="isCardOpen = true"
				class="flex items-center justify-center"
			>
				<VueFeather type="chevron-right" size="18" />
			</button>
			<button
				type="button"
				v-if="isCardOpen"
				@click="isCardOpen = false"
				class="flex items-center justify-center"
			>
				<VueFeather type="chevron-down" size="18" />
			</button>
		</div>
		<div class="p-6" v-if="isCardOpen">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
	title: {
		type: String,
		default: 'No Title',
	},
	isCardOpen: {
		type: Boolean,
		default: true,
	},
});
</script>
