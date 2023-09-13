import axios from '../config/axios-guest';
import Cookies from 'js-cookie';

const logout = () => {
	Cookies.remove('user');
	Cookies.remove('token');
	window.location.reload();
	return;
};

const get = async (store, url) => {
	store.isLoading = true;

	try {
		const res = await axios.get(url);
		store.error = null;
		store.isLoading = false;

		return res.data;
	} catch (err) {
		store.isLoading = false;
		store.error = err.response.data;

		if (err.response?.data?.message === 'Expired Token') {
			logout();
		}
	}
};

const update = async (store, url, payload) => {
	store.isLoading = true;
	store.error = null;
	try {
		const res = await axios.patch(url, payload);
		store.error = null;
		store.isLoading = false;
		return res.data;
	} catch (err) {
		store.isLoading = false;
		store.error = err.response.data;

		if (err.response?.data?.message === 'Expired Token') {
			logout();
		}
	}
};

const store = async (store, url, payload) => {
	store.isLoading = true;
	store.error = null;
	try {
		const res = await axios.post(url, payload);
		store.error = null;
		store.isLoading = false;
		return res.data;
	} catch (err) {
		store.isLoading = false;
		store.error = err.response.data;

		if (err.response?.data?.message === 'Expired Token') {
			logout();
		}
	}
};

const destroy = async (store, url) => {
	store.isLoading = true;
	store.error = null;
	try {
		const res = await axios.delete(url);
		store.error = null;
		store.isLoading = false;
		return res.data;
	} catch (err) {
		store.isLoading = false;
		store.error = err.response.data;

		if (err.response?.data?.message === 'Expired Token') {
			logout();
		}
	}
};

export default {
	get,
	update,
	store,
	destroy,
};
