<template>
	<SelectImage
		v-if="showSelectImage"
		:isOpen="showSelectImage"
		@closeModal="closeSelectImage"
		@updateModelImages="handleUpdateModelImages"
		:upload-type="uploadType"
	/>

	<UploadImage
		v-if="showUploadImage"
		:isOpen="showUploadImage"
		@closeModal="closeUploadImage"
		:isUploading="isUploading"
		@handleUploadImages="handleUploadImages"
		:upload-type="uploadType"
	/>

	<div class="flex justify-center" v-if="validateSingleUpload">
		<Menu
			as="div"
			class="relative mb-3 inline-block rounded-sm border bg-white py-1 px-3"
		>
			<div>
				<MenuButton class="justify-cente flex w-full items-center">
					<vue-feather
						type="plus"
						size="18"
						class="mr-1"
					></vue-feather>
					<span class="font-semibold">Add media</span>
					<vue-feather
						type="chevron-down"
						size="18"
						class="ml-1"
					></vue-feather>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute left-0 z-20 mt-3 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="">
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active
										? 'bg-gray-500 text-white'
										: 'text-gray-900',
									'group flex w-full items-center space-x-3 whitespace-nowrap px-4 py-2',
								]"
								@click="openSelectImage"
							>
								Add existing media
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active
										? 'bg-gray-500 text-white'
										: 'text-gray-900',
									'group flex w-full items-center space-x-3 whitespace-nowrap px-4 py-2',
								]"
								@click="showUploadImage = true"
							>
								Add new media
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import useAlert from '@/composables/useAlert';
import { useImageStore } from '@/stores/image';
import SelectImage from './SelectImage.vue';
import UploadImage from './UploadImage.vue';

const { pushAlert, pushToast } = useAlert();
const showUploadImage = ref(false);
const showSelectImage = ref(false);

const imageStore = useImageStore();
const props = defineProps({
	// store of the given model ex: product, customer
	store: {
		type: Object,
		required: true,
	},
	// field property of the model you want to manipulate ex: images, coverPhoto, avatar, profilePic
	db_column: {
		type: String,
		required: true,
	},

	// single or multiple upload
	uploadType: {
		type: String,
		default: 'multiple',
		validator(value) {
			return ['single', 'multiple'].includes(value);
		},
	},
});

const isUploading = ref(false);

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

			const { data: addedImage } = await imageStore.create(formData);

			if (imageStore.error) {
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
	props.store.error = null;

	if (props.store?.item[props.db_column] === undefined) {
		props.store.item[props.db_column] = [];
	}

	// get all uploaded images
	const images = await uploadImages(selectedFiles);

	// push the image id to the model/store.item base on the given property name (db_column)
	images.forEach((image) => {
		props.store.item[props.db_column].push(image);
	});

	// update request
	// await props.store.update(props.store.item);

	if (props.store.error) {
		pushToast({
			status: 'error',
			title: 'Error Updating!',
			message: props.store.error.message,
		});
		return;
	}

	pushToast({
		status: 'success',
		title: 'Product Updated!',
		message: 'Updated succesfully!',
	});

	closeUploadImage();

	isUploading.value = false;
};

const closeSelectImage = () => {
	showSelectImage.value = false;
};

const openSelectImage = () => {
	showSelectImage.value = true;
};

const closeUploadImage = () => {
	showUploadImage.value = false;
};

const validateSingleUpload = computed(() => {
	if (props.uploadType === 'multiple') {
		return true;
	}

	if (props.uploadType === 'single') {
		if (props.store?.item[props.db_column]?.length) {
			return false;
		}

		return true;
	}
});

const handleUpdateModelImages = async (image_ids) => {
	if (props.store.item[props.db_column] === undefined) {
		props.store.item[props.db_column] = [];
	}

	// get all existing images
	const existingImages = props.store.item[props.db_column].map((image) => {
		return image._id;
	});

	// validate if the image is already added
	image_ids.forEach((id) => {
		if (!existingImages.includes(id)) {
			props.store.item[props.db_column].push(id);
		}
	});

	// await props.store.update(props.store.item);

	closeSelectImage();

	pushToast({
		status: 'success',
		title: 'Image Added',
		message: 'Image succesfully saved!',
	});
};
</script>
