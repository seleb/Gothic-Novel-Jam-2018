import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { setShowStats } from './../../reducers/stats';
import { finish } from './../../reducers/textAnimation';

import Node from './Node';
import './Strand.css';
import Stats from './../Stats';

export function Strand({
	passage = [],
	setShowStats,
	finish,
	show,
}, { }) {
	return (
		<div className="strand">
			<section className="passages-area" onClick={() => finish(passage.length)}>
				{passage.map((entry, idx) => <Node {...entry} idx={idx} />)}
			</section>
			<section className="stats-area">
				<Stats />
				<button className={`toggle ${show ? 'opened' : ''}`} onClick={event => { event.preventDefault(); event.stopPropagation(); setShowStats(!show) }} >{show ? '>' : '<'}</button>
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
	finish,
};

export default connect(mapStateToProps, mapDispatchToProps)(Strand);
