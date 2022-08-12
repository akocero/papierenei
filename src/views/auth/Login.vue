<template>
	<div class="grid h-screen grid-cols-1 bg-white sm:grid-cols-2">
		<div>
			<div class="mx-auto w-full overflow-hidden md:w-8/12">
				<div class="mt-12 p-8">
					<div class="mb-7">
						<h2 class="mb-4 text-4xl">Log in</h2>
						<p>Welcome back! Please enter your details.</p>
					</div>
					<form @submit.prevent="handleSubmit">
						<label class="mb-4 block">
							<span class="text-md mb-1 block text-gray-500"
								>Email</span
							>
							<div
								class="relative flex items-center text-gray-500 focus-within:text-gray-600"
							>
								<VueFeather
									type="user"
									size="18"
									class="absolute ml-3"
								/>
								<input
									v-model="email"
									type="email"
									placeholder="Email Address"
									class="mt-1 block w-full rounded-lg border-gray-300 pl-9 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
								/>
							</div>
						</label>

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
						<div class="mb-5">
							<RouterLink
								:to="{ name: 'forgot-password' }"
								class="text-primary-600"
								>Forgot password</RouterLink
							>
						</div>
						<input
							v-if="!store.isLoading"
							type="submit"
							class="block w-full rounded-md bg-primary-500 px-2 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700"
							value="Log-in"
						/>
						<input
							v-if="store.isLoading"
							type="submit"
							class="block w-full rounded-md bg-primary-500 px-2 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
							value="Logging-in..."
							disabled
						/>
					</form>
				</div>
				<hr />
				<div class="p-6 text-center text-gray-600">
					Don't have an account?
					<RouterLink
						:to="{ name: 'signup' }"
						class="text-primary-600"
						>Sign up</RouterLink
					>
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

const { pushAlert } = useAlert();
const email = ref('');
const password = ref('');
const store = useAuthStore();

const handleSubmit = async () => {
	await store.login(email.value, password.value);

	if (store.error) {
		pushAlert('error', store.error.message);
		console.log('errprs:', store.error);
	} else {
		window.location.reload();
	}
};

console.log(import.meta.env.VITE_BASE_URL);
</script>
