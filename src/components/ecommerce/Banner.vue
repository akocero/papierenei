<template>
	<div class="bg-darkYellow p-2 text-center text-3xl font-bold text-white">
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
