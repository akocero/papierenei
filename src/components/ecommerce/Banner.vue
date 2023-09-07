<template>
	<div
		class="relative z-10 bg-indigo-300 p-2 py-[0.4rem] text-center font-bold text-white"
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
