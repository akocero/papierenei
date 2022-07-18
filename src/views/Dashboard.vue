<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-3xl">Macbooks</h4>
			<BaseButtonVue text="Add Macbook" />
		</div>

		<!-- <BaseButtonVue text="Save Changes" _class="mr-2" />
	<BaseButtonVue text="Add New" color="red" _class="mr-2" />
	<BaseButtonVue text="Add New" color="yellow" /> -->

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th v-for="header in headers" :key="header">
							{{ header }}
						</th>
					</tr>
				</thead>
				<tbody class="">
					<tr v-for="item in [1, 2, 3, 4]">
						<td>Apple MacBook Pro 17"</td>
						<td>Grey</td>
						<td>Macbook</td>
						<td>$1,000.00</td>

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
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import BaseButtonVue from '../components/BaseButton.vue';
import BaseTableActionButton from '../components/BaseTableActionButton.vue';
const headers = ['Product Name', 'Color', 'Category', 'Price', 'Actions'];

const justAlert = () => {
	alert('View Button is Clicked');
};
</script>

<style></style>
