<template>
	<div class="mx-auto max-w-[54rem]">
		<div class="mx-10">
			<h2 class="my-6 font-nunito text-3xl font-black text-indigo-400">
				Account Information
			</h2>

			<div
				class="relative rounded bg-white px-8 py-6 pb-6 text-lg shadow-sm"
			>
				<div v-if="!editInfo">
					<h3 class="mb-3 font-nunito font-bold text-indigo-400">
						Profile
					</h3>
					<button
						class="absolute right-6 top-6"
						@click="editInfo = true"
					>
						<VueFeather type="edit" size="18" class="" />
					</button>

					<ul class="capitalize text-gray-400">
						<li>
							First name:
							<span class="text-gray-600">{{
								EcomAuthStore.user.firstName
							}}</span>
						</li>
						<li>
							Last name:
							<span class="text-gray-600">{{
								EcomAuthStore.user.lastName
							}}</span>
						</li>
						<li>
							Mobile number:
							<span class="text-gray-600">{{
								EcomAuthStore.user.mobileNumber
							}}</span>
						</li>
						<li>
							Email:
							<span class="lowercase text-gray-600">{{
								EcomAuthStore.user.email
							}}</span>
						</li>
					</ul>
					<hr class="mt-4" />
					<h3 class="mb-3 mt-4 font-nunito font-bold text-indigo-400">
						Default Shipping Address
					</h3>
					<ul class="capitalize text-gray-400">
						<li>
							City:
							<span class="text-gray-600">{{
								EcomAuthStore.user.city
							}}</span>
						</li>
						<li>
							Barangay:
							<span class="text-gray-600">{{
								EcomAuthStore.user.barangay
							}}</span>
						</li>
						<li>
							Province:
							<span class="text-gray-600">{{
								EcomAuthStore.user.province
							}}</span>
						</li>
						<li>
							Street address:
							<span class="text-gray-600">{{
								EcomAuthStore.user.streetAddress
							}}</span>
						</li>
						<li>
							Zip Code:
							<span class="text-gray-600">{{
								EcomAuthStore.user.zipCode
							}}</span>
						</li>
					</ul>
				</div>

				<form @submit.prevent="handleUpdateMe" v-if="editInfo">
					<div class="grid grid-cols-12 gap-4">
						<h3
							class="col-span-full font-nunito font-bold text-indigo-400"
						>
							Profile
						</h3>
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
								:disabled="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_mobile-number"
								type="text"
								label="Mobile Number"
								v-model="EcomAuthStore.user.mobileNumber"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.mobileNumber ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>

						<h3
							class="col-span-full font-nunito font-bold text-indigo-400"
						>
							Default Shipping Address
						</h3>
						<div class="col-span-6">
							<BaseInput
								id="input_city"
								type="text"
								label="City"
								v-model="EcomAuthStore.user.city"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.city || null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_barangay"
								type="text"
								label="Barangay"
								v-model="EcomAuthStore.user.barangay"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.barangay ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_province"
								type="text"
								label="Province"
								v-model="EcomAuthStore.user.province"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.province ||
									null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_streetAddress"
								type="text"
								label="Street Address"
								v-model="EcomAuthStore.user.streetAddress"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors
										?.streetAddress || null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_zipCode"
								type="text"
								label="Zip Code"
								v-model="EcomAuthStore.user.zipCode"
								:error="EcomAuthStore.error"
								:errorField="
									EcomAuthStore.error?.errors?.zipCode || null
								"
								placeholder="Ex. ABC"
								:required="false"
							/>
						</div>
					</div>

					<div class="mt-4 flex justify-end space-x-2">
						<button
							type="button"
							class="rounded-lg bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-400 hover:text-white"
							@click="calcelEdit"
						>
							Cancel
						</button>
						<button
							class="rounded-lg bg-green-400 px-4 py-2 text-white hover:bg-green-500 disabled:bg-gray-300 disabled:text-white"
							:disabled="EcomAuthStore.isLoading"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';
import useAlert from '@/composables/useAlert';

const EcomAuthStore = useEcomAuthStore();
const form = ref({});
const editInfo = ref(false);
const { pushAlert } = useAlert();

onMounted(() => {
	console.log(EcomAuthStore.user);
});

const handleUpdateMe = async () => {
	EcomAuthStore.error = null;

	const res = await EcomAuthStore.updateMe(EcomAuthStore.user);

	if (EcomAuthStore.error) {
		pushAlert('error', EcomAuthStore.error.message);
		return;
	}
	editInfo.value = false;
	pushAlert('success', 'Updated successfully');
};

const calcelEdit = () => {
	window.location.reload();
};
</script>

<style lang="scss" scoped></style>
