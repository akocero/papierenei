<template>
	<div class="main-container">
		<TitleBar title="Manage Account">
			<template #actions>
				<!-- <BaseButton text="Save" @click="handleUpdateAaccount" color="primary" /> -->
			</template>
		</TitleBar>
		<ErrorBar :error="error" v-if="error && error?.errors?.length > 0" />
		<div class="mt-6 grid grid-cols-12 gap-y-10">
			<div class="col-span-4 pr-16">
				<h3 class="text-xl">Account Details</h3>
				<p class="text-gray-500">
					You can manage your accoutn details, by editing the fields
					on the right side
				</p>
			</div>
			<div class="col-span-8">
				<form @click.prevent class="card">
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-6">
							<BaseInput
								id="input_name"
								label="Name"
								v-model="store.user.name"
								:error="store.error"
								:errorField="store.error?.errors?.name || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_email"
								label="Email"
								v-model="store.user.email"
								:error="store.error"
								:errorField="store.error?.errors?.email || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
					</div>
				</form>
				<div class="flex justify-end">
					<BaseButton
						text="Update Account"
						@click="handleUpdateAaccount"
						color="primary"
					/>
				</div>
			</div>

			<div class="col-span-4 pr-16">
				<h3 class="text-xl">Update Password</h3>
				<p class="text-gray-500">You can manage your password.</p>
			</div>
			<div class="col-span-8">
				<form @click.prevent class="card">
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-6">
							<BaseInput
								type="password"
								id="input_current_pass"
								label="Current Password"
								v-model="account.password"
								:error="store.error"
								:errorField="store.error?.errors?.name || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6"></div>
						<div class="col-span-6">
							<BaseInput
								type="password"
								id="input_new_pass"
								label="New Password"
								v-model="account.newPassword"
								:error="store.error"
								:errorField="store.error?.errors?.email || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								type="password"
								id="input_conf_pass"
								label="Confirm Password"
								v-model="account.passwordConfirm"
								:error="store.error"
								:errorField="store.error?.errors?.email || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
					</div>
				</form>
				<div class="flex justify-end">
					<BaseButton
						text="Update Password"
						@click="handleUpdatePassword"
						color="primary"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import useAlert from '../../composables/useAlert';
import _ from 'lodash';

const store = useAuthStore();
const { pushAlert } = useAlert();

const account = ref({
	password: '',
	newPassword: '',
	passwordConfirm: '',
});

const error = ref({});

onBeforeMount(() => {
	console.log(store.user);
});

const handleUpdateAaccount = async () => {
	const user = await store.updateMe();

	if (store.error) {
		pushAlert('error', 'Invalid inputs!');
		return;
	}

	pushAlert('success', 'Account updated!');
};

const handleUpdatePassword = async () => {
	error.value.errors = [];
	for (const key in account.value) {
		if (!account.value[key]) {
			error.value.errors.push(`${_.startCase(key)} can't be blank!`);
		}
	}

	if (error.value.errors.length > 0) {
		return;
	}

	await store.updatePassword(account.value);

	if (store.error && store.error.message.includes('password')) {
		error.value.errors.push(store.error.message);
		return;
	}

	if (store.error && store.error?.errors) {
		error.value.errors.push(store.error.errors.passwordConfirm);
		return;
	}

	pushAlert('success', 'Password updated!');
};
</script>
