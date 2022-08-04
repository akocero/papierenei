<script setup></script>

<template>
	<div class="bg-slate-100 h-screen pt-20">
		<AlertList :alerts="alerts" />
		<div class="card mx-auto w-11/12 md:w-1/3">
			<div class="mb-4">
				<h2 class="text-base">Enter your details</h2>
			</div>
			<form @submit.prevent="handleSubmit">
				<div class="mb-2">
					<BaseInput
						id="input_name"
						label="Name"
						v-model="name"
						:error="error"
						:errorField="error?.errors?.name || null"
						placeholder="Ex. John Doe"
						:required="true"
					/>
				</div>

				<div class="mb-2">
					<BaseInput
						id="input_email"
						type="email"
						label="Email"
						v-model="email"
						:error="error"
						:errorField="error?.errors?.email || null"
						placeholder="Ex. johndoe@gmail.com"
						:required="true"
					/>
				</div>

				<div class="mb-2">
					<BaseInput
						type="password"
						id="input_password"
						label="Password"
						v-model="password"
						:error="error"
						:errorField="error?.errors?.password || null"
						placeholder=""
						:required="true"
					/>
				</div>

				<div class="mb-2">
					<BaseInput
						type="password"
						id="input_passwordConfirm"
						label="Confirm Password"
						v-model="passwordConfirm"
						:error="error"
						:errorField="error?.errors?.passwordConfirm || null"
						placeholder=""
						:required="true"
					/>
				</div>
				<div class="mt-4">
					<BaseButton text="Sign Up" _type="submit" />
				</div>
			</form>
		</div>
		<h3 class="text-center text-gray-600">
			Already have an account?
			<RouterLink to="/login" class="text-primary-600">Log-in</RouterLink>
		</h3>
	</div>
</template>
<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import useAlert from '@/composables/useAlert';
import AlertList from '@/components/AlertList.vue';
import { ref } from 'vue';

const { pushAlert, alerts } = useAlert();
const store = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const error = ref(null);

const handleSubmit = async () => {
	error.value = null;

	await store.singup({
		email: email.value,
		name: name.value,
		password: password.value,
		passwordConfirm: passwordConfirm.value,
	});

	if (store.error) {
		error.value = store.error;
		pushAlert('error', store.error.message);
		console.log('errprs:', store.error);
	}
};
</script>
