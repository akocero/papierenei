import axios from '../config/axios-config';

const fetch = async (store) => {
	store.list = [];
	store.isLoading = true;

	try {
		const res = await axios.get(store.url);
		store.list = res.data.data;
		console.log(res.data);
		store.error = null;
		store.isLoading = false;
	} catch (err) {
		store.isLoading = false;
		console.log(err.response.data.message);
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

export default { fetch, create };
