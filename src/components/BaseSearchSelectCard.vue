<template>
	<div class="card" v-if="!store.isLoading">
		<form class="">
			<div class="">
				<div class="relative w-full">
					<!-- Base input or Search Bar -->
					<BaseInput
						id="input_name"
						type="text"
						:label="label"
						v-model="name"
						:error="store.error"
						:errorField="store.error?.errors?.name || null"
						:placeholder="placeholder"
						:required="false"
					/>

					<!-- Clear input search/name  -->
					<button
						class="absolute top-10 right-2 h-5 w-5 rounded-full font-bold text-gray-800"
						v-if="name"
						@click="name = ''"
					>
						<VueFeather type="x" size="18" class="" />
					</button>

					<div
						class="-bottom-100 min-h-40 absolute left-0 z-10 mt-2 w-full rounded-sm bg-white p-2 shadow-lg"
						v-if="name"
					>
						<ul>
							<!-- Create Document -->

							<li v-if="canCreateItem">
								<button
									class="flex w-full cursor-pointer items-center border border-white py-2 px-3 hover:border-gray-200 hover:bg-gray-100"
									type="button"
									@click="createItem"
									v-if="!store.isLoading"
								>
									<VueFeather
										type="plus-circle"
										size="16"
										class="mt-[1px] mr-2"
									/>
									<span class="mr-2 font-semibold">Add</span
									>{{ name }}
								</button>
							</li>

							<!-- Checkbox of all document base on search value (name)  -->

							<li v-for="item in filteredItems">
								<label
									:for="item._id"
									class="block cursor-pointer border border-white py-2 px-3 hover:border-gray-200 hover:bg-gray-100"
								>
									<input
										type="checkbox"
										v-model="checked"
										class="mr-2 text-primary-600"
										@change="
											$emit('update:modelValue', checked)
										"
										:value="item._id"
										:id="item._id"
									/>
									<span class="select-none">{{
										item.name
									}}</span>
								</label>
							</li>
						</ul>
					</div>
				</div>

				<!-- Badge of selected document  -->

				<div v-if="checkedItems.length > 0" class="mt-3">
					<span
						v-for="item in checkedItems"
						class="relative mr-2 mb-2 inline-block rounded-lg border px-3 pr-7 transition-all"
						>{{ item.name }}
						<button
							class="absolute top-[2px] right-[2px] h-5 w-5 rounded-full text-gray-400 hover:text-red-500"
							@click="removeItem(item._id)"
							type="button"
						>
							<VueFeather type="x" size="16" class="" />
						</button>
					</span>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
/**
 *
 *  * BaseSelectCard
 *  this component can use for selecting multiple record such as: collections and tags
 * 	this also can create document or data but
 * 	!note this component can only create 1 property required which is 'name'
 *  !if the property is not called 'name' the create method wont work
 * 	!moreover this only can select multiple not single ok!
 *
 *	TODO: Modify it to select single Item (Radio Button) and Dynamic value not only (name)
 * */
import BaseInput from './BaseInput.vue';
import { computed, onBeforeMount, ref } from 'vue';
import useAlert from '@/composables/useAlert';

const name = ref('');
// this variable is use to send back to the parent, does selected checkbox
// this is a two way binding
const checked = ref(props.modelValue || []);

// push an alert
const { pushAlert } = useAlert();

// declaring emit to use it on setup composition API
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
	// ** this variable is use to send back to the parent, does selected checkbox
	// this is a two way binding
	modelValue: [String, Number, Array],
	// store to fetch and create, pinia store
	store: [Object],
	// label that will output at the top of input
	label: {
		type: String,
		default: 'Sample Label',
	},
	// this variable is set to false
	// if you pass true this component will enable create function to create a document or data
	canCreateItem: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: 'Type...',
	},
});

onBeforeMount(async () => {
	// fetching data limti to 100
	await props.store.fetch(`?limit=1000`);
});

// this will filter the data/document base on the input value which is the 'name'
const filteredItems = computed(() => {
	return props.store.list.filter((item) =>
		item.name.toLowerCase().includes(name.value.toLowerCase()),
	);
});

// this will filter the data/document base on selected document
const checkedItems = computed(() => {
	return props.store.list.filter((item) => checked.value.includes(item._id));
});

// this will remove document/data
const removeItem = (id) => {
	checked.value = checked.value.filter((c) => c !== id);
	// emit the event to the parent
	emit('update:modelValue', checked.value);
};

// creating or adding document
const createItem = async () => {
	props.store.error = null;

	const data = {
		name: name.value,
	};

	const res = await props.store.create(data);

	if (props.store.error) {
		pushAlert('error', props.store.error.message);
		return;
	}

	console.log(res);

	props.store.list.push(res.data);

	pushAlert('success', 'Tags added!');
};
</script>
