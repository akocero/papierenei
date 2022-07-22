import { ref, watch } from 'vue';
import useAlert from './useAlert.js';
export default function useInputMultiple(model, type = 'input') {
	const data = ref([]);
	const { pushAlert } = useAlert();

	const push = () => {
		if (model.value && !data.value.includes(model.value.toLowerCase())) {
			data.value.push(model.value.toLowerCase());
			model.value = '';

			return;
		}

		pushAlert('warning', 'Empty value or Already added!');
	};

	if (type === 'select') {
		watch(model, (newModel) => {
			if (newModel && !data.value.includes(newModel.toLowerCase()))
				data.value.push(newModel.toLowerCase());
			else pushAlert('warning', 'Empty value or Already added!');
		});
	}

	const pop = (value) => {
		data.value = data.value.filter((item) => item !== value);
	};

	return { data, push, pop };
}
