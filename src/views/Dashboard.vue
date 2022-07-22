<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Welcome, Dashboard</h4>
			<BaseButton text="Open modal" @click="openModal" />
			<BaseButton text="Open modal" @click="handleAlert" />
		</div>
	</div>
	<BaseModal
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<div class="mt-2">
			<p class="text-sm text-gray-500">
				Your payment has been successfully submitted. We’ve sent you an
				email with all of the details of your order.
			</p>
		</div>

		<div class="mt-4">
			<button
				type="button"
				class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
				@click="closeModal"
			>
				Got it, thanks!
			</button>
		</div>
	</BaseModal>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseModal from '../components/BaseModal.vue';
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import useAlert from '../composables/useAlert';

const counterStore = useCounterStore();
const { pushAlert } = useAlert();
const isOpen = ref(false);

function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}

const handleAlert = () => {
	pushAlert('error', 'Invalid Inputs');
	pushAlert('success', 'Invalid Inputs');
	pushAlert('warning', 'Invalid Inputs');
	pushAlert('info', 'Invalid Inputs');
};
</script>

<style></style>
