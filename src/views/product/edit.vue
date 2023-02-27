<template>
	<div class="main-container mb-2 flex items-baseline justify-between">
		<div class="flex w-full items-center">
			<router-link
				:to="{ name: 'warehouse.products' }"
				class="mr-4 flex items-center justify-center rounded-sm border py-2 px-4 hover:bg-gray-200"
			>
				<VueFeather type="arrow-left" size="20" class="" />
			</router-link>
			<h4 class="text-xl">Update Product Info.</h4>
			<div class="ml-auto">
				<BaseButton
					_type="submit"
					@click="handleSubmit"
					text="Save Changes"
					color="green"
					v-if="!store.isLoading"
				/>
				<BaseButton
					v-if="store.isLoading"
					_type="submit"
					text="Updating..."
					color="green"
					:disabled="true"
				/>
			</div>
		</div>
	</div>
	<div
		class="main-container mb-4 flex flex-col items-start gap-6 md:flex-row"
	>
		<div class="grow">
			<form
				@submit.prevent="handleSubmit"
				v-if="store.item && !store.isLoading"
				id="form_edit_product"
				name="form_edit_product"
			>
				<div class="card">
					<div class="mb-4">
						<BaseInput
							id="input_name"
							label="Title"
							v-model="store.item.name"
							:error="store.error"
							:errorField="store.error?.errors?.name || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="">
						<BaseTextArea
							id="input_description"
							label="Description"
							v-model="store.item.description"
							:error="store.error"
							:errorField="
								store.error?.errors?.description || null
							"
							placeholder="Ex. "
							:required="false"
						/>
					</div>
				</div>
				<div class="card grid grid-cols-12 gap-4">
					<div class="col-span-full">
						<h3 class="font-semibold">Pricing</h3>
					</div>
					<div class="col-span-4">
						<BaseInput
							id="input_unitCost"
							type="number"
							label="Price"
							v-model="store.item.unitCost"
							:error="store.error"
							:errorField="store.error?.errors?.unitCost || null"
							placeholder="Ex. ABC"
							:required="true"
							:step="0.01"
						/>
					</div>
					<div class="col-span-4">
						<BaseInput
							id="input_salePrice"
							type="number"
							label="Sale Price"
							v-model="store.item.salePrice"
							:error="store.error"
							:errorField="store.error?.errors?.salePrice || null"
							placeholder="Ex. ABC"
							:step="0.01"
						/>
					</div>
					<div class="col-span-4"></div>
					<div class="col-span-4">
						<BaseInput
							id="input_salePrice"
							type="number"
							label="Cost per item"
							v-model="store.item.actualCost"
							:error="store.error"
							:errorField="store.error?.errors?.salePrice || null"
							placeholder="0.00"
							:step="0.01"
						/>
					</div>
					<div class="col-span-4">
						<BaseInput
							id="input_salePrice"
							type="text"
							label="Profit"
							v-model="profit"
							:error="store.error"
							:errorField="null"
							placeholder="Comming Soon!"
							:step="0.01"
							:disabled="true"
						/>
					</div>
					<div class="col-span-4">
						<BaseInput
							id="input_salePrice"
							type="text"
							label="Margin"
							v-model="margin"
							:error="store.error"
							:errorField="null"
							placeholder="Comming Soon!"
							:step="0.01"
							:disabled="true"
						/>
					</div>
				</div>
				<ImageManager
					:store="store"
					title="Cover Photo"
					db_column="coverPhoto"
					v-if="store.item"
					uploadType="single"
				/>

				<div class="card grid grid-cols-12 gap-4">
					<div class="col-span-full font-semibold">
						Advance / Inventory
					</div>
					<div class="col-span-4">
						<BaseInput
							id="input_quantity"
							type="number"
							label="Quantity"
							v-model="store.item.quantity"
							:error="store.error"
							:errorField="store.error?.errors?.quantity || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-4">
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

					<div class="col-span-4">
						<BaseInput
							id="input_fileDownloadLink"
							type="text"
							label="Download Link"
							v-model="store.item.fileDownloadLink"
							:error="store.error"
							:errorField="
								store.error?.errors?.fileDownloadLink || null
							"
							placeholder="Ex. ABC"
						/>
					</div>
				</div>
				<div class="mt-6">
					<BaseButton
						_type="submit"
						text="Save Changes"
						color="green"
						v-if="!store.isLoading"
					></BaseButton>
					<BaseButton
						v-if="store.isLoading"
						_type="submit"
						text="Updating..."
						:disabled="true"
					/>
				</div>
			</form>
			<Spinner v-else />
		</div>
		<div class="w-full md:w-[36%]">
			<DrawerCard title="Product Status" v-if="store.item">
				<BaseSelect
					id="input_status"
					v-model="store.item.isPublished"
					:error="store.error"
					:errorField="store.error?.errors?.isPublished || null"
					:options="[
						{
							value: '1',
							label: 'Published',
						},
						{
							value: '0',
							label: 'Unpublished',
						},
					]"
				/>
			</DrawerCard>
			<ImageManager
				:store="store"
				title="Images"
				db_column="images"
				v-if="store.item"
				uploadType="multiple"
			/>
			<BaseSearchSelectCard
				v-model="store.item.categories"
				v-if="store.item && !store.isLoading"
				:store="categoryStore"
				label="Categories"
				placeholder="Find categories"
			/>

			<BaseSearchSelectCard
				v-model="store.item.collections"
				v-if="store.item && !store.isLoading"
				:store="collectionStore"
				label="Collections"
				placeholder="Find collections"
			/>

			<BaseSearchSelectCard
				v-model="store.item.tags"
				v-if="store.item && !store.isLoading"
				:store="tagStore"
				:canCreateItem="true"
				label="Tags"
				placeholder="Find or create tags"
			/>

			<Spinner v-else />
		</div>
	</div>
</template>

<script setup>
import ImageManager from '@/components/image_module/ImageManager.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import BaseTextArea from '@/components/BaseTextArea.vue';

import { onBeforeMount, ref, watch, computed } from 'vue';
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import BaseSearchSelectCard from '@/components/BaseSearchSelectCard.vue';
import { useTagStore } from '@/stores/tag';
import { useCollectionStore } from '@/stores/collection';
import { useCategoryStore } from '@/stores/category';
import DrawerCard from '../../components/DrawerCard.vue';
import useUtils from '@/composables/useUtils';

const router = useRouter();
const route = useRoute();
const { pushAlert, pushToast } = useAlert();
const { currencyFormat } = useUtils();
const store = useProductStore();
const tagStore = useTagStore();
const collectionStore = useCollectionStore();
const categoryStore = useCategoryStore();

const pricing = ref({
	profit: 0,
	margin: 0,
});

onBeforeMount(async () => {
	await store.find(route.params.id);

	console.log(store.item);
});
const margin = computed(() => {
	const unitCost = store.item.salePrice
		? store.item.salePrice
		: store.item.unitCost;
	const actualCost = store.item.actualCost;
	if (store.item.actualCost && store.item.unitCost) {
		const margin = 100 - (actualCost / unitCost) * 100;
		return margin.toFixed(1) + '%';
	}
});

const profit = computed(() => {
	const unitCost = store.item.salePrice
		? store.item.salePrice
		: store.item.unitCost;
	const actualCost = store.item.actualCost;
	if (store.item.actualCost && store.item.unitCost) {
		const profit = unitCost - actualCost;
		return '₱' + currencyFormat(profit.toFixed(1));
	}
});

const handleSubmit = async () => {
	store.error = null;

	console.log(store.item);
	// return;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushToast({
		status: 'success',
		message: 'Updated succesfully!',
		title: 'Product Updated',
	});
	router.push({
		name: 'warehouse.products',
	});
};
</script>

<style></style>
