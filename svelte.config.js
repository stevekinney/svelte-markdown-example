import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import svelteMarkdown from './src/lib/svelte-markdown.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'], // Add .md to the list of extensions
	preprocess: [vitePreprocess(), svelteMarkdown()], // Add our preprocessor

	kit: {
		adapter: adapter()
	}
};

export default config;
