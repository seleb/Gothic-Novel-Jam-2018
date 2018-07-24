import Strand from 'strand-core';

import {
	STRAND_INIT,
	displayPassage,
	STRAND_ACTION_EVAL
} from '../reducers/strand';

import source from '../assets/script.strand';

let dispatch;
let getState;
const StrandMiddleware = store => {
	dispatch = store.dispatch;
	getState = store.getState;
	return next => action => {
		switch (action.type) {
			case STRAND_ACTION_EVAL:
				strand.eval(action.action);
				break;
			default:
				break;
		}
		return next(action);
	};
};

export default StrandMiddleware;

const renderer = {
	displayPassage: passage => {
		const compiledPassage = strand.execute(passage.program);
		dispatch(displayPassage(compiledPassage));
		return Promise.resolve();
	},
};

const strand = new Strand({
	renderer,
	source,
});
strand.goto('start');
