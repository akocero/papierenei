import { defineStore } from 'pinia';
import storeHelpers from '../helpers/storeHelpers';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		list: [],
		isLoading: false,
		item: null,
		page: 1,
		url: `items`,
		response: null,
		error: null,
		subTotal: 0,
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
		async fetch(query) {
			await storeHelpers.fetch(this, query);
		},
		async find(id) {
			await storeHelpers.find(this, id);
		},
		async deleteImage(payload) {
			await storeHelpers.deleteImage(this, payload);
		},

		add(payload) {
			console.log('store cart: add', payload);

			const existingProduct = this.list.find(
				(cartItem) => cartItem._id == payload._id,
			);

			if (existingProduct) {
				console.log('existing', existingProduct.name);
				this.incQty(existingProduct._id, 1);
				return;
			}

			payload.cartQuantity = 1;
			this.list.push(payload);
			this.computeSubTotal();
		},
		incQty(id, value) {
			const cartItem = this.list.find((cartItem) => cartItem._id == id);

			if (cartItem.quantity > cartItem.cartQuantity) {
				cartItem.cartQuantity += value;
				console.log('nag add');
			} else {
				console.log('sobra na boy');
			}

			this.computeSubTotal();
		},
		decQty(id, value) {
			const cartItem = this.list.find((cartItem) => cartItem._id == id);

			if (cartItem.cartQuantity > 0) {
				cartItem.cartQuantity -= value;
				console.log('nag bawas');
			} else {
				console.log('zero na boy');
			}

			this.computeSubTotal();
		},
		computeSubTotal() {
			this.subTotal = 0;
			this.list.forEach((cartItem) => {
				this.subTotal += cartItem.unitCost * cartItem.cartQuantity;
			});

			console.log(this.subTotal);
		},
	},
});
