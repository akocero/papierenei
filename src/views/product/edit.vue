<template>
	<div class="-mt-4 mb-2 flex items-baseline justify-between">
		<h4 class="text-xl">Update Product Info.</h4>
		<div>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.products' }"
				_class="mr-2"
			/>
			<BaseButton
				_type="submit"
				@click="handleSubmit"
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
	</div>
	<div class="flex flex-col items-start gap-6 md:flex-row">
		<div class="card grow">
			<form
				@submit.prevent="handleSubmit"
				v-if="store.item && !store.isLoading"
				id="form_edit_product"
				name="form_edit_product"
			>
				<div class="grid grid-cols-6 gap-4">
					<div
						class="col-span-full flex items-center justify-between font-semibold"
					>
						<div>Basic Info.</div>
						<button
							class="rounded-lg bg-green-500 px-4 py-2 text-white"
							v-if="store.item.isPublished"
							@click="store.item.isPublished = 0"
						>
							Published
						</button>
						<button
							class="rounded-lg bg-gray-300 px-4 py-2"
							v-if="!store.item.isPublished"
							@click="store.item.isPublished = 1"
						>
							Unpublished
						</button>
					</div>

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
							:step="0.01"
						/>
					</div>
					<div class="col-span-full md:col-span-2">
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
					<div class="col-span-full font-semibold">
						Advance / Inventory
					</div>
					<div class="col-span-full md:col-span-2">
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
					<div class="col-span-full md:col-span-2">
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
					<div class="col-span-full md:col-span-2">
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
						color="primary"
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
		<div class="w-full md:w-1/3">
			<BaseSearchSelectCard
				v-model="store.item.collections"
				v-if="store.item && !store.isLoading"
				:store="collectionStore"
				label="Collections"
			/>

			<BaseSearchSelectCard
				v-model="store.item.tags"
				v-if="store.item && !store.isLoading"
				:store="tagStore"
				:canCreateItem="true"
				label="Tags"
			/>

			<ImageManager
				:store="store"
				title="Cover Photo"
				db_column="coverPhoto"
				v-if="store.item"
				uploadType="single"
			/>

			<ImageManager
				:store="store"
				title="Images"
				db_column="images"
				v-if="store.item"
				uploadType="multiple"
			/>

			<Spinner v-else />
		</div>
	</div>
</template>

<script setup>
import ImageManager from '@/components/image_module/ImageManager.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

import BaseTextArea from '@/components/BaseTextArea.vue';

import { onBeforeMount, ref, watch } from 'vue';
import { useProductStore } from '@/stores/product';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import BaseSearchSelectCard from '@/components/BaseSearchSelectCard.vue';
import { useTagStore } from '@/stores/tag';
import { useCollectionStore } from '@/stores/collection';

const router = useRouter();
const route = useRoute();
const { pushAlert, pushToast } = useAlert();
const store = useProductStore();
const tagStore = useTagStore();
const collectionStore = useCollectionStore();

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
