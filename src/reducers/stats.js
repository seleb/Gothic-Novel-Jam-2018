// actions
export const STATS_SET = 'stats:set';
export const STATS_CHANGE = 'stats:change';
export const STATS_SET_SHOW = 'stats:show';

// action creators
export function setStat({
	stat = '',
	value = 0,
}) {
	return { type: STATS_SET, stat, value };
}

export function changeStat({
	stat = '',
	diff = 0,
}) {
	return { type: STATS_CHANGE, stat, diff };
}

export function incrementStat(stat = '') {
	return changeStat({ stat, diff: 1 });
}
export function decrementStat(stat = '') {
	return changeStat({ stat, diff: -1 });
}

export function vim() {
	return incrementStat('vim');
}
export function ill() {
	return decrementStat('vim');
}
export function fed() {
	return incrementStat('fed');
}
export function ire() {
	return decrementStat('fed');
}
export function fur() {
	return incrementStat('fur');
}
export function gal() {
	return decrementStat('fur');
}
export function fop() {
	return incrementStat('fop');
}
export function sop() {
	return decrementStat('fop');
}
export function wit() {
	return incrementStat('wit');
}
export function dim() {
	return decrementStat('wit');
}

export function setShowStats(show = false) {
	return { type: STATS_SET_SHOW, show };
}

// reducer
const initialState = {
	vim: {
		value: 0,
		labels: ['ILL','VIM'],
	},
	fed: {
		value: 0,
		labels: ['IRE','FED'],
	},
	fur: {
		value: 0,
		labels: ['GAL','FUR'],
	},
	fop: {
		value: 0,
		labels: ['SOP','FOP'],
	},
	wit: {
		value: 0,
		labels: ['DIM','WIT'],
	},
	show: false,
};

export default function statsReducer(state = initialState, action) {
	switch (action.type) {
		case STATS_SET:
			return {
				...state,
				[action.stat]: {
					...state[action.stat],
					value: Math.min(3, Math.max(-3, action.value)),
				},
			};
		case STATS_CHANGE:
			return {
				...state,
				[action.stat]: {
					...state[action.stat],
					value: Math.min(3, Math.max(-3, state[action.stat].value + action.diff)),
				},
			};
		case STATS_SET_SHOW:
			return {
				...state,
				show: action.show,
			};
		default:
			return state;
	}
}
