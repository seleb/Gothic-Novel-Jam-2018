
import { h, Component } from 'preact';

import TextNode from './TextNode';
import ActionNode from './ActionNode';

/**
 * replaces regular quotes with context-aware smart quotes
 * @param {string} str string to replace
 */
function smartify(str = '') {
	return str
		.replace(
			/("+)(.*?)("+)/g,
			(_, l, i, r) => `${'“'.repeat(l.length)}${i}${'”'.repeat(r.length)}`
		)
		.replace(/(\w)'(\w)/g, '$1’$2')
		.replace(
			/('+)(.*?)('+)/g,
			(_, l, i, r) => `${'‘'.repeat(l.length)}${i}${'’'.repeat(r.length)}`
		);
}


export default function Node({
	name = '',
	value,
	idx = -1,
}) {
	switch (name) {
		case 'text':
			return <TextNode idx={idx}>{smartify(value)}</TextNode>;
		case 'action':
			return <ActionNode {...value} idx={idx} />
		default:
			return `unrecognized program node: ${name}`;
	}
}
