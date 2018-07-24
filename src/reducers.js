import { combineReducers } from 'redux';

import stats from './reducers/stats'
import strand from './reducers/strand'

export default combineReducers({
	stats,
	strand,
});
