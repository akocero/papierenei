<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Update Discount Info.</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'sales.discounts' }"
			/>
		</div>
		<form
			@submit.prevent="handleSubmit"
			v-if="store.item && !store.isLoading"
		>
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="code"
						label="Discount Code"
						v-model="store.item.code"
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
						v-model="store.item.discountKind"
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
						label="Discount Value"
						v-model="store.item.discountValue"
						:error="store.error"
						:errorField="store.error?.errors?.discountValue || null"
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
import { useDiscountStore } from '@/stores/discount';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useDiscountStore();

onBeforeMount(async () => {
	await store.find(route.params.id);
});

const handleSubmit = async () => {
	store.error = null;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Discount <${res.code}> is updated!`);
	router.push({
		name: 'sales.discounts',
	});
};
</script>

<style></style>
