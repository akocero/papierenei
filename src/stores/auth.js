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
		setUserDetails(user) {
			this.user = user;
			Cookies.set('user', JSON.stringify(user), {
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

		async forgotPassword(email) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.post(`${this.url}/forgotPassword`, {
					email,
				});
				this.error = null;
				this.isLoading = false;
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async resetPassword(payload) {
			const { password, passwordConfirm, resetToken } = payload;
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.patch(
					`${this.url}/resetPassword/${resetToken}`,
					{
						password,
						passwordConfirm,
					},
				);
				this.error = null;
				this.isLoading = false;
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		logout() {
			Cookies.remove('user');
			Cookies.remove('token');
			this.user = null;
			this.token = null;
		},
		async updateMe() {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.patch(
					`${this.url}/updateMe`,
					this.user,
				);
				this.error = null;
				this.isLoading = false;
				const { _id, name, email } = res.data.data;
				this.setUserDetails({
					_id,
					name,
					email,
				});
				return res.data.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async changePassword() {
			console.log('changePassword');
		},
		async me() {
			try {
				const res = await axios.get('/auth/me');
				this.isAuth = true;
				return;
			} catch (error) {
				if (error.response?.data?.message === 'Expired Token') {
					this.logout();
					window.location.reload();
				}
				this.isAuth = false;
			}
		},
	},
});
