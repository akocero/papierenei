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
			:class="[
				error && errorField
					? 'border-2 border-red-400'
					: 'border-gray-300',
			]"
			class="mt-1 w-full rounded shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
			:placeholder="placeholder"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:disabled="disabled"
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
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
