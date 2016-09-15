import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './client/containers/App';
import store from './client/store/index';
import 'todomvc-app-css/index.css';
import 'babel-polyfill';
import routes from './client/routes';
import { loadTodos } from './client/actions/Todos';
import './client/assets/css/styles.css';

render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes} />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(loadTodos());
