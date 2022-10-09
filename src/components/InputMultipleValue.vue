<template>
	<div class="card">
		<h3 class="mb-2 text-xl">{{ title }}</h3>
		<div class="mb-4">
			<div class="" v-if="data.length">
				<span
					v-for="item in data"
					:key="item"
					class="group relative mr-2 mb-2 inline-block rounded-xl border px-3 transition-all hover:pr-7"
				>
					{{ item }}
					<button
						class="invisible absolute top-[2px] right-[2px] h-5 w-5 rounded-full bg-red-500 text-white group-hover:visible"
						@click="deleteItem(item)"
					>
						<VueFeather type="x" size="16" class="" />
					</button>
				</span>
			</div>
			<div v-else>No {{ title }} Found!</div>
		</div>
		<form @submit.prevent="handleSubmit">
			<div class="flex items-end gap-4">
				<div class="w-4/5">
					<BaseInput
						id="input_unitCost"
						type="text"
						label="Name"
						v-model="name"
						:error="null"
						:errorField="null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="grow">
					<BaseButton _type="submit" text="Add" color="primary" />
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import useAlert from '@/composables/useAlert';
import { ref } from 'vue';

const name = ref('');
const data = ref(props.modelValue || []);
const { pushAlert } = useAlert();

const props = defineProps({
	modelValue: [String, Number, Array],
	title: {
		type: String,
		default: 'Tags',
	},
});

const emit = defineEmits(['update:modelValue']);

const deleteItem = (item) => {
	data.value = data.value.filter((_item) => item !== _item);
	emit('update:modelValue', data.value);
};

const handleSubmit = async () => {
	const alreadyAdded = data.value.find(
		(item) => item.toLowerCase() === name.value.toLowerCase(),
	);

	if (alreadyAdded) {
		pushAlert('error', 'Name is already added');
		return;
	}
	if (name.value) {
		props.modelValue.push(name.value);
		pushAlert('success', props.title + ' added!');

		name.value = '';
	} else {
		pushAlert('error', 'Please add name');
	}
};
</script>
