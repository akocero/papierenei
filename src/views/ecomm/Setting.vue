<template>
	<div class="card">Banners</div>
	<div class="card">Heros</div>
	<!-- <UploadMultipleImage
		item_id="34"
		:store="store"
		v-if="true"
		title="Heros"
	/> -->
</template>
<script setup>
import { ref } from 'vue';
import UploadMultipleImage from '@/components/UploadMultipleImage.vue';

const store = ref({});
</script>
