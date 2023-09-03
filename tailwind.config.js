const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				base: '1600px',
			},

			fontFamily: {
				comfortaa: ['Comfortaa'],
				quicksand: ['quicksand'],
				xnarrow: ['hoss-round-xnarrow'],
				karla: ['Karla'],
				nunito: ['Nunito'],
			},
			colors: {
				lightBlue: {
					1: '#F2FBFD',
					2: '#D8F4F8',
					3: '#89DEEA',
				},
				customDarkBlue: '#055560',
				main: '#66dcfd',
				darkBlue: '#05A0B5',
				darkYellow: '#FEC126',
				accent: {
					1: '#FEC126',
				},
				primary: {
					0: '#FBFEFE',
					1: '#EDFDFF',
					2: '#89DEEA',
					3: '#05A0B5',
					4: '#055560',
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#05A0B5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
				secondary: {
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
			},
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			indigo: colors.indigo,
			yellow: colors.amber,
			blue: colors.sky,
			green: colors.emerald,
			red: colors.red,
		},
	},
	variants: {
		extend: {
			shadow: ['hover'],
			border: ['last'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
