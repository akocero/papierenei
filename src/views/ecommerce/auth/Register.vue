<template>
	<div>
		<form
			action=""
			class="mt-4 grid grid-cols-2 gap-x-4"
			@submit.prevent="handleSubmit"
		>
			<div class="mb-6">
				<Input
					v-model="form.firstName"
					type="text"
					label="First Name"
				/>
			</div>
			<div class="mb-6">
				<Input v-model="form.lastName" type="text" label="Last Name" />
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.mobileNumber"
					type="text"
					label="Mobile Number"
				/>
			</div>
			<div class="col-span-full mb-6">
				<Input v-model="form.email" type="email" label="Your Email" />
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.password"
					type="password"
					label="Password"
				/>
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.passwordConfirm"
					type="password"
					label="Password Cofirm"
				/>
			</div>
			<div class="col-span-full mb-2 flex justify-end">
				<button
					type="submit"
					class="w-full rounded bg-indigo-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
				>
					Register
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import useAlert from '@/composables/useAlert';
import { useRouter } from 'vue-router';

const form = ref({});
const { pushAlert } = useAlert();
const email = ref('');
const password = ref('');
const store = useEcomAuthStore();
const router = useRouter();

const handleSubmit = async () => {
	await store.signup(form.value);

	if (!store.error) {
		router.push({ name: 'account-details' });
		// window.location.reload();
	}
};

onUnmounted(() => {
	store.error = null;
});
</script>

<style lang="scss" scoped></style>
