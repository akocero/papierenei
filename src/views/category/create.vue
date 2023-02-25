<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Category</h4>
			<BaseButton
				_type="link"
				text="Back"
				:routeObject="{ name: 'warehouse.categories' }"
			/>
		</div>
		<form @submit.prevent="handleSubmit">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Category Name"
						v-model="name"
						:error="store.error"
						:errorField="store.error?.errors?.name || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseTextArea
						id="input_description"
						label="Description"
						v-model="description"
						:error="store.error"
						:errorField="store.error?.errors?.description || null"
						placeholder="Ex. "
						:required="false"
					/>
				</div>
			</div>
			<div class="mt-6">
				<BaseButton
					_type="submit"
					text="Save"
					color="primary"
					v-if="!store.isLoading"
				/>
				<BaseButton
					v-if="store.isLoading"
					_type="submit"
					text="Saving..."
					color="primary"
					:disabled="true"
				/>
			</div>
		</form>
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
import { ref, watch } from 'vue';
import SelectSearch from '@/components/SelectSearch.vue';
import { useCategoryStore } from '@/stores/category';
import useAlert from '../../composables/useAlert';
import { useRouter } from 'vue-router';

const router = useRouter();
const { pushAlert } = useAlert();
const store = useCategoryStore();

const name = ref('');
const description = ref('');

const handleSubmit = async () => {
	store.error = null;

	const data = {
		name: name.value,
		description: description.value,
	};

	const res = await store.create(data);

	console.log(res);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	pushAlert('success', 'Category added!');
	router.push({
		name: 'warehouse.categories.edit',
		params: { id: res.data._id },
	});

	// router.push({ name: 'user', params: { username } })
};
</script>

<style></style>
