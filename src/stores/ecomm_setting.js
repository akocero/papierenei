import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useEcommSettingStore = defineStore({
	id: 'ecommSetting',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `ecomm_settings`,
		response: null,
		error: null,
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		async init() {
			this.create(this, {
				banners: [
					{
						text: '30 per',
						name: '30',
					},
				],
			});
		},
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
