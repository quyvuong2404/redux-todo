import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './components/Home';
import SignIn from './containers/SignIn';

import store from './store';

function checkAuth(store, nextState, replace) {
	let { isLoggedIn } = store.getState().user;

	if (nextState.location.pathname != '/signin') {
		if (!isLoggedIn) {
			// redirect back to login.
			replace({
				pathname: '/signin',
				state: { nextPathname: nextState.location.pathname }
			});
		}
	}
}

const routes = (
	<Route component={App}>
		<Route onEnter={checkAuth.bind(this, store)}>
			<Route path="/" component={Home} />
			<Route path="signin" component={SignIn} />
		</Route>
	</Route>
)

export default routes;