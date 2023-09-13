<template>
	<button
		type="button"
		class="inline-block rounded-xl bg-red-400 px-6 py-2 text-lg font-semibold text-white duration-200 hover:-translate-y-1 hover:shadow-lg"
		:class="[_class]"
	>
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	_class: String,
});
</script>

<style lang="scss" scoped></style>
