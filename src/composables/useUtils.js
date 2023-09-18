import moment from 'moment';

export default function useUtils() {
	// converting first letter to uppercase

	const capitalize = (str) => {
		const capitalized = str.replace(/^./, str[0].toUpperCase());

		return capitalized;
	};

	const numberFormat = (value) => {
		return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2,
		});
	};

	const currencyFormat = (value) => {
		return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2,
		});
	};

	const convertToRelativeTime = (value) => {
		const date = new Date(value);
		return moment(date, 'YYYYMMDD').fromNow();
	};

	const formatDate = (value) => {
		const date = new Date(value);
		return moment(date).format('MMMM Do YYYY, h:mm:ss a');
	};

	const sort = (arrayObjects, propertyName) => {
		arrayObjects.sort(function compare(a, b) {
			if (a[propertyName] < b[propertyName]) {
				return -1;
			}
			if (a[propertyName] > b[propertyName]) {
				return 1;
			}
			return 0;
		});

		return arrayObjects;
	};

	const sortString = (arrayObjects, propertyName) => {
		arrayObjects.sort(function compare(a, b) {
			if (a[propertyName].toLowerCase() < b[propertyName].toLowerCase()) {
				return -1;
			}
			if (a[propertyName].toLowerCase() > b[propertyName].toLowerCase()) {
				return 1;
			}
			return 0;
		});

		return arrayObjects;
	};

	return {
		capitalize,
		numberFormat,
		sort,
		convertToRelativeTime,
		currencyFormat,
		formatDate,
		sortString,
	};
}
