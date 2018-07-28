import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { setShowStats } from './../../reducers/stats';

import Node from './Node';
import './Strand.css';
import Stats from './../Stats';

export function Strand({
	passage = [],
	setShowStats,
	show,
}, { }) {
	return (
		<div className="strand">
			<section className="passages-area">
				{passage.map((entry, idx) => <Node {...entry} idx={idx} />)}
			</section>
			<section className="stats-area">
				<Stats />
				<button className={`toggle ${show ? 'opened' :''}`} onClick={() => setShowStats(!show)} >{show ? '>' : '<'}</button>
			</section>
		</div>
	);
}

export function mapStateToProps({
	strand: {
		passage = [],
	} = {},
	stats: {
		show = false,
	} = {},
}) {
	return {
		show,
		passage,
	};
}

const mapDispatchToProps = {
	setShowStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(Strand);
