import axios from '../config/axios-config';
import Cookies from 'js-cookie';

const fetch = async (store, query) => {
	store.list = [];
	store.isLoading = true;

	try {
		const res = await axios.get(store.url + query);
		store.list = res.data.data;

		store.error = null;
		store.isLoading = false;
		store.response = res.data;
		return res.data;
	} catch (err) {
		store.isLoading = false;

		store.error = err.response.data;
		if (err.response?.data?.message === 'Expired Token') {
			Cookies.remove('user');
			Cookies.remove('token');
			window.location.reload();
			return;
		}
	}
};

const find = async (store, id) => {
	store.item = null;
	store.isLoading = true;

	try {
		const res = await axios.get(`${store.url}/${id}`);
		store.item = res.data.data;

		store.error = null;
		store.isLoading = false;
		store.response = res.data;
		return res.data;
	} catch (err) {
		store.isLoading = false;
		// console.log(err.response);
		store.error = err.response.data;
	}
};

const create = async (store, payload) => {
	store.isLoading = true;
	store.error = null;
	try {
		const res = await axios.post(store.url, payload);
		store.error = null;
		store.isLoading = false;
		console.log(res.data);
		return res.data;
	} catch (err) {
		store.isLoading = false;
		console.log(err.response.data.message);
		store.error = err.response.data;
	}
};

const update = async (store, payload) => {
	store.isLoading = true;
	store.error = null;
	try {
		const res = await axios.patch(`${store.url}/${payload._id}`, payload);
		store.error = null;
		store.isLoading = false;
		// console.log('storeHelper', res.data);
		return res.data;
	} catch (err) {
		store.isLoading = false;
		console.log(err.response.data.message);
		store.error = err.response.data;
	}
};

export default { fetch, create, find, update };
