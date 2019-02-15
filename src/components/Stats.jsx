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
		titles = [],
		setStat,
	}, {
		wiggle,
	}) {
		const valOffset = value + 3;
		const title = titles[valOffset];
		const posWiggle = Math.sign(wiggle) > 0 ? `wiggle-${valOffset % 2}` : '';
		const negWiggle = Math.sign(wiggle) < 0 ? `wiggle-${valOffset % 2}` : '';
		return (
			<li onMouseOver={() => setStat(stat)}>
				<label for={stat} className={negWiggle} style={{
					opacity: .5 - value / 8,
				}}>{negativeLabel}</label>
				<div name={stat} id={stat} className="container">
					<div className="bar" style={{ width: `${valOffset / 6 * 100}%` }} />
				</div>
				<label for={stat} className={posWiggle} style={{
					opacity: .5 + value / 8,
				}}>{positiveLabel}</label>
			</li>
		);
	}
}

export class Stats extends Component {
	constructor() {
		super();
		this.state = {
			stat: '',
		};
	}
	render({
		stats = {},
		show = false,
	}, {
		stat = '',
	}) {
		const {
			[stat]: {
				titles = [],
				value = 0,
			} = {}
		} = stats;
		const {
			[value + 3]: explanation = '...',
		} = titles;
		return (
			<ul className={`stats ${show ? '' : 'hidden'}`} onClick={() => this.setState({ hidden: this.state.hidden ? '' : 'hidden' })}>
				{Object.entries(stats).map(([key, stat]) => (
					<Stat key={key} stat={key} {...stat} setStat={stat => this.setState({ stat })} />
				))}
				<li className="explanation">{explanation}</li>
			</ul>
		);
	}
}

export function mapStateToStatsProps({
	stats: {
		show = false,
		enabled = false,
		...rest
	} = {},
}) {
	return {
		show,
		stats: rest,
	};
}

export default connect(mapStateToStatsProps)(Stats);
