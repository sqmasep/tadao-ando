import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
	plugins: [injectHTML()],
	root: 'src',
	build: {
		outDir: '../dist',
		rollupOptions: {
			input: {
				main: 'pages/home.html',
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
			},
		},
	},
})
