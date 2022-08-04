<template>
	<div class="bg-slate-100 h-screen pt-16">
		<AlertList :alerts="alerts" />
		<div class="mb-8 text-center text-gray-500">
			<VueFeather type="box" size="48" class="" />
			<h2 class="text-2xl">EMPEROR</h2>
		</div>
		<div
			class="mx-auto w-2/3 overflow-hidden rounded-md bg-white shadow-sm lg:w-1/4"
		>
			<div class="p-6">
				<div class="mb-7 text-center text-gray-500">
					<h2 class="mb-4 text-xl">Log in to your account</h2>
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
								class="mt-1 block w-full rounded-md border-gray-300 pl-9 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
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
								class="mt-1 block w-full rounded-md border-gray-300 pl-9 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							/>
						</div>
					</label>
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
				New to EMPEROR ?
				<RouterLink to="/signup" class="text-primary-600"
					>Sign Up</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useAuthStore } from '@/stores/auth';
import useAlert from '../composables/useAlert';
import AlertList from '@/components/AlertList.vue';

const { pushAlert, alerts } = useAlert();
const email = ref('');
const password = ref('');
const store = useAuthStore();

const handleSubmit = async () => {
	await store.login(email.value, password.value);

	if (store.error) {
		pushAlert('error', store.error.message);
		console.log('errprs:', store.error);
	}
};
</script>
