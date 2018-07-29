import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { evalAction } from '../../reducers/strand';
import TextNode from './TextNode';

import './ActionNode.css';

export class Action {
	evalAction = event => {
		event.preventDefault();
		event.stopPropagation();
		const {
			action = '',
			evalAction,
		} = this.props;
		if (evalAction) {
			evalAction(action);
		}
	}
	render({
		text = '',
		action = '',
		idx = -1,
	}) {
		// TODO: remove title (it's for debugging)
		return <a className="action-node" onClick={this.evalAction} title={action}><TextNode idx={idx}>{text}</TextNode></a>;
	}
}

export default connect(undefined, { evalAction })(Action);
