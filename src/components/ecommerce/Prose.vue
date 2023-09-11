<template>
	<div
		v-html="htmlValue"
		class="prose prose-gray mx-auto w-full prose-headings:font-nunito prose-h1:text-center prose-h1:text-3xl prose-h1:uppercase prose-h1:text-indigo-400"
		:class="[_class]"
	></div>
</template>

<script setup>
defineProps(['htmlValue', '_class']);
</script>
