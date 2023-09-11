<template>
	<div>
		<form action="" class="mt-4" @submit.prevent="handleSubmit">
			<div class="mb-6">
				<Input v-model="code" type="text" label="6-digit code" />
			</div>
			<div class="mb-2 flex justify-end">
				<button
					type="submit"
					class="w-full rounded bg-indigo-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-300 disabled:text-gray-400"
					:disabled="EcomAuthStore.isLoading"
				>
					Submit
				</button>
			</div>
			<button
				class="mt-1 text-indigo-600 hover:text-indigo-700"
				@click="EcomAuthStore.loginCodeToken = null"
			>
				Log in with a different email
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import { useEcomAppStore } from '@/stores/ecom_app';
import useAlert from '@/composables/useAlert';
import { useRouter } from 'vue-router';

const { pushAlert } = useAlert();
const code = ref('');
const password = ref('');
const EcomAuthStore = useEcomAuthStore();
const EcomAppStore = useEcomAppStore();
const router = useRouter();

const handleSubmit = async () => {
	await EcomAuthStore.loginUsingCode(code.value);

	if (!EcomAuthStore.error) {
		router.push({ name: 'account-details' });
		pushAlert('success', 'Succesfully Logged In.');
		EcomAppStore.isAuthModalOpen = false;
	}
};

onUnmounted(() => {
	EcomAuthStore.error = null;
});
</script>

<style lang="scss" scoped></style>
