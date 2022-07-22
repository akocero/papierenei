import axios from 'axios';
// import store from '@/store';

const axiosConfig = axios.create({
	baseURL: 'http://localhost:4000/api/v1/',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzkxYzVjZDJlY2E5OTBmMzRiZmNiYSIsImlhdCI6MTY1ODQ5NTcxNSwiZXhwIjoxNjU4NTgyMTE1fQ.z7Oy_Smut2Vfv2ZxOu30MD7-lKnGe_KVRa43yEXbvW4`,
	},
});

export default axiosConfig;
