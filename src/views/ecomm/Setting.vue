<template>
	<div class="-mt-4 mb-2 flex items-baseline justify-between">
		<h4 class="text-xl">Ecommerce Settings</h4>
		<div>
			<BaseButton
				_type="button"
				@click="handleSubmit"
				text="Save Changes"
				color="green"
				v-if="!store.isLoading"
			/>
			<BaseButton
				v-if="store.isLoading"
				_type="button"
				text="Updating..."
				color="primary"
				:disabled="true"
			/>
		</div>
	</div>

	<!-- Maintenance  -->
	<Maintenance v-if="store.item" />

	<div class="flex items-start gap-x-4">
		<ImageManager
			:store="store"
			title="Logo Base"
			db_column="logoBase"
			v-if="store.item"
			uploadType="single"
		/>

		<ImageManager
			:store="store"
			title="Logo Small"
			db_column="logoSm"
			v-if="store.item"
			uploadType="single"
		/>

		<ImageManager
			:store="store"
			title="Logo Flat"
			db_column="logoFlat"
			v-if="store.item"
			uploadType="single"
		/>
	</div>

	<!-- Banners  -->
	<DrawerCard title="Banners" :isCardOpen="false" v-if="store.item">
		<Banners />
	</DrawerCard>

	<!-- Navbar BG  -->
	<ImageManager
		:store="store"
		v-if="store.item"
		title="Navbar Backgrounds"
		db_column="navbarBGs"
		:setActiveFunc="true"
		uploadType="multiple"
		activeImage="activeNavbarBG"
	/>

	<DrawerCard title="About Content" :isCardOpen="false" v-if="store.item">
		<QuillEditor
			theme="snow"
			v-model:content="store.item.about"
			content-type="html"
		/>
	</DrawerCard>

	<DrawerCard
		title="Order Tracking Content"
		:isCardOpen="false"
		v-if="store.item"
	>
		<QuillEditor
			theme="snow"
			v-model:content="store.item.orderTracking"
			content-type="html"
		/>
	</DrawerCard>

	<DrawerCard
		title="Return Policy Content"
		:isCardOpen="false"
		v-if="store.item"
	>
		<QuillEditor
			theme="snow"
			v-model:content="store.item.returnPolicy"
			content-type="html"
		/>
	</DrawerCard>

	<DrawerCard title="FAQ" :isCardOpen="false" v-if="store.item">
		<QuillEditor
			theme="snow"
			v-model:content="store.item.faq"
			content-type="html"
		/>
	</DrawerCard>

	<DrawerCard title="Terms of service" :isCardOpen="false" v-if="store.item">
		<QuillEditor
			theme="snow"
			v-model:content="store.item.servicesTerms"
			content-type="html"
		/>
	</DrawerCard>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import ImageManager from '@/components/image_module/ImageManager.vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import BaseButton from '@/components/BaseButton.vue';
import useAlert from '@/composables/useAlert';
import Maintenance from './Maintenance.vue';
import Banners from './Banners.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const { pushAlert } = useAlert();

const store = useEcommSettingStore();

onBeforeMount(async () => {
	await store.load();
});

const handleSubmit = async () => {
	store.error = null;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('info', `Ecomm Settings is updated!`);
};
</script>
