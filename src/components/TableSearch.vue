<template>
	<div class="w-full">
		<form @submit.prevent="search" class="mb-2 flex justify-end">
			<div class="relative -mr-1">
				<input
					type="text"
					v-model="searchText"
					class="w-full rounded-l-md border-gray-300 py-2 pl-10 focus:border-indigo-300 focus:ring-0"
				/>
				<button class="absolute top-3 left-3">
					<VueFeather
						type="search"
						size="18"
						class="mr-4 text-gray-500"
					/>
				</button>
			</div>
			<select
				id="search_options"
				v-model="searchType"
				class="rounded-r-md border-gray-300 py-1 focus:border-indigo-300 focus:ring-0"
			>
				<option
					v-for="option in options"
					:key="option.value"
					:value="option.value"
				>
					{{ option.label }}
				</option>
			</select>
		</form>
	</div>
</template>

<script setup>
// import BaseSelect from '@/components/BaseSelect.vue';

import { ref } from 'vue';

const props = defineProps({
	options: Array,
	selectedOption: {
		type: String,
	},
});

const emit = defineEmits(['search']);

console.log(props.selectedOption);
const searchText = ref('');
const searchType = ref(props.selectedOption);

const search = () => {
	if (searchText.value) {
		emit('search', `${searchType.value}[regex]=${searchText.value}&`);
	} else {
		emit('search');
	}
};
</script>
