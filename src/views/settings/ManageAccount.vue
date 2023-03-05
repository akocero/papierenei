<template>
	<div class="main-container">
		<TitleBar title="Manage Account">
			<template #actions>
				<!-- <BaseButton text="Save" @click="handleSubmit" color="primary" /> -->
			</template>
		</TitleBar>
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
						@click="handleSubmit"
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
								id="input_name"
								label="Current Password"
								v-model="store.user.name"
								:error="store.error"
								:errorField="store.error?.errors?.name || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6"></div>
						<div class="col-span-6">
							<BaseInput
								id="input_email"
								label="New Password"
								v-model="store.user.email"
								:error="store.error"
								:errorField="store.error?.errors?.email || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_email"
								label="Confirm Password"
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
						text="Update Password"
						@click="handleSubmit"
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

const store = useAuthStore();
const { pushAlert } = useAlert();
onBeforeMount(() => {
	console.log(store.user);
});

const handleSubmit = async () => {
	const user = await store.updateMe();

	if (store.error) {
		pushAlert('error', 'Invalid inputs!');
		return;
	}

	pushAlert('success', 'Account updated!');
};
</script>
