import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useCustomerStore = defineStore({
	id: 'customer',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `customers`,
		response: null,
		error: null,
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		async create(payload) {
			await storeHelpers.create(this, payload);
		},
		async update(payload) {
			return await storeHelpers.update(this, payload);
		},
		async fetch(query) {
			await storeHelpers.fetch(this, query);
		},
		async find(id) {
			await storeHelpers.find(this, id);
		},
	},
});
