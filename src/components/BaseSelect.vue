<template>
	<label class="block">
		<span
			class="text-gray-700"
			:class="[error && errorField && 'text-red-500']"
			>{{ label }}</span
		>
		<span v-if="required" class="font-black text-red-600"> *</span>
		<select
			:id="id"
			class="mt-1 w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			:class="[error && errorField && 'border-2 border-red-300']"
			:value="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
			:disabled="disabled"
		>
			<option value="" v-if="emptyOption">Choose</option>

			<option
				:value="option.value || option[optionValue]"
				v-for="option in options"
				:key="option.value || option[optionValue]"
			>
				{{ option.label || option[optionLabel] }}
			</option>
		</select>
	</label>
	<small v-if="error && errorField" class="mt-1 block text-base text-red-500">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseSelect',
	props: {
		modelValue: String | Number,
		emptyOption: {
			type: Boolean,
			default: true,
		},
		optionValue: {
			type: String,
			default: '',
		},
		optionLabel: {
			type: String,
			default: '',
		},
		id: String,
		label: String,
		error: Object,
		required: Boolean,
		errorField: String,
		options: {
			type: Array,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style></style>
