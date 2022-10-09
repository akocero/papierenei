<template>
	<div class="card">
		<h3 class="mb-2 text-xl">Categories</h3>
		<form class="mb-4">
			<div class="grid grid-cols-6" v-if="store.list.length">
				<div
					class="col-span-full md:col-span-3"
					v-for="category in store.list"
					:key="category._id"
				>
					<input
						type="checkbox"
						v-model="checked"
						class="mr-3 p-2 text-primary-600"
						@change="$emit('update:modelValue', checked)"
						:value="category._id"
					/>
					<label for="">{{ category.name }}</label>
				</div>
			</div>
			<div v-else>No Category Found!</div>
		</form>
		<form @submit.prevent="addCategory">
			<div class="flex items-end gap-4">
				<div class="w-4/5">
					<BaseInput
						id="input_unitCost"
						type="text"
						label="Category Name"
						v-model="name"
						:error="store.error"
						:errorField="store.error?.errors?.name || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="grow">
					<BaseButton
						_type="submit"
						text="Add"
						color="primary"
						v-if="!store.isLoading"
					/>
					<BaseButton
						v-if="store.isLoading"
						_type="submit"
						text="Adding..."
						color="primary"
						:disabled="true"
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import { useCategoryStore } from '@/stores/category';
import { onBeforeMount, ref } from 'vue';
import useAlert from '@/composables/useAlert';

const store = useCategoryStore();
const name = ref('');
const checked = ref(props.modelValue || []);
const { pushAlert } = useAlert();

const props = defineProps({
	modelValue: [String, Number, Array],
});

const test = () => {
	console.log('test');
};

onBeforeMount(async () => {
	await store.fetch(`?limit=100`);
});

const addCategory = async () => {
	store.error = null;

	const data = {
		name: name.value,
	};

	const res = await store.create(data);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	console.log(res);

	store.list.push(res.data);

	pushAlert('success', 'Category added!');

	// router.push({
	// 	name: 'warehouse.products',
	// });
};
</script>
