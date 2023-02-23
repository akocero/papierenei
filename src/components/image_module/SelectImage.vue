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
			class="mt-4 grid max-h-[70vh] w-full grid-cols-4 gap-4 overflow-auto"
			v-if="imageStore.list && !imageStore.isLoading"
		>
			<label
				v-for="image in imageList"
				:key="image.public_id"
				:for="image._id"
				class="group relative h-40 rounded-md border p-1"
				:class="
					isSelected(image._id)
						? 'border-2 border-blue-400'
						: 'border-gray-200'
				"
			>
				<button
					class="invisible absolute top-2 right-2 h-5 w-5 bg-red-500 text-white group-hover:visible"
					@click="handleRemoveImage(image._id)"
				>
					<VueFeather type="x" size="18" class="" />
				</button>
				<img
					:src="image.secure_url"
					alt=""
					class="h-full w-full rounded-md object-cover"
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

		<div class="mt-4 flex justify-end">
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
import { ref, onBeforeMount, onUnmounted, computed } from 'vue';
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

const handleEmitSelectedImages = () => {
	if (props.uploadType !== 'single') {
		emit('updateModelImages', selectedImages.value);
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

	emit('updateModelImages', selectedImages.value);
	return;
};
</script>

<style></style>
