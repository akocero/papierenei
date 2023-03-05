<template>
	<div class="grid h-screen grid-cols-1 bg-white sm:grid-cols-12">
		<div class="col-span-5 -mt-32">
			<div
				class="mx-auto flex h-full w-full items-center justify-center overflow-hidden px-16 md:w-8/12"
			>
				<div class="w-full">
					<img
						src="../../assets/logo-t.png"
						alt=""
						class="mx-auto h-40"
					/>
					<div class="mb-7">
						<h2 class="mb-4 text-4xl">Log in</h2>
						<p>Welcome back! Please enter your credentials.</p>
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
									class="mt-1 block w-full rounded border-gray-300 pl-9 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
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
									class="mt-1 block w-full rounded border-gray-300 pl-9 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
								/>
							</div>
						</label>
						<div class="mb-5">
							<RouterLink
								:to="{ name: 'forgot-password' }"
								class="text-blue-500"
								>Forgot password</RouterLink
							>
						</div>
						<input
							v-if="!store.isLoading"
							type="submit"
							class="block w-full rounded bg-lightBlue-3 px-2 py-2 text-white shadow transition-all hover:bg-main focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-700"
							value="Log-in"
						/>
						<input
							v-if="store.isLoading"
							type="submit"
							class="block w-full rounded bg-gray-500 px-2 py-2 text-white hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400 active:bg-gray-700 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
							value="Logging-in..."
							disabled
						/>
					</form>
					<div class="mt-4 text-center text-gray-600">
						Don't have an account?
						<RouterLink
							:to="{ name: 'signup' }"
							class="text-blue-500"
							>Sign up</RouterLink
						>
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-7 hidden bg-white py-4 pr-4 sm:block">
			<div
				class="h-full rounded-lg"
				:style="{
					'background-image': `url(${bgUrl})`,
					backgroundSize: 'cover',
					backgroundPosition: 'right',
				}"
			></div>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useAuthStore } from '@/stores/auth';
import useAlert from '@/composables/useAlert';
import bgUrl from '@/assets/login-bg-2.jpg';

const { pushAlert } = useAlert();
const email = ref('');
const password = ref('');
const store = useAuthStore();

const handleSubmit = async () => {
	await store.login(email.value, password.value);

	if (store.error) {
		pushAlert('error', store.error.message);
	} else {
		window.location.reload();
	}
};
</script>
