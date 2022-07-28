import axios from 'axios';
// import store from '@/store';

const axiosConfig = axios.create({
	baseURL: 'http://localhost:4000/api/v1/',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzkxYzVjZDJlY2E5OTBmMzRiZmNiYSIsImlhdCI6MTY1ODk4ODk5MSwiZXhwIjoxNjU5MDc1MzkxfQ.oT290jg0SgcsLv28Ty1x3puCOsaILmEjPFxqL3FWXEI`,
	},
});

export default axiosConfig;
