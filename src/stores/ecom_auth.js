import { defineStore } from 'pinia';
import axios from '../config/axios-config';
import Cookies from 'js-cookie';

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
		async signup(payload) {
			this.isLoading = true;
			this.error = null;

			const {
				firstName,
				lastName,
				mobileNumber,
				email,
				password,
				passwordConfirm,
			} = payload;
			try {
				const res = await axios.post(`${this.url}/register`, {
					firstName,
					lastName,
					mobileNumber,
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
			Cookies.remove('guest_user');
			Cookies.remove('guest_token');
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
					{
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					},
				);
				this.error = null;
				this.isLoading = false;

				this.setUserDetails(res.data.data);
				return res.data.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async updatePassword(payload) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.patch(
					`${this.url}/updatePassword`,
					payload,
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
		async verifyEmail(email) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.post(`${this.url}/loginEmail`, {
					email,
				});
				this.error = null;
				this.isLoading = false;
				this.loginCodeToken = res.data.codeToken;
				console.log(res);
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
		async loginUsingCode(code) {
			this.isLoading = true;
			this.error = null;
			try {
				const res = await axios.post(`${this.url}/loginCode`, {
					code,
					codeToken: this.loginCodeToken,
				});
				console.log(res);
				this.setUser(res.data);
				this.loginCodeToken = null;
				this.error = null;
				this.isLoading = false;
				return res.data;
			} catch (err) {
				this.isLoading = false;
				console.log(err);
				this.error = err.response.data;
			}
		},
	},
});
