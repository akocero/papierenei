<template>
	<div class="grid h-screen grid-cols-1 bg-white sm:grid-cols-2">
		<div>
			<div class="mx-auto w-full overflow-hidden md:w-8/12">
				<div class="mt-12 p-8">
					<div class="mb-7">
						<h2 class="mb-4 text-4xl">Create new account</h2>
						<h3 class="text-gray-600">
							Already have an account?
							<RouterLink
								:to="{ name: 'login' }"
								class="text-primary-600"
								>Log-in</RouterLink
							>
						</h3>
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
								:errorField="
									error?.errors?.passwordConfirm || null
								"
								placeholder=""
								:required="true"
							/>
						</div>
						<div class="mt-4">
							<BaseButton
								v-if="!store.isLoading"
								text="Create account"
								_type="submit"
								color="primary"
							/>

							<BaseButton
								v-if="store.isLoading"
								text="Creating..."
								_type="submit"
								:disabled="true"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="hidden bg-primary-600 sm:block"></div>
	</div>
</template>
<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import useAlert from '@/composables/useAlert';
import { ref } from 'vue';

const { pushAlert } = useAlert();
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
	} else {
		window.location.reload();
	}
};
</script>
