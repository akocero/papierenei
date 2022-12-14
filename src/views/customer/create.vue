<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Customer</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'sales.customers' }"
			/>
		</div>
		<form @submit.prevent="handleSubmit">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="firstName"
						:error="store.error"
						:errorField="store.error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_lastName"
						label="Last Name"
						v-model="lastName"
						:error="store.error"
						:errorField="store.error?.errors?.lastName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						type="email"
						id="input_email"
						label="Email"
						v-model="email"
						:error="store.error"
						:errorField="store.error?.errors?.email || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>

				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_mobileNumber"
						label="Mobile Number"
						v-model="mobileNumber"
						:error="store.error"
						:errorField="store.error?.errors?.mobileNumber || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_streetAddress"
						label="Street Address"
						v-model="streetAddress"
						:error="store.error"
						:errorField="store.error?.errors?.streetAddress || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_state"
						label="State"
						v-model="state"
						:error="store.error"
						:errorField="store.error?.errors?.state || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_city"
						label="City"
						v-model="city"
						:error="store.error"
						:errorField="store.error?.errors?.city || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>

				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_zipCode"
						label="Zip Code"
						v-model="zipCode"
						:error="store.error"
						:errorField="store.error?.errors?.zipCode || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
			</div>
			<div class="mt-6">
				<BaseButton _type="submit" text="Save" color="primary" />
			</div>
		</form>
	</div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputMultiple from '@/components/InputMultiple.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import DisplayFieldArray from '@/components/DisplayFieldArray.vue';
import useInputMultiple from '@/composables/useInputMultiple';
import { ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useCustomerStore } from '@/stores/customer';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useCustomerStore();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const streetAddress = ref('');
const state = ref('');
const city = ref('');
const zipCode = ref('');
const mobileNumber = ref('');
const error = null;

const handleSubmit = async () => {
	store.error = null;

	const data = {
		email: email.value,
		firstName: firstName.value,
		lastName: lastName.value,
		streetAddress: streetAddress.value,
		mobileNumber: mobileNumber.value,
		state: state.value,
		zipCode: zipCode.value,
		city: city.value,
	};

	await store.create(data);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Customer added!');
	router.push({
		name: 'sales.customers',
	});
};
</script>

<style></style>
