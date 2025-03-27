/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			xs: '378px',
			sm: '480px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
		},
		container: {
			center: true,
			// Можно определить брейкпоинты так, чтобы до 1200px контейнер был fluid, а затем фиксировался:
			screens: {
				sm: '100%',
				md: '100%',
				lg: '100%',
				xl: '1440px',
			},
		},
		colors: {
			'dark': '#2b3a4e',
			'gray': '#4f6786',
			'white': '#ffffff',
			'lines': '#dfe4ea',
			'background': '#f6f7f9',
			'red-light': '#ff4d4d',
			'red-light-100': 'rgba(255, 77, 77, 0.1)',
			'red-dark': '#db4141',
			'green-light': '#46d16d',
			'green-light-100': 'rgba(70, 209, 109, 0.1)',
			'green-dark': '#38ae59',
			'yellow-light': '#f69400',
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			sfuidisplay: ['SF UI Display', 'sans-serif'],
			verdana: ['Verdana', 'sans-serif'],
		},
	},
	plugins: [],
}
