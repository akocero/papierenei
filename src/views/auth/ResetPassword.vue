<template>
	<div class="grid h-screen grid-cols-1 bg-white sm:grid-cols-2">
		<div>
			<div class="mx-auto w-full overflow-hidden md:w-8/12">
				<div class="mt-12 p-8">
					<div class="mb-7">
						<h2 class="mb-4 text-4xl">Reset Password</h2>
						<p>Please type your new password</p>
					</div>
					<form @submit.prevent="handleSubmit">
						<label class="mb-4 block">
							<span class="text-md mb-1 block text-gray-500"
								>Password</span
							>
							<div
								class="relative flex items-center text-gray-500 focus-within:text-gray-600"
							>
								<VueFeather
									type="lock"
									size="18"
									class="absolute ml-3"
								/>
								<input
									v-model="password"
									type="password"
									placeholder="Password"
									class="mt-1 block w-full rounded-lg border-gray-300 pl-9 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</div>
						</label>

						<label class="mb-4 block">
							<span class="text-md mb-1 block text-gray-500"
								>Confirm Password</span
							>
							<div
								class="relative flex items-center text-gray-500 focus-within:text-gray-600"
							>
								<VueFeather
									type="lock"
									size="18"
									class="absolute ml-3"
								/>
								<input
									v-model="passwordConfirm"
									type="password"
									placeholder="Password Confirm"
									class="mt-1 block w-full rounded-lg border-gray-300 pl-9 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</div>
						</label>

						<input
							v-if="!store.isLoading"
							type="submit"
							class="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700"
							value="Submit"
						/>
						<input
							v-if="store.isLoading"
							type="submit"
							class="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
							value="Resetting..."
							disabled
						/>

						<BaseButton
							text="Cancel"
							_type="link"
							:routeObject="{ name: 'login' }"
							_class="ml-2"
						/>
					</form>
				</div>
			</div>
		</div>
		<div class="hidden bg-primary-600 sm:block"></div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useAuthStore } from '@/stores/auth';
import useAlert from '@/composables/useAlert';
import BaseButton from '@/components/BaseButton.vue';
import { useRouter, useRoute } from 'vue-router';

const { pushAlert } = useAlert();
const route = useRoute();
const password = ref('');
const passwordConfirm = ref('');
const store = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
	const res = await store.resetPassword({
		password: password.value,
		passwordConfirm: passwordConfirm.value,
		resetToken: route.params.resetToken,
	});

	if (store.error) {
		pushAlert('error', store.error.message);
		console.log('errprs:', store.error);
	} else {
		pushAlert('success', res.message);
		router.push({
			name: 'login',
		});
	}
};
</script>
