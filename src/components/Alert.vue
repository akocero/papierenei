<template>
	<div
		class="relative mb-2 flex items-start rounded-md px-4 py-3 text-white shadow-lg"
		:class="toastColor"
		style="min-width: 14rem"
	>
		<div>
			<VueFeather
				:type="toastIcon"
				size="20"
				stroke-width="2"
				class="mt-1"
			/>
		</div>

		<div class="ml-3 pr-5">
			<h4 class="block font-semibold capitalize">
				{{ title ? title : status }}
			</h4>
			<p>{{ message }}</p>
		</div>

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
const toastColor = ref('');
const toastIcon = ref('');
let timeOut = null;
const props = defineProps({
	status: {
		type: String,
	},
	title: {
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
	position: {
		type: String,
		default: 'right',
	},
});

if (props.status === 'error') {
	toastColor.value = 'bg-red-400';
	toastIcon.value = 'x-circle';
} else if (props.status === 'success') {
	toastColor.value = 'bg-green-400';
	toastIcon.value = 'check-circle';
} else if (props.status === 'warning') {
	toastColor.value = 'bg-yellow-300 text-gray-700';
	toastIcon.value = 'info';
} else {
	toastColor.value = 'bg-blue-400';
	toastIcon.value = 'info';
}

timeOut = setTimeout(() => {
	popAlert(props.id);
}, 500000);

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
