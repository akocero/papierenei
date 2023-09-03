<template>
	<div class="bg-indigo-300 p-2 text-center font-bold text-white">
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
