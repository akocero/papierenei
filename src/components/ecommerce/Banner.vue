<template>
	<div
		class="bg-darkYellow p-2 text-center text-sm font-bold text-white md:text-3xl"
	>
		<h1 class="drop-shadow-md">
			{{ text }}
		</h1>
	</div>
</template>

<script setup>
const props = defineProps({
	text: String,
});
</script>
