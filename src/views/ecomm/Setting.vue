<template>
	<div class="-mt-4 mb-2 flex items-baseline justify-between">
		<h4 class="text-xl">Ecommerce Settings</h4>
		<div>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.products' }"
				_class="mr-2"
			/>
			<BaseButton
				_type="button"
				@click="handleSubmit"
				text="Save Changes"
				color="primary"
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
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Banners</h4>
		</div>
		<div v-if="store.item" class="">
			<!-- {{ store.item.banners }} -->
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-full md:col-span-3">
					<BaseInput
						id="input_name"
						label="Banner Name"
						v-model="_banner.name"
						:error="null"
						:errorField="null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-8">
					<BaseInput
						id="input_name"
						label="Banner Text"
						v-model="_banner.text"
						:error="null"
						:errorField="null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full flex items-end md:col-span-1">
					<BaseButton
						_type="button"
						text="Add"
						color="primary"
						_class="mt-2 w-full text-center"
						@click="addBanner"
					/>
				</div>
			</div>
		</div>
		<div v-if="store.item" class="mt-5">
			<div v-if="store.item.banners.length">
				<div
					class="mt-3 flex flex-col border py-3 px-4 md:flex-row"
					v-for="banner in store.item.banners"
					:key="banner.name"
				>
					<div class="grow">
						<h3 class="text-lg font-bold uppercase">
							{{ banner.name }}
						</h3>
						<p>
							{{ banner.text }}
						</p>
					</div>
					<div class="mt-2 flex items-center justify-end md:w-[30%]">
						<BaseButton
							_type="button"
							text="Set as active"
							color="default"
							v-if="!banner.isActive"
							_class="mr-2"
							@click="setBannerActive(banner.name)"
						/>
						<BaseButton
							_type="button"
							text="Set as inactive"
							color="yellow"
							v-if="banner.isActive"
							_class="mr-2"
							@click="setBannerInactive(banner.name)"
						/>
						<BaseButton
							_type="button"
							text="Delete"
							color="red"
							_class=""
							@click="removeBanner(banner.name)"
						/>
					</div>
				</div>
			</div>
			<div v-else>No banner found!</div>
		</div>
	</div>
	<UploadMultipleImage
		:store="store"
		v-if="store.item"
		title="Heros"
		db_column="heros"
		:setActiveFunc="true"
	/>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import UploadMultipleImage from '@/components/UploadMultipleImage.vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import useAlert from '@/composables/useAlert';

const { pushAlert } = useAlert();

const store = useEcommSettingStore();
const _banner = ref({
	name: '',
	text: '',
	isActive: false,
});

console.log('store', store.item);

const addBanner = () => {
	const bannerIsAdded = store.item.banners.find(
		(banner) => _banner.value.name.toLowerCase() === banner.name,
	);

	if (!_banner.value.name || !_banner.value.text) {
		pushAlert('error', 'Invalid inputs, please fill required fields!');
		return;
	}

	if (bannerIsAdded) {
		pushAlert('error', 'Banner is already added!');
		return;
	}
	_banner.value.name = _banner.value.name.toLowerCase();
	store.item.banners.push(_banner.value);

	_banner.value = {
		name: '',
		text: '',
		isActive: false,
	};
};

onBeforeMount(async () => {
	await store.fetch('?limit=1');
	if (store.list.length <= 0) {
		await store.init();
		await store.fetch('?limit=1');
	}

	store.item = store.list[0];

	console.log(store.item);
});

const handleSubmit = async () => {
	// console.log(store.item);
	// return;
	store.error = null;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Ecomm Settings <${res.name}> is updated!`);
	// router.push({
	// 	name: 'warehouse.products',
	// });
};

const setBannerActive = (banner_name) => {
	store.item.banners = store.item.banners.map((banner) => {
		banner.isActive = false;
		if (banner.name === banner_name) {
			if (banner.isActive) banner.isActive = false;
			else banner.isActive = true;
		}
		return banner;
	});
	console.log(store.item.banners);
};

const setBannerInactive = (banner_name) => {
	store.item.banners = store.item.banners.map((banner) => {
		banner.isActive = false;
		return banner;
	});
};

const removeBanner = (banner_name) => {
	store.item.banners = store.item.banners.filter(
		(banner) => banner.name !== banner_name,
	);

	pushAlert('info', `Banner <${banner_name}> is removed!`);
};
</script>
