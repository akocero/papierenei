<template>
	<div class="">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">Update Category Info.</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.categories' }"
			/>
		</div>
		<div class="flex flex-col items-start gap-6 md:flex-row">
			<div class="card grow">
				<form
					@submit.prevent="handleSubmit"
					v-if="store.item && !store.isLoading"
				>
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-6 md:col-span-6">
							<BaseInput
								id="input_name"
								label="Category Name"
								v-model="store.item.name"
								:error="store.error"
								:errorField="store.error?.errors?.name || null"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
						<div class="col-span-6 md:col-span-6">
							<BaseTextArea
								id="input_description"
								label="Description"
								v-model="store.item.description"
								:error="store.error"
								:errorField="
									store.error?.errors?.description || null
								"
								placeholder="Ex. ABC"
								:required="true"
							/>
						</div>
					</div>
					<div class="mt-6">
						<BaseButton
							v-if="!store.isLoading"
							_type="submit"
							text="Save Changes"
							color="primary"
						/>
						<BaseButton
							v-if="store.isLoading"
							_type="submit"
							text="Updating..."
							color="primary"
							:disabled="true"
						/>
					</div>
				</form>
				<Spinner v-else />
			</div>
			<div class="w-full md:w-1/3">
				<ImageManager
					:store="store"
					title="Cover Photo"
					db_column="coverPhoto"
					v-if="store.item"
					uploadType="single"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputMultiple from '@/components/InputMultiple.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import DisplayFieldArray from '@/components/DisplayFieldArray.vue';
import useInputMultiple from '@/composables/useInputMultiple';
import Spinner from '@/components/Spinner.vue';
import { onBeforeMount, ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useCategoryStore } from '@/stores/category';
import useAlert from '../../composables/useAlert';
import { useRoute, useRouter } from 'vue-router';
import ImageManager from '@/components/image_module/ImageManager.vue';

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const store = useCategoryStore();

onBeforeMount(async () => {
	await store.find(route.params.id);
});

const handleSubmit = async () => {
	store.error = null;
	const res = await store.update(store.item);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
	console.log({ res });
	pushAlert('info', `Category <${res.name}> is updated!`);
	router.push({
		name: 'warehouse.categories',
	});
};
</script>

<style></style>
