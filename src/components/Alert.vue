<template>
	<div class="relative mb-2 rounded-md p-4 text-white" :class="alertType">
		<strong v-if="!customStatus" class="block uppercase"
			>{{ status }}!
		</strong>
		<strong v-else class="">{{ customStatus }}! </strong>
		{{ message }}
		<button
			type="button"
			@click="popAlert(id)"
			class="absolute top-2 right-2"
		>
			<VueFeather type="x" size="16" stroke-width="3" />
		</button>
	</div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';
import useAlert from '@/composables/useAlert';
const { popAlert } = useAlert();
const alertType = ref('');
let timeOut = null;
const props = defineProps({
	status: {
		type: String,
	},
	message: {
		type: String,
	},
	id: {
		type: String,
	},
	customStatus: {
		type: String,
		default: null,
	},
});

if (props.status === 'error') {
	alertType.value = 'bg-red-400/90';
} else if (props.status === 'success') {
	alertType.value = 'bg-green-400/90';
} else if (props.status === 'warning') {
	alertType.value = 'bg-yellow-300/90 text-gray-700';
} else {
	alertType.value = 'bg-blue-400/90';
}

timeOut = setTimeout(() => {
	popAlert(props.id);
}, 10000);

onBeforeUnmount(() => {
	clearTimeout(timeOut);
});
</script>

<style>
/* .alert {
	min-width: 16rem !important;
	margin: 0 auto;
} */
</style>
