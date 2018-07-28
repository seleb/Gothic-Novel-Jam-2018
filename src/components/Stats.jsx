import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import './Stats.css';

export class Stat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wiggle: undefined,
		};
	}

	componentDidUpdate({
		value: oldValue,
	}) {
		const {
			value: newValue,
		} = this.props;

		if (oldValue !== newValue) {
			this.setState({
				wiggle: newValue - oldValue,
			});
		}
	}
	render({
		stat = '',
		value = 0,
		labels: {
			0: negativeLabel = '',
			1: positiveLabel = '',
		} = {},
	}) {
		const posWiggle = Math.sign(this.state.wiggle) > 0 ? `wiggle-${(value + 3) % 2}` : '';
		const negWiggle = Math.sign(this.state.wiggle) < 0 ? `wiggle-${(value + 3) % 2}` : '';
		return (
			<li>
				<label for={stat} className={negWiggle}>{negativeLabel}</label>
				<div name={stat} id={stat} className="container">
					<div className="bar" style={{ width: `${(value + 3) / 6 * 100}%` }} />
				</div>
				<label for={stat} className={posWiggle}>{positiveLabel}</label>
			</li>
		);
	}
}

export function Stats({
	stats = {},
	show = false,
}) {
	return (
			<ul className={`stats ${show ? '' : 'hidden'}`} onClick={() => this.setState({ hidden: this.state.hidden ? '' : 'hidden' })}>
				{Object.entries(stats).map(([key, stat]) => (
					<Stat key={key} stat={key} {...stat} />
				))}
			</ul>
	);
}

export function mapStateToStatsProps({
	stats: {
		show = false,
		...rest,
	} = {},
}) {
	return {
		show,
		stats: rest,
	};
}

export default connect(mapStateToStatsProps)(Stats);
