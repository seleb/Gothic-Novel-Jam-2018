import { h, Component } from 'preact';
import {
	vim,
	ill,
	fed,
	ire,
	fur,
	gal,
	fop,
	sop,
	wit,
	dim,
} from '../reducers/stats';
import { connect } from 'preact-redux';
import { strand } from '../middleware/StrandMiddleware';
import { evalAction } from '../reducers/strand';

export function Debug({
	stats = {},
	evalAction,
}) {
	return (
		<section className="debug">
			{Object.entries(stats).map(([label, action]) => <button onClick={action}>{label}</button>)}<br />
			goto: {Object.keys(strand.passages).map(passage => <button onClick={() => evalAction(`this.goto("${passage}")`)}>{passage}</button>)}
		</section>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		stats: {
			vim: () => dispatch(vim()),
			ill: () => dispatch(ill()),
			fed: () => dispatch(fed()),
			ire: () => dispatch(ire()),
			fur: () => dispatch(fur()),
			gal: () => dispatch(gal()),
			fop: () => dispatch(fop()),
			sop: () => dispatch(sop()),
			wit: () => dispatch(wit()),
			dim: () => dispatch(dim()),
		},
		evalAction: action => dispatch(evalAction(action)),
	};
};

export default connect(undefined, mapDispatchToProps)(Debug);
