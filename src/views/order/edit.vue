<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Update Order Info.</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'sales.orders' }"
			/>
		</div>
		<form
			@submit.prevent="handleSubmit"
			v-if="store.item && !store.isLoading"
		>
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Customer First Name"
						v-model="store.item.firstName"
						:error="store.error"
						:errorField="store.error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Customer Last Name"
						v-model="store.item.lastName"
						:error="store.error"
						:errorField="store.error?.errors?.lastName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Customer Email"
						v-model="store.item.email"
						:error="store.error"
						:errorField="store.error?.errors?.email || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Customer Contact Number"
						v-model="store.item.contactNumber"
						:error="store.error"
						:errorField="store.error?.errors?.contactNumber || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-4">
					<BaseInput
						id="input_name"
						label="Street Address"
						v-model="store.item.streetAddress"
						:error="store.error"
						:errorField="store.error?.errors?.streetAddress || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_name"
						label="Country"
						v-model="store.item.country"
						:error="store.error"
						:errorField="store.error?.errors?.country || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_name"
						label="State"
						v-model="store.item.state"
						:error="store.error"
						:errorField="store.error?.errors?.state || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_name"
						label="City"
						v-model="store.item.city"
						:error="store.error"
						:errorField="store.error?.errors?.city || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_name"
						label="Zip Code"
						v-model="store.item.zipCode"
						:error="store.error"
						:errorField="store.error?.errors?.zipCode || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>

				<div class="col-span-full md:col-span-6">
					<BaseTextArea
						id="input_description"
						label="Order Notes"
						v-model="store.item.notes"
						:error="store.error"
						:errorField="store.error?.errors?.notes || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
			<div class="mt-6">
				<BaseButton
					v-if="!store.isLoading"
					_type="submit"
					text="Save Changes"
					color="primary"
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
import Spinner from '@/components/Spinner.vue';
import { onBeforeMount, ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useOrderStore } from '@/stores/order';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useOrderStore();

onBeforeMount(async () => {
	await store.find(route.params.id);

	console.log(store.item);
});

const handleSubmit = async () => {
	store.error = null;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Order <${res.name}> is updated!`);
	router.push({
		name: 'sales.orders',
	});
};
</script>

<style></style>
