import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Node from './Node';
import './Strand.css';

export function Strand({ passage = [] }, { }) {
	return (
		<div className="strand">
			{passage.map((entry, idx) => <Node {...entry} idx={idx} />)}
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
