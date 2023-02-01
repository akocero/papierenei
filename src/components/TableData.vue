<script setup>
/*
    DEVELOPER NOTE: on further modification please add comment on how to use it and when to use it

	headers = array[] of objects
	if the field has a question mark it is optional and if not it's required
	NOTE: if the column is actions this class is a needed for styling purposes 'flex space-x-2' 
	{
		text: string, // this will be the text/label of the header
		value: string, // this will get the value of the object you want to display in cell
		cellClass?: string, // cell class/styles
		headerClass?: string, //header class/styles
	}

*/
/* 
Sample headers data
const headers = [
	{
		text: 'ID',
		value: '_id',
	},
	{
		text: 'SKU',
		value: 'sku',
	},
	{
		text: 'Name',
		value: 'name',
		cellClass: 'capitalize',
	},
	{
		text: 'Unit Cost',
		value: 'unitCost',
		headerClass: 'w-2/5 text-right',
		cellClass: 'text-right',
	},
	{
		text: 'Description',
		value: 'description',
	},
	{
		text: 'Actions',
		value: 'actions',
		cellClass: 'flex space-x-2',
	},
];
*/

/* 
EXAMPLE USAGE

if you use the item slot it returns the item object itself same with header

<TableData :data="store.list" :headers="headers">
    <template #header-sku="header"> {{ header.text }} </template> // <--- header slot
    <template #item-sku="item"> {{ item.sku }} </template> // <--- item slot
    <template #item-unitCost="item"> // <--- item slot sample modification
        ₱{{ numberFormat(item.unitCost) }}
    </template>

    <template #item-actions="item"> <--- item action slot - you can insert component in slots
        <BaseTableActionButton
            icon="edit"
            :route-object="{
                name: 'warehouse.products.edit',
                params: { id: item._id },
            }"
        />

        <BaseTableActionButton
            icon="eye"
            :route-object="{
                name: 'warehouse.products.view',
                params: { id: item._id },
            }"
        />
    </template>
</TableData>
*/
const props = defineProps({
	data: Array,
	headers: Array,
});
</script>

<template>
	<table class="table" v-if="data">
		<thead>
			<tr>
				<th v-for="header in headers" :class="header.headerClass">
					<slot :name="`header-${header.value}`" v-bind="header">
						{{ header.text }}
					</slot>
				</th>
			</tr>
		</thead>
		<tbody class="">
			<tr v-for="item in data" v-if="data.length">
				<td v-for="td in headers" :class="td.cellClass">
					<slot :name="`item-${td.value}`" v-bind="item">
						{{ item[td.value] }}
					</slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>
