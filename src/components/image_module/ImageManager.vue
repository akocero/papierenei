<template>
	<DrawerCard :title="title">
		<!-- note this component (AddMedia) is a massive component please checkit eugene  -->
		<AddMedia
			:store="store"
			:db_column="db_column"
			:uploadType="uploadType"
		/>
		<div class="grid w-full grid-cols-12 gap-2" v-if="store.item">
			<div
				v-for="image in store.item[db_column]"
				:key="image._id"
				:class="[
					'group relative border ',
					store.item[db_column].length === 1
						? 'col-span-6  h-40'
						: 'col-span-3 h-20',
				]"
			>
				<button
					class="invisible absolute top-1 right-1 h-5 w-5 bg-red-500 text-white group-hover:visible"
					@click="handleRemoveInMultipleImage(image._id)"
				>
					<VueFeather type="x" size="18" class="" />
				</button>
				<button
					class="invisible absolute top-2 left-2 border bg-gray-100 py-1 px-4 text-gray-900 shadow group-hover:visible"
					@click="setActive(image._id)"
					v-if="
						store.item[activeImage] !== image._id && setActiveFunc
					"
				>
					Set as active
				</button>
				<button
					class="absolute top-2 left-2 bg-yellow-500 py-1 px-4 text-white shadow"
					@click="setInactive"
					v-if="
						store.item[activeImage] === image._id && setActiveFunc
					"
				>
					Set as inactive
				</button>
				<img
					:src="image.secure_url"
					alt=""
					class="h-full w-full object-contain"
				/>
			</div>
		</div>
	</DrawerCard>
</template>

<script setup>
import DrawerCard from '../DrawerCard.vue';
import AddMedia from './AddMedia.vue';
import useAlert from '@/composables/useAlert';
import { useImageStore } from '@/stores/image';

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
	// Component Title
	title: {
		type: String,
		default: 'Photos',
	},

	// single or multiple upload
	uploadType: {
		type: String,
		default: 'multiple',
		validator(value) {
			return ['single', 'multiple'].includes(value);
		},
	},
	setActiveFunc: {
		type: Boolean,
		default: false,
	},
	activeImage: {
		type: String,
	},
});

const { pushAlert, pushToast } = useAlert();

// pop out image id from store item
const handleRemoveInMultipleImage = async (image_id) => {
	props.store.item[props.db_column] = props.store.item[
		props.db_column
	].filter((image) => image_id !== image._id);

	pushToast({
		status: 'info',
		title: 'Image Removed',
		message: 'Click save to apply changes.',
	});
};

const setActive = (id) => {
	props.store.item[props.activeImage] = id;
};

const setInactive = () => {
	props.store.item[props.activeImage] = '';
};

// const imageList = computed(() => {
// 	if(props.store?.item[props.db_column].length) {
// 		props.store?.item[props.db_column].map()
// 	}
// })

const getImageDetails = async (id) => {
	const image = await useImageStore.find(id);

	console.log(image);

	return image;
};
</script>
