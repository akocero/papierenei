<template>
	<BaseModal
		:show="isOpen"
		modalTitle="Add existing assets"
		@closeModal="$emit('closeModal')"
		:backdropClose="false"
	>
		<div class="mt-4 flex justify-end">
			<button
				class="hover:text-blue-800 disabled:text-gray-800"
				@click="showOnlySelectedImage"
				v-if="!showSelectedImages"
				:disabled="!selectedImages.length"
			>
				Show selected images ({{ selectedImages.length }})
			</button>
			<button
				class="hover:text-blue-800"
				@click="showAllImages"
				v-if="showSelectedImages"
			>
				Show all images
			</button>
		</div>
		<div
			class="mt-4 grid max-h-[70vh] w-full grid-cols-5 gap-4 overflow-auto"
			v-if="imageStore.list && !imageStore.isLoading"
		>
			<label
				v-for="image in imageList"
				:key="image.public_id"
				:for="image._id"
				class="group relative h-36 cursor-pointer"
				:class="
					isSelected(image._id)
						? 'border border-gray-200 shadow-xl'
						: 'opacity-90 transition-all'
				"
			>
				<div
					class="absolute top-2 left-2 z-30 flex h-6 w-6 items-center justify-center rounded-md bg-green-400 text-white shadow-lg"
					v-if="isSelected(image._id)"
				>
					<VueFeather
						type="check"
						size="18"
						class=""
						stroke-width="4"
					/>
				</div>
				<img
					:src="image.secure_url"
					alt=""
					class="h-full w-full object-cover"
				/>
				<input
					type="checkbox"
					class="hidden"
					v-model="selectedImages"
					:value="image._id"
					:id="image._id"
				/>
			</label>
		</div>

		<div class="mt-4 flex justify-end space-x-2">
			<BaseButton
				@click.prevent="$emit('closeModal')"
				text="Cancel"
				color="default"
				_class="mt-2"
			/>
			<BaseButton
				v-if="selectedImages.length"
				:text="buttonText"
				color="primary"
				_class="mt-2"
				@click="handleEmitSelectedImages"
			/>
		</div>
	</BaseModal>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted, computed, watch } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useImageStore } from '@/stores/image';
import useAlert from '@/composables/useAlert';
import BaseButton from '../BaseButton.vue';

const { pushToast } = useAlert();
const imageStore = useImageStore();
const selectedImages = ref([]);
const imageList = ref([]);
const showSelectedImages = ref(false);

const props = defineProps({
	isOpen: Boolean,
	uploadType: {
		type: String,
		default: 'multiple',
		validator(value) {
			return ['single', 'multiple'].includes(value);
		},
	},
});
const emit = defineEmits(['updateModelImages']);

onBeforeMount(async () => {
	await imageStore.fetch();
	imageList.value = imageStore.list;
});

const buttonText = computed(() => {
	return `Select Images (${selectedImages.value.length})`;
});

const isSelected = (id) => {
	if (selectedImages.value.includes(id)) {
		return true;
	}

	return false;
};

const showAllImages = () => {
	imageList.value = imageStore.list;

	showSelectedImages.value = false;
};

const showOnlySelectedImage = () => {
	imageList.value = imageList.value.filter((item) =>
		selectedImages.value.includes(item._id),
	);

	showSelectedImages.value = true;
};

const addValues = (array) => {
	const images = imageList.value.filter((img) => array.includes(img._id));
	return images;
};

const handleEmitSelectedImages = () => {
	if (props.uploadType !== 'single') {
		emit('updateModelImages', addValues(selectedImages.value));
		return;
	}

	if (selectedImages.value.length > 1) {
		pushToast({
			status: 'error',
			title: 'Selection Error',
			message: 'Please select only 1 image!',
		});
		return;
	}

	emit('updateModelImages', addValues(selectedImages.value));
	return;
};
</script>

<style></style>
