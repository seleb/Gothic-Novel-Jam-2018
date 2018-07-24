import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Node from './Node';

export function Strand({ passage = [] }, { }) {
	return (
		<div>
			{passage.map(entry => <Node {...entry} />)}
		</div>
	);
}

export function mapStateToProps({
	strand: {
		passage = [],
	} = {},
}) {
	return {
		passage,
	};
}

export default connect(mapStateToProps)(Strand);
