<template>
	<div class="card">
		<div class="mb-4 flex items-baseline" v-if="store.item">
			<h4 class="text-xl">Discount Info.</h4>
			<BaseButton
				_type="link"
				text="Edit"
				:route-object="{
					name: 'sales.discounts.edit',
					params: { id: store.item._id },
				}"
				_class="ml-auto mr-2"
				color="primary"
			/>
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
						:disabled="true"
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
						:disabled="true"
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
						:disabled="true"
					/>
				</div>
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

	console.log(store.item);
});

const handleSubmit = async () => {
	store.error = null;
};
</script>

<style></style>
