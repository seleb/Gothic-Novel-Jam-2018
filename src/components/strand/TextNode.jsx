import { h, Component } from 'preact';

export default function TextNode({ children = [] }) {
	return <span>{children}</span>;
}
