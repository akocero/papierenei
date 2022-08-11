<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Update Customer Info.</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'sales.customers' }"
			/>
		</div>
		<form
			@submit.prevent="handleSubmit"
			v-if="store.item && !store.isLoading"
		>
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="store.item.firstName"
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
						v-model="store.item.lastName"
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
						v-model="store.item.email"
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
						v-model="store.item.mobileNumber"
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
						v-model="store.item.streetAddress"
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
						v-model="store.item.state"
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
						v-model="store.item.city"
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
						v-model="store.item.zipCode"
						:error="store.error"
						:errorField="store.error?.errors?.zipCode || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
			</div>
			<div class="mt-6">
				<BaseButton
					_type="submit"
					text="Save Changes"
					color="primary"
					v-if="!store.isLoading"
				/>
				<BaseButton
					v-if="store.isLoading"
					_type="submit"
					text="Updating..."
					color="primary"
					:disabled="true"
				/>
			</div>
		</form>
		<Spinner v-else />
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
import { onBeforeMount, ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useCustomerStore } from '@/stores/customer';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useCustomerStore();

onBeforeMount(async () => {
	await store.find(route.params.id);

	console.log(store.item);
});

const handleSubmit = async () => {
	store.error = null;

	console.log(store.item);

	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Customer <${res.firstName}> is updated!`);
	router.push({
		name: 'sales.customers',
	});
};
</script>

<style></style>
