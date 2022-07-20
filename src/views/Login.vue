<template>
	<div class="bg-slate-100 h-screen pt-16">
		<div class="mb-8 text-center text-gray-500">
			<VueFeather type="box" size="48" class="" />
			<h2 class="text-2xl">EMPEROR</h2>
		</div>
		<div
			class="mx-auto w-2/3 overflow-hidden rounded-md bg-white shadow-md lg:w-1/4"
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
						type="submit"
						class="block w-full rounded-md bg-primary-500 px-2 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700"
						value="Log In"
					/>
				</form>
			</div>
			<hr />
			<div class="p-6 text-center text-gray-600">
				New to EMPEROR ? <RouterLink to="/signup">Sign Up</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
	console.log(email.value, password.value);
};
</script>
