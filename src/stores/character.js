import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useCharacterStore = defineStore({
	id: 'chracter',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `characters`,
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
		async udpate() {
			this.counter--;
		},
		async fetch(query) {
			await storeHelpers.fetch(this, query);
		},
		async find() {
			this.counter--;
		},
	},
});
