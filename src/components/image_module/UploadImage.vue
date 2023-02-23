<template>
	<BaseModal
		:show="isOpen"
		modalTitle="Upload Image"
		@closeModal="$emit('closeModal')"
		:backdropClose="false"
		size="sm"
	>
		<form v-if="!selectedFiles.length">
			<div class="">
				<div
					class="relative mt-5 flex h-36 flex-col items-center justify-center border-2 border-dotted border-gray-300 bg-gray-100"
					@drop.prevent="handleDropFiles"
					@dragenter.prevent
					@dragover.prevent
				>
					<span class="mb-4 block"
						>Drag and drop a file to upload…</span
					>

					<label
						for="custom-upload"
						class="cursor-pointer border bg-white px-4 py-2 shadow-sm hover:bg-gray-50"
						>Open file selector</label
					>
					<input
						v-if="uploadType === 'multiple'"
						id="custom-upload"
						type="file"
						multiple
						@change="handleSelectFiles"
						class="hidden"
					/>
					<input
						v-else
						id="custom-upload"
						type="file"
						@change="handleSelectFiles"
						class="hidden"
					/>
				</div>
			</div>
		</form>
		<div class="mt-4 grid grid-cols-12 gap-4">
			<div
				v-for="image_url in imagePreview"
				class="group relative col-span-3 h-28 overflow-hidden rounded-md"
			>
				<img
					:src="image_url"
					alt=""
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
		<div class="flex justify-end space-x-2">
			<BaseButton
				@click.prevent="$emit('closeModal')"
				text="Cancel"
				color="default"
				_class="mt-2"
			/>
			<BaseButton
				@click.prevent="handleEmitSelectedImages"
				text="Upload"
				color="primary"
				_class="mt-2"
				v-if="!isUploading && selectedFiles.length"
			/>
			<BaseButton
				v-if="isUploading"
				text="Uploading..."
				color="primary"
				_class="mt-2"
				:disabled="true"
			/>
		</div>
	</BaseModal>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import useAlert from '@/composables/useAlert';
import BaseButton from '../BaseButton.vue';

const { pushToast } = useAlert();
const selectedFiles = ref('');
const imagePreview = ref([]);

const props = defineProps({
	isOpen: Boolean,
	isUploading: Boolean,
	uploadType: {
		type: String,
		default: 'multiple',
		validator(value) {
			return ['single', 'multiple'].includes(value);
		},
	},
});

const emit = defineEmits(['handleUploadImages']);

onUnmounted(() => {
	console.log('unmounted');
});

const onFileSelected = (files) => {
	selectedFiles.value = files;
	for (const file of files) {
		imagePreview.value.push(URL.createObjectURL(file));
	}
};

const handleSelectFiles = (e) => {
	if (e.target.files.length) {
		onFileSelected(e.target.files);
		return;
	}
	selectedFiles.value = '';
	return false;
};

const handleDropFiles = (e) => {
	if (e.dataTransfer.files.length) {
		onFileSelected(e.dataTransfer.files);
		return;
	}
	selectedFiles.value = '';
	return false;
};

const handleEmitSelectedImages = () => {
	emit('handleUploadImages', selectedFiles.value);
};
</script>

<style></style>
