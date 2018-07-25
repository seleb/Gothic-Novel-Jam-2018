import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { finishNode, incrementNode } from '../../reducers/textAnimation';
import './TextNode.css';


export class TextNode extends Component {
	constructor(props) {
		super(props);
	}

	tick = () => {
		const {
			shown = 0,
			idx = -1,
			children: {
				0: {
					length = 0,
				} = '',
			} = [],
			finishNode: dispatchFinishNode,
			incrementNode: dispatchIncrementNode,
		} = this.props;
		dispatchIncrementNode(idx);
		if (shown >= length - 1) {
			dispatchFinishNode(idx);
		}
	}

	render({
		idx = -1,
		shown = -1,
		children: {
			0: content = '',
		} = [],
	}) {
		if (shown < 0) {
			return null;
		}
		const shownChars = content.substr(0, shown);
		const nextChar = content.substr(shown, 1);
		return (
			<span className="text-node">
				{shownChars}
				{nextChar && <span onAnimationEnd={this.tick} className={` last last-${shown % 2}`}>{nextChar}</span>}
			</span>
		);
	}
}

export function mapStateToProps({
	textAnimation: {
		nodes = {},
	} = {},
}, { idx = -1 }) {
	return {
		shown: nodes[idx],
	};
}

const mapDispatchToProps = {
	finishNode,
	incrementNode,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextNode);
