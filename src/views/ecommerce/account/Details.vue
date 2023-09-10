<template>
	<div class="mx-auto min-h-screen max-w-[54rem]">
		<div class="mx-10">
			<h2 class="my-6 font-nunito text-2xl font-black text-indigo-400">
				Account information
			</h2>

			<div
				class="relative rounded-xl bg-white px-6 py-4 pb-6 text-lg shadow-sm"
			>
				<h3 class="mb-3 text-xl">Profile</h3>
				<div v-if="!editInfo">
					<button
						class="absolute right-5 top-5"
						@click="editInfo = true"
					>
						<VueFeather type="edit" size="18" class="" />
					</button>
					<ul class="">
						<li>First name: {{ EcomAuthStore.user.firstName }}</li>
						<li>Last name: {{ EcomAuthStore.user.lastName }}</li>
						<li>Email: {{ EcomAuthStore.user.email }}</li>
					</ul>
				</div>

				<form @submit.prevent="handleSubmit" v-if="editInfo">
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-6">
							<BaseInput
								id="input_sku"
								label="First Name"
								v-model="EcomAuthStore.user.firstName"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.firstName ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_sku"
								label="Last Name"
								v-model="EcomAuthStore.user.lastName"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.lastName ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_sku"
								type="email"
								label="Email"
								v-model="EcomAuthStore.user.email"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.email || null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
					</div>
					<div class="mt-4 flex justify-end space-x-2">
						<button
							class="rounded-lg bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-400 hover:text-white"
							@click="editInfo = false"
						>
							Cancel
						</button>
						<button
							class="rounded-lg bg-green-400 px-4 py-2 text-white hover:bg-green-500 disabled:bg-gray-300 disabled:text-white"
							:disabled="EcomAuthStore.isLoading"
						>
							Save changes
						</button>
					</div>
				</form>
			</div>

			<div
				class="relative mt-8 rounded-xl bg-white px-6 py-4 text-lg shadow-sm"
			>
				<h3 class="mb-3 text-xl">Address</h3>
				<button class="absolute right-4 top-4">
					<VueFeather type="edit" size="18" class="" />
				</button>
				<ul>
					<li>First name: {{ EcomAuthStore.user.firstName }}</li>
					<li>Last name: {{ EcomAuthStore.user.lastName }}</li>
					<li>Email: {{ EcomAuthStore.user.email }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';

const EcomAuthStore = useEcomAuthStore();
const form = ref({});
const editInfo = ref(false);

onMounted(() => {
	console.log(EcomAuthStore.user);
});

const handleSubmit = () => {
	console.log('handle submit');
};
</script>

<style lang="scss" scoped></style>
