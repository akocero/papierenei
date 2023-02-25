<template>
	<UploadImage
		v-if="showUploadImage"
		:isOpen="showUploadImage"
		@closeModal="showUploadImage = false"
		:isUploading="isUploading"
		@handleUploadImages="handleUploadImages"
		upload-type="multiple"
	/>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Media</h4>
			<BaseButton text="Add Image" @click="showUploadImage = true" />
		</div>
		<TableSearch
			:options="searchOptions"
			selected-option="sku"
			@search="search"
		/>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th>Preview</th>
						<th>Dimensions</th>
						<th>Uploaded At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>
							<div class="relative h-8">
								<img
									:src="item.secure_url"
									alt=""
									class="h-full object-contain"
								/>
							</div>
						</td>
						<td>{{ item.width }} x {{ item.height }} px</td>
						<td>
							{{ moment(item.createdAt).format('MM/DD/YYYY') }}
						</td>
						<td class="flex space-x-2">
							<BaseTableActionButton
								_type="button"
								icon="trash"
								@click="deleteImage(item._id)"
							/>
						</td>
					</tr>
					<tr v-if="store.isLoading">
						<td colspan="10" class="text-center">Loading...</td>
					</tr>
					<tr v-if="store.list.length <= 0 && !store.isLoading">
						<td colspan="10" class="text-center">
							No results found!
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import TablePagination from '@/components/TablePagination.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useImageStore } from '@/stores/image';
import useAlert from '@/composables/useAlert';
import useUtils from '@/composables/useUtils';
import TableSearch from '@/components/TableSearch.vue';
import moment from 'moment';
import UploadImage from '@/components/image_module/UploadImage.vue';

const store = useImageStore();
const { pushAlert, pushToast } = useAlert();
const { numberFormat } = useUtils();
const searchString = ref('');

const searchOptions = [{ label: 'SKU', value: 'sku' }];

const showUploadImage = ref(false);
const isUploading = ref(false);

onBeforeMount(async () => {
	// if (store.list.length <= 0) {
	await fetchData();
	// }
	if (store.error) {
		console.log('index', store.error);
		pushAlert('error', store.error.message);
		return;
	}
});

const search = async (_searchString) => {
	if (_searchString) {
		await fetchData(1, _searchString);

		if (store.list.length <= 0) {
		}
	} else {
		await fetchData();
	}
	searchString.value = _searchString;
};

const paginate = (page) => {
	fetchData(page, searchString.value || '');
};

const fetchData = async (page = 1, search = '', limit = 10) => {
	await store.fetch(`?${search}page=${page}&limit=${limit}`);
};

const uploadImages = async (selectedFiles) => {
	// loop through selected images
	// to convert it to iterable array objects
	const files = [];
	for (const file of selectedFiles) {
		files.push(file);
	}

	//
	const images = [];

	await Promise.all(
		files.map(async (file, i) => {
			const formData = new FormData();
			formData.append('file', file);

			const { data: addedImage } = await store.create(formData);

			if (store.error) {
				pushAlert('error', store.error.message);
				return;
			}

			images.push(addedImage);
		}),
	);

	return images;
};

// update db base on image uploaded
const handleUploadImages = async (selectedFiles) => {
	isUploading.value = true;
	store.error = null;

	// get all uploaded images
	const images = await uploadImages(selectedFiles);

	pushToast({
		status: 'success',
		title: 'Product Updated!',
		message: 'Updated succesfully!',
	});

	showUploadImage.value = false;
	isUploading.value = false;

	fetchData();
};

const deleteImage = async (id) => {
	if (
		confirm(
			'Are you sure you want to delete this image? \nThis action will update all the data related to this image!',
		) == true
	) {
		await store.destroy(id);

		if (store.error) {
			pushToast({
				status: 'error',
				title: 'Deletion Failed',
				message: store.error.message,
			});
		}

		pushToast({
			status: 'success',
			title: 'Image Deleted!',
			message: 'Deleted succesfully!',
		});

		fetchData();
	}

	// console.log('deleteImage', id);
};
</script>

<style></style>
