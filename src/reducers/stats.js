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
		titles: [
			'One foot in the grave.',
			'Knocking on Death\'s door.',
			'Require rest and recuperation.',
			'Of average health and constitution.',
			'Fit as a fiddle.',
			'Strong of body and spirit.',
			'Nigh invincible.',
		],
	},
	fed: {
		value: 0,
		labels: ['IRE','FED'],
		titles: [
			'Patience tested, and found wanting.',
			'Frustrated.',
			'Irked.',
			'In control.',
			'Satiated.',
			'Indulged.',
			'You want for naught.',
		],
	},
	fur: {
		value: 0,
		labels: ['GAL','FUR'],
		titles: [
			'Curse? What curse?',
			'Staying true to your past.',
			'Resisting temptation.',
			'Internally conflicted.',
			'The curse grows stronger by the day.',
			'More wolf than woman.',
			'But a speck of humanity remains.',
		],
	},
	fop: {
		value: 0,
		labels: ['SOP','FOP'],
		titles: [
			'Heads turn, faces filled with disgust.',
			'A black mark on your family.',
			'Rumours are spreading.',
			'Respected by name, if not by merit.',
			'Prim and proper.',
			'A shining example of the family name.',
			'Heads turn, faces filled with awe.',
		],
	},
	wit: {
		value: 0,
		labels: ['DIM','WIT'],
		titles: [
			'A stuttering dullard.',
			'Uncertain at best.',
			'Shy, and slow to speak.',
			'Fair with thought, if not with words.',
			'Confident.',
			'Silver-tongued.',
			'Deservedly confident.',
		],
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
