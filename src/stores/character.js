import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useCharacterStore = defineStore({
	id: 'chracter',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		url: 'characters',
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
		async fetch() {
			if (this.list.length <= 0) {
				await storeHelpers.fetch(this);
			}
		},
		async find() {
			this.counter--;
		},
	},
});
