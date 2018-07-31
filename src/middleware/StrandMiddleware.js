import Strand from 'strand-core';

import {
	displayPassage,
	setFlag,
	STRAND_ACTION_EVAL,
	resetFlags
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
	resetStats,
} from '../reducers/stats';

import source from '../assets/script';

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

	flag(flag, value) {
		if (value !== undefined) {
			dispatch(setFlag(flag, value));
		} else {
			return getState().strand.flags[flag];
		}
	}

	reset() {
		dispatch(resetStats());
		dispatch(resetFlags());
	}

	dispatch(action) {
		dispatch(action);
	}
}
export const strand = new StrandE({
	renderer,
	source: source
	.replace(/\[\+VIM\]/g, '[+VIM]<<do this.plus.vim()>>')
	.replace(/\[\+ILL\]/g, '[+ILL]<<do this.plus.ill()>>')
	.replace(/\[\+FED\]/g, '[+FED]<<do this.plus.fed()>>')
	.replace(/\[\+IRE\]/g, '[+IRE]<<do this.plus.ire()>>')
	.replace(/\[\+FUR\]/g, '[+FUR]<<do this.plus.fur()>>')
	.replace(/\[\+GAL\]/g, '[+GAL]<<do this.plus.gal()>>')
	.replace(/\[\+FOP\]/g, '[+FOP]<<do this.plus.fop()>>')
	.replace(/\[\+SOP\]/g, '[+SOP]<<do this.plus.sop()>>')
	.replace(/\[\+WIT\]/g, '[+WIT]<<do this.plus.wit()>>')
	.replace(/\[\+DIM\]/g, '[+DIM]<<do this.plus.dim()>>'),
});
strand.goto('start');
