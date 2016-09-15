import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {
	todos: []
};

const enhancers = [
	applyMiddleware(thunk)
];

const store = createStore(rootReducer, initialState, compose(...enhancers));

if (module.hot) {
	module.hot.accept('../reducers', () => {
	  const nextReducer = require('../reducers/index');
	  store.replaceReducer(nextReducer);
	});
}

export default store;