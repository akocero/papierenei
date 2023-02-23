import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useImageStore = defineStore({
	id: 'image',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `images`,
		response: null,
		error: null,
		print: null,
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		async create(payload) {
			return await storeHelpers.create(this, payload);
		},
		async update(payload) {
			return await storeHelpers.update(this, payload);
		},
		async fetch(query = '') {
			await storeHelpers.fetch(this, query);
		},
		async find(id) {
			await storeHelpers.find(this, id);
		},
	},
});
