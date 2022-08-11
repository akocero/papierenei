<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Discount</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.products' }"
			/>
		</div>
		<form @submit.prevent="handleSubmit">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="code"
						label="Discount Code"
						v-model="code"
						:error="store.error"
						:errorField="store.error?.errors?.code || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseSelect
						id="discountKind"
						label="Discount Type"
						v-model="discountKind"
						:error="store.error"
						:errorField="store.error?.errors?.discountKind || null"
						:options="[
							{
								value: 'percent',
								label: 'Percent',
							},
							{
								value: 'amount',
								label: 'Amount',
							},
						]"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="discountValue"
						type="number"
						label="Discount Value"
						v-model="discountValue"
						:error="store.error"
						:errorField="store.error?.errors?.discountValue || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
			<div class="mt-6">
				<BaseButton
					_type="submit"
					text="Save"
					color="primary"
					v-if="!store.isLoading"
				/>
				<BaseButton
					v-if="store.isLoading"
					_type="submit"
					text="Saving..."
					color="primary"
					:disabled="true"
				/>
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
import { useDiscountStore } from '@/stores/discount';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useDiscountStore();
const discountValue = ref('');
const code = ref('');
const discountKind = ref('');
const quantity = ref('');

const handleSubmit = async () => {
	store.error = null;

	const data = {
		discountValue: discountValue.value,
		code: code.value,
		discountKind: discountKind.value,
	};

	await store.create(data);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Discount added!');
	router.push({
		name: 'sales.discounts',
	});
};
</script>

<style></style>
