import { combineReducers } from 'redux';
import todos from './Todos';
import user from './User';

const rootReducer = combineReducers({
  todos,
  user
});

export default rootReducer;
