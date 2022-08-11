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

	return { capitalize, numberFormat };
}
