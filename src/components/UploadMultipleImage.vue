<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">{{ title }}</h4>
		</div>
		<form class="">
			<div class="mb-2 border-2 border-dotted p-3">
				<input
					type="file"
					multiple
					@change="onFileSelected"
					class="w-full"
				/>
				<BaseButton
					@click.prevent="handleSubmit"
					text="Upload"
					color="primary"
					_class="mt-2"
					v-if="!isLoading && selectedFile"
				/>
				<BaseButton
					v-if="isLoading"
					text="Uploading..."
					color="primary"
					_class="mt-2"
					:disabled="true"
				/>
			</div>
		</form>
		<div class="grid w-full grid-cols-2 gap-4" v-if="store.item">
			<div
				v-for="image in store.item[db_column]"
				:key="image.public_id"
				class="group relative h-40 border"
			>
				<button
					class="invisible absolute top-2 right-2 h-5 w-5 bg-red-500 text-white group-hover:visible"
					@click="deleteImage(image.public_id)"
				>
					<VueFeather type="x" size="18" class="" />
				</button>
				<img
					:src="image.secure_url"
					alt=""
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import useAlert from '@/composables/useAlert';

const { pushAlert } = useAlert();
const props = defineProps({
	item_id: String,
	store: Object,
	db_column: {
		type: String,
		default: 'images',
	},
	title: {
		type: String,
		default: 'Photos',
	},
});

const selectedFile = ref('');
const isLoading = ref(false);

const onFileSelected = (event) => {
	if (event.target.files.length) {
		selectedFile.value = event.target.files;
		console.log('1');
	} else {
		selectedFile.value = '';
		console.log('2');
	}
};

// upload multiple image to clodinary
const uploadImages = async () => {
	const files = [];
	for (const file of selectedFile.value) {
		// formData.append('file', file);
		files.push(file);
	}

	const images = [];

	await Promise.all(
		files.map(async (file, i) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'papierenei_preset');

			const data = await fetch(
				'https://api.cloudinary.com/v1_1/erro/image/upload',
				{
					method: 'POST',
					body: formData,
				},
			).then((r) => r.json());

			console.log(i, data);

			images.push({
				public_id: data.public_id,
				secure_url: data.secure_url,
				width: data.width,
				height: data.height,
			});
		}),
	);

	return images;
};
// update db base on image uploaded
const handleSubmit = async () => {
	isLoading.value = true;
	props.store.error = null;

	const images = await uploadImages();

	images.forEach((image) => {
		props.store.item[props.db_column].push(image);
	});

	const res = await props.store.update(props.store.item);

	if (props.store.error) {
		pushAlert('error', props.store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Product <${res.name}> is updated!`);
	selectedFile.value = '';

	isLoading.value = false;
};

// delete image from cloudenary and db
const deleteImage = async (image_id) => {
	if (confirm('Are you sure you want to delete this image?') == true) {
		const res = await props.store.deleteImage({
			_id: props.store.item._id,
			image_id,
			is_multiple_image: true,
			column_name: 'images',
		});

		if (props.store.error) {
			pushAlert('error', props.store.error.message);
			return;
		}
		props.store.item[props.db_column] = props.store.item[
			props.db_column
		].filter((image) => image_id !== image.public_id);

		pushAlert('info', `image is deleted`);
	}
};
</script>
