<template>
	<DrawerCard :title="title">
		<form class="" v-if="!store.item[db_column]">
			<div class="mb-2 border-2 border-dotted p-3">
				<input type="file" @change="onFileSelected" class="w-full" />
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
				v-if="store.item[db_column]"
				class="group relative h-40 border"
			>
				<button
					class="invisible absolute top-2 right-2 h-5 w-5 bg-red-500 text-white group-hover:visible"
					@click="deleteImage(store.item[db_column].public_id)"
				>
					<VueFeather type="x" size="18" class="" />
				</button>
				<img
					:src="store.item[db_column].secure_url"
					alt=""
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	</DrawerCard>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import useAlert from '@/composables/useAlert';
import DrawerCard from './DrawerCard.vue';

const { pushAlert } = useAlert();
const props = defineProps({
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
const isCardOpen = ref(false);
const selectedFile = ref('');
const isLoading = ref(false);

const onFileSelected = (event) => {
	if (event.target.files.length) {
		selectedFile.value = event.target.files[0];
	} else {
		selectedFile.value = '';
	}
};

// upload multiple image to clodinary
const uploadImages = async () => {
	const formData = new FormData();
	formData.append('file', selectedFile.value);
	formData.append('upload_preset', 'papierenei_preset');

	const data = await fetch(
		'https://api.cloudinary.com/v1_1/erro/image/upload',
		{
			method: 'POST',
			body: formData,
		},
	).then((r) => r.json());

	return {
		public_id: data.public_id,
		secure_url: data.secure_url,
		width: data.width,
		height: data.height,
	};
};
// update db base on image uploaded
const handleSubmit = async () => {
	isLoading.value = true;
	props.store.error = null;

	const image = await uploadImages();

	props.store.item[props.db_column] = image;
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
			column_name: props.db_column,
		});

		if (props.store.error) {
			pushAlert('error', props.store.error.message);
			return;
		}
		props.store.item[props.db_column] = '';

		pushAlert('info', `image is deleted`);
	}
};
</script>
