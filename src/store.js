import { createStore } from 'redux';
import reducers from './reducers';

const initialState = {};
export default createStore(
	reducers,
	initialState,
	typeof devToolsExtension === 'function' ? devToolsExtension() : undefined
);
