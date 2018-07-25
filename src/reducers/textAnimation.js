import { STRAND_PASSAGE_DISPLAY } from "./strand";

// actions
export const NODE_DONE = 'textanimation:node:done';
export const NODE_INCREMENT = 'textanimation:node:increment';

// action creators
export function finishNode(idx) {
	return { type: NODE_DONE, idx };
}
export function incrementNode(idx) {
	return { type: NODE_INCREMENT, idx };
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
				nodes: {
					0: 0,
				},
			};
		case NODE_DONE:
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.idx + 1]: 0,
				},
			};
		case NODE_INCREMENT:
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.idx]: state.nodes[action.idx] + 1,
				},
			};
		default:
			return state;
	}
}
