import { processMarkdown } from './markdown-to-html.js';

const svelteMarkdown = () => {
	return {
		name: 'svelte-markdown',
		/**
		 * @param {object} options
		 * @param {string} options.content
		 * @param {string} options.filename
		 */
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) {
				return processMarkdown({ content, filename });
			}
		}
	};
};

export default svelteMarkdown;
