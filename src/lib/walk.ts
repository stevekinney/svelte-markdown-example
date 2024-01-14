import type { TemplateNode as Node } from 'svelte/types/compiler/interfaces';

type Modifiers = {
	enter?: (node: Node) => void | false | Promise<void | false>;
	leave?: (node: Node) => void | Promise<void>;
};

export const walk = async (node: Node, modifiers: Modifiers): Promise<void> => {
	if (modifiers.enter) {
		const result = await modifiers.enter(node);
		if (result === false) return;
	}

	node.children?.forEach(async (child) => {
		await walk(child, modifiers);
	});

	if (modifiers.leave) {
		await modifiers.leave(node);
	}
};
