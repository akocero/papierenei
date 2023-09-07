<template>
	<div class="relative">
		<input
			:type="type"
			class="peer m-0 block h-[58px] w-full rounded border border-indigo-100 bg-indigo-50 bg-clip-padding px-3 py-4 text-base font-normal leading-tight ring-0 transition duration-200 ease-linear placeholder:text-transparent focus:border-2 focus:border-indigo-400 focus:pb-[0.625rem] focus:pt-[1.625rem] focus:outline-none focus:ring-0 [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
			:id="label"
			placeholder="name@example.com"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			v-bind="$attrs"
		/>
		<label
			:for="label"
			class="peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.80] peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-indigo-600 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.80] peer-focus:text-indigo-400 motion-reduce:transition-none"
			:class="
				modelValue &&
				'-translate-y-2 translate-x-[0.15rem] scale-[0.80] text-gray-500'
			"
		>
			{{ label }}
		</label>
	</div>
</template>

<script setup>
defineProps({
	modelValue: [String, Number],
	label: String,
	type: String,
});
</script>

<style lang="scss" scoped></style>
