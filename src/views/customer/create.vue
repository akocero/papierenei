<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Customer</h4>
			<BaseButton text="Save" />
		</div>
		<form @submit.prevent="handleSumbit">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_name"
						label="Name"
						v-model="name"
						:error="error"
						:errorField="error?.errors?.name || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<InputMultiple
						id="input_also_known_as"
						label="Also known as (Press + icon to add)"
						v-model="_also_known_as"
						:error="error"
						:errorField="error?.errors?.also_known_as || null"
						placeholder="Ex. ABC"
						:required="true"
						@pushValue="pushAlias"
					/>
					<DisplayFieldArray
						:dataArr="also_known_as"
						@pop="popAlias"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseSelect
						id="select_nen_type"
						label="Nen Type"
						v-model="_nen_type"
						:error="error"
						:errorField="error?.errors?.nen_type || null"
						:options="[
							{ label: 'Enhancement', value: 'enhancement' },
							{ label: 'Manipulation', value: 'manipulation' },
							{ label: 'Emission', value: 'emission' },
							{
								label: 'Specialization',
								value: 'specialization',
							},
							{ label: 'Conjuration', value: 'conjuration' },
							{ label: 'Transmutation', value: 'transmutation' },
							{ label: 'Unknown', value: 'unknown' },
						]"
						:required="true"
					/>
					<DisplayFieldArray :dataArr="nen_type" @pop="popNenType" />
				</div>

				<div class="col-span-full md:col-span-2">
					<BaseTextArea
						id="notes"
						label="Notes"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. "
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseSelect
						id="invoiceFor"
						label="Invoice for"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.invoiceFor || null"
						:options="[]"
						optionLabel="firstName"
						optionValue="_id"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstName"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<SelectSearch />
				</div>
			</div>
			<div class="mt-2">
				<BaseButton _type="submit" text="Save" />
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

const name = ref('');
const gender = ref('');
const _also_known_as = ref('');
const _nen_type = ref('');
const abilitity = ref('');
const japanese_name = ref('');
const profession = ref('');
const state = ref('');
const descriptions = ref('');
const hunter_star = ref('');
const error = null;

const { data: nen_type, pop: popNenType } = useInputMultiple(
	_nen_type,
	'select',
);
const {
	data: also_known_as,
	push: pushAlias,
	pop: popAlias,
} = useInputMultiple(_also_known_as);

const handleSumbit = () => {
	console.log(genders.value, arr_also_known_as.value);
};
</script>

<style></style>
