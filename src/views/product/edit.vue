<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Update Product Info.</h4>
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
						id="input_name"
						label="Product Name"
						v-model="store.item.name"
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
						v-model="store.item.sku"
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
						v-model="store.item.unitCost"
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
						v-model="store.item.description"
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
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useProductStore();

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
	pushAlert('info', `Product <${res.name}> is updated!`);
	router.push({
		name: 'warehouse.products',
	});
};
</script>

<style></style>
