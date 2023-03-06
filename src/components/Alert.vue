<template>
	<div
		:class="[
			'relative mb-2 flex items-start rounded-md  px-4 py-3 text-white shadow-sm',
			colorClasses[status],
		]"
		style="min-width: 14rem"
	>
		<div>
			<VueFeather
				:type="iconTypes[status]"
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
let timeOut = null;
const toastShowTime = 3000;
const props = defineProps({
	status: {
		type: String,
		default: 'info',
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

const colorClasses = {
	error: 'bg-red-400/80 border-red-400 border-2',
	success: 'bg-green-400/80 border-green-400 border-2',
	warning: 'bg-yellow-400/80 text-gray-800 border-yellow-400 border-2',
	info: 'bg-blue-400/80 border-blue-400 border-2',
};

const iconTypes = {
	error: 'x-circle',
	success: 'check-circle',
	warning: 'info',
	info: 'info',
};

timeOut = setTimeout(() => {
	popAlert(props.id);
}, toastShowTime);

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
