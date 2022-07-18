<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-3xl">Macbooks</h4>
			<BaseButtonVue text="Add Macbook" _class="" />
		</div>

		<!-- <BaseButtonVue text="Save Changes" _class="mr-2" />
	<BaseButtonVue text="Add New" color="red" _class="mr-2" />
	<BaseButtonVue text="Add New" color="yellow" /> -->

		<div class="relative overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="text-md border text-gray-900">
					<tr>
						<th scope="col" class="bg-gray-50 py-4 px-4">
							Product name
						</th>
						<th scope="col" class="bg-gray-50 py-4 px-4">Color</th>
						<th scope="col" class="bg-gray-50 py-4 px-4">
							Category
						</th>
						<th scope="col" class="bg-gray-50 py-4 px-4">Price</th>
						<th scope="col" class="bg-gray-50 py-4 px-4">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in [1, 2, 3, 4]" class="">
						<td class="table-td">Apple MacBook Pro 17"</td>
						<td class="table-td">Grey</td>
						<td class="table-td">Macbook</td>
						<td class="table-td">$1,000.00</td>

						<td class="table-td flex space-x-2 p-2">
							<a href="#" class="btn-table-action"
								><VueFeather type="edit" size="16"
							/></a>
							<a href="#" class="btn-table-action"
								><VueFeather type="eye" size="16"
							/></a>
							<a href="#" class="btn-table-action"
								><VueFeather type="trash" size="16"
							/></a>
							<a href="#" class="btn-table-action"
								><VueFeather type="printer" size="16"
							/></a>
							<a href="#" class="btn-table-action"
								><VueFeather type="mail" size="16"
							/></a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import BaseButtonVue from '../components/BaseButton.vue';
</script>

<style></style>
