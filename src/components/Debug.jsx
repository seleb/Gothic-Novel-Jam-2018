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

export function Debug({
	stats = {},
}) {
	return (
		<section className="debug">
			{Object.entries(stats).map(([label, action]) => <button onClick={action}>{label}</button>)}
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
	};
};

export default connect(undefined, mapDispatchToProps)(Debug);
