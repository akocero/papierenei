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
		activeBanner: (state) => {
			const res = state.item.banners.find(
				(hero) => hero.isActive === true,
			);
			if (!res) {
				return state.item.banners[0];
			}
			return res;
		},
		activeNavbarBG(state) {
			if (!state.item.activeNavbarBG) {
				return state.item.navbarBGs[0];
			}
			return state.item.navbarBGs.find(
				(bg) => bg._id === state.item.activeNavbarBG,
			);
		},
		activeHero(state) {
			if (!state.item.activeHero) {
				return state.item.heros[0];
			}
			return state.item.heros.find(
				(bg) => bg._id === state.item.activeHero,
			);
		},
	},
	actions: {
		async init() {
			/** !!! this part is important
			 * 	if no data created, you need to add initially
			 */
			return this.create({
				banners: [
					{
						text: 'Initial Banner',
						name: 'init banner',
					},
				],
			});
		},
		async create(payload) {
			return await storeHelpers.create(this, payload);
		},
		async update(payload) {
			return await storeHelpers.update(this, payload);
		},
		async load() {
			const res = await storeHelpers.fetch(this, '?limit=1');

			/** Check if no data found and no error occur */
			if (!this.error && res.data.length <= 0) {
				/** Initialized or create dummy data
				 * and populated to item
				 */
				const initData = await this.init();
				this.item = initData.data;
				return;
			}

			// just copy the data into item
			this.item = res.data[0];
			return;
		},
	},
});
