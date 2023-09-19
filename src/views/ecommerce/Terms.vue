<template>
	<div class="wrapper">
		<Prose :htmlValue="store.item.servicesTerms" />
	</div>
</template>

<script setup>
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const store = useEcommSettingStore();
</script>
