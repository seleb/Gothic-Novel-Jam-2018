import { STRAND_PASSAGE_DISPLAY } from "./strand";

// actions
export const NODE_DONE = 'textanimation:node:done';

// action creators
export function nodeDone(idx) {
	return { type: NODE_DONE, idx };
}

// reducer
const initialState = {
	nodes: {},
};

export default function statsReducer(state = initialState, action) {
	switch (action.type) {
		case STRAND_PASSAGE_DISPLAY:
			return {
				...state,
				nodes: {},
			};
		case NODE_DONE:
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.idx]: true,
				},
			};
		default:
			return state;
	}
}
