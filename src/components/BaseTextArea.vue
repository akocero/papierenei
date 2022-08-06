<template>
	<label class="block">
		<span
			class="text-gray-700"
			:class="[error && errorField && 'text-red-500']"
			>{{ label }}</span
		>
		<span v-if="required" class="font-black text-red-600"> *</span>
		<textarea
			:id="id"
			:class="[error && errorField && 'border-2 border-red-300']"
			class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			:placeholder="placeholder"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		></textarea>
	</label>
	<small v-if="error && errorField" class="mt-1 block text-base text-red-500">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseTextArea',
	props: {
		modelValue: String,
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: Object,
	},
};
</script>
