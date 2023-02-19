import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const alerts = ref([]);

export default function useAlert() {
	const pushAlert = (status, message, customStatus = null) => {
		const newAlert = {
			status,
			message,
			id: uuidv4(),
			customStatus,
		};
		alerts.value.unshift(newAlert);
		// window.scrollTo(0, 0);
	};

	const pushToast = (obj) => {
		const { status, message, customStatus, title } = obj;
		const newAlert = {
			status,
			message,
			id: uuidv4(),
			customStatus,
			title,
		};
		alerts.value.unshift(newAlert);
		// window.scrollTo(0, 0);
	};

	const popAlert = (id) => {
		alerts.value = alerts.value.filter((alert) => alert.id != id);
		console.log(id);
	};

	return { alerts, pushAlert, popAlert, pushToast };
}
