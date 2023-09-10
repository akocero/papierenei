import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';
import axios from '../config/axios-config';

export const useOrderStore = defineStore({
	id: 'order',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `orders`,
		response: null,
		error: null,
		print: null,
	}),
	actions: {
		async create(payload) {
			return await storeHelpers.create(this, payload);
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
		async sendEmailOrderDetails(id) {
			await storeHelpers.sendEmail(this, 'send_email_order_details', id);
		},
		async delete(id) {
			await storeHelpers.destroy(this, id);

			if (!this.error) {
				this.list = this.list.filter((item) => item._id !== id);
			}
		},
	},
});
