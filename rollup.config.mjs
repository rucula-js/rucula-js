import typescript from '@rollup/plugin-typescript'

export default {
	input: 'src/Rucula.ts',
	output: {
		file: 'dist/rucula-bundle.js'
	},
	plugins: [
		typescript({ 
			compilerOptions: {
				target: "es2022",
				module: "ES2022"
			}
		})
	]
};