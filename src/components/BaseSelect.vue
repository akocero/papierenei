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
			class="mt-1 w-full rounded shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
			:class="[
				error && errorField
					? 'border-2 border-red-300'
					: 'border-gray-300',
			]"
			:value="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
			:disabled="disabled"
		>
			<option value="" v-if="emptyOption">Choose</option>

			<option
				:value="option.value || option[optionValue]"
				v-for="option in options"
				:key="option.value || option[optionValue]"
				class="capitalize"
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
