<template>
	<div>
		<div class="">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-full md:col-span-3">
					<BaseInput
						id="input_name"
						label="Banner Name"
						v-model="form.name"
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
						v-model="form.text"
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
						color="green"
						_class="mt-2 w-full text-center"
						@click="handleAddBanner"
					/>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<div v-if="EcomSettingStore.item.banners.length">
				<div
					class="mt-3 flex flex-col border py-3 px-4 md:flex-row"
					v-for="banner in EcomSettingStore.item.banners"
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
</template>

<script setup>
import { ref } from 'vue';
import { useEcommSettingStore } from '@/stores/ecomm_setting';
import useAlert from '@/composables/useAlert';

const EcomSettingStore = useEcommSettingStore();
const { pushAlert } = useAlert();

const form = ref({
	isActive: false,
});

const handleAddBanner = () => {
	if (!form.value.name || !form.value.text) {
		pushAlert('error', 'Invalid inputs, please fill required fields!');
		return;
	}

	const bannerIsAdded = EcomSettingStore.item.banners.find(
		(banner) => form.value.name.toLowerCase() === banner.name,
	);

	if (bannerIsAdded) {
		pushAlert('error', 'Banner is already added!');
		return;
	}
	form.value.name = form.value.name.toLowerCase();
	EcomSettingStore.item.banners.push(form.value);

	form.value = {
		isActive: false,
	};
};

const setBannerActive = (banner_name) => {
	EcomSettingStore.item.banners = EcomSettingStore.item.banners.map(
		(banner) => {
			banner.isActive = false;
			if (banner.name === banner_name) {
				if (banner.isActive) banner.isActive = false;
				else banner.isActive = true;
			}
			return banner;
		},
	);
};

const setBannerInactive = (banner_name) => {
	EcomSettingStore.item.banners = EcomSettingStore.item.banners.map(
		(banner) => {
			banner.isActive = false;
			return banner;
		},
	);
};

const removeBanner = (banner_name) => {
	EcomSettingStore.item.banners = EcomSettingStore.item.banners.filter(
		(banner) => banner.name !== banner_name,
	);

	pushAlert('info', `Banner <${banner_name}> is removed!`);
};
</script>

<style lang="scss" scoped></style>
