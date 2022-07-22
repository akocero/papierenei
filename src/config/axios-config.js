import axios from 'axios';
// import store from '@/store';

const axiosConfig = axios.create({
	baseURL: 'http://localhost:4000/api/v1/',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzkxYzVjZDJlY2E5OTBmMzRiZmNiYSIsImlhdCI6MTY1ODQwMzQ3MSwiZXhwIjoxNjU4NDg5ODcxfQ.4QPuC4RWKnDMawMKSndRCMB7_zdy4wPoHMRq8LN9rfE`,
	},
});

export default axiosConfig;
