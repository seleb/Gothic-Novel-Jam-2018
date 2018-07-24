import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import './Stats.css';

export function Stat({
	stat = '',
	value = 0,
	labels: {
		0: negativeLabel = '',
		1: positiveLabel = '',
	} = {},
}) {
	return (
		<li className="stat">
			<label for={stat}>{negativeLabel}</label>
			<meter name={stat} id={stat} min="-10" max="10" value={value} />
			<label for={stat}>{positiveLabel}</label>
		</li>
	);
}

export function Stats({
	stats = {},
}) {
	return (
		<ul className="stats">
			{Object.entries(stats).map(([key, stat]) => (
				<Stat key={key} stat={key} {...stat} />
			))}
		</ul>
	);
}

export function mapStateToStatsProps({
	stats = {},
}) {
	return {
		stats,
	};
}

export default connect(mapStateToStatsProps)(Stats);
