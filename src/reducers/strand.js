// actions
export const STRAND_PASSAGE_DISPLAY = 'strand:passage:display';
export const STRAND_ACTION_EVAL = 'strand:action:eval';

// action creators
export function displayPassage(passage) {
	return { type: STRAND_PASSAGE_DISPLAY, passage };
}
export function evalAction(action) {
	return { type: STRAND_ACTION_EVAL, action };
}

// reducer
const initialState = {
	passage: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case STRAND_PASSAGE_DISPLAY:
			return {
				...state,
				passage: action.passage,
			};
		default:
			return state;
	}
}
