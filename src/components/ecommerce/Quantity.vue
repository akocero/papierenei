<template>
	<div class="flex">
		<button
			@click="updateQty('sub')"
			class="h-12 w-8 border border-r-0 border-gray-300 bg-white disabled:bg-gray-200"
			:disabled="modelValue <= 1"
		>
			-
		</button>
		<input
			type="text"
			:value="modelValue"
			class="w-16 border-x-0 border-gray-300 text-center font-sans"
			@input="$emit('update:modelValue', $event.target.value)"
			disabled
		/>
		<button
			@click="updateQty('add')"
			:disabled="currentQty <= modelValue"
			class="h-12 w-8 border border-l-0 border-gray-300 bg-white disabled:bg-gray-300"
		>
			+
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	modelValue: [String, Number],
	currentQty: [Number],
});

const emit = defineEmits(['update:modelValue']);
const qty = ref(props.modelValue || 0);

const updateQty = (operator) => {
	operator == 'add' ? qty.value++ : qty.value--;
	emit('update:modelValue', qty.value);
};
</script>
