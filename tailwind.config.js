/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
	theme: {
		extend: {
			colors: {
				white: '#fafafa',
			},
		},
	},
	plugins: [require('preline/plugin')],
};
