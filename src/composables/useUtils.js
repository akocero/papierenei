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

	return { capitalize, numberFormat, sort };
}
