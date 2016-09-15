import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './components/Home';
import SignIn from './containers/SignIn';

import store from './store';

function checkAuth(store, nextState, replace) {
  let { isLoggedIn } = store.getState().user;

  if (!isLoggedIn) {
    // redirect back to login.
    replace({
		pathname: '/signin',
		state: { nextPathname: nextState.location.pathname }
    });
  }
}

const routes = (
	<Route component={App}>
		<Route path="/" component={Home} onEnter={checkAuth.bind(this, store)} />
		<Route path="signin" component={SignIn} />
	</Route>
)

export default routes;