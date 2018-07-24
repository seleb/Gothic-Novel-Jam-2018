
import { h, Component } from 'preact';

import TextNode from './TextNode';
import ActionNode from './ActionNode';

export default function Node({
	name = '',
	value,
}) {
	switch (name) {
		case 'text':
			return <TextNode>{value}</TextNode>;
		case 'action':
			return <ActionNode {...value} />
		default:
			return `unrecognized program node: ${name}`;
	}
}
