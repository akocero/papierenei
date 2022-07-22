<template>
	<div class="fixed top-4 right-4 z-40 w-2/12">
		<!-- <transition-group name="list" tag="div" class="alert-list" appear> -->
		<Alert
			v-for="alert in alerts"
			:key="alert.id"
			:status="alert.status"
			:message="alert.message"
			:customStatus="alert.customStatus"
			:id="alert.id"
		/>
		<!-- </transition-group> -->
	</div>
</template>

<script setup>
import Alert from './Alert.vue';

const props = defineProps({
	alerts: Array,
});
</script>

<!-- <style>
.alert-list {
	position: fixed;
	top: 1rem;
	right: 1rem;
	/* left: 50%; */
	width: 26%;
	/* transform: translateX(-50%); */
	z-index: 999999;
}
</style> -->
