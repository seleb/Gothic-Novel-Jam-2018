import { combineReducers } from 'redux';

import stats from './reducers/stats';
import strand from './reducers/strand';
import textAnimation from './reducers/textAnimation';

export default combineReducers({
	stats,
	strand,
	textAnimation,
});
