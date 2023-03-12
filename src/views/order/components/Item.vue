<template>
	<Spinner v-if="isLoading" />
	<div class="card">
		<form @submit.prevent="addItem" v-if="!isLoading">
			<div class="grid grid-cols-12 gap-4">
				<div
					class="justify col-span-full flex items-center justify-between"
				>
					<h4 class="text-xl">Items</h4>
					<BaseButton
						:text="isCustomItem ? 'Select Item' : 'Custom Item'"
						color="default"
						@click="isCustomItem = !isCustomItem"
					/>
				</div>
				<div class="col-span-full" v-if="isCustomItem">
					<BaseInput
						id="custom_item_name"
						label="Item Name"
						v-model="customItemName"
						:error="error"
						:errorField="error?.errors?.customItemName || null"
						placeholder="Ex. Item 1"
						:required="true"
						type="text"
					/>
				</div>
				<div class="col-span-full md:col-span-6" v-if="isCustomItem">
					<BaseInput
						id="custom_item_cost"
						label="Item Cost"
						v-model="customItemCost"
						:error="error"
						:errorField="error?.errors?.customItemCost || null"
						placeholder="Ex. 2"
						:required="true"
						type="number"
						:step="0.01"
					/>
				</div>
				<div class="col-span-full md:col-span-6" v-if="isCustomItem">
					<BaseInput
						id="qty"
						label="Qty"
						v-model="selectedQty"
						:error="error"
						:errorField="error?.errors?.qty || null"
						placeholder="Ex. 2"
						:required="true"
						type="number"
					/>
				</div>
				<div class="col-span-full md:col-span-7" v-if="!isCustomItem">
					<BaseSelect
						id="invoiceFor"
						label="Select Item"
						v-model="selectedItem"
						:error="error"
						:errorField="error?.errors?.items || null"
						:options="productStore.list"
						optionLabel="name"
						optionValue="_id"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-3" v-if="!isCustomItem">
					<BaseInput
						id="qty"
						label="Qty"
						v-model="selectedQty"
						:error="error"
						:errorField="error?.errors?.qty || null"
						placeholder="Ex. 2"
						:required="true"
						type="number"
					/>
				</div>
				<div class="col-span-2 flex items-end">
					<BaseButton
						_type="submit"
						text="Add Item"
						color="primary"
						_class="w-full"
					/>
				</div>
				<!-- <div v-if="store.item.items.length" class="col-span-full">
								<h3>
									Total:
									<span class="font-semibold text-green-400">
										₱{{ numberFormat(_addedItemsTotal) }}
									</span>
								</h3>
							</div> -->
				<div class="col-span-full -mx-6 -mb-4 space-y-4">
					<table class="w-full">
						<thead>
							<tr class="border border-x-0 border-t-0 text-left">
								<th class="py-3 pl-6 font-semibold">Product</th>
								<th class="py-3 font-semibold">Quantity</th>
								<th class="py-3 text-right font-semibold">
									Total
								</th>
								<th
									class="w-[10%] py-3 text-right font-semibold"
								></th>
							</tr>
						</thead>
						<tbody>
							<tr
								class=""
								:class="[
									index + 1 === store.item.items.length
										? 'border-0'
										: 'border-b',
								]"
								v-for="(i, index) in store.item.items"
								:key="i.id"
							>
								<td class="p-3 px-6 capitalize">
									{{ i.name }}
								</td>
								<td>{{ i.qty }}</td>
								<td class="text-right">
									₱{{ numberFormat(i.price) }}
								</td>
								<td class="pr-6 text-right">
									<a
										@click.prevent="deleteAddedItem(i.name)"
										class="cursor-pointer"
									>
										<VueFeather
											type="x"
											size="18"
											class="hover:text-red-500"
										/>
									</a>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- <div
									class="relative flex items-start overflow-x-auto rounded-sm pb-2"
									:class="[
										index + 1 === store.item.items.length
											? 'border-0'
											: 'border-b',
									]"
									v-for="(i, index) in store.item.items"
									:key="i.id"
								>
									<div class="flex-1">
										<label class="text-sm text-gray-500"
											>Item</label
										>
										<h5>{{ i.name }}</h5>
									</div>
									<div class="flex">
										<div class="w-10 flex-none">
											<label class="text-sm text-gray-500"
												>Qty</label
											>
											<h5>{{ i.qty }}</h5>
										</div>

										<div class="w-20">
											<label class="text-sm text-gray-500"
												>Price</label
											>
											<h5>
												₱{{ numberFormat(i.price) }}
											</h5>
										</div>

										<div class="w-[5.5rem]">
											<label class="text-sm text-gray-500"
												>Total</label
											>
											<h5>
												₱{{ numberFormat(i.total) }}
											</h5>
										</div>
									</div>
									<button class="absolute top-0 right-0">
										<VueFeather
											type="x"
											size="16"
											class="hover:text-red-500"
											@click="deleteAddedItem(i.name)"
										/>
									</button>
								</div> -->
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import useAlert from '@/composables/useAlert';
import { useProductStore } from '@/stores/product';
import useUtils from '@/composables/useUtils';

const props = defineProps({
	store: Object,
});

const { pushAlert } = useAlert();
const productStore = useProductStore();
const { numberFormat } = useUtils();

const isLoading = ref(false);
const isCustomItem = ref(false);

const customItemName = ref('');
const customItemCost = ref(0);

const selectedItem = ref('');
const selectedQty = ref('');
const error = null;

onMounted(async () => {
	await productStore.fetch(`?page=1&limit=1000`);
});

const addItem = () => {
	if (!selectedQty.value || selectedQty.value <= 0) {
		pushAlert('error', 'Please select item and quantity!');
		return;
	}

	let _item;
	if (isCustomItem.value) {
		_item = {
			_id: 'custom-item-' + uuidv4(),
			name: customItemName.value,
			unitCost: customItemCost.value,
		};
	} else {
		_item = productStore.list.find(
			(item) => item._id === selectedItem.value,
		);
	}

	const isItemExist = props.store.item.items.find(
		(el) => _item._id === el.item_id,
	);

	if (isItemExist) {
		pushAlert('warning', 'Item is already added!');
		return false;
	}
	console.log('_item', _item);
	// check if the items is in sale
	const itemPrice = _item.salePrice ? _item.salePrice : _item.unitCost;
	props.store.item.items.push({
		item_id: _item._id,
		name: _item.name,
		price: itemPrice,
		qty: parseFloat(selectedQty.value),
		total: itemPrice * parseFloat(selectedQty.value),
	});

	selectedItem.value = '';
	selectedQty.value = '';
	customItemCost.value = 0;
	customItemName.value = '';
};

const deleteAddedItem = (name) => {
	props.store.item.items = props.store.item.items.filter(
		(el) => el.name !== name,
	);
};
</script>
