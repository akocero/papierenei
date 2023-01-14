import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useProductStore = defineStore({
	id: 'product',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `items`,
		response: null,
		error: null,
	}),
	getters: {
		highestPrice: (state) => {
			return Math.max(...state.list.map((o) => o.unitCost));
		},
	},
	actions: {
		async create(payload) {
			return await storeHelpers.create(this, payload);
		},
		async update(payload) {
			return await storeHelpers.update(this, payload);
		},
		async updateQty(payload) {
			return await storeHelpers.customUpdate(this, 'update_qty', payload);
		},
		async fetch(query) {
			await storeHelpers.fetch(this, query);
		},
		async find(id) {
			return await storeHelpers.find(this, id);
		},
		async deleteImage(payload) {
			await storeHelpers.deleteImage(this, payload);
		},
	},
});
