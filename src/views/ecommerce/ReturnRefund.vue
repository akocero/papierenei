<template>
	<div class="wrapper min-h-[50vh]">
		<Prose :htmlValue="store.item.returnPolicy" />
	</div>
</template>

<script setup>
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const store = useEcommSettingStore();
</script>
