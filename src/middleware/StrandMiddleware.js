import Strand from 'strand-core';

import {
	STRAND_INIT,
	displayPassage,
	STRAND_ACTION_EVAL
} from '../reducers/strand';
import {
	vim,
	ill,
	fed,
	ire,
	fur,
	gal,
	fop,
	sop,
	wit,
	dim,
} from '../reducers/stats';

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

const stat = {
	get vim() { return getState().stats.vim.value; },
	get ill() { return -getState().stats.vim.value; },
	get fed() { return getState().stats.fed.value; },
	get ire() { return -getState().stats.fed.value; },
	get fur() { return getState().stats.fur.value; },
	get gal() { return -getState().stats.fur.value; },
	get fop() { return getState().stats.fop.value; },
	get sop() { return -getState().stats.fop.value; },
	get wit() { return getState().stats.wit.value; },
	get dim() { return -getState().stats.wit.value; },
};
const plus = {
	vim: ()=>dispatch(vim()),
	ill: ()=>dispatch(ill()),
	fed: ()=>dispatch(fed()),
	ire: ()=>dispatch(ire()),
	fur: ()=>dispatch(fur()),
	gal: ()=>dispatch(gal()),
	fop: ()=>dispatch(fop()),
	sop: ()=>dispatch(sop()),
	wit: ()=>dispatch(wit()),
	dim: ()=>dispatch(dim()),
};
class StrandE extends Strand {
	get stat(){
		return stat;
	}

	get plus(){
		return plus;
	}
}
// TODO: extend Strand and make it run more of its internals through redux
const strand = new StrandE({
	renderer,
	source,
});
strand.goto('start');