import { parse } from 'svelte/compiler';

import MagicString from 'magic-string';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

/**
 * @param {string} content
 */
const toHTML = (content) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(content);

/**
 * @param {object} options
 * @param {string} options.content
 * @param {string} options.filename
 */
export const processMarkdown = async ({ content, filename }) => {
	const result = new MagicString(content);
	const { html } = parse(content);

	const { start, end } = html;

	const processed = await toHTML(content.slice(start, end));

	result.update(start, end, String(processed));

	return {
		code: result.toString(),
		map: result.generateMap({ source: filename })
	};
};
