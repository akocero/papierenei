<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Macbooks</h4>
			<BaseButton
				text="Add Macbook"
				:routeObject="{ name: 'sales.customers.create' }"
			/>
		</div>
		<div>
			<input type="text" v-model="searchString" />
			<BaseSelect
				id="search_type"
				v-model="searchType"
				:options="searchOptions"
				:emptyOption="false"
			/>
			<button class="bg-primary-400" @click="search">Search</button>
		</div>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th
							class="group flex items-center space-x-3 border-0 hover:border-r"
						>
							<span>Name</span>
							<VueFeather
								type="chevron-down"
								size="16"
								class="mr-4 hidden group-hover:inline-block"
							/>
						</th>
						<th>Gender</th>
						<th>Nen Type</th>
						<th>Profession</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in store.list" v-if="!store.isLoading">
						<td>{{ item.name }}</td>
						<td>{{ item.gender }}</td>
						<td>
							<span class="mr-1" v-for="nen in item.nen_type">{{
								nen
							}}</span>
						</td>
						<td>{{ item.professions[0] }}</td>

						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								_type="button"
								text="View to"
							/>

							<BaseTableActionButton
								icon="trash"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								icon="printer"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								icon="mail"
								:route-object="{ name: 'sales.invoices' }"
							/>
						</td>
					</tr>
					<tr v-else>
						<td colspan="10" class="text-center">Loading...</td>
					</tr>
				</tbody>
			</table>
		</div>
		<TablePagination :store="store" @paginate="paginate" />
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import TablePagination from '@/components/TablePagination.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useCharacterStore } from '@/stores/character';
import useAlert from '../../composables/useAlert';

const store = useCharacterStore();
const { pushAlert } = useAlert();
const searchString = ref('');

const searchType = ref('name');
const searchOptions = [
	{ label: 'Name', value: 'name' },
	{ label: 'Nen Type', value: 'nen_type' },
];

onBeforeMount(async () => {
	if (store.list.length <= 0) {
		await store.fetch('?page=1&limit=5');
	}
	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}
});

const search = async () => {
	await store.fetch(
		`?${searchType.value}[regex]=${searchString.value}&page=1&limit=5`,
	);
};

const paginate = async (page) => {
	let search = '';
	if (searchString.value) {
		search = `${searchType.value}[regex]=${searchString.value}&`;
	}
	await store.fetch(`?${search}page=${page}&limit=5`);
};
</script>

<style></style>
