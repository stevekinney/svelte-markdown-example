import { test, expect } from 'vitest';
import { processMarkdown } from './markdown-to-html.js';

import simpleExample from './fixtures/simple-example.md?raw';

test('It processes Markdown', async () => {
	const { code } = await processMarkdown({ content: simpleExample, filename: 'simple-example.md' });
	expect(code).toMatchInlineSnapshot(`
		"<script lang="ts">
		  const exampleVariable = 'Variable Content';
		  const thisShouldBeIgnored = "Don't **mess** with code.";
		</script>

		<h1>A Markdown Title</h1>
		<ul>
		<li>{exampleVariable}</li>
		<li>Markdown Content</li>
		</ul>
		<p>**Markdown** inside of an HTML element.</p>
		"
	`);
});
