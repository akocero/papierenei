import { defineStore } from 'pinia';
import axios from '../config/axios-config';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
		token: Cookies.get('token') ? Cookies.get('token') : null,
		isLoading: false,
		url: `auth`,
		response: null,
		error: null,
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		setUser(payload) {
			this.user = payload.user;
			this.token = payload.token;
			Cookies.set('user', JSON.stringify(payload.user), {
				expires: 7,
			});
			Cookies.set('token', payload.token, {
				expires: 7,
			});
		},
		async login(email, password) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.post(`${this.url}/login`, {
					email,
					password,
				});
				this.setUser(res.data);
				this.error = null;
				this.isLoading = false;
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async singup(payload) {
			this.isLoading = true;
			this.error = null;

			const { name, email, password, passwordConfirm } = payload;
			try {
				const res = await axios.post(`${this.url}/register`, {
					name,
					email,
					password,
					passwordConfirm,
				});
				this.setUser(res.data);
				this.error = null;
				this.isLoading = false;
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async me() {
			console.log('getMe');
		},
		async updateMe() {
			console.log('updateMe');
		},
	},
});
