import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { evalAction } from '../../reducers/strand';

export class Action {
	evalAction = () => {
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
	}) {
		// TODO: remove title (it's for debugging)
		return <button onClick={this.evalAction} title={action}>{text}</button>;
	}
}

export default connect(undefined, { evalAction })(Action);
