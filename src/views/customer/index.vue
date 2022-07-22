<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-2xl">Macbooks</h4>
			<BaseButton
				text="Add Macbook"
				:routeObject="{ name: 'sales.customers.create' }"
			/>
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
						<td>{{ item.nen_type[0] }}</td>
						<td>{{ item.professions[0] }}</td>

						<td class="flex space-x-2">
							<BaseTableActionButton
								icon="edit"
								:route-object="{ name: 'sales.invoices' }"
							/>

							<BaseTableActionButton
								_type="button"
								text="View to"
								@click="justAlert"
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
						<td colspan="10" class="bg-black">Loading...</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';

import BaseTableActionButton from '@/components/BaseTableActionButton.vue';
import { useCharacterStore } from '@/stores/character';
import useAlert from '../../composables/useAlert';

const store = useCharacterStore();
const { pushAlert } = useAlert();
onBeforeMount(async () => {
	await store.fetch();

	if (store.error) {
		pushAlert('error', store.error.message);
	}
});
</script>

<style></style>
