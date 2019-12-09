import { combineReducers } from 'redux';

import auth from './ducks/auth';
import lists from './ducks/lists';

export default combineReducers({
  lists,
  auth,
});