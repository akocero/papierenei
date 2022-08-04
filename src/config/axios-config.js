import axios from 'axios';
// import store from '@/store';

const axiosConfig = axios.create({
	baseURL: 'http://localhost:4000/api/v1/',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzkxYzVjZDJlY2E5OTBmMzRiZmNiYSIsImlhdCI6MTY1OTYxMzE1OCwiZXhwIjoxNjU5Njk5NTU4fQ.a76Cvp1AqI0MqKdotdH4kQuXYKQiHp_vLw4m0K2u8qE`,
	},
});

export default axiosConfig;
