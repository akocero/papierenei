<template>
	<label class="block">
		<span
			class="text-gray-700"
			:class="[error && errorField && 'text-red-500']"
		>
			{{ label }}
		</span>
		<span v-if="required" class="font-black text-red-600"> *</span>
		<input
			:type="type"
			class="mt-1 w-full rounded placeholder-gray-400 focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 disabled:border-gray-50 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
			:class="[
				error && errorField
					? 'border-2 border-red-400'
					: 'border-gray-300',
				_class,
			]"
			:id="id"
			:placeholder="placeholder"
			:value="modelValue"
			:step="step"
			@input="$emit('update:modelValue', $event.target.value)"
			:disabled="disabled"
		/>
	</label>
	<small v-if="error && errorField" class="mt-1 block text-base text-red-500">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		modelValue: [String, Number],
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: String,
		disabled: {
			type: Boolean,
			default: false,
		},
		step: {
			type: Number,
			default: null,
		},
		type: {
			type: String,
			default: 'text',
			validator: function (value) {
				// The value must match one of these strings
				return (
					[
						'text',
						'date',
						'number',
						'email',
						'password',
						'time',
					].indexOf(value) !== -1
				);
			},
		},
		_class: String,
	},
};
</script>
