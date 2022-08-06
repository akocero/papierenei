import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || null;

const axiosConfig = axios.create({
	baseURL: 'http://localhost:4000/api/v1/',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export default axiosConfig;
