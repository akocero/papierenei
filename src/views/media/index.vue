<template>
	<UploadImage
		v-if="showUploadImage"
		:isOpen="showUploadImage"
		@closeModal="showUploadImage = false"
		:isUploading="isUploading"
		@handleUploadImages="handleUploadImages"
		upload-type="multiple"
	/>
	<TitleBar title="Media">
		<template #actions>
			<BaseButton
				text="Add Image"
				@click="showUploadImage = true"
				color="primary"
			/>
		</template>
	</TitleBar>
	<div class="card">
		<TableSearch
			:options="searchOptions"
			selected-option="sku"
			@search="search"
		/>
		<TableData
			:data="store.list"
			:headers="tableHeaders"
			:isLoading="store.isLoading"
		>
			<template #item-secure_url="item">
				<div class="relative h-8">
					<img
						:src="item.secure_url"
						alt=""
						class="h-full object-contain"
					/>
				</div>
			</template>

			<template #item-width="item">
				{{ item.width }} x {{ item.height }} px
			</template>

			<template #item-createdAt="item">
				{{ moment(item.createdAt).format('MM/DD/YYYY') }}
			</template>

			<template #item-actions="item">
				<BaseTableActionButton
					_type="button"
					icon="trash"
					@click="deleteImage(item._id)"
				/>
			</template>
		</TableData>
		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import TablePagination from '@/components/TablePagination.vue';
import { useImageStore } from '@/stores/image';
import useAlert from '@/composables/useAlert';
import TableSearch from '@/components/TableSearch.vue';
import moment from 'moment';
import UploadImage from '@/components/image_module/UploadImage.vue';

const store = useImageStore();
const { pushAlert, pushToast } = useAlert();
const searchString = ref('');

const searchOptions = [{ label: 'SKU', value: 'sku' }];
const tableHeaders = [
	{ text: 'Preview', value: 'secure_url' },
	{ text: 'Dimensions', value: 'width' },
	{ text: 'Uploaded at', value: 'createdAt' },
	{
		text: 'Actions',
		value: 'actions',
		cellClass: 'flex space-x-2',
	},
];

const showUploadImage = ref(false);
const isUploading = ref(false);

onBeforeMount(async () => {
	await fetchData();

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

// populate to store.item the selected images
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
