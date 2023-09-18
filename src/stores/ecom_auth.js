import { defineStore } from 'pinia';
import axios from '../config/axios-config';
import Cookies from 'js-cookie';
import { useLocalStorage } from '@vueuse/core';
import guestStoreHelpers from '../helpers/guestStoreHelpers';

export const useEcomAuthStore = defineStore({
	id: 'ecom_auth',
	state: () => ({
		user: Cookies.get('guest_user')
			? JSON.parse(Cookies.get('guest_user'))
			: null,
		token: Cookies.get('guest_token') ? Cookies.get('guest_token') : null,
		isLoading: false,
		url: `guest/auth`,
		response: null,
		error: null,
		loginCodeToken: null,
	}),
	actions: {
		setUser(payload) {
			delete payload.customer.wishList;
			this.user = payload.customer;
			this.token = payload.token;

			Cookies.set('guest_user', JSON.stringify(payload.customer), {
				expires: 7,
			});

			Cookies.set('guest_token', payload.token, {
				expires: 7,
			});
		},
		setUserDetails(user) {
			this.user = user;
			Cookies.set('guest_user', JSON.stringify(user), {
				expires: 7,
			});
		},
		async signup(payload) {
			const data = await guestStoreHelpers.store(
				this,
				`${this.url}/register`,
				payload,
			);

			this.setUser(data);

			window.location.href = '/account/details';
			return data;
		},

		async updateMe() {
			const { data } = await guestStoreHelpers.update(
				this,
				`${this.url}/updateMe`,
				this.user,
			);

			this.setUserDetails(data);
			return data;
		},
		async verifyEmail(email) {
			const data = await guestStoreHelpers.store(
				this,
				`${this.url}/loginEmail`,
				{ email },
			);

			this.loginCodeToken = data.codeToken;
			return data;
		},
		async loginUsingCode(code) {
			const payload = {
				code,
				codeToken: this.loginCodeToken,
			};
			const data = await guestStoreHelpers.store(
				this,
				`${this.url}/loginCode`,
				payload,
			);

			if (this.error) {
				console.log(this.error);
				return;
			}

			localStorage.setItem(
				'guest_wish_list',
				JSON.stringify(data.customer.wishList),
			);
			this.setUser(data);

			window.location.href = '/account/details';

			return data;
		},
		logout() {
			Cookies.remove('guest_user');
			Cookies.remove('guest_token');
			this.user = null;
			this.token = null;
			window.location.reload();
		},
	},
});
