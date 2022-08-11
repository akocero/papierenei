<template>
	<div class="card">
		<div class="mb-4 flex items-baseline" v-if="store.item">
			<h4 class="text-xl">Product Info.</h4>
			<BaseButton
				_type="link"
				text="Edit"
				:route-object="{
					name: 'warehouse.products.edit',
					params: { id: store.item._id },
				}"
				_class="ml-auto mr-2"
				color="primary"
			/>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.products' }"
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
						:disabled="true"
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
						:disabled="true"
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
						:disabled="true"
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
						:disabled="true"
						:required="false"
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
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useProductStore();

onBeforeMount(async () => {
	await store.find(route.params.id);

	console.log(store.item);
});

const handleSubmit = async () => {
	store.error = null;

	// await store.create(data);

	// if (store.error) {
	// 	pushAlert('error', store.error.message);
	// 	return;
	// }

	// pushAlert('success', 'Customer Added!');
	// router.push({
	// 	name: 'sales.customers',
	// });
};
</script>

<style></style>
