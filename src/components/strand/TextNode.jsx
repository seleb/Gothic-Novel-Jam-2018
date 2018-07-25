import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { nodeDone } from '../../reducers/textAnimation';
import './TextNode.css';


export class TextNode extends Component{
	constructor(props){
		super(props);
		this.state = {
			shown: 0,
		};
	}
	componentWillReceiveProps({
		children: oldChildren = [],
	}) {
		const {
			children: newChildren = [],
		} = this.props;
		if(oldChildren !== newChildren){
			this.setState({
				shown: 0,
			});
		}
	}

	incrementShown(){
		this.setState(({
			shown = 0,
		}) => ({
			shown: shown +1,
		}));
	}

	tick = ()=>{
		const {
			state: {
				shown = 0,
			} = {},
			props: {
				idx = -1,
				children: {
					0: {
						length = 0,
					} = '',
				} = [],
				nodeDone: dispatchNodeDone,
			} = {},
		} = this;
		if(shown < length) {
			this.incrementShown();
		} else {
			dispatchNodeDone(idx);
		}
	}

	render({
		idx = -1,
		show = false,
		children: {
			0: content = '',
		} = [],
	}, {
		shown = 0,
	}) {
		if(!show){
			return null;
		}

		return <span className="text-node">{content.substr(0,shown)}<span onAnimationEnd={this.tick} className={` last last-${shown%2}`}>{content.substr(shown, 1)}</span></span>;
	}
}

export function mapStateToProps({
	textAnimation: {
		nodes = {},
	} = {},
}, { idx = -1 }) {
	let nodeIdx = idx - 1;
	return {
		show: nodeIdx < 0 || nodes[nodeIdx],
	};
}

const mapDispatchToProps = {
	nodeDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextNode);
