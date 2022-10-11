<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Product</h4>
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
						id="input_name"
						label="Product Name"
						v-model="name"
						:error="store.error"
						:errorField="store.error?.errors?.name || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_sku"
						label="SKU"
						v-model="sku"
						:error="store.error"
						:errorField="store.error?.errors?.sku || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_unitCost"
						type="number"
						label="Unit Cost"
						v-model="unitCost"
						:error="store.error"
						:errorField="store.error?.errors?.unitCost || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseTextArea
						id="input_description"
						label="Description"
						v-model="description"
						:error="store.error"
						:errorField="store.error?.errors?.description || null"
						placeholder="Ex. "
						:required="false"
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
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useProductStore();
const unitCost = ref('');
const name = ref('');
const description = ref('');
const quantity = ref('');
const sku = ref('');
const error = null;

const handleSubmit = async () => {
	store.error = null;

	const data = {
		unitCost: unitCost.value,
		name: name.value,
		sku: sku.value,
		description: description.value,
	};

	const res = await store.create(data);

	console.log(res);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Product added!');
	router.push({
		name: 'warehouse.products.edit',
		params: { id: res.data._id },
	});

	// router.push({ name: 'user', params: { username } })
};
</script>

<style></style>
