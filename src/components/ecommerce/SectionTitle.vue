<template>
	<h2
		class="mb-10 rounded-lg text-center font-xnarrow text-2xl font-bold uppercase text-indigo-400 md:text-5xl"
	>
		{{ title }}
	</h2>
</template>

<script setup>
const props = defineProps(['title']);
</script>
