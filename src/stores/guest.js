import { defineStore } from 'pinia';
import axios from '../config/axios-guest';
import guestStoreHelpers from '../helpers/guestStoreHelpers';
import { useLocalStorage } from '@vueuse/core';

export const useGuestStore = defineStore({
	id: 'guest',
	state: () => ({
		orders: [],
		orderItem: {},
		wishList: useLocalStorage('guest_wish_list', []),
		url: `guest/auth`,
	}),
	actions: {
		async getOrders() {
			const { data } = await guestStoreHelpers.get(
				this,
				this.url + '/orders?limit=1000',
			);
			this.orders = data;
			return data;
		},
		async getSingleOrder(id) {
			const { data } = await guestStoreHelpers.get(
				this,
				this.url + '/orders/' + id,
			);

			this.orderItem = data;
			return data;
		},
		setWishList(wishList) {
			this.wishList = wishList;
		},
		async removeWishList(productID) {
			const { data } = await guestStoreHelpers.destroy(
				this,
				this.url + '/delete/wishlist/' + productID,
			);

			this.wishList = this.wishList.filter(
				(product) => product._id != productID,
			);
			return data;
		},
		async getWishList() {
			const { data } = await guestStoreHelpers.get(
				this,
				this.url + '/wishlist',
			);
			this.wishList = data;
			return data;
		},
		async addWishList(payload) {
			const { data } = await guestStoreHelpers.update(
				this,
				this.url + '/update/wishlist',
				{
					wishList: payload._id,
				},
			);
			this.wishList.push(payload);
			return data;
		},

		isInWishList(productID) {
			const wishlistID = this.wishList.map((product) => product._id);

			if (wishlistID.includes(productID)) {
				return true;
			}

			return false;
		},
	},
});
