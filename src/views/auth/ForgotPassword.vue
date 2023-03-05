<template>
	<div class="grid h-screen grid-cols-1 bg-white sm:grid-cols-12">
		<div class="col-span-5 -mt-32">
			<div
				class="mx-auto flex h-full w-full items-center justify-center overflow-hidden px-16 md:w-8/12"
			>
				<div class="w-full">
					<div class="mb-7">
						<h2 class="mb-4 text-4xl">Account Recovery</h2>
						<p>Please enter your email</p>
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

						<input
							v-if="!store.isLoading"
							type="submit"
							class="rounded-md bg-lightBlue-3 px-4 py-2 text-white hover:bg-main focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700"
							value="Submit"
						/>
						<input
							v-if="store.isLoading"
							type="submit"
							class="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 active:bg-primary-700 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
							value="Sending Email..."
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
		<div class="col-span-7 hidden bg-white py-4 pr-4 sm:block">
			<div
				class="h-full rounded-lg"
				:style="{
					'background-image': `url('../../src/assets/login-bg-2.jpg')`,
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
import BaseButton from '@/components/BaseButton.vue';
import { useRouter, useRoute } from 'vue-router';

const { pushAlert } = useAlert();
const email = ref('');
const password = ref('');
const store = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
	await store.forgotPassword(email.value);

	if (store.error) {
		pushAlert('error', store.error.message);
		console.log('errprs:', store.error);
	} else {
		pushAlert('success', `Please check your email!`);
		router.push({
			name: 'login',
		});
	}
};
</script>
