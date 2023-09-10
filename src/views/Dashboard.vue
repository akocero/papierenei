<template>
	<!-- <ManageImage :isOpen="isOpen" @closeModal="closeModal" /> -->
	<!-- <BaseModal
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
	</BaseModal> -->
	<div class="card">
		<!-- uncomment this to test the toast or modals -->
		<!-- <button @click="showAlert">Open</button> -->
		<div class="flex items-baseline justify-between">
			<h4 class="text-xl">Welcome, {{ AuthStore.user.name }}</h4>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '../components/BaseModal.vue';
// import ManageImage from '@/components/ManageImage.vue';
import useAlert from '../composables/useAlert';
import { useAuthStore } from '../stores/auth';

const { pushToast } = useAlert();
const isOpen = ref(false);
const AuthStore = useAuthStore();

const showAlert = () => {
	pushToast({
		status: 'success',
		title: 'Testing napaka angas',
		message: 'test message',
	});
	pushToast({
		status: 'error',
		title: 'Testing napaka angas Testing napaka angas',
		message: 'test message',
	});
	pushToast({
		status: 'warning',
		title: 'Testing napaka angas  Testing napaka angas Testing napaka angas',
		message: 'test message',
	});
	pushToast({
		status: 'info',
		title: 'Testing napaka angas',
		message: 'test message',
	});
	return;
};

function openModal() {
	isOpen.value = true;

	console.log('openModal');
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
