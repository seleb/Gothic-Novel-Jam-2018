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
		if (this.end) {
			this.end.scrollIntoView({ behavior: "instant" });
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
		const { length = 0 } = content;
		if (shown >= length) {
			// animation complete
			return <span className="text-node">{content}</span>;
		}

		// mid animation, split into various subsections
		// all shown characters
		const shownChars = content.substr(0, shown);
		// animated character (next being shown)
		const animChar = content.substr(shown, 1);
		const isSpace = animChar.match(/\s/);
		// split the shown characters into fully shown words,
		// and last partial word
		// if the animated character is a space,
		// then there is no last partial word
		const {
			1: shownWords,
			2: lastWord,
		} = isSpace
				? [undefined, shownChars, undefined]
				: shownChars.match(/^([^]*?)(\b\w*)?$/);
		// remainder of partial word (if there is one)
		const hiddenChars = isSpace ? '' : content.substr(shown + 1).split(' ')[0];
		return (
			<span className="text-node">
				{shownWords}
				<span className="last-word">
					{lastWord}
					{animChar && <span ref={el => { this.end = el; }} onAnimationEnd={this.tick} className={` last last-${shown % 2}`}>{animChar}</span>}
					{hiddenChars && <span className="break-guard">{hiddenChars}</span>}
				</span>
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
